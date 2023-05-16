<script lang="ts">
import { createEventDispatcher } from 'svelte';
import Modal from './Modal.svelte';
import Button from './Button.svelte';

export let visible: boolean;
export let title: string;
export let content: string;
export let confirmText: string = 'Confirm';
export let confirmLoading = false;

const dispatch = createEventDispatcher();
</script>

<Modal {visible} on:close>
  <div class="sm:flex sm:items-start">
    <div
      class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
    >
      <svg
        class="h-6 w-6 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    </div>
    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
      <h3
        class="text-base font-semibold leading-6 text-gray-900"
        id="modal-title"
      >
        {title}
      </h3>
      <div class="mt-2">
        <p class="text-sm text-gray-500">
          {content}
        </p>
      </div>
    </div>
  </div>
  <div class="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4 sm:space-x-2">
    <Button
      type="button"
      variant="danger"
      on:click={() => dispatch('confirm')}
      loading={confirmLoading}
    >
      {confirmText}
    </Button>
    <Button type="button" variant="basic" on:click={() => dispatch('close')}>
      Nevermind
    </Button>
  </div>
</Modal>
