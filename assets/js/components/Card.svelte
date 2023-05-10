<script lang="ts">
export let title: string = '';
</script>

<div class="border border-gray-200 bg-white shadow-lg rounded-lg p-4 space-y-2">
  {#if title}
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      {title}
    </h3>
  {/if}
  <slot />
</div>
