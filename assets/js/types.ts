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

export interface Plan {
  title: string;
  description: string;
  features: string[];
  prices: {
    monthly?: { id: string; price: string };
    yearly?: { id: string; price: string };
  };
  trial_days?: number;
}

export interface Invoice {
  hosted_invoice_url: string;
  created: string;
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
  plans: Plan[];
  base_url: string;
  on_trial: boolean;
  trial_ends_at: null | string;
}