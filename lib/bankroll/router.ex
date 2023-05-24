defmodule Bankroll.Router do
  defmacro bankroll_routes(path \\ "/billing") do
    quote do
      pipeline :bankroll_portal do
        plug(:put_root_layout, {Bankroll.Controllers.Layouts, :root})
      end

      Phoenix.Router.scope unquote(path), as: false, alias: false do
        Phoenix.Router.scope "/:customer_type/:customer_id" do
          pipe_through([:bankroll_portal])

          opts = [
            assigns: %{route_helpers: __MODULE__.Helpers}
          ]

          Phoenix.Router.get(
            "/",
            Bankroll.Controllers.BillingController,
            :index,
            Keyword.merge(opts, as: :bankroll_root)
          )

          Phoenix.Router.get(
            "/props",
            Bankroll.Controllers.BillingController,
            :props,
            opts
          )

          Phoenix.Router.post(
            "/setup-payment",
            Bankroll.Controllers.BillingController,
            :setup_payment,
            opts
          )

          Phoenix.Router.post(
            "/subscriptions",
            Bankroll.Controllers.BillingController,
            :store_subscription,
            opts
          )

          Phoenix.Router.delete(
            "/subscriptions",
            Bankroll.Controllers.BillingController,
            :cancel_subscription,
            opts
          )

          Phoenix.Router.post(
            "/subscriptions/resume",
            Bankroll.Controllers.BillingController,
            :resume_subscription,
            opts
          )

          Phoenix.Router.get(
            "/invoices",
            Bankroll.Controllers.BillingController,
            :list_invoices,
            opts
          )
        end
      end
    end
  end
end
