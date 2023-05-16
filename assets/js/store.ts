import { writable } from 'svelte/store';
import type { Props } from './types';

export let props = writable<Props>({
  subscription: null,
  payment_method: null,
  grace_period: false,
  canceled: false,
  recurring: false,
  plans: [],
  base_url: '',
  finalize_url: '',
  on_trial: false,
  trial_ends_at: null,
  fix_subscription_url: '',
  customer_id: '',
  customer_type: '',
  current_user_id: null,
  customer_display_name: '',
  company_display_name: '',
  ended: false,
});
