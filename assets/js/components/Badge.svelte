<script lang="ts">
type Variant = 'default' | 'danger' | 'warning' | 'info' | 'success';
export let variant: Variant = 'default';

const classMap = {
  default: 'bg-gray-50 text-gray-600 ring-gray-500/10',
  danger: 'bg-red-50 text-red-700 ring-red-600/10',
  warning: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
  info: 'bg-blue-50 text-blue-700 ring-blue-700/10',
  success: 'bg-green-50 text-green-700 ring-green-600/20',
};
</script>

<span
  class={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${classMap[variant]} ${$$props.class}`}
>
  <slot />
</span>
