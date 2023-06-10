defmodule Bankroll.Controllers.BillingController do
  alias Bling.Subscriptions
  alias Bling.Customers

  use Phoenix.Controller,
    formats: [:html, :json],
    layouts: [html: Bankroll.Controllers.Layouts]

  plug(Bling.Plugs.AssignCustomer)

  def index(conn, params) do
    if Map.has_key?(params, "session_id") do
      conn
      |> handle_checkout_session(params["session_id"])
      |> redirect(external: billing_url(conn))
    else
      conn
      |> assign(:props, get_props(conn))
      |> render(:index)
    end
  end

  def props(conn, _params) do
    conn |> json(%{props: get_props(conn)})
  end

  def checkout_url(conn, params) do
    bankroll = Bankroll.bankroll()
    plan = Bankroll.plan_from_price_id(params["price_id"])
    previous_subscription = Customers.subscription(conn.assigns.customer)
    trial_days = plan[:trial_days]
    customer = conn.assigns.customer

    can_subscribe =
      Bling.Util.maybe_call({bankroll, :can_subscribe_to_plan?, [customer, plan]}, :ok)

    if can_subscribe == :ok do
      stripe = %{
        success_url: "#{billing_url(conn)}?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: billing_url(conn)
      }

      # prevent trial abuse by not letting prev subscribed people
      # keep signing up for trials and then cancelling
      stripe =
        if trial_days && !previous_subscription,
          do: Map.merge(stripe, %{subscription_data: %{trial_period_days: trial_days}}),
          else: stripe

      url =
        Customers.subscription_checkout_url(conn.assigns.customer,
          prices: [{params["price_id"], 1}],
          stripe: stripe
        )

      conn |> json(%{url: url})
    else
      {:error, reason} = can_subscribe
      conn |> json(%{ok: false, message: reason})
    end
  end

  def setup_intent_url(conn, _params) do
    {:ok, intent} =
      Stripe.Session.create(%{
        customer: conn.assigns.customer.stripe_id,
        mode: "setup",
        success_url: "#{billing_url(conn)}?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: billing_url(conn),
        payment_method_types: ["card"]
      })

    conn |> json(%{url: intent.url})
  end

  def store_subscription(conn, params) do
    price_id = params["price_id"]
    customer = conn.assigns.customer
    subscribed? = Customers.subscribed?(customer)
    subscription = Customers.subscription(customer)
    plan = Bankroll.plan_from_price_id(price_id)
    bankroll = Bankroll.bankroll()

    can_subscribe =
      Bling.Util.maybe_call({bankroll, :can_subscribe_to_plan?, [customer, plan]}, :ok)

    cond do
      can_subscribe != :ok ->
        {:error, reason} = can_subscribe
        conn |> json(%{ok: false, message: reason})

      subscribed? ->
        prices = [{price_id, 1}]
        Subscriptions.change_prices(subscription, prices: prices)
        conn |> json(%{props: get_props(conn)})

      true ->
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

  defp handle_checkout_session(conn, session_id) do
    result = Stripe.Session.retrieve(session_id, expand: ["setup_intent", "subscription"])

    case result do
      {:ok, %{status: "complete", mode: "setup"} = intent} ->
        maybe_update_payment(conn, intent.setup_intent.payment_method)

      {:ok, %{status: "complete", mode: "subscription"} = intent} ->
        # the user could have changed their payment method during checkout
        maybe_update_payment(conn, intent.subscription.default_payment_method)

      _ ->
        conn
    end
  end

  defp maybe_update_payment(conn, payment_method) do
    Bling.Customers.update_default_payment_method(
      conn.assigns.customer,
      payment_method
    )

    subscription = Customers.subscription(conn.assigns.customer)

    if !!subscription and not Subscriptions.ended?(subscription) do
      Stripe.Subscription.update(subscription.stripe_id, %{
        default_payment_method: payment_method
      })
    end

    conn
  end

  defp get_props(conn) do
    customer = conn.assigns.customer
    subscription = Customers.subscription(customer)
    bankroll = Bankroll.bankroll()

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
      plans: Bankroll.plans(),
      base_url: billing_url(conn),
      finalize_url: finalize_url(conn),
      fix_subscription_url: fix_subscription_url(conn, subscription),
      customer_id: conn.params["customer_id"],
      customer_type: conn.params["customer_type"],
      # current_user_id: bankraoll.user_id_from_conn(conn),
      current_user_id: nil,
      customer_display_name: bankroll.customer_display_name(customer),
      company_display_name: Bankroll.company_name()
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
    router.bling_finalize_url(conn, :finalize, customer_type, customer_id)
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
          :stripe_status,
          :customer_id,
          :customer_type
        ])

      items =
        if(is_list(subscription.subscription_items),
          do:
            Enum.map(subscription.subscription_items, fn item ->
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
