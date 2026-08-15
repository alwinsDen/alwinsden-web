# alwinsden-cloudflare (main site)

Vite + React + react-router main site (alwinsden.com), deployed on Cloudflare Pages. Repo-wide rules: see ../../AGENTS.md (loaded in every session).

## Commands (run from repo root)

- `pnpm dev:cloudflare` — dev server
- `pnpm --filter alwinsden-cloudflare lint` and `typecheck` — only app with lint/typecheck scripts
- Build output goes to the repo root `dist/cloudflare` (set in `vite.config.ts`).

## Constraints & gotchas

- Cloudflare Pages: `functions/[[path]].js` rewrites `<title>`/meta/OG per URL at runtime. New routes needing custom SEO meta must be added there.
- `public/wasm-transpiler/build/*` are committed build artifacts compiled from `external/wasm-transpiler/src/main.cpp` (C++ → WASM, built externally). Don't hand-edit; recompile and replace instead.
- Site routes are manual (`src/main.tsx`), unlike ai-keyboard's file-based routes.
