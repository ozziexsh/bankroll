defmodule Bankroll.MixProject do
  use Mix.Project

  def project do
    [
      app: :bankroll,
      version: "0.4.0",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      description: "A billing portal UI built on top of Bling",
      package: [
        licenses: [],
        links: %{"Home" => "https://bankroll.ozzie.sh"},
        files: ~w(priv lib stubs mix.exs README.md .formatter.exs)
      ],
      docs: [
        main: "readme",
        extras: ["README.md"]
      ]
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:ecto_sql, "~> 3.6"},
      {:phoenix, "~> 1.7.2"},
      {:plug, "~> 1.14"},
      {:stripity_stripe, "~> 2.17"},
      {:phoenix_live_view, "~> 0.20"},
      {:bling, "~> 0.4.0"}
    ]
  end
end
