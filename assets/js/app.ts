import '../css/app.css';
import App from './App.svelte';
import { initStripe } from './stripe';

initStripe(
  document.querySelector('meta[name="stripe-pk"]').getAttribute('content'),
);

const el = document.getElementById('__billing-app')!;

const app = new App({
  target: el,
  props: { _props: JSON.parse(el.dataset.props) },
});

export default app;
