import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  ssr: true,
  // Required for @cloudflare/vite-plugin: single environments-based build.
  future: {
    v8_viteEnvironmentApi: true,
  },
  // Build output goes to the repo root dist/cloudflare (client/ + server/ subdirs).
  buildDirectory: '../../dist/cloudflare',
} satisfies Config;
