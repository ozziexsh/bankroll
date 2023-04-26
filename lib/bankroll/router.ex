defmodule Bankroll.Router do
  defmacro billing_route(path \\ "/billing", _opts \\ []) do
    quote do
      Phoenix.Router.scope unquote(path), as: false, alias: false do
        Phoenix.Router.get("/", Bankroll.Controllers.BillingController, :index)

        Phoenix.Router.post(
          "/setup-payment",
          Bankroll.Controllers.BillingController,
          :setup_payment
        )

        Phoenix.Router.post(
          "/store-payment",
          Bankroll.Controllers.BillingController,
          :store_payment
        )

        Phoenix.Router.post(
          "/subscriptions",
          Bankroll.Controllers.BillingController,
          :store_subscription
        )

        Phoenix.Router.delete(
          "/subscriptions",
          Bankroll.Controllers.BillingController,
          :cancel_subscription
        )

        Phoenix.Router.post(
          "/subscriptions/resume",
          Bankroll.Controllers.BillingController,
          :resume_subscription
        )
      end
    end
  end
end
