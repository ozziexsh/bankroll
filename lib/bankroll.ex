defmodule Bankroll do
  @type customer :: any
  @type plan :: any

  @callback customer_display_name(customer) :: binary
  @callback can_subscribe_to_plan?(customer, plan) :: boolean

  def bling do
    Application.get_env(:bankroll, :bling)
  end

  def bankroll do
    Application.get_env(:bankroll, :bankroll)
  end

  def plans do
    Application.get_env(:bankroll, :plans, [])
  end

  def company_name do
    Application.get_env(:bankroll, :company_name, "")
  end

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
