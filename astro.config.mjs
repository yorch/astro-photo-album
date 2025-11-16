// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Uncomment and set your base path when deploying to a subdirectory
  // base: '/photos/',
  vite: {
    plugins: [tailwindcss()],
  },
});
