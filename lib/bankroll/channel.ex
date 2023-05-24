defmodule Bankroll.Channel do
  @moduledoc false

  use Phoenix.Channel

  def join(room, _payload, socket) do
    [_, customer_type, customer_id] = String.split(room, ":")

    bankroll = socket.assigns.bankroll
    bling = bankroll.bling()
    repo = bling.repo()
    authorize = &bankroll.can_manage_billing?/2

    with schema when not is_nil(schema) <- bling.module_from_customer_type(customer_type),
         customer when not is_nil(customer) <- repo.get_by(schema, id: customer_id),
         {:auth, true} <- {:auth, authorize.(socket, customer)} do
      {:ok, socket}
    else
      _ ->
        {:error, %{reason: "unauthorized"}}
    end
  end
end
