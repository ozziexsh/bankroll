# Bankroll

## Installation

Scaffold a new phoenix app with authentication:

```shell
mix phx.new my_app
cd my_app
mix phx.gen.auth Accounts User users
```

Purchase a license at https://bankroll.ozzie.sh

Download the latest release and extract the contents into a folder called `bankroll` in your project folder:

```shell
# in ./my_app
mkdir bankroll
tar -xvf bankroll-x.x.x.tar.gz -C ./bankroll
```

Add the dependencies to your mix file:

```elixir
defp deps do
  [
    {:stripity_stripe, "~> 2.17"},
    {:bling, "~> 0.4.0"},
    {:bankroll, path: "./bankroll"}
  ]
end
```

Install the dependencies:

```shell
mix deps.get
```

> Note: If your mix.exs file shows an error in your editor after installing the dependencies, restart your elixir language server.

Follow the steps to install the Bling module:

[https://hexdocs.pm/bling](https://hexdocs.pm/bling)

Run the bankroll install command to create the required files and copy over assets:

```shell
mix bankroll.install
```

Open up your router file and add the bankroll route right after the one installed with Bling:

```elixir
defmodule MyAppWeb.Router do
  import Bankroll.Router

  # ... your routes

  scope "/" do
    pipe_through [:browser, :require_authenticated_user]

    bling_routes()
    bankroll_routes()
  end
end
```

Now we need to configure the modules and plans in `config/config.exs`.

You can read more about [Plan Configuration](#plan-configuration) below.

```elixir
config :bankroll,
  bling: MyApp.Bling,
  bankroll: MyApp.Bankroll,
  company_name: "Acme Co",
  plans: [
    %{
      title: "Plus",
      description: "Our most popular plan. Good for passing text back and forth.",
      features: [
        "Unlimited devices"
      ],
      trial_days: 7,
      prices: %{
        monthly: %{id: "price_1234", price: "$5"},
        yearly: %{id: "price_1234", price: "$50"}
      }
    },
    %{
      title: "Pro",
      description: "For users that would like to share files between devices.",
      features: [
        "Unlimited devices",
        "Media Uploads"
      ],
      prices: %{
        monthly: %{id: "price_1234", price: "$10"},
        yearly: %{id: "price_1234", price: "$100"}
      }
    }
  ]
```

Open up your `lib/my_app/bling.ex` file and configure who can access the billing portal:

```elixir
defmodule MyApp.Bling do
  # ...

  def can_manage_billing?(conn, customer) do
    conn.assigns.current_user.id == customer.id
  end
end
```

You can now link users to the billing portal from your app:

```elixir
~p"/billing/user/#{@current_user.id}"
```

## Deploying

The `mix bankroll.install` command should only be ran once.

When you are deploying, you should either commit the assets in `priv/static/assets/bankroll` or run the `mix bankroll.assets` command during deployment to ensure the required js/css is present.

You can either commit the local `./bankroll` folder you extracted, or git ignore it and ensure you extract it to that location during each deployment.

## Updating

When new releases are uploaded to the website, you can download the latest release and replace the files in your local `bankroll` folder with the new release. Read the release notes to see any specific commands that need to be ran.

## Plan configuration

Plans are defined in the `:bankroll` configuration under the `:plans` key.

They can have the following properties:

- `title` - the plan title shown to the user
- `description` - a brief sentence or two to describe who the plan is for or its selling points
- `features` - an array of strings representing what is included in the plan
- `trial_days` - (optional) how many trial days to give the user for this plan
- `prices`
  - `monthly`
    - `id` - the stripe price id for the monthly cycle
    - `price` - a string representation of the price, like `$10`
  - `yearly`
    - `id` - the stripe price id for the yearly cycle
    - `price` - a string representation of the price, like `$100`

```elixir
config :bankroll, plans: [
  %{
    title: "Plus",
    description: "Our most popular plan. Good for passing text back and forth.",
    features: [
      "Unlimited devices"
    ],
    trial_days: 7,
    prices: %{
      monthly: %{id: "price_1234", price: "$5"},
      yearly: %{id: "price_1234", price: "$50"}
    }
  },
  %{
    title: "Pro",
    description: "For users that would like to share files between devices.",
    features: [
      "Unlimited devices",
      "Media Uploads"
    ],
    prices: %{
      monthly: %{id: "price_1234", price: "$10"},
      yearly: %{id: "price_1234", price: "$100"}
    }
  }
]
```

## Restricting plans

If you'd like to restrict a user from changing to a plan, you can implement the `can_subscribe_to_plan?/2` function. It should either return `:ok` or `{:error, "reason"}`. This can be useful if you want to prevent the user from downgrading to a lower plan if they need to prune something first.

```elixir
defmodule MyApp.Bankroll do
  # ...

  def can_subscribe_to_plan?(customer, plan) do
    sites = MyApp.Accounts.sites(customer)

    if plan[:title] == "Plus" && Enum.count(sites) >= 10 do
      {:error, "You must delete some sites first"}
    else
      :ok
    end
  end
end
```

## Linking to the portal

> Note: Linking to the portal will create the customer in stripe if it does not exist already.

You can link to the portal using either a route helper or verified routes:

```elixir
path = MyAppWeb.Router.Helpers.bankroll_root_path(MyAppWeb.Endpoint, :index, "user", current_user.id)

path = ~p"/billing/user/#{current_user.id}"
```

## Portal authorization

You can choose who has access to the billing portal by implementing `can_manage_billing?` in your Bling module.

Note that the `customer` is not the logged in user but is resolved based on the url like `/billing/user/4` or `/billing/team/2`. You should use the `conn` to derive the logged in user to see if they can manage billing for the provided `customer`.

```elixir
defmodule MyApp.Bling do
  # ...

  def can_manage_billing?(conn, customer) do
    user = conn.assigns.current_user

    case customer do
      %MyApp.Accounts.User{} ->
        customer.id == user.id

      # %MyApp.Accounts.Team{} -> customer.id == user.team_id
      _ ->
        false
    end
  end
end
```

## Payment failure emails

You should set up payment failure emails as per the Bling docs to notify your users when their subscription payments fail:

https://hexdocs.pm/bling/readme.html#payment-failure-notifications
