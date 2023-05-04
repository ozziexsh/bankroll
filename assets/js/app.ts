import '../css/app.css';
import Billing from './Billing.svelte';
import Finalize from './Finalize.svelte';
import { initStripe } from './stripe';

const el = document.getElementById('__billing-app')!;
const props = JSON.parse(el.dataset.props);
const view = el.dataset.view;

initStripe(
  document.querySelector('meta[name="stripe-pk"]').getAttribute('content'),
);

if (view === 'finalize') {
  new Finalize({
    target: el,
    props: { _props: props },
  });
} else {
  new Billing({
    target: el,
    props: { _props: props },
  });
}
