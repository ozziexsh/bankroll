<script lang="ts">
  import type { Plan } from '../types';

  export let plan: Plan;
  export let monthly = true;

  $: price = monthly ? plan.prices.monthly : plan.prices.yearly;
</script>

<div class="border border-gray-200 rounded-md p-4 space-y-2">
  <div class="flex items-center space-x-2">
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      {plan.title} @ {price.price}
    </h3>
    {#if plan.trial_days}
      <span class="bg-green-400 text-white text-xs px-2 py-0.5 rounded">
        {plan.trial_days} day trial
      </span>
    {/if}
  </div>
  <p class="text-sm text-gray-600">
    {plan.description}
  </p>
  <ul class="list-disc list-inside mt-2 text-sm text-gray-600">
    {#each plan.features as feature}
      <li>{feature}</li>
    {/each}
  </ul>
  <div class="flex space-x-4">
    <slot />
  </div>
</div>
