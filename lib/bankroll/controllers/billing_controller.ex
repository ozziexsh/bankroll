defmodule Bankroll.Controllers.BillingController do
  alias Billing.Subscriptions
  alias Billing.Customers

  use Phoenix.Controller,
    formats: [:html, :json],
    layouts: [html: Bankroll.Controllers.Layouts]

  plug(Billing.Plugs.AssignCustomer)

  def index(conn, _params) do
    conn
    |> assign(:props, get_props(conn))
    |> render(:index)
  end

  def props(conn, _params) do
    conn |> json(%{props: get_props(conn)})
  end

  def setup_payment(conn, _params) do
    intent = Billing.Customers.create_setup_intent(conn.assigns.customer)

    conn |> json(%{client_secret: intent.client_secret})
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
    bankroll = conn.assigns.bankroll
    repo = bankroll.billing.repo()
    exported? = Kernel.function_exported?(bankroll, :can_subscribe_to_plan?, 2)

    can_subscribe =
      if exported? do
        bankroll.can_subscribe_to_plan?(customer, plan)
      else
        :ok
      end

    cond do
      can_subscribe != :ok ->
        {:error, reason} = can_subscribe
        conn |> json(%{ok: false, message: reason})

      subscription && Subscriptions.ended?(subscription) ->
        # delete old subscription, create new one without trial
        items = Subscriptions.subscription_items(subscription)
        items |> Enum.each(fn item -> repo.delete(item) end)
        repo.delete(subscription)

        create_subscription(conn, customer, price_id,
          return_url: "#{return_url}?price_id=#{price_id}"
        )

      subscription && subscription.stripe_price_id == price_id ->
        conn |> json(%{props: get_props(conn)})

      payment? and not subscribed? ->
        create_subscription(conn, customer, price_id,
          return_url: "#{return_url}?price_id=#{price_id}",
          stripe: %{
            trial_period_days: trial_days
          }
        )

      payment? and subscribed? ->
        prices = Keyword.put([], price_id, 1)
        Subscriptions.change_prices(subscription, prices: prices)
        conn |> json(%{props: get_props(conn)})

      not payment? and not subscribed? ->
        # create incomplete subscription
        # subscription = Customers.create_subscription(customer, price_id)
        # conn |> json(%{client_secret: subscription.latest_invoice.payment_intent.client_secret})
        conn |> json(%{props: get_props(conn)})
    end
  end

  def cancel_subscription(conn, _params) do
    customer = conn.assigns.customer
    subscription = Customers.subscription(customer)

    if subscription do
      Subscriptions.cancel(subscription)
    end

    conn |> json(%{props: get_props(conn)})
  end

  def resume_subscription(conn, _params) do
    customer = conn.assigns.customer
    subscription = Customers.subscription(customer)

    if subscription && Subscriptions.canceled?(subscription) &&
         Subscriptions.grace_period?(subscription) do
      Subscriptions.resume(subscription)
    end

    conn |> json(%{props: get_props(conn)})
  end

  def list_invoices(conn, _params) do
    customer = conn.assigns.customer

    invoices =
      Customers.invoices(customer)
      |> Enum.map(fn invoice ->
        %{
          hosted_invoice_url: invoice.hosted_invoice_url,
          created: invoice.created |> DateTime.from_unix!() |> DateTime.to_date(),
          total: invoice.total,
          currency: invoice.currency,
          status: invoice.status
        }
      end)

    conn |> json(%{invoices: invoices})
  end

  defp create_subscription(conn, customer, price_id, opts) do
    prices = Keyword.put([], price_id, 1)

    subscription_result =
      Customers.create_subscription(customer, Keyword.put(opts, :prices, prices))

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
        conn |> json(%{props: get_props(conn)})
    end
  end

  defp get_props(conn) do
    customer = conn.assigns.customer
    subscription = Customers.subscription(customer)
    bankroll = conn.assigns.bankroll

    %{
      payment_method: get_payment_method(customer),
      subscription: prepare_subscription(subscription),
      valid: if(subscription, do: Subscriptions.valid?(subscription), else: nil),
      grace_period: if(subscription, do: Subscriptions.grace_period?(subscription), else: nil),
      ended: if(subscription, do: Subscriptions.ended?(subscription), else: nil),
      canceled: if(subscription, do: Subscriptions.canceled?(subscription), else: nil),
      recurring: if(subscription, do: Subscriptions.recurring?(subscription), else: nil),
      on_trial: if(subscription, do: Subscriptions.trial?(subscription), else: nil),
      trial_ends_at:
        if(subscription && subscription.trial_ends_at,
          do: subscription.trial_ends_at |> DateTime.to_date(),
          else: nil
        ),
      plans: conn.assigns.bankroll.plans(),
      base_url: billing_url(conn),
      finalize_url: finalize_url(conn),
      fix_subscription_url: fix_subscription_url(conn, subscription),
      customer_id: conn.params["customer_id"],
      customer_type: conn.params["customer_type"],
      current_user_id: bankroll.user_id_from_conn(conn),
      customer_display_name: bankroll.customer_display_name(customer),
      company_display_name: bankroll.company_name()
    }
  end

  defp fix_subscription_url(conn, %{stripe_id: id}) when not is_nil(id) do
    # get last invoice and payment intent, return finalize url with payment intent id
    {:ok, stripe_subscription} =
      Stripe.Subscription.retrieve(id, expand: ["latest_invoice.payment_intent"])

    case stripe_subscription do
      %{status: status} when status in ["past_due", "incomplete"] ->
        url = finalize_url(conn)
        "#{url}?payment_intent=#{stripe_subscription.latest_invoice.payment_intent.id}"

      _ ->
        nil
    end
  end

  defp fix_subscription_url(_, _), do: nil

  defp finalize_url(conn) do
    customer_type = conn.params["customer_type"]
    customer_id = conn.params["customer_id"]
    router = conn.assigns.route_helpers
    router.billing_finalize_url(conn, :finalize, customer_type, customer_id)
  end

  defp billing_url(conn) do
    customer_type = conn.params["customer_type"]
    customer_id = conn.params["customer_id"]
    router = conn.assigns.route_helpers
    router.bankroll_root_url(conn, :index, customer_type, customer_id)
  end

  defp get_payment_method(%{payment_id: nil}), do: nil

  defp get_payment_method(customer),
    do: Map.take(customer, [:payment_id, :payment_type, :payment_last_four])

  defp prepare_subscription(subscription) do
    if subscription do
      bare =
        Map.take(subscription, [
          :name,
          :ends_at,
          :trial_ends_at,
          :stripe_id,
          :stripe_price_id,
          :stripe_status,
          :quantity,
          :customer_id,
          :customer_type
        ])

      items =
        if(is_list(subscription.items),
          do:
            Enum.map(subscription.items, fn item ->
              Map.take(item, [:stripe_id, :stripe_price_id, :stripe_product_id, :quantity])
            end),
          else: []
        )

      Map.merge(bare, %{subscription_items: items})
    else
      nil
    end
  end
end
