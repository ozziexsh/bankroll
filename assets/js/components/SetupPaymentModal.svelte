<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { api } from '../api';
  import { props } from '../store';
  import { getStripe } from '../stripe';
  import type { Props } from '../types';
  import Button from './Button.svelte';
  import Modal from './Modal.svelte';

  export let visible: boolean;
  export let priceId: null | string = null;
  const dispatch = createEventDispatcher();

  enum PaymentStatus {
    Idle,
    Loading,
    Success,
    Error,
  }

  const stripe = getStripe();
  let clientSecret: string | null = null;
  let elements;
  let setupError = '';
  let paymentStatus = PaymentStatus.Idle;

  async function setupPaymentMethod() {
    const response = await api
      .url('/setup-payment')
      .post()
      .json<{ client_secret: string }>();
    clientSecret = response.client_secret;
  }

  function setupStripeElement(el: HTMLDivElement) {
    elements = stripe.elements({
      clientSecret: clientSecret,
    });
    const paymentElement = elements.create('payment');
    paymentElement.mount(`#${el.id}`);
  }

  async function submitPaymentMethod() {
    paymentStatus = PaymentStatus.Loading;

    const url = new URL($props.finalize_url);
    if (priceId) {
      url.searchParams.set('price_id', priceId);
    }

    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: url.toString(),
      },
    });

    if (error) {
      paymentStatus = PaymentStatus.Error;
      setupError = error.message;
      return;
    }

    if (setupIntent) {
      const response = await api
        .url('/store-payment')
        .post({ payment_method_id: setupIntent.payment_method })
        .json<{ props: Props }>();

      $props = response.props;

      if (priceId) {
        // todo: hide elements in modal while this is processing
        const response = await api
          .url('/subscriptions')
          .post({ price_id: priceId })
          .json<{
            props?: Props;
            message?: string;
          }>();

        if (response.message) {
          paymentStatus = PaymentStatus.Error;
          setupError = response.message;
          return;
        }

        if (response.props) {
          $props = response.props;
        }
      }
    }

    // maybe won't reach if redirected, but some may succeed instantly
    paymentStatus = PaymentStatus.Success;
  }

  function onFinish() {
    dispatch('close');
  }

  $: {
    if (visible && !clientSecret) {
      setupPaymentMethod();
    }
    if (!visible) {
      clientSecret = '';
      setupError = '';
      paymentStatus = PaymentStatus.Idle;
    }
  }
</script>

<Modal {visible} on:close={() => dispatch('close')}>
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
          Payment method saved
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            amet labore.
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-6">
      <Button class="w-full justify-center" on:click={onFinish}>Finish</Button>
    </div>
  {:else if clientSecret}
    <form on:submit|preventDefault={submitPaymentMethod}>
      <div id="stripe-payment-form" use:setupStripeElement />

      {#if setupError}
        <p class="text-red-600 mt-2">{setupError}</p>
      {/if}

      <div class="mt-4">
        <Button
          type="submit"
          disabled={paymentStatus === PaymentStatus.Loading}
          class="w-full justify-center"
        >
          Save
        </Button>
      </div>
    </form>
  {/if}
</Modal>
