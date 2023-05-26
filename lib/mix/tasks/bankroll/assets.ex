defmodule Mix.Tasks.Bankroll.Assets do
  @moduledoc """
  Copies required Bankroll js/css
  """
  @shortdoc ""

  use Mix.Task

  def run(_) do
    project_directory = Mix.Project.build_path() |> String.split("_build") |> List.first()
    dep_directory = Path.join([project_directory, "bankroll"])
    stub_path = Path.join([dep_directory, "priv/static/assets"])

    final_path =
      Path.join([
        project_directory,
        "priv/static/assets/bankroll"
      ])

    File.mkdir(final_path)

    Mix.Generator.copy_file(
      Path.join([stub_path, "bankroll.js"]),
      Path.join([final_path, "bankroll.js"])
    )

    Mix.Generator.copy_file(
      Path.join([stub_path, "style.css"]),
      Path.join([final_path, "style.css"])
    )
  end
end
