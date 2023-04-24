defmodule BankrollTest do
  use ExUnit.Case
  doctest Bankroll

  test "greets the world" do
    assert Bankroll.hello() == :world
  end
end
