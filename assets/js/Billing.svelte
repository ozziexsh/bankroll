<script lang="ts">
import { api, fetchProps } from './api';
import Button from './components/Button.svelte';
import PaymentCard from './components/PaymentCard.svelte';
import PlanCard from './components/PlanCard.svelte';
import SetupPaymentModal from './components/SetupPaymentModal.svelte';
import Toggle from './components/Toggle.svelte';
import { props } from './store';
import type { Invoice, Plan, Props } from './types';
import { createOrUpdateSubscription, getStripe } from './stripe';
import Modal from './components/Modal.svelte';
import { initSocket } from './socket';
import { onMount } from 'svelte';

export let _props: Props;

$props = _props;

let monthly = true;
let priceAfterPayment: string | null = null;
let planAfterPayment: null | Plan = null;
let paymentModalVisible = false;
let setupIntentModalVisible = false;
let setupIntentModalContent = '';
let loadingSubscription = false;

onMount(() => {
  const socket = initSocket($props.current_user_id);

  const channel = socket.channel(
    `bankroll:${$props.customer_type}:${$props.customer_id}`,
    {},
  );

  channel.on('update', async payload => {
    $props = (await fetchProps()).props;
  });

  channel
    .join()
    .receive('ok', resp => {
      console.log('Joined successfully', resp);
    })
    .receive('error', resp => {
      console.log('Unable to join', resp);
    });
});

async function onPlanSelected(plan: Plan) {
  const priceId = monthly ? plan.prices.monthly.id : plan.prices.yearly.id;

  if (!$props.payment_method) {
    priceAfterPayment = priceId;
    planAfterPayment = plan;
    paymentModalVisible = true;
    return;
  }

  loadingSubscription = true;

  await createOrUpdateSubscription({
    priceId,
    onErrorMessage(message) {
      setupIntentModalContent = message;
      setupIntentModalVisible = true;
    },
    onNextAction({ error, paymentIntent }) {
      if (error) {
        setupIntentModalContent =
          'Payment method could not be added. Please try a different payment method.';
        setupIntentModalVisible = true;
      } else if (paymentIntent?.status == 'succeeded') {
        setupIntentModalContent = 'Payment confirmed successfully';
        setupIntentModalVisible = true;
      } else if (paymentIntent?.status == 'processing') {
        // todo: ???
      }
    },
    onSuccess(response) {
      $props = response.props;
    },
  });

  loadingSubscription = false;
}

async function cancelSubscription() {
  loadingSubscription = true;
  const response = await api
    .url('/subscriptions')
    .delete()
    .json<{ props: Props }>();
  $props = response.props;
  loadingSubscription = false;
}

async function resumeSubscription() {
  loadingSubscription = true;
  const response = await api
    .url('/subscriptions/resume')
    .post()
    .json<{ props: Props }>();
  $props = response.props;
  loadingSubscription = false;
}

function invoices() {
  return api.url('/invoices').get().json<{ invoices: Invoice[] }>();
}

function onPaymentModalClose() {
  paymentModalVisible = false;
  priceAfterPayment = null;
  planAfterPayment = null;
}

function onPaymentModalSuccess(response: { props: Props }) {
  $props = response.props;
}
</script>

<div class="p-12">
  <p class="mb-4"><a href="/">Back to home</a></p>
  <div class="flex items-start space-x-6">
    <div class="w-1/3">
      <PaymentCard />
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
        {#if $props.fix_subscription_url}
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
                  We couldn't process your last payment and it is now overdue.
                  Please fix the issue by visiting this link below.
                </h3>
                <div class="mt-4 text-sm text-yellow-700">
                  <a
                    href={$props.fix_subscription_url}
                    class="rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                  >
                    Fix Issues
                  </a>
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
                    <!-- todo: does a sub delete when the trial runs out? -->
                    {#if $props.grace_period}
                      You have cancelled the trial but you can continue using it
                      until {$props.trial_ends_at}.
                    {:else}
                      Your trial will end on {$props.trial_ends_at} and your subscription
                      will begin.
                    {/if}
                  </p>
                </div>
                <div class="mt-4">
                  <div class="-mx-2 -my-1.5 flex">
                    {#if !$props.grace_period}
                      <button
                        type="button"
                        class="rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                        on:click={cancelSubscription}
                      >
                        Cancel Trial
                      </button>
                    {:else}
                      <button
                        type="button"
                        class="rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                        on:click={resumeSubscription}
                      >
                        Resume
                      </button>
                    {/if}
                  </div>
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
          {#each $props.plans as plan}
            <PlanCard {plan} {monthly}>
              {#if $props.subscription?.stripe_price_id === (monthly ? plan.prices.monthly.id : plan.prices.yearly.id)}
                {#if $props.grace_period}
                  <Button
                    on:click={resumeSubscription}
                    loading={loadingSubscription}
                  >
                    Resume Subscription
                  </Button>
                {/if}
                {#if $props.recurring}
                  <Button
                    on:click={() => cancelSubscription()}
                    loading={loadingSubscription}
                  >
                    Cancel Subscription
                  </Button>
                {/if}
              {:else}
                <Button
                  on:click={() => onPlanSelected(plan)}
                  loading={loadingSubscription}
                >
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
          {#if response.invoices.length === 0}
            <p>No invoices yet.</p>
          {:else}
            <ul class="space-y-4">
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
          {/if}
        {/await}
      </div>
    </div>
  </div>
</div>

<SetupPaymentModal
  visible={paymentModalVisible}
  priceId={priceAfterPayment}
  plan={planAfterPayment}
  onSuccess={onPaymentModalSuccess}
  on:close={onPaymentModalClose}
/>

<Modal
  visible={setupIntentModalVisible}
  on:close={() => {
    setupIntentModalContent = '';
    setupIntentModalVisible = false;
  }}
>
  <p>{setupIntentModalContent}</p>
</Modal>
