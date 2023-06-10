<script lang="ts">
import { api, fetchProps } from './api';
import Button from './components/Button.svelte';
import SetupPaymentModal from './components/SetupPaymentModal.svelte';
import Toggle from './components/Toggle.svelte';
import { props } from './store';
import type { Invoice, Plan, Props, Subscription } from './types';
import { updateSubscription, getStripe } from './stripe';
import Modal from './components/Modal.svelte';
import { initSocket } from './socket';
import { onMount } from 'svelte';
import Card from './components/Card.svelte';
import CardIcon from './icons/CardIcon.svelte';
import dayjs from 'dayjs';
import Badge from './components/Badge.svelte';
import ExternalLinkIcon from './icons/ExternalLinkIcon.svelte';
import Alert from './components/Alert.svelte';
import PlusIcon from './icons/PlusIcon.svelte';
import ArrowPathIcon from './icons/ArrowPathIcon.svelte';
import DangerConfirm from './components/DangerConfirm.svelte';

enum PlanModalState {
  Idle,
  Loading,
  Success,
  Error,
}

export let _props: Props;

$props = _props;

let monthly = true;
let priceAfterPayment: string | null = null;
let planAfterPayment: null | Plan = null;
let paymentModalVisible = false;

let newPlanSelect: string | null = null;
let planSelectModalVisible = false;
let planMessage = '';
let planState = PlanModalState.Idle;

let cancelModalVisible = false;
let cancelLoading = false;

let resumeLoading = false;

let invoicePromise: null | ReturnType<typeof invoices> = null;

$: activePlan = getActivePlan($props.subscription);

// onMount(() => {
//   const socket = initSocket($props.current_user_id);

//   const channel = socket.channel(
//     `bankroll:${$props.customer_type}:${$props.customer_id}`,
//     {},
//   );

//   channel.on('update', async payload => {
//     $props = (await fetchProps()).props;
//   });

//   channel
//     .join()
//     .receive('ok', resp => {
//       console.log('Joined successfully', resp);
//     })
//     .receive('error', resp => {
//       console.log('Unable to join', resp);
//     });
// });

onMount(() => {
  invoicePromise = invoices();
});

function getActivePlan(subscription: Subscription | null) {
  if (!subscription) {
    return null;
  }

  if (subscription.stripe_status == 'canceled') {
    return null;
  }

  for (const plan of $props.plans) {
    if (
      plan.prices.monthly?.id ===
      subscription.subscription_items[0].stripe_price_id
    ) {
      return { plan, price: plan.prices.monthly.id, type: 'monthly' };
    }
    if (
      plan.prices.yearly?.id ===
      subscription.subscription_items[0].stripe_price_id
    ) {
      return { plan, price: plan.prices.yearly.id, type: 'yearly' };
    }
  }

  return null;
}

async function onPlanSelected() {
  planState = PlanModalState.Loading;

  if (!activePlan) {
    const response = await api
      .url('/checkout-subscription')
      .post({ price_id: newPlanSelect })
      .json<{ url: string; message?: string }>();

    if (response.message) {
      planState = PlanModalState.Error;
      planMessage = response.message;
    } else {
      window.location.href = response.url;
    }
    return;
  }

  await updateSubscription({
    priceId: newPlanSelect!,
    onErrorMessage(message) {
      planState = PlanModalState.Error;
      planMessage = message;
    },
    onNextAction({ error, paymentIntent }) {
      if (error) {
        planMessage =
          'We failed to charge your payment method. Please try a different payment method.';
        planState = PlanModalState.Error;
      } else if (paymentIntent?.status == 'succeeded') {
        planState = PlanModalState.Success;
      } else if (paymentIntent?.status == 'processing') {
        // todo: ???
      }
    },
    onSuccess(response) {
      $props = response.props;
      planState = PlanModalState.Success;
      invoicePromise = invoices();
    },
  });
}

async function cancelSubscription() {
  cancelLoading = true;
  const response = await api
    .url('/subscriptions')
    .delete()
    .json<{ props: Props }>();
  $props = response.props;
  cancelLoading = false;
  cancelModalVisible = false;
}

async function resumeSubscription() {
  resumeLoading = true;
  const response = await api
    .url('/subscriptions/resume')
    .post()
    .json<{ props: Props }>();
  $props = response.props;
  resumeLoading = false;
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
  invoicePromise = invoices();
}

function getPriceForView(plan: Plan) {
  return monthly ? plan.prices.monthly : plan.prices.yearly;
}

function closePlanModal() {
  planSelectModalVisible = false;
  planState = PlanModalState.Idle;
  planMessage = '';
  newPlanSelect = null;
}

async function redirectToSetup() {
  const response = await api
    .url('/checkout-setup')
    .post()
    .json<{ url: string }>();
  window.location.href = response.url;
}
</script>

<div class="">
  <div class="">
    <div class="">
      <div class="bg-white px-4 py-12 border-b border-b-gray-200">
        <div class="max-w-2xl mx-auto">
          <p class="hover:underline text-gray-900">
            <a href="/">← Back to app</a>
          </p>
          <h1 class="text-4xl font-bold mt-6">{$props.company_display_name}</h1>
          <h3 class="text-xl mt-2">Billing Portal</h3>
          <p class="mt-2 text-gray-600 text-sm">
            Customer: {$props.customer_display_name}
          </p>
        </div>
      </div>
      <div class="py-12 px-4">
        <div class="max-w-2xl mx-auto space-y-6">
          <Card title="My Subscription">
            {#if $props.fix_subscription_url}
              <Alert
                title="We couldn't process your last payment and it is now overdue. Please fix the issue by visiting this link below."
                linkText="Fix Issues"
                linkHref={$props.fix_subscription_url}
              />
            {/if}
            {#if $props.on_trial}
              {#if $props.grace_period}
                <Alert
                  title="You are currently on a trial"
                  description={`You have cancelled the trial but you can continue using it until ${$props.trial_ends_at}.`}
                />
              {:else}
                <Alert
                  title="You are currently on a trial"
                  description={`Your trial will end on ${$props.trial_ends_at} and your subscription will begin.`}
                />
              {/if}
            {/if}
            {#if $props.canceled && !$props.on_trial && $props.grace_period}
              <Alert
                title="Your subscription has been canceled"
                description={`It will end on ${dayjs(
                  $props.subscription?.ends_at,
                ).format('YYYY-MM-DD')}.`}
              />
            {/if}
            {#if $props.ended}
              <Alert
                title="Your subscription has ended"
                description={'To resubscribe, choose a plan below.'}
              />
            {/if}

            {#if !activePlan}
              <div class="text-center mt-6">
                <ArrowPathIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-semibold text-gray-900">
                  You do not have a subscription
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Choose a plan to get started
                </p>
                <div class="mt-6">
                  <Button
                    type="button"
                    on:click={() => (planSelectModalVisible = true)}
                  >
                    <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" />
                    Choose Plan
                  </Button>
                </div>
              </div>
            {/if}

            {#if activePlan}
              <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  You are currently subscribed to the {activePlan.plan.title} plan
                  @ {activePlan.type === 'monthly'
                    ? activePlan.plan.prices.monthly.price
                    : activePlan.plan.prices.yearly.price}
                  {activePlan.type}.
                </p>
              </div>
              <div>
                <div class="flex items-center space-x-2 mt-5">
                  {#if !$props.canceled}
                    {#if $props.subscription?.status !== 'incomplete'}
                      <Button
                        variant="default"
                        on:click={() => (planSelectModalVisible = true)}
                      >
                        Change Plan
                      </Button>
                    {/if}
                    <Button
                      variant="danger-ghost"
                      on:click={() => (cancelModalVisible = true)}
                    >
                      Cancel Subscription
                    </Button>
                  {:else if $props.canceled && $props.grace_period}
                    <Button
                      on:click={resumeSubscription}
                      loading={resumeLoading}
                    >
                      Resume Subscription
                    </Button>
                  {:else if $props.ended}
                    <Button on:click={() => (planSelectModalVisible = true)}>
                      Select A Plan
                    </Button>
                  {/if}
                </div>
              </div>
            {/if}
          </Card>

          <Card title="Payment Methods">
            {#if !$props.payment_method}
              <div class="text-center mt-6">
                <CardIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-semibold text-gray-900">
                  No payment method
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  You need a payment method to subscribe
                </p>
                <div class="mt-6">
                  <Button type="button" on:click={redirectToSetup}>
                    <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" />
                    Add Payment Method
                  </Button>
                </div>
              </div>
            {:else}
              <div
                class="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div class="flex items-center space-x-2">
                  <CardIcon class="w-6 h-6" />
                  <span class="text-sm font-medium text-gray-900">
                    Ending with {$props.payment_method.payment_last_four}
                  </span>
                </div>
                <div>
                  <Button on:click={redirectToSetup} variant="basic">
                    Update
                  </Button>
                </div>
              </div>
            {/if}
          </Card>

          <Card title="Invoices">
            {#if invoicePromise}
              {#await invoicePromise}
                <p>Loading...</p>
              {:then response}
                {#if response.invoices.length === 0}
                  <p>No invoices yet.</p>
                {:else}
                  <ul class="divide-y divide-gray-100">
                    {#each response.invoices as invoice}
                      <li
                        class="flex items-center justify-between gap-x-6 py-5"
                      >
                        <div class="min-w-0">
                          <div class="flex items-start gap-x-3">
                            <p
                              class="text-sm font-semibold leading-6 text-gray-900"
                            >
                              <time datetime={invoice.created}>
                                {dayjs(invoice.created, 'YYYY-MM-DD').format(
                                  'MMMM D, YYYY',
                                )}
                              </time>
                            </p>
                            {#if invoice.status === 'paid'}
                              <Badge variant="success">PAID</Badge>
                            {:else}
                              <Badge class="uppercase">{invoice.status}</Badge>
                            {/if}
                          </div>
                          <div
                            class="mt-0 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
                          >
                            <p class="truncate">
                              ${(invoice.total / 100).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div class="flex flex-none items-center gap-x-4">
                          <a
                            href={invoice.hosted_invoice_url}
                            class="inline-flex items-center rounded-md px-2.5 py-1.5 text-sm disabled:bg-opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-sm bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            target="_blank"
                          >
                            View Invoice
                            <span class="sr-only">
                              {dayjs(invoice.created, 'YYYY-MM-DD').format(
                                'MMMM D, YYYY',
                              )}
                            </span>
                          </a>
                        </div>
                      </li>
                    {/each}
                  </ul>
                {/if}
              {/await}
            {/if}
          </Card>
        </div>
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

<Modal visible={planSelectModalVisible} on:close={closePlanModal}>
  {#if planState !== PlanModalState.Success}
    <div class="space-y-4">
      <h3 class="text-base font-semibold leading-6 text-gray-900">
        Select a plan
      </h3>

      <div class="flex items-center space-x-2">
        <span>Yearly</span>
        <Toggle
          bind:enabled={monthly}
          onChange={() => (newPlanSelect = null)}
        />
        <span>Monthly</span>
      </div>

      <div>
        <fieldset>
          <legend class="sr-only">Plan selection</legend>
          <div class="space-y-4">
            {#key monthly}
              {#each $props.plans as plan}
                <!--
            Checked: "border-transparent", Not Checked: "border-gray-300"
            Active: "border-indigo-600 ring-2 ring-indigo-600"
          -->
                <label
                  class="relative block cursor-pointer rounded-lg border px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
                  class:border-gray-300={getPriceForView(plan).id !==
                    newPlanSelect}
                  class:border-black={getPriceForView(plan).id ===
                    newPlanSelect}
                  class:ring-2={getPriceForView(plan).id === newPlanSelect}
                  class:ring-black={getPriceForView(plan).id === newPlanSelect}
                  class:bg-gray-100={activePlan?.price ===
                    getPriceForView(plan).id && !$props.ended}
                  class:bg-white={activePlan?.price !==
                    getPriceForView(plan).id}
                >
                  <input
                    type="radio"
                    name="server-size"
                    value={getPriceForView(plan).id}
                    bind:group={newPlanSelect}
                    class="sr-only"
                    aria-labelledby="server-size-0-label"
                    aria-describedby="server-size-0-description-0 server-size-0-description-1"
                    disabled={planState === PlanModalState.Loading ||
                      (activePlan?.price === getPriceForView(plan).id &&
                        !$props.ended)}
                  />
                  <span class="flex items-center">
                    <span class="flex flex-col text-sm">
                      <span
                        id="server-size-0-label"
                        class="font-medium text-gray-900"
                      >
                        <span>{plan.title}</span>
                        {#if plan.trial_days && !$props.subscription}
                          <Badge variant="success">
                            {plan.trial_days} day trial
                          </Badge>
                        {/if}
                      </span>
                      <span
                        id="server-size-0-description-0"
                        class="text-gray-500 text-sm"
                      >
                        <span>{plan.description}</span>

                        <ul class="list-inside list-disc mt-2">
                          {#each plan.features as feature}
                            <li>{feature}</li>
                          {/each}
                        </ul>
                        {#if activePlan?.price === getPriceForView(plan).id && !$props.ended}
                          <span class="inline-block mt-2">
                            <Badge variant="info">
                              This is your current plan
                            </Badge>
                          </span>
                        {/if}
                      </span>
                    </span>
                  </span>
                  <span
                    id="server-size-0-description-1"
                    class="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                  >
                    <span class="font-medium text-gray-900">
                      {getPriceForView(plan).price}
                    </span>
                    <span class="ml-1 text-gray-500 sm:ml-0">
                      /{monthly ? 'mo' : 'yr'}
                    </span>
                  </span>
                  <!--
              Active: "border", Not Active: "border-2"
              Checked: "border-indigo-600", Not Checked: "border-transparent"
            -->
                  <span
                    class="pointer-events-none absolute -inset-px rounded-lg border-2"
                    aria-hidden="true"
                  />
                </label>
              {/each}
            {/key}
          </div>
        </fieldset>
      </div>

      {#if planState === PlanModalState.Error}
        <p class="text-red-500">
          {planMessage}
        </p>
      {/if}

      {#if activePlan}
        <Button
          class="w-full text-center justify-center"
          on:click={onPlanSelected}
          disabled={!newPlanSelect || planState === PlanModalState.Loading}
        >
          Change Plan
        </Button>
      {:else}
        <Button
          class="w-full text-center justify-center"
          on:click={onPlanSelected}
          disabled={!newPlanSelect || planState === PlanModalState.Loading}
        >
          Subscribe
        </Button>
      {/if}
    </div>
  {:else}
    <p>Your subscription has been activated!</p>
  {/if}
</Modal>

<DangerConfirm
  title="Cancel Subscription"
  content="Are you sure you wish to cancel your subscription? You will be able to continue to use the product until the end of your billing period."
  visible={cancelModalVisible}
  on:close={() => (cancelModalVisible = false)}
  on:confirm={cancelSubscription}
  confirmLoading={cancelLoading}
/>
