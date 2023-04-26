import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path';
import sveltePreprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    preprocess: [sveltePreprocess({ typescript: true })]
  })],

  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'assets/js/app.ts'),
      name: 'billing',
      fileName: 'billing',
    },
    outDir: './priv/static/assets',
  },
})
