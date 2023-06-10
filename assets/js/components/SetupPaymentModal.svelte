<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { api, fetchProps } from '../api';
import { props } from '../store';
import type { Plan, Props } from '../types';
import Button from './Button.svelte';
import Modal from './Modal.svelte';
import PaymentElement from './PaymentElement.svelte';
import { updateSubscription, getStripe } from '../stripe';
import Badge from './Badge.svelte';

export let visible: boolean;
export let priceId: null | string = null;
export let plan: null | Plan = null;
export let onSuccess: (response: { props: Props }) => void;
const dispatch = createEventDispatcher();

enum PaymentStatus {
  EnterPaymentInfo,
  SubmittingSubscription,
  Success,
  Error,
}

let setupError = '';
let paymentStatus = PaymentStatus.EnterPaymentInfo;
let returnUrl = getReturnUrl();

$: {
  if (!visible) {
    paymentStatus = PaymentStatus.EnterPaymentInfo;
    setupError = '';
  }
}

function getReturnUrl() {
  const url = new URL($props.finalize_url);
  if (priceId) {
    url.searchParams.set('price_id', priceId);
  }
  return url.toString();
}

async function onPaymentSuccess() {
  if (!priceId) {
    onSuccess(await fetchProps());
    paymentStatus = PaymentStatus.Success;
    return;
  }

  paymentStatus = PaymentStatus.SubmittingSubscription;

  await updateSubscription({
    priceId,
    onErrorMessage(message) {
      paymentStatus = PaymentStatus.Error;
      setupError = message;
    },
    onNextAction({ error, paymentIntent }) {
      if (error) {
        paymentStatus = PaymentStatus.Error;
        setupError =
          'Payment method could not be added. Please try a different payment method.';
      } else if (paymentIntent?.status == 'succeeded') {
        // todo: wait for webhook?
        paymentStatus = PaymentStatus.Success;
      } else if (paymentIntent?.status == 'processing') {
        // todo: ???
      }
    },
    onSuccess(response) {
      onSuccess({ props: response.props });
      paymentStatus = PaymentStatus.Success;
    },
  });
}

function onFinish() {
  dispatch('close');
}
</script>

<Modal {visible} on:close={onFinish} size={priceId ? '2xl' : 'lg'}>
  {#if paymentStatus === PaymentStatus.Success}
    <div>
      <div
        class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
      >
        <svg
          class="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-5">
        <h3
          class="text-base font-semibold leading-6 text-gray-900"
          id="modal-title"
        >
          Success
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            {#if priceId}
              Your payment information and subscription were set up
              successfully.
            {:else}
              Your Payment information was set up successfully.
            {/if}
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-6">
      <Button class="w-full justify-center" on:click={onFinish}>Finish</Button>
    </div>
  {:else if paymentStatus === PaymentStatus.EnterPaymentInfo}
    <div class="flex flex-col sm:flex-row">
      <div class="flex-1">
        <PaymentElement {returnUrl} onSuccess={onPaymentSuccess} />
      </div>
      {#if plan}
        <div
          class="sm:w-[40%] space-y-2 mt-4 sm:mt-0 sm:ml-4 py-2 px-4 rounded-lg bg-gray-100"
        >
          <h2 class="text-2xl font-semibold">
            {#if plan.prices.monthly?.id == priceId}
              {plan.title} @ {plan.prices.monthly.price}/month
            {:else}
              {plan.title} @ {plan.prices.yearly.price}/year
            {/if}
          </h2>
          {#if plan.trial_days && !$props.subscription}
            <Badge variant="success">{plan.trial_days} day trial</Badge>
          {/if}
          <p class="text-gray-600 text-sm">
            {plan.description}
          </p>
          {#if plan.features.length}
            <ul class="text-gray-600 text-sm list-inside list-disc">
              {#each plan.features as feature}
                <li>{feature}</li>
              {/each}
            </ul>
          {/if}
        </div>
      {/if}
    </div>
  {:else if paymentStatus === PaymentStatus.SubmittingSubscription}
    <p>Processing subscription...</p>
  {:else if paymentStatus === PaymentStatus.Error}
    <p>{setupError}</p>
  {/if}
</Modal>
