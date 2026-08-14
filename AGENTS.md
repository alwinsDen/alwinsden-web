# AGENTS.md / CLAUDE.md

pnpm workspace monorepo for alwinsden.com. Requires Node >= 24.19.0 and pnpm 10.29.3 (pinned in root `package.json`). No tests and no CI config exist anywhere in this repo.

## Layout

- `packages/alwinsden-docs` — Docusaurus site (docs.alwinsden.com)
- `packages/alwinsden-cloudflare` — Vite + React + react-router main site (alwinsden.com), deployed on Cloudflare Pages
- `packages/ai-keyboard` — Expo SDK 57 / react-native app (newest, rougher; uses expo-router)
- `dist/` — build output for both web apps, committed to gitignore

README.md at root is stale (lists only two apps).

## Commands (run from repo root)

- `pnpm dev:docs` / `pnpm dev:cloudflare` — dev servers
- `pnpm build` — builds both web apps
- `pnpm --filter alwinsden-cloudflare lint` and `typecheck` — only app with lint/typecheck scripts
- ai-keyboard: `pnpm --filter ai-keyboard exec expo <cmd>` (no root alias). Install Expo deps with `pnpm --filter ai-keyboard exec expo install <pkg>` so versions match SDK 57; don't hand-pick versions.

## Constraints & gotchas

- `node-linker=hoisted` in `.npmrc` is deliberate (Docusaurus + Vite + Metro all resolve from root `node_modules`). Don't remove or switch to isolated.
- Build output goes to the **repo root** `dist/docs` and `dist/cloudflare`, not into the packages (set in `vite.config.ts` and the docs `build` script).
- pnpm 10 runs postinstall scripts **only** for packages listed in `allowBuilds` in `pnpm-workspace.yaml` (@swc/core, core-js, core-js-pure, esbuild). A new dependency with an install script (common with RN native modules) will silently skip it unless you add it there. pnpm 10 ignores the `pnpm` field in `package.json`.
- Shared versions (react, react-dom, @types/react, typescript) are pinned via `catalog:` protocol in `pnpm-workspace.yaml`. React is deliberately 19.2.3 for RN compatibility — don't bump it to satisfy one app. Change shared versions in the catalog, not per-package.
- Cloudflare Pages: `packages/alwinsden-cloudflare/functions/[[path]].js` rewrites `<title>`/meta/OG per URL at runtime. New routes needing custom SEO meta must be added there.
- `packages/alwinsden-cloudflare/public/wasm-transpiler/build/*` are committed build artifacts compiled from `packages/alwinsden-cloudflare/external/wasm-transpiler/src/main.cpp` (C++ → WASM, built externally). Don't hand-edit; recompile and replace instead.
- ai-keyboard routes are file-based (`src/app/`); site routes are manual (`src/main.tsx`). Platform splits use `.web.tsx`/`.web.ts` variants (e.g. `app-tabs.web.tsx`).

## Rules
- Always update docs when new commands are added.
- Always update docs when major changes to code or architecture.