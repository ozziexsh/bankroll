defmodule Bankroll do
  defmacro __using__(opts) do
    quote do
      @billing unquote(opts[:billing])

      @before_compile unquote(__MODULE__)
    end
  end

  defmacro __before_compile__(_env) do
    quote do
      def billing, do: @billing
    end
  end
end
