import { storeSubscription } from './api';
import type { Props } from './types';

let stripe: any = null;

export function initStripe(pk: string) {
  stripe = (window as any).Stripe(pk);
}

export function getStripe() {
  return stripe;
}

interface CreateOrUpdateSubscriptionOptions {
  priceId: string;
  onErrorMessage(message: string): void;
  onNextAction(response: { error?: string; paymentIntent?: any }): void;
  onSuccess(response: { props: Props });
}

export async function createOrUpdateSubscription(
  options: CreateOrUpdateSubscriptionOptions,
) {
  const response = await storeSubscription(options.priceId);

  if ('message' in response) {
    options.onErrorMessage(response.message);
  }

  if ('client_secret' in response) {
    const stripe = getStripe();
    const nextActionResponse = await stripe.handleNextAction({
      clientSecret: response.client_secret,
    });
    options.onNextAction(nextActionResponse);
  }

  if ('props' in response) {
    options.onSuccess(response);
  }
}
