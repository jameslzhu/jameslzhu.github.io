import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.jameszhu.io',
  compressHTML: false,
  redirects: {
    '/feedback': 'https://forms.gle/chB5ePuX2FkVuaaL9',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
