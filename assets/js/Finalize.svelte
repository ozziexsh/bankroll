<script lang="ts">
  import { onMount } from 'svelte';
  import { props } from './store';
  import type { Props } from './types';
  import { getStripe } from './stripe';
  import { api } from './api';
  import Modal from './components/modal.svelte';
  import PaymentElement from './components/PaymentElement.svelte';

  enum SetupPaymentStatus {
    EnterPaymentInfo,
    ConfirmingPayment,
    Success,
    Error,
  }

  export let _props: Props;

  $props = _props;

  const stripe = getStripe();

  let paymentIntent = $props.payment_intent;
  let setupIntent = $props.setup_intent;

  let paymentModalStatus: null | SetupPaymentStatus = null;
  let paymentModalMessage = '';
  let setupModalStatus: null | SetupPaymentStatus = null;
  let setupModalMessage = '';

  let priceId = new URLSearchParams(window.location.search).get('price_id');
  let returnUrl = getReturnUrl();

  onMount(() => {
    checkForSetupIntent();
    checkForPaymentIntent();
  });

  function getReturnUrl() {
    if (!priceId) {
      return $props.finalize_url;
    }
    const url = new URL($props.finalize_url);
    url.searchParams.set('price_id', priceId);
    return url.toString();
  }

  async function checkForPaymentIntent() {
    if (!paymentIntent) {
      return;
    }
    // todo: loading
    if (
      paymentIntent.status === 'requires_confirmation' ||
      paymentIntent.status === 'incomplete'
    ) {
      const response = await stripe.confirmPayment({
        clientSecret: $props.payment_intent.client_secret,
        redirect: 'if_required',
        confirmParams: {
          return_url: returnUrl,
        },
      });
      if (response.error) {
        // todo: show response.error.message
      }
    } else if (paymentIntent.status === 'requires_action') {
      const actionResult = await stripe.handleNextAction({
        clientSecret: paymentIntent.client_secret,
      });
      if (actionResult.error) {
        // todo
      } else if (actionResult.paymentIntent) {
        paymentIntent = actionResult.paymentIntent;
      }
    }
  }

  async function checkForSetupIntent() {
    if (!setupIntent) {
      return;
    }
    if (setupIntent.status == 'succeeded') {
      // todo: loading
      const response = await api
        .url('/store-payment')
        .post({ payment_method_id: setupIntent.payment_method })
        .json<{ props: Props }>();

      const setupPriceId = new URLSearchParams(window.location.search).get(
        'price_id',
      );

      if (setupPriceId) {
        // todo
        const response = await api
          .url('/subscriptions')
          .post({ price_id: setupPriceId })
          .json<{
            props: Props;
          }>();
      }
    } else if (setupIntent.status === 'requires_action') {
      // todo: loading
      const actionResult = await stripe.handleNextAction({
        clientSecret: setupIntent.client_secret,
      });
      if (actionResult.error) {
        // todo
      } else if (actionResult.setupIntent) {
        setupIntent = actionResult.setupIntent;
      }
    }
  }

  function openPaymentModal() {
    paymentModalStatus = SetupPaymentStatus.EnterPaymentInfo;
    paymentModalMessage = '';
  }

  function closePaymentModal() {
    paymentModalStatus = null;
    paymentModalMessage = '';
  }

  async function onPaymentSuccess(paymentResult: { props: Props }) {
    paymentModalStatus = SetupPaymentStatus.ConfirmingPayment;
    const response = await stripe.confirmPayment({
      clientSecret: paymentIntent.client_secret,
      redirect: 'if_required',
      confirmParams: {
        return_url: returnUrl,
        payment_method: paymentResult.props.payment_method.payment_id,
      },
    });
    if (response.error) {
      paymentModalStatus = SetupPaymentStatus.Error;
      paymentModalMessage = response.error.message;
      return;
    }
    paymentModalStatus = SetupPaymentStatus.Success;
    paymentModalMessage =
      'Payment succeeded. You will be redirected to the billing portal.';
    setTimeout(() => {
      window.location.href = $props.base_url;
    }, 2000);
  }

  function openSetupModal() {
    setupModalStatus = SetupPaymentStatus.EnterPaymentInfo;
    setupModalMessage = '';
  }

  function closeSetupModal() {
    setupModalStatus = null;
    setupModalMessage = '';
  }

  function onSetupSuccess() {
    setupModalStatus = SetupPaymentStatus.Success;
    setupModalMessage =
      'Payment method added successfully. You will now be redirected back to the billing portal.';
    setTimeout(() => {
      window.location.href = $props.base_url;
    }, 2000);
  }
</script>

<div class="p-12 space-y-4">
  {#if paymentIntent}
    <h2 class="text-4xl font-semibold">
      Payment for {paymentIntent.amount / 100}
      {paymentIntent.currency.toUpperCase()}
    </h2>

    {#if paymentIntent.status === 'succeeded'}
      <p>
        This payment succeeded. <a href={$props.base_url}>
          Go back to the portal
        </a>
        .
      </p>
    {:else if paymentIntent.status === 'requires_payment_method'}
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              There were errors with your submission
            </h3>
            <div class="mt-2 text-sm text-red-700">
              <p>
                We failed to charge your payment method on file. Please try a
                different payment method and try again.
              </p>
            </div>
            <div class="mt-4">
              <button
                type="button"
                class="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                on:click={openPaymentModal}
              >
                Change Payment Method
              </button>
            </div>
          </div>
        </div>
      </div>
    {:else if paymentIntent.status === 'requires_action'}
      <p>
        Your payment method requires extra verification. You will be prompted or
        redirected shortly.
      </p>
    {:else if paymentIntent.status === 'processing'}
      <p>This payment is processing. Check back in 24-48 hours.</p>
    {/if}
  {/if}

  {#if setupIntent}
    <h2 class="text-4xl font-semibold">Setup payment method</h2>
    {#if setupIntent.status === 'succeeded'}
      <p>
        Payment method successfully added. <a href={$props.base_url}>
          Go back to the portal
        </a>
        .
      </p>
    {:else if setupIntent.status === 'requires_payment_method'}
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              There were errors with your submission
            </h3>
            <div class="mt-2 text-sm text-red-700">
              <p>
                We failed to setup your payment method. Please try a different
                payment method and try again.
              </p>
            </div>
            <div class="mt-4">
              <button
                type="button"
                class="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                on:click={openSetupModal}
              >
                Change Payment Method
              </button>
            </div>
          </div>
        </div>
      </div>
    {:else if setupIntent.status === 'processing'}
      <p>Payment method processing</p>
    {/if}
  {/if}
</div>

<Modal visible={paymentModalStatus !== null} on:close={closePaymentModal}>
  {#if paymentModalStatus === SetupPaymentStatus.EnterPaymentInfo}
    <PaymentElement onSuccess={onPaymentSuccess} />
  {:else if paymentModalStatus === SetupPaymentStatus.ConfirmingPayment}
    <p>
      Payment method updated successfully. Please wait while we try to retry the
      payment.
    </p>
  {:else if paymentModalStatus === SetupPaymentStatus.Success || paymentModalStatus === SetupPaymentStatus.Error}
    <p>{paymentModalMessage}</p>
  {/if}
</Modal>

<Modal visible={setupModalStatus !== null} on:close={closeSetupModal}>
  {#if setupModalStatus === SetupPaymentStatus.EnterPaymentInfo}
    <PaymentElement onSuccess={onSetupSuccess} />
  {:else if setupModalStatus === SetupPaymentStatus.Success || setupModalStatus === SetupPaymentStatus.Error}
    <p>{setupModalMessage}</p>
  {/if}
</Modal>
