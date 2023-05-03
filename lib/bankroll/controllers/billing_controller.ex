defmodule Bankroll.Controllers.BillingController do
  alias Billing.Subscriptions
  alias Billing.Customers
  alias Billing.SubscriptionBuilder, as: SB

  use Phoenix.Controller,
    formats: [:html, :json],
    layouts: [html: Bankroll.Controllers.Layouts]

  plug(:put_root_layout, {Bankroll.Controllers.Layouts, :root})
  plug(:assign_customer)

  def assign_customer(conn, _) do
    %{"customer_type" => customer_type, "customer_id" => customer_id} = conn.params
    bankroll = conn.assigns.bankroll
    billing = bankroll.billing()
    repo = billing.repo()
    authorize = &bankroll.can_manage_billing?/2

    with schema when not is_nil(schema) <- billing.module_from_customer_type(customer_type),
         customer when not is_nil(customer) <- repo.get_by(schema, id: customer_id),
         {:auth, true} <- {:auth, authorize.(conn, customer)} do
      conn |> assign(:customer, customer)
    else
      {:auth, _} ->
        conn |> put_status(401) |> redirect(to: "/") |> halt()

      _ ->
        conn |> put_status(404) |> redirect(to: "/") |> halt()
    end
  end

  def index(conn, _params) do
    customer = conn.assigns.customer

    conn
    |> assign(:props, get_props(conn, customer))
    |> render(:index)
  end

  defp get_props(conn, customer) do
    subscription = Customers.subscription(customer)

    %{
      payment_method: get_payment_method(customer),
      subscription: subscription,
      grace_period: if(subscription, do: Subscriptions.grace_period?(subscription), else: nil),
      canceled: if(subscription, do: Subscriptions.canceled?(subscription), else: nil),
      recurring: if(subscription, do: Subscriptions.recurring?(subscription), else: nil),
      plans: conn.assigns.bankroll.plans(),
      base_url: current_url(conn, %{}),
      on_trial: if(subscription, do: Subscriptions.trial?(subscription), else: nil),
      trial_ends_at:
        if(subscription && subscription.trial_ends_at,
          do: subscription.trial_ends_at |> DateTime.to_date(),
          else: nil
        )
    }
  end

  def get_payment_method(%{payment_id: nil}), do: nil

  def get_payment_method(customer),
    do: Map.take(customer, [:payment_id, :payment_type, :payment_last_four])

  def setup_payment(conn, _params) do
    intent = Billing.Customers.create_setup_intent(conn.assigns.customer)

    conn |> json(%{client_secret: intent.client_secret})
  end

  def store_payment(conn, params) do
    customer =
      conn.assigns.customer
      |> Billing.Customers.update_default_payment_method(params["payment_method_id"])

    conn |> json(%{props: get_props(conn, customer)})
  end

  def store_subscription(conn, params) do
    price_id = params["price_id"]
    customer = conn.assigns.customer
    payment? = Customers.has_default_payment_method?(customer)
    subscribed? = Customers.subscribed?(customer)
    subscription = Customers.subscription(customer)
    plan = conn.assigns.bankroll.plan_from_price_id(price_id)
    trial_days = plan[:trial_days]

    return_url = conn |> current_url(%{}) |> String.replace_trailing("/subscriptions", "")

    cond do
      subscription && subscription.stripe_price_id == price_id ->
        conn |> json(%{props: get_props(conn, customer)})

      payment? and not subscribed? ->
        case Customers.create_subscription(customer, price_id, "default",
               trial_period_days: trial_days,
               return_url: "#{return_url}?price_id=#{price_id}"
             ) do
          {:error, error} ->
            conn |> json(%{ok: false, message: error.user_message})

          {:requires_action, payment_intent} ->
            conn |> json(%{client_secret: payment_intent.client_secret})

          {:ok, _subscription} ->
            conn |> json(%{props: get_props(conn, customer)})
        end

      payment? and subscribed? ->
        Subscriptions.update(subscription, price_id)
        conn |> json(%{props: get_props(conn, customer)})

      not payment? and not subscribed? ->
        # create incomplete subscription
        # subscription = Customers.create_subscription(customer, price_id)
        # conn |> json(%{client_secret: subscription.latest_invoice.payment_intent.client_secret})
        conn |> json(%{props: get_props(conn, customer)})
    end
  end

  def cancel_subscription(conn, _params) do
    customer = conn.assigns.customer
    subscription = Customers.subscription(customer)

    if subscription do
      Subscriptions.cancel!(subscription)
    end

    conn |> json(%{props: get_props(conn, customer)})
  end

  def resume_subscription(conn, _params) do
    customer = conn.assigns.customer
    subscription = Customers.subscription(customer)

    if subscription && Subscriptions.canceled?(subscription) &&
         Subscriptions.grace_period?(subscription) do
      Subscriptions.resume(subscription)
    end

    conn |> json(%{props: get_props(conn, customer)})
  end

  def list_invoices(conn, _params) do
    customer = conn.assigns.customer

    invoices =
      Customers.invoices(customer)
      |> Enum.map(fn invoice ->
        %{
          hosted_invoice_url: invoice.hosted_invoice_url,
          created: invoice.created |> DateTime.from_unix!() |> DateTime.to_date()
        }
      end)

    conn |> json(%{invoices: invoices})
  end
end
