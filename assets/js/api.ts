import wretch from 'wretch';
import type { Props } from './types';

const el = document.getElementById('__bankroll-app')!;
const props = JSON.parse(el.dataset.props);

const url = new URL(props.base_url);
url.search = '';

export const api = wretch(url.toString(), { mode: 'cors' }).headers({
  'x-csrf-token': document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content'),
});

export function fetchProps() {
  return api.url('/props').get().json<{ props: Props }>();
}

export function storePaymentMethod(paymentMethodId: string) {
  return api
    .url('/payment-method')
    .post({ payment_method_id: paymentMethodId })
    .json<{ props: Props }>();
}

export function storeSubscription(priceId: string) {
  return api.url('/subscriptions').post({ price_id: priceId }).json<
    | {
        props: Props;
      }
    | {
        client_secret: string;
      }
    | {
        message: string;
      }
  >();
}
