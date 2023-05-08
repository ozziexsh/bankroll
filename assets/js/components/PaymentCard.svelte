<script lang="ts">
import { props } from '../store';
import type { Props } from '../types';
import Button from './Button.svelte';
import SetupPaymentModal from './SetupPaymentModal.svelte';

interface PaymentMethod {
  payment_id: string;
  payment_type: string;
  payment_last_four: string;
}

export let paymentMethod: null | PaymentMethod;

let modalVisible = false;

function onSetupSuccess(response: { props: Props }) {
  $props = response.props;
}
</script>

<div class="rounded-md border border-gray-200 bg-gray-50 p-4">
  <div class="border-b border-gray-200 pb-5">
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      Payment Methods
    </h3>
  </div>

  {#if !paymentMethod}
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
        <Button type="button" on:click={() => (modalVisible = true)}>
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
      Your payment method on file is a {paymentMethod.payment_type} ending in {paymentMethod.payment_last_four}
    </p>
    <div class="mt-4">
      <Button on:click={() => (modalVisible = true)}>Update</Button>
    </div>
  {/if}
</div>

<SetupPaymentModal
  visible={modalVisible}
  onSuccess={onSetupSuccess}
  on:close={() => (modalVisible = false)}
/>
