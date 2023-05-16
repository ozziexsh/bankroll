import '../css/app.css';
import App from './App.svelte';
import { initStripe } from './stripe';

const el = document.getElementById('__billing-app')!;
const props = JSON.parse(el.dataset.props);
const view = el.dataset.view;

initStripe(
  document.querySelector('meta[name="stripe-pk"]').getAttribute('content'),
);

new App({
  target: el,
  props: { _props: props },
});
