defmodule Bankroll do
  defmacro __using__(opts) do
    quote do
      @bling unquote(opts[:bling])

      @before_compile unquote(__MODULE__)
    end
  end

  defmacro __before_compile__(_env) do
    quote do
      def bling, do: @bling

      def plan_from_price_id(price_id) do
        Enum.find_value(plans(), fn plan ->
          plan.prices
          |> Map.values()
          |> Enum.find_value(fn price ->
            if price.id == price_id, do: plan, else: nil
          end)
        end)
      end
    end
  end
end
