<script lang="ts">
  import { onMount } from 'svelte';
  import { api } from './api';
  import Button from './components/button.svelte';
  import PaymentCard from './components/payment_card.svelte';
  import PlanCard from './components/plan_card.svelte';
  import SetupPaymentModal from './components/setup_payment_modal.svelte';
  import Toggle from './components/toggle.svelte';
  import { props } from './store';
  import type { Invoice, Plan, Props } from './types';
  import { getStripe } from './stripe';
  import Modal from './components/modal.svelte';

  export let _props: Props;

  $props = _props;

  let monthly = true;
  let price_after_payment: string | null = null;
  let payment_modal_visible = false;
  let setup_intent_modal_visible = false;
  let setup_intent_modal_content = '';

  onMount(() => {
    checkForSetupIntent();
    checkForPaymentIntent();
  });

  async function checkForPaymentIntent() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );
    const setupPriceId = new URLSearchParams(window.location.search).get(
      'price_id',
    );
    if (!clientSecret || !setupPriceId) {
      return;
    }
    const stripe = getStripe();
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    if (!paymentIntent) {
      return;
    }
    if (paymentIntent.status !== 'succeeded') {
      setup_intent_modal_content =
        'Could not complete payment. Please try a different payment method.';
      setup_intent_modal_visible = true;
    } else {
      setup_intent_modal_content = 'Payment completed!';
      setup_intent_modal_visible = true;
      // todo: wait for subscription webhook and update props so subscription shows as active
    }
    // remove query params
    window.history.replaceState({}, null, $props.base_url);
  }

  async function checkForSetupIntent() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'setup_intent_client_secret',
    );
    const setupPriceId = new URLSearchParams(window.location.search).get(
      'price_id',
    );
    if (!clientSecret) {
      return;
    }
    const stripe = getStripe();
    const { setupIntent } = await stripe.retrieveSetupIntent(clientSecret);
    if (setupIntent?.status == 'succeeded') {
      // todo: loading, maybe price id, etc
      // todo: don't duplicate logic
      setup_intent_modal_content = 'Payment method added';
      setup_intent_modal_visible = true;

      const response = await api
        .url('/store-payment')
        .post({ payment_method_id: setupIntent.payment_method })
        .json<{ props: Props }>();

      $props = response.props;

      if (setupPriceId) {
        const response = await api
          .url('/subscriptions')
          .post({ price_id: setupPriceId })
          .json<{
            props: Props;
          }>();

        $props = response.props;
      }
    } else if (
      setupIntent?.status == 'requires_payment_method' ||
      setupIntent?.status == 'processing'
    ) {
      // todo: handle processing??
      setup_intent_modal_content =
        'Payment method could not be added. Please try a different payment method.';
      setup_intent_modal_visible = true;
    }
    // remove query params
    window.history.replaceState({}, null, $props.base_url);
  }

  async function onPlanSelected(plan: Plan) {
    const price_id = monthly ? plan.prices.monthly.id : plan.prices.yearly.id;

    if (!$props.payment_method) {
      price_after_payment = price_id;
      payment_modal_visible = true;
      return;
    }

    // todo: loading state

    const response = await api.url('/subscriptions').post({ price_id }).json<{
      props?: Props;
      client_secret?: string;
      message?: string;
    }>();

    if (response.message) {
      setup_intent_modal_content = response.message;
      setup_intent_modal_visible = true;
    } else if (response.client_secret) {
      const stripe = getStripe();
      const { error, setupIntent } = await stripe.handleNextAction({
        clientSecret: response.client_secret,
      });
      // stripe may have redirected to a different url at this point
      if (error) {
        // Display error message in your UI.
        // The card was declined (i.e. insufficient funds, card has expired, etc)
        setup_intent_modal_content =
          'Payment method could not be added. Please try a different payment method.';
        setup_intent_modal_visible = true;
      } else if (setupIntent?.status == 'succeeded') {
        setup_intent_modal_content = 'Payment confirmed successfully';
        setup_intent_modal_visible = true;
      } else if (setupIntent?.status == 'processing') {
        // todo: ???
      }
    } else if (response.props) {
      $props = response.props;
    }
  }

  async function cancelSubscription() {
    const response = await api
      .url('/subscriptions')
      .delete()
      .json<{ props: Props }>();
    $props = response.props;
  }

  async function resumeSubscription() {
    const response = await api
      .url('/subscriptions/resume')
      .post()
      .json<{ props: Props }>();
    $props = response.props;
  }

  function invoices() {
    return api.url('/invoices').get().json<{ invoices: Invoice[] }>();
  }

  function onPaymentModalClose() {
    payment_modal_visible = false;
    price_after_payment = null;
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
        {#if $props.on_trial}
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
                  You are currently on a trial
                </h3>
                <div class="mt-2 text-sm text-yellow-700">
                  <p>
                    <span>It will expire on {$props.trial_ends_at}.</span>
                    {#if $props.grace_period}
                      <span>You can resubscribe by choosing a plan below.</span>
                    {/if}
                  </p>
                </div>
                {#if !$props.grace_period}
                  <div class="mt-4">
                    <div class="-mx-2 -my-1.5 flex">
                      <button
                        type="button"
                        class="rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                        on:click={cancelSubscription}
                      >
                        Cancel Trial
                      </button>
                    </div>
                  </div>
                {:else}{/if}
              </div>
            </div>
          </div>
        {/if}
        <!-- todo: if trial canceled -> resume -->

        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <span>Yearly</span>
            <Toggle bind:enabled={monthly} />
            <span>Monthly</span>
          </div>
          {#each $props.plans as plan}
            <PlanCard {plan} {monthly}>
              {#if $props.subscription?.stripe_price_id === (monthly ? plan.prices.monthly.id : plan.prices.yearly.id)}
                {#if $props.grace_period}
                  <Button on:click={resumeSubscription}>
                    Resume Subscription
                  </Button>
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

        <div class="border-b border-gray-200 pb-5">
          <h3 class="text-base font-semibold leading-6 text-gray-900">
            Invoices
          </h3>
        </div>

        {#await invoices()}
          <p>Loading...</p>
        {:then response}
          <ul class="space-y-4">
            <!-- todo: empty state -->
            {#each response.invoices as invoice}
              <li>
                <a
                  href={invoice.hosted_invoice_url}
                  target="_blank"
                  class="flex items-center space-x-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>

                  <span>{invoice.created}</span>
                </a>
              </li>
            {/each}
          </ul>
        {/await}
      </div>
    </div>
  </div>
</div>

<SetupPaymentModal
  visible={payment_modal_visible}
  price_id={price_after_payment}
  on:close={onPaymentModalClose}
/>

<Modal
  visible={setup_intent_modal_visible}
  on:close={() => {
    setup_intent_modal_content = '';
    setup_intent_modal_visible = false;
  }}
>
  <p>{setup_intent_modal_content}</p>
</Modal>
