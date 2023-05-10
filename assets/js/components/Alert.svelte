<script lang="ts">
export let title: string;
export let description: string | null = null;
export let buttonText: string | null = null;
export let buttonClick: null | (() => void) = null;
export let linkText: string | null = null;
export let linkHref: null | string = null;
</script>

<div class="rounded-md bg-yellow-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg
        class="h-5 w-5 text-yellow-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div class="ml-3">
      <h3 class="text-sm font-medium text-yellow-800">
        {title}
      </h3>
      {#if description}
        <div class="mt-2 text-sm text-yellow-700">
          <p>{description}</p>
        </div>
      {/if}
      {#if linkText && linkHref}
        <div class="mt-4 text-sm text-yellow-700">
          <a
            href={linkHref}
            class="rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
          >
            {linkText}
          </a>
        </div>
      {/if}
      {#if buttonText && buttonClick}
        <div class="mt-4">
          <button
            type="button"
            class="rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
            on:click={buttonClick}
          >
            {buttonText}
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
