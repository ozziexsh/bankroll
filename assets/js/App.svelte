<script lang="ts">
  import { api } from './api';
  import Button from './components/button.svelte';
  import Modal from './components/modal.svelte';
  import PaymentCard from './components/payment_card.svelte';
  import PlanCard from './components/plan_card.svelte';
  import Toggle from './components/toggle.svelte';
  import { props } from './store';
  import type { Props } from './store';

  export let _props: Props;

  $props = _props;

  let modal_visible = false;
  let monthly = true;

  let plans = [
    {
      title: 'Plus',
      description:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur fugiat eaque ut velit, suscipit quis ad quaerat temporibus repellat nobis incidunt libero voluptas quibusdam dolores est aliquid. Quae, aliquid illo.',
      features: ['Unlimited devices'],
      prices: {
        monthly: { id: 'price_1My2srIZboGRpxvjFL3TgK7Y', price: '$5 / month' },
        yearly: { id: 'price_1My2srIZboGRpxvjOQDgw6nz', price: '$50 / year' },
      },
    },
    {
      title: 'Pro',
      description:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur fugiat eaque ut velit, suscipit quis ad quaerat temporibus repellat nobis incidunt libero voluptas quibusdam dolores est aliquid. Quae, aliquid illo.',
      features: ['Unlimited devices', 'Media uploads'],
      prices: {
        monthly: { id: 'price_1My2tIIZboGRpxvjesJNyWBE', price: '$10 / month' },
        yearly: { id: 'price_1My2tIIZboGRpxvj2jlkRt3i', price: '$100 / year' },
      },
    },
  ];

  async function onPlanSelected(plan: any) {
    if (!$props.payment_method) {
      return;
    }

    const response = await api
      .url('/billing/subscriptions')
      .post({
        price_id: monthly ? plan.prices.monthly.id : plan.prices.yearly.id,
      })
      .json<{
        props: Props;
      }>();

    $props = response.props;
  }

  async function cancelSubscription() {
    const response = await api
      .url('/billing/subscriptions')
      .delete()
      .json<{ props: Props }>();
    $props = response.props;
  }

  async function resumeSubscription() {
    const response = await api
      .url('/billing/subscriptions/resume')
      .post()
      .json<{ props: Props }>();
    $props = response.props;
  }
</script>

<div class="p-12">
  <div class="flex items-start space-x-6">
    <div class="w-1/3">
      <PaymentCard bind:payment_method={$props.payment_method} />
    </div>

    <div class="flex-1">
      <div class="space-y-6">
        <div class="border-b border-gray-200 pb-5">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Plans</h3>
        </div>

        {#if !$props.subscription}
          <div class="rounded-md bg-yellow-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-yellow-800">
                  You are not subscribed to a plan
                </h3>
                <div class="mt-2 text-sm text-yellow-700">
                  <p>Select a plan from the list below</p>
                </div>
              </div>
            </div>
          </div>
        {/if}

        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <span>Yearly</span>
            <Toggle bind:enabled={monthly} />
            <span>Monthly</span>
          </div>
          {#each plans as plan}
            <PlanCard {plan} {monthly}>
              {#if $props.subscription?.stripe_price_id === (monthly ? plan.prices.monthly.id : plan.prices.yearly.id)}
                {#if $props.grace_period}
                  <Button on:click={resumeSubscription}
                    >Resume Subscription</Button
                  >
                {/if}
                {#if $props.recurring}
                  <Button type="button" on:click={() => cancelSubscription()}>
                    Cancel Subscription
                  </Button>
                {/if}
              {:else}
                <Button type="button" on:click={() => onPlanSelected(plan)}>
                  {$props.subscription ? 'Change Plan' : 'Subscribe'}
                </Button>
              {/if}
            </PlanCard>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <Modal visible={modal_visible} on:close={() => (modal_visible = false)} />
</div>
