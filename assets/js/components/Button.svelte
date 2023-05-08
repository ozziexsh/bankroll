<script lang="ts">
import Spin from './Spin.svelte';

export let loading: boolean = false;
</script>

<button
  {...$$props}
  disabled={$$props.disabled || loading}
  class={`inline-flex items-center rounded-md bg-black px-2.5 py-1.5 text-sm text-white shadow-sm disabled:bg-opacity-70 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${$$props.class}`}
  on:click
>
  {#if loading}
    <Spin class="w-4 h-4 mr-2" />
  {/if}
  <slot />
</button>
