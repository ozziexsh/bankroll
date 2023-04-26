import { writable } from 'svelte/store';

interface Subscription {
  plan: string;
  ends_at: null | string;
  trial_ends_at: null | string;
  stripe_id: string;
  stripe_status: string;
  stripe_price_id: string;
  quantity: number;
  subscription_items: Array<{
    stripe_id: string;
    stripe_product_id: string;
    stripe_price_id: string;
    quantity: number;
  }>;
}

export interface Props {
  subscription: null | Subscription;
  payment_method: null | {
    payment_id: string;
    payment_type: string;
    payment_last_four: string;
  };
  grace_period: boolean;
  canceled: boolean;
  recurring: boolean;
}

export let props = writable<Props>({
  subscription: null,
  payment_method: null,
  grace_period: false,
  canceled: false,
  recurring: false,
});
