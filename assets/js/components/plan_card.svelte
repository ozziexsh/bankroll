<script lang="ts">
  export let plan;
  export let monthly = true;

  $: price = monthly ? plan.prices.monthly : plan.prices.yearly;
</script>

<div class="border border-gray-200 rounded-md p-4 space-y-2">
  <h3 class="text-base font-semibold leading-6 text-gray-900">
    {plan.title} @ {price.price}
  </h3>
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
