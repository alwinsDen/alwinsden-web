import { cloudflare } from '@cloudflare/vite-plugin';
import { reactRouter } from '@react-router/dev/vite';
import mdx from '@mdx-js/rollup';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Compiles src/articles/posts/*/index.mdx before the RR plugin sees them.
    { enforce: 'pre', ...mdx() },
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    reactRouter(),
  ],
});
