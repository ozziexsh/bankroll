import wretch from 'wretch';

export const api = wretch('http://localhost:4000', { mode: 'cors' }).headers({
  'x-csrf-token': document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content'),
});
