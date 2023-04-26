defmodule Bankroll.Controllers.BillingController do
  alias Billing.Subscriptions
  alias Billing.Customers

  use Phoenix.Controller,
    formats: [:html, :json],
    layouts: [html: Bankroll.Controllers.Layouts]

  plug(:put_root_layout, {Bankroll.Controllers.Layouts, :root})

  def index(conn, _params) do
    customer = conn.assigns.current_user

    conn
    |> assign(:props, get_props(customer))
    |> render(:index)
  end

  defp get_props(customer) do
    subscription = Customers.subscription(customer)

    %{
      payment_method: get_payment_method(customer),
      subscription: subscription,
      grace_period: if(subscription, do: Subscriptions.grace_period?(subscription), else: nil),
      canceled: if(subscription, do: Subscriptions.canceled?(subscription), else: nil),
      recurring: if(subscription, do: Subscriptions.recurring?(subscription), else: nil)
    }
  end

  def get_payment_method(%{payment_id: nil}), do: nil

  def get_payment_method(customer),
    do: Map.take(customer, [:payment_id, :payment_type, :payment_last_four])

  def setup_payment(conn, _params) do
    intent = Billing.Customers.create_setup_intent(conn.assigns.current_user)

    conn |> json(%{client_secret: intent.client_secret})
  end

  def store_payment(conn, params) do
    customer =
      conn.assigns.current_user
      |> Billing.Customers.update_default_payment_method(params["payment_method_id"])

    conn |> json(%{props: get_props(customer)})
  end

  def store_subscription(conn, params) do
    price_id = params["price_id"]
    customer = conn.assigns.current_user
    payment? = Customers.has_default_payment_method?(customer)
    subscribed? = Customers.subscribed?(customer)
    subscription = Customers.subscription(customer)

    cond do
      subscription && subscription.stripe_price_id == price_id ->
        nil

      payment? and not subscribed? ->
        Customers.create_subscription(customer, price_id)

      payment? and subscribed? ->
        Subscriptions.update(subscription, price_id)

      not payment? and not subscribed? ->
        # create incomplete subscription
        # subscription = Customers.create_subscription(customer, price_id)
        # conn |> json(%{client_secret: subscription.latest_invoice.payment_intent.client_secret})
        nil
    end

    conn |> json(%{props: get_props(customer)})
  end

  def cancel_subscription(conn, _params) do
    customer = conn.assigns.current_user
    subscription = Customers.subscription(customer)

    if subscription do
      Subscriptions.cancel!(subscription)
    end

    conn |> json(%{props: get_props(customer)})
  end

  def resume_subscription(conn, _params) do
    customer = conn.assigns.current_user
    subscription = Customers.subscription(customer)

    if subscription && Subscriptions.canceled?(subscription) &&
         Subscriptions.grace_period?(subscription) do
      Subscriptions.resume(subscription)
    end

    conn |> json(%{props: get_props(customer)})
  end
end
