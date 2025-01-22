import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      persist: {
        path: '../../.wrangler/state/v3',
      },
    },
  }),
  security: {
    checkOrigin: false,
  },
  vite: {
    optimizeDeps: {
      include: ['@flarekit/database'],
    },
  },
  server: {
    port: 1234,
  },
});
