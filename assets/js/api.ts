import wretch from 'wretch';

const el = document.getElementById('__billing-app')!;
const props = JSON.parse(el.dataset.props);

const url = new URL(props.base_url);
url.search = '';

export const api = wretch(url.toString(), { mode: 'cors' }).headers({
  'x-csrf-token': document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content'),
});
