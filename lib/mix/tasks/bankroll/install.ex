defmodule Mix.Tasks.Bankroll.Install do
  @moduledoc "Printed when the user requests `mix help echo`"
  @shortdoc "Echoes arguments"

  use Mix.Task

  def run(_) do
    project_directory = Mix.Project.build_path() |> String.split("_build") |> List.first()
    dep_directory = Path.join([project_directory, "bankroll"])
    # trim elixir. from the module name
    module_name = Mix.Project.get() |> to_string() |> String.split(".") |> Enum.at(1)

    copy_bankroll_module(project_directory, dep_directory, module_name)
    copy_assets(project_directory, dep_directory)
  end

  defp copy_bankroll_module(project_directory, dep_directory, module_name) do
    stub_path = Path.join([dep_directory, "stubs/bankroll.ex.stub"])

    module_folder = get_module_folder(module_name)

    final_path =
      Path.join([
        project_directory,
        "lib/#{module_folder}/bankroll.ex"
      ])

    Mix.Generator.copy_template(stub_path, final_path, module_name: module_name)

    Mix.Shell.IO.info("Created file: #{final_path}")
  end

  defp copy_assets(project_directory, dep_directory) do
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

    Mix.Shell.IO.info("Copied assets to: #{final_path}")
  end

  defp get_module_folder(module_name) do
    module_name
    |> Macro.underscore()
    |> String.downcase()
  end
end
