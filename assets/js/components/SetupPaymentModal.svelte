<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { api } from '../api';
import { props } from '../store';
import type { Props } from '../types';
import Button from './Button.svelte';
import Modal from './Modal.svelte';
import PaymentElement from './PaymentElement.svelte';
import { getStripe } from '../stripe';

export let visible: boolean;
export let priceId: null | string = null;
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
    paymentStatus = PaymentStatus.Success;
    return;
  }

  paymentStatus = PaymentStatus.SubmittingSubscription;

  const response = await api
    .url('/subscriptions')
    .post({ price_id: priceId })
    .json<{
      props?: Props;
      client_secret?: string;
      message?: string;
    }>();

  if (response.message) {
    paymentStatus = PaymentStatus.Error;
    setupError = response.message;
    return;
  } else if (response.client_secret) {
    const stripe = getStripe();
    const { error, paymentIntent } = await stripe.handleNextAction({
      clientSecret: response.client_secret,
    });
    // stripe may have redirected to a different url at this point
    if (error) {
      paymentStatus = PaymentStatus.Error;
      setupError =
        'Payment method could not be added. Please try a different payment method.';
      return;
    } else if (paymentIntent?.status == 'succeeded') {
      // todo: wait for webhook?
      paymentStatus = PaymentStatus.Success;
      return;
    } else if (paymentIntent?.status == 'processing') {
      // todo: ???
    }
  } else if (response.props) {
    onSuccess({ props: response.props });
    paymentStatus = PaymentStatus.Success;
  }
}

function onFinish() {
  dispatch('close');
}
</script>

<Modal {visible} on:close={onFinish}>
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
    <PaymentElement {returnUrl} onSuccess={onPaymentSuccess} />
  {:else if paymentStatus === PaymentStatus.SubmittingSubscription}
    <p>Processing subscription...</p>
  {:else if paymentStatus === PaymentStatus.Error}
    <p>{setupError}</p>
  {/if}
</Modal>
