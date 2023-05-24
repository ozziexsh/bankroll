# Bankroll

## Installation

Scaffold a new phoenix app with authentication:

```shell
mix phx.new demo
cd demo
mix phx.gen.auth Accounts User users
```

Purchase a license at https://bankroll.ozzie.sh

Download the latest release and extract the contents into a folder called `bankroll` in your project folder:

```shell
tar -xvf bankroll-v-xxx.tar.gz
mv bankroll-v-xxx bankroll
```

Add the dependencies to your mix file:

```elixir
defp deps do
  [
    {:stripity_stripe, "~> 2.17"},
    {:bling, "~> 0.1.0"},
    {:bankroll, path: "./bankroll"}
  ]
end
```

Install the dependencies:

```shell
mix deps.get
```

Follow the steps to install the Bling module:

[https://hexdocs.pm/bling](https://hexdocs.pm/bling)

Run the bankroll install command to create the required files and copy over assets:

```shell
mix bankroll.install
```

Open up your router file and add the bankroll plug and route right after the ones installed with Bling:

```elixir
defmodule DemoWeb.Router do
  import Bankroll.Router

  pipeline :browser do
    # ... rest of plugs
    plug Bling.Plug, bling: Demo.Bling
    plug Bankroll.Plug, bankroll: Demo.Bankroll
  end

  # ... your routes

  scope "/" do
    pipe_through [:browser, :require_authenticated_user]

    bling_routes()
    bankroll_routes()
  end
end
```

That's it!

Make sure to read about [Plan Configuration](#plan-configuration) to set up your stripe price ids so your plans properly display.

See the section below on linking to the portal to view the billing portal.

## Deploying

The `mix bankroll.install` command should only be ran once.

When you are deploying, you should either commit the assets in `priv/static/assets/bankroll` or run the `mix bankroll.assets` command during deployment to ensure the required js/css is present.

## Updating

When new releases are uploaded to the website, you can download the latest release and replace the files in your local `bankroll` folder with the new release. Read the release notes to see any specific commands that need to be ran.

## Plan configuration

Plans can be configured in your bankroll module.

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
defmodule Demo.Bankroll do
  # ...

  def plans() do
    [
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
  end
end
```

## Restricting plans

If you'd like to restrict a user from changing to a plan, you can implement the `can_subscribe_to_plan?/2` function. It should either return `:ok` or `{:error, "reason"}`. This can be useful if you want to prevent the user from downgrading to a lower plan if they need to prune something first.

```elixir
defmodule Demo.Bankroll do
  # ...

  def can_subscribe_to_plan?(customer, plan) do
    sites = Demo.Accounts.sites(customer)

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
path = DemoWeb.Router.Helpers.bankroll_root_path(DemoWeb.Endpoint, :index, "user", current_user.id)

path = ~p"/billing/user/#{current_user.id}"
```

## Portal authorization

You can choose who has access to the billing portal by implementing `can_manage_billing?` in your Bling module.

Note that the `customer` is not the logged in user but is resolved based on the url like `/billing/user/4` or `/billing/team/2`. You should use the `conn` to derive the logged in user to see if they can manage billing for the provided `customer`.

```elixir
defmodule Demo.Bling do
  # ...

  def can_manage_billing?(conn, customer) do
    user = conn.assigns.current_user

    case customer do
      %Demo.Accounts.User{} ->
        customer.id == user.id

      # %Demo.Accounts.Team{} -> customer.id == user.team_id
      _ ->
        false
    end
  end
end
```

## Payment failure emails

You should set up payment failure emails as per the Bling docs to notify your users when their subscription payments fail:

https://hexdocs.pm/bling/readme.html#payment-failure-notifications
