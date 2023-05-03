import { writable } from 'svelte/store';
import type { Props } from './types';

export let props = writable<Props>({
  subscription: null,
  payment_method: null,
  grace_period: false,
  canceled: false,
  recurring: false,
  plans: [],
  current_url: '',
  on_trial: false,
  trial_ends_at: null,
});
