# alwinsden-docs

Docusaurus site (docs.alwinsden.com). Repo-wide rules: see ../../AGENTS.md (loaded in every session).

Deployed as a Cloudflare **Worker with static assets** (not Pages) via `wrangler.jsonc` in this package — Docusaurus is SSG, so every page is already fully-rendered HTML and no runtime worker is needed (assets-only worker, no `main`). Build output goes to the repo root `dist/docs` (set in the docs `build` script); `wrangler.jsonc` points `assets.directory` there.

## Commands (run from repo root)

- `pnpm dev:docs` — dev server
- `pnpm --filter alwinsden-docs build` — static build to root `dist/docs`
- `pnpm --filter alwinsden-docs preview` — serve the built site locally in workerd (`wrangler dev`)
- `pnpm --filter alwinsden-docs run deploy` — `wrangler deploy` (needs `wrangler login` or `CLOUDFLARE_API_TOKEN`)
- `pnpm --filter alwinsden-docs exec wrangler types` — after changing bindings in `wrangler.jsonc`

## Constraints & gotchas

- Static assets only — no Worker code. If you need server-side logic later, add a `main` handler and set `assets.run_worker_first`/`assets.binding`.
- `not_found_handling: "404-page"` serves Docusaurus's generated `404.html` for unknown paths; Docusaurus emits it on every build.
- `_redirects`/`_headers` files are **not** supported (that was Pages behavior); use `assets` routing rules or a Worker handler if redirects are ever needed.
- Domain is wired via the dashboard (Workers & Pages → alwinsden-docs → Domains & Routes → Custom domain), not in `wrangler.jsonc`.
