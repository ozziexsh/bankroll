defmodule Bankroll.Plug do
  @behaviour Plug

  @impl true
  def init(opts) do
    %{bankroll: opts[:bankroll]}
  end

  @impl true
  def call(conn, opts) do
    Plug.Conn.assign(conn, :bankroll, opts[:bankroll])
  end
end
