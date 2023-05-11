<script lang="ts">
import { api, fetchProps } from './api';
import Button from './components/Button.svelte';
import SetupPaymentModal from './components/SetupPaymentModal.svelte';
import Toggle from './components/Toggle.svelte';
import { props } from './store';
import type { Invoice, Plan, Props, Subscription } from './types';
import { createOrUpdateSubscription, getStripe } from './stripe';
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

$: activePlan = getActivePlan($props.subscription);

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

function getActivePlan(subscription: Subscription | null) {
  if (!subscription) {
    return null;
  }

  for (const plan of $props.plans) {
    if (plan.prices.monthly?.id === subscription.stripe_price_id) {
      return { plan, type: 'monthly' };
    }
    if (plan.prices.yearly?.id === subscription.stripe_price_id) {
      return { plan, type: 'yearly' };
    }
  }

  return null;
}

async function onPlanSelected() {
  planState = PlanModalState.Loading;

  await createOrUpdateSubscription({
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
</script>

<div class="p-12">
  <div class="">
    <div class="">
      <div class="space-y-6 max-w-2xl mx-auto">
        <div class="">
          <p class="underline text-gray-900"><a href="/">← Back to app</a></p>
          <h1 class="text-4xl font-bold mt-6">Acme Co</h1>
          <h3 class="text-xl mt-2">Billing Portal</h3>
          <p class="mt-2 text-gray-600 text-sm">
            Customer: {$props.customer_display_name}
          </p>
        </div>

        <Card title="My Subscription">
          {#if !$props.subscription}
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
          {#if activePlan}
            <div class="flex items-center space-x-2">
              <h2 class="text-xl font-bold">{activePlan.plan.title}</h2>
              <Badge variant="info">
                {activePlan.type === 'monthly'
                  ? activePlan.plan.prices.monthly.price
                  : activePlan.plan.prices.yearly.price}
                {activePlan.type}
              </Badge>
            </div>
            <p class="text-gray-600 text-sm">{activePlan.plan.description}</p>
            <div>
              <div class="flex items-center space-x-2 mt-6">
                {#if !$props.canceled}
                  {#if $props.subscription?.status !== 'incomplete'}
                    <Button on:click={() => (planSelectModalVisible = true)}>
                      Change
                    </Button>
                  {/if}
                  <Button
                    variant="basic"
                    on:click={() => (cancelModalVisible = true)}
                  >
                    Cancel
                  </Button>
                {:else if $props.canceled && $props.grace_period}
                  <Button on:click={resumeSubscription} loading={resumeLoading}>
                    Resume Subscription
                  </Button>
                {:else if $props.ended}
                  <Button on:click={() => (planSelectModalVisible = true)}>
                    Select a plan
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
                <Button
                  type="button"
                  on:click={() => (paymentModalVisible = true)}
                >
                  <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" />
                  Add Payment Method
                </Button>
              </div>
            </div>
          {:else}
            <div
              class="flex items-center justify-between p-2 border border-gray-200 rounded-lg"
            >
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <CardIcon class="w-6 h-6" />
                  <span>{$props.payment_method.payment_last_four}</span>
                </div>
                <Badge>default</Badge>
              </div>
              <div>
                <Button
                  on:click={() => (paymentModalVisible = true)}
                  variant="basic"
                >
                  Update
                </Button>
              </div>
            </div>
          {/if}
        </Card>

        <Card title="Invoices">
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
                      <span class="text-sm">
                        {dayjs(invoice.created, 'YYYY-MM-DD').format(
                          'MMMM D, YYYY',
                        )}
                      </span>

                      <Badge>${(invoice.total / 100).toFixed(2)}</Badge>
                      <Badge class="uppercase" variant="success">
                        {invoice.status}
                      </Badge>

                      <ExternalLinkIcon class="w-4 h-4" />
                    </a>
                  </li>
                {/each}
              </ul>
            {/if}
          {/await}
        </Card>
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
  <div class="space-y-4">
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      Select a plan
    </h3>

    <div class="flex items-center space-x-2">
      <span>Yearly</span>
      <Toggle bind:enabled={monthly} onChange={() => (newPlanSelect = null)} />
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
                class:border-black={getPriceForView(plan).id === newPlanSelect}
                class:ring-2={getPriceForView(plan).id === newPlanSelect}
                class:ring-black={getPriceForView(plan).id === newPlanSelect}
                class:bg-gray-100={$props.subscription?.stripe_price_id ===
                  getPriceForView(plan).id && !$props.ended}
                class:bg-white={$props.subscription?.stripe_price_id !==
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
                    ($props.subscription?.stripe_price_id ===
                      getPriceForView(plan).id &&
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
                      {#if $props.subscription?.stripe_price_id === getPriceForView(plan).id && !$props.ended}
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

    {#if activePlan}
      <Button
        class="w-full text-center justify-center"
        on:click={onPlanSelected}
        disabled={!newPlanSelect || planState === PlanModalState.Loading}
      >
        Change Plan
      </Button>
    {:else if $props.payment_method}
      <Button
        class="w-full text-center justify-center"
        on:click={onPlanSelected}
        disabled={!newPlanSelect || planState === PlanModalState.Loading}
      >
        Subscribe
      </Button>
    {:else}
      <Button
        class="w-full text-center justify-center"
        disabled={!newPlanSelect}
        on:click={() => {
          priceAfterPayment = newPlanSelect;
          planAfterPayment = $props.plans.find(
            plan => getPriceForView(plan).id === newPlanSelect,
          );
          paymentModalVisible = true;
          closePlanModal();
        }}
      >
        Enter Payment Info
      </Button>
    {/if}
  </div>
</Modal>

<DangerConfirm
  title="Cancel Subscription"
  content="Are you sure you wish to cancel your subscription? You will be able to continue to use the product until the end of your billing period."
  visible={cancelModalVisible}
  on:close={() => (cancelModalVisible = false)}
  on:confirm={cancelSubscription}
  confirmLoading={cancelLoading}
/>
