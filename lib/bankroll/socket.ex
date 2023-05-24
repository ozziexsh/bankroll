defmodule Bankroll.Socket do
  @moduledoc false

  use Phoenix.Socket

  defmacro __using__(opts \\ []) do
    path = Keyword.get(opts, :path, "/bankroll-socket")
    bankroll = Keyword.get(opts, :bankroll)

    quote do
      socket(unquote(path), unquote(__MODULE__),
        websocket: [connect_info: [bankroll: unquote(bankroll)]]
      )
    end
  end

  channel("bankroll:*", Bankroll.Channel)

  def connect(params, socket, connect_info) do
    bankroll = connect_info[:bankroll]
    user_id = params["current_user_id"]
    current_user = bankroll.user_from_id(user_id)

    socket =
      socket
      |> assign(:current_user, current_user)
      |> assign(:bankroll, bankroll)

    {:ok, socket}
  end

  def id(_socket), do: nil
end
