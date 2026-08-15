# AGENTS.md / CLAUDE.md

pnpm (JS/TS) + Cargo (Rust) workspace monorepo for alwinsden.com. Requires Node >= 24.19.0 and pnpm 10.29.3 (pinned in root `package.json`); the Rust service needs cargo 1.97. No tests and no CI config exist anywhere in this repo.

Package-specific commands, constraints, and gotchas live in each area's own `AGENTS.md` — `packages/ai-keyboard`, `packages/alwinsden-cloudflare`, `packages/alwinsden-docs`, `service/`. All of them plus this file are loaded in every session via `instructions` in `opencode.json`, so treat them as one combined rule set.

## Layout

- `packages/alwinsden-docs` — Docusaurus site (docs.alwinsden.com)
- `packages/alwinsden-cloudflare` — React Router v7 (framework mode, SSR) main site (alwinsden.com), deployed as a Cloudflare Worker with static assets
- `packages/ai-keyboard` — Expo SDK 57 / react-native app (newest, rougher; expo-router; single-screen react-native-paper chat)
- `service/` — Rust workspace member (axum API server; currently a placeholder in `src/main.rs`)
- `dist/` — JS build output for both web apps, gitignored
- `target/` — Cargo build output, gitignored

`README.md` and `CLAUDE.md` are one-line pointers to this file — update this file, not those.

## Commands (run from repo root)

- `pnpm dev:docs` / `pnpm dev:cloudflare` — web app dev servers
- `pnpm build` — builds both web apps
- Cargo commands (`cargo run -p service`, `cargo test`, `cargo clippy`) and the mobile builds (`pnpm dev:aikb:*`) are documented in their area's AGENTS.md files above.

## Constraints & gotchas (cross-cutting)

- `node-linker=hoisted` in `.npmrc` is deliberate (Docusaurus + Vite + Metro all resolve from root `node_modules`). Don't remove or switch to isolated.
- Build output goes to the **repo root** `dist/docs` and `dist/cloudflare`, not into the packages (set in `vite.config.ts` and the docs `build` script).
- pnpm 10 runs postinstall scripts **only** for packages listed in `allowBuilds` in `pnpm-workspace.yaml` (@swc/core, core-js, core-js-pure, esbuild, workerd). A new dependency with an install script (common with RN native modules) will silently skip it unless you add it there. pnpm 10 ignores the `pnpm` field in `package.json`.
- Shared versions (react, react-dom, @types/react, typescript) are pinned via `catalog:` protocol in `pnpm-workspace.yaml`. React is deliberately 19.2.3 for RN compatibility — don't bump it to satisfy one app. Change shared versions in the catalog, not per-package.

## Rules
- Always update docs when new commands are added.
- Always update docs when major changes to code or architecture.
