defmodule Bankroll.Controllers.BillingController do
  alias Billing.Subscriptions
  alias Billing.Customers

  use Phoenix.Controller,
    formats: [:html, :json],
    layouts: [html: Bankroll.Controllers.Layouts]

  plug(:assign_customer)

  def assign_customer(conn, _) do
    %{"customer_type" => customer_type, "customer_id" => customer_id} = conn.params
    bankroll = conn.assigns.bankroll
    billing = bankroll.billing()
    repo = billing.repo()
    authorize = &bankroll.can_manage_billing?/2

    with schema when not is_nil(schema) <- billing.module_from_customer_type(customer_type),
         customer when not is_nil(customer) <- repo.get_by(schema, id: customer_id),
         {:auth, true} <- {:auth, authorize.(conn, customer)},
         :ok <- maybe_create_stripe_customer(customer) do
      conn |> assign(:customer, customer)
    else
      {:auth, _} ->
        conn |> put_status(401) |> redirect(to: "/") |> halt()

      _ ->
        conn |> put_status(404) |> redirect(to: "/") |> halt()
    end
  end

  defp maybe_create_stripe_customer(customer) do
    if Billing.Customer.stripe_id(customer) do
      :ok
    else
      Customers.create_stripe_customer(customer)

      :ok
    end
  end

  def index(conn, _params) do
    customer = conn.assigns.customer

    conn
    |> assign(:props, get_props(conn, customer))
    |> assign(:view, "index")
    |> render(:index)
  end

  def finalize(conn, _params) do
    props = get_props(conn, conn.assigns.customer)

    if props.payment_intent || props.setup_intent do
      conn
      |> assign(:props, props)
      |> assign(:view, "finalize")
      |> render(:index)
    else
      redirect(conn, external: billing_url(conn))
    end
  end

  def props(conn, _params) do
    customer = conn.assigns.customer

    conn |> json(%{props: get_props(conn, customer)})
  end

  defp get_props(conn, customer) do
    subscription = Customers.subscription(customer)
    bankroll = conn.assigns.bankroll

    %{
      payment_method: get_payment_method(customer),
      subscription: subscription,
      grace_period: if(subscription, do: Subscriptions.grace_period?(subscription), else: nil),
      canceled: if(subscription, do: Subscriptions.canceled?(subscription), else: nil),
      recurring: if(subscription, do: Subscriptions.recurring?(subscription), else: nil),
      plans: conn.assigns.bankroll.plans(),
      base_url: billing_url(conn),
      finalize_url: finalize_url(conn),
      fix_subscription_url: fix_subscription_url(conn, subscription),
      payment_intent: maybe_get_payment_intent(conn, conn.assigns.customer),
      setup_intent: maybe_get_setup_intent(conn, conn.assigns.customer),
      on_trial: if(subscription, do: Subscriptions.trial?(subscription), else: nil),
      trial_ends_at:
        if(subscription && subscription.trial_ends_at,
          do: subscription.trial_ends_at |> DateTime.to_date(),
          else: nil
        ),
      customer_id: conn.params["customer_id"],
      customer_type: conn.params["customer_type"],
      current_user_id: bankroll.user_id_from_conn(conn)
    }
  end

  defp fix_subscription_url(conn, %{stripe_id: id}) when not is_nil(id) do
    # get last invoice and payment intent, return finalize url with payment intent id
    {:ok, stripe_subscription} =
      Stripe.Subscription.retrieve(id, expand: ["latest_invoice.payment_intent"])

    case stripe_subscription do
      %{status: "past_due"} ->
        url = finalize_url(conn)
        "#{url}?payment_intent=#{stripe_subscription.latest_invoice.payment_intent.id}"

      _ ->
        nil
    end
  end

  defp fix_subscription_url(_, _), do: nil

  defp maybe_get_setup_intent(conn, customer) do
    id = Map.get(conn.params, "setup_intent")

    with id when not is_nil(id) <- id,
         {:ok, intent} <- Stripe.SetupIntent.retrieve(id, %{}),
         true <- intent.customer == customer.stripe_id do
      Map.take(intent, [:id, :client_secret, :status, :payment_method])
    else
      _ -> nil
    end
  end

  defp maybe_get_payment_intent(conn, customer) do
    id = Map.get(conn.params, "payment_intent")

    with id when not is_nil(id) <- id,
         {:ok, intent} <- Stripe.PaymentIntent.retrieve(id, %{}),
         true <- intent.customer == customer.stripe_id do
      Map.take(intent, [:id, :client_secret, :amount, :currency, :status])
    else
      _ -> nil
    end
  end

  defp finalize_url(conn) do
    customer_type = conn.params["customer_type"]
    customer_id = conn.params["customer_id"]
    router = conn.assigns.route_helpers
    router.bankroll_finalize_url(conn, :finalize, customer_type, customer_id)
  end

  defp billing_url(conn) do
    customer_type = conn.params["customer_type"]
    customer_id = conn.params["customer_id"]
    router = conn.assigns.route_helpers
    router.bankroll_root_url(conn, :index, customer_type, customer_id)
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
    return_url = finalize_url(conn)

    cond do
      subscription && subscription.stripe_price_id == price_id ->
        conn |> json(%{props: get_props(conn, customer)})

      payment? and not subscribed? ->
        subscription_result =
          Customers.create_subscription(customer, price_id,
            return_url: "#{return_url}?price_id=#{price_id}",
            stripe: %{
              trial_period_days: trial_days
            }
          )

        case subscription_result do
          {:error, error} ->
            conn |> json(%{ok: false, message: error.user_message})

          {:requires_action, payment_intent} ->
            conn
            |> json(%{
              payment_intent_id: payment_intent.id,
              client_secret: payment_intent.client_secret
            })

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
