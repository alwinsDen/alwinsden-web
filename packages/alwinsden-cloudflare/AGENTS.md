# alwinsden-cloudflare (main site)

React Router v7 (framework mode, SSR) site for alwinsden.com, deployed as a Cloudflare **Worker** with static assets (not Pages). Repo-wide rules: see ../../AGENTS.md (loaded in every session).

## Commands (run from repo root)

- `pnpm dev:cloudflare` — dev server (`react-router dev`; server code runs in workerd via @cloudflare/vite-plugin)
- `pnpm --filter alwinsden-cloudflare lint` and `typecheck` — only app with lint/typecheck scripts
- `pnpm --filter alwinsden-cloudflare preview` — production build served locally in workerd
- `pnpm --filter alwinsden-cloudflare run deploy` — `wrangler deploy` (needs `wrangler login` or `CLOUDFLARE_API_TOKEN`)
- Build output goes to the repo root `dist/cloudflare` (`client/` assets + `server/` worker bundle; set via `buildDirectory` in `react-router.config.ts`).

## Constraints & gotchas

- SSR: routes render on the Worker per request. Keep components SSR-safe — no `window`/`document` at module scope or during render (`useEffect`/handlers are fine).
- SEO meta is per-route `meta()` exports in route modules (`src/root.tsx` has the defaults). The old Pages `functions/[[path]].js` HTMLRewriter hack is gone — don't recreate it.
- `react-router.config.ts` needs `future.v8_viteEnvironmentApi: true` — @cloudflare/vite-plugin and React Router's classic two-pass build disagree on output dirs without it (build fails on a missing `.vite/manifest.json`).
- Package is `"type": "module"` — required because @cloudflare/vite-plugin is ESM-only.
- `react-router-dom@7` is a deliberate direct dep: RR's dev server adds `react-router-dom` to `optimizeDeps.include` whenever it's resolvable, and with the hoisted root `node_modules` it finds Docusaurus's v5 copy → dev crashes with "No matching export … `useHistory`/`Switch`". The package-local v7 shadows it. Don't remove it.
- Deploy config is generated at build time (`dist/cloudflare/server/wrangler.json` + `.wrangler/deploy/config.json`); source config is `wrangler.jsonc`, worker entry is `workers/app.ts`. Run `pnpm --filter alwinsden-cloudflare exec wrangler types` after changing bindings.
- `public/wasm-transpiler/build/*` are committed build artifacts compiled from `external/wasm-transpiler/src/main.cpp` (C++ → WASM, built externally). Don't hand-edit; recompile and replace instead.
- Site routes are declared in `src/routes.ts` (RR framework convention), unlike ai-keyboard's file-based routes.
