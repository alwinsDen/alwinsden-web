# alwinsden-web

pnpm (JS/TS) + Cargo (Rust) workspace monorepo for alwinsden.com.

## Layout

- `packages/alwinsden-cloudflare` — React Router v7 main site and articles (alwinsden.com), deployed as a Cloudflare Worker with static assets
- `packages/ai-keyboard` — Expo SDK 57 / React Native app (expo-router, single-screen react-native-paper chat)
- `packages/alwinsden-unified-ui` — publishable cross-platform UI packages (`core`, `web-ui`, `react-native-ui`)
- `service/` — Rust workspace member (axum API server)

## Docs

Repository and package rules, commands, and gotchas live in [`AGENTS.md`](AGENTS.md) (a symlink to `.rules`, along with `CLAUDE.md` and `GEMINI.md`). Update `.rules`, not the symlinks.

## Quick start

```sh
pnpm install
pnpm dev:cloudflare      # main site dev server
pnpm build:cloudflare    # build the web app
```

Requires Node >= 24.19.0 and pnpm 10.29.3. Rust service commands and mobile builds are documented in the area AGENTS.md files.
