# Monorepo for alwinsden.com

Single root `package.json`; two apps in `packages/`. 

Build output is at repo root: `dist/docs` (Docusaurus) and `dist/cloudflare` (Vite).

### Apps

- [docs.alwinsden.com](https://docs.alwinsden.com) — `packages/alwinsden-docs` (Docusaurus)
- [alwinsden.com](https://alwinsden.com) — `packages/alwinsden-cloudflare` (Vite + React)

### Setup

```shell
pnpm install
```

### Development

```shell
pnpm dev:docs        # Docusaurus dev server
pnpm dev:cloudflare  # Vite dev server
```

### Build

```shell
pnpm build           # Build both apps → dist/docs, dist/cloudflare
pnpm build:docs      # Build docs only → dist/docs
pnpm build:cloudflare # Build main site only → dist/cloudflare
```
