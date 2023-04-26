<button
  {...$$props}
  class={`inline-flex items-center rounded-md bg-black px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${$$props.class}`}
  on:click
>
  <slot />
</button>
