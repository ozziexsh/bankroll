<script lang="ts">
import { createEventDispatcher } from 'svelte';

export let enabled = false;
</script>

<button
  type="button"
  class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
  role="switch"
  aria-checked={enabled ? 'true' : 'false'}
  on:click={() => (enabled = !enabled)}
>
  <span class="sr-only">Use setting</span>
  <span
    aria-hidden="true"
    class="pointer-events-none absolute h-full w-full rounded-md bg-white"
  />
  <span
    aria-hidden="true"
    class:bg-indigo-600={enabled}
    class:bg-gray-200={!enabled}
    class="pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
  />
  <span
    aria-hidden="true"
    class:translate-x-5={enabled}
    class:translate-x-0={!enabled}
    class="translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
  />
</button>
