import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
  },

  // Agregamos esto para Svelte 5:
  compilerOptions: {
    warningFilter: (warning) => {
      // Si el código del warning empieza con 'a11y_', devolvemos false para ignorarlo
      if (warning.code.startsWith('a11y_')) return false;
      return true;
    }
  }
};

export default config;