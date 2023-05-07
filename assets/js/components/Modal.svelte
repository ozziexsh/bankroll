<script>
  import { createEventDispatcher } from 'svelte';
  import { scale, fade } from 'svelte/transition';

  export let visible;

  const dispatch = createEventDispatcher();
</script>

{#if visible}
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      transition:fade={{ duration: 250 }}
    />

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        on:click={() => dispatch('close')}
      >
        <div
          transition:scale={{ duration: 250 }}
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          on:click={e => e.stopPropagation()}
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if}
