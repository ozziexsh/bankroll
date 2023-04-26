<script lang="ts">
  import { api } from '../api';
  import { props, type Props } from '../store';
  import { getStripe } from '../stripe';
  import Button from './button.svelte';
  import Modal from './modal.svelte';

  interface PaymentMethod {
    payment_id: string;
    payment_type: string;
    payment_last_four: string;
  }

  export let payment_method: null | PaymentMethod;

  enum PaymentStatus {
    Idle,
    Loading,
    Success,
    Error,
  }

  let client_secret: string | null = null;
  const stripe = getStripe();
  let elements;
  let setupError = '';
  let paymentStatus = PaymentStatus.Idle;

  async function setupPaymentMethod() {
    const response = await api
      .url('/billing/setup-payment')
      .post()
      .json<{ client_secret: string }>();
    client_secret = response.client_secret;
  }

  function setupStripeElement(el: HTMLDivElement) {
    elements = stripe.elements({
      clientSecret: client_secret,
    });
    const paymentElement = elements.create('payment');
    paymentElement.mount(`#${el.id}`);
  }

  async function submitPaymentMethod() {
    paymentStatus = PaymentStatus.Loading;

    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: 'http://localhost:4000/billing/payment-setup-return',
      },
    });

    if (error) {
      paymentStatus = PaymentStatus.Error;
      setupError = error.message;
      return;
    }

    // maybe won't reach if redirected, but some may succeed instantly
    paymentStatus = PaymentStatus.Success;

    if (setupIntent) {
      const response = await api
        .url('/billing/store-payment')
        .post({ payment_method_id: setupIntent.payment_method })
        .json<{ props: Props }>();

      $props = response.props;
    }
  }
</script>

<div class="rounded-md border border-gray-200 bg-gray-50 p-4">
  <div class="border-b border-gray-200 pb-5">
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      Payment Methods
    </h3>
  </div>

  {#if !payment_method}
    <div class="text-center mt-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mx-auto h-12 w-12 text-gray-400"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
        />
      </svg>
      <h3 class="mt-2 text-sm font-semibold text-gray-900">
        No payment method
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        You need a payment method to subscribe
      </p>
      <div class="mt-6">
        <Button type="button" on:click={setupPaymentMethod}>
          <svg
            class="-ml-0.5 mr-1.5 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
            />
          </svg>
          Add Payment Method
        </Button>
      </div>
    </div>
  {:else}
    <p class="text-gray-800 mt-4">
      Your payment method on file is a {payment_method.payment_type} ending in {payment_method.payment_last_four}
    </p>
    <div class="mt-4">
      <Button on:click={setupPaymentMethod}>Update</Button>
    </div>
  {/if}
</div>

<Modal visible={!!client_secret} on:close={() => (client_secret = '')}>
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
      <Button
        class="w-full justify-center"
        on:click={() => (client_secret = '')}
      >
        Finish
      </Button>
    </div>
  {:else if client_secret}
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
