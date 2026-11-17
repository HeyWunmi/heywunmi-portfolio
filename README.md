# HeyWunmi Portfolio

Private source backup for https://heywunmi.com/. Static Astro/TypeScript portfolio with approved images, videos and CV included in `public/`.

## Requirements

Validated with Node.js 24.21.0 and npm 11.19.0. Use the committed `package-lock.json` with `npm ci`. No environment file, API key, Cloudflare login, original asset folder or Python tooling is needed to build.

## Install and develop

```sh
npm ci
npm run dev
```

Development preview: http://127.0.0.1:4322/.

## Production build and checks

```sh
npm run check
npm run build:launch
node scripts/check-routes.mjs dist-launch --launch
npm run check:deploy
```

`build:launch` generates `dist-launch`, enables production indexing, defaults canonical URLs to https://heywunmi.com and runs the security gate. Do not substitute `npm run build` for production recovery: the default build deliberately disables indexing. Optional `PUBLIC_SITE_URL` must be an HTTPS origin without a trailing slash; leave it unset to reproduce the canonical site.

Preview the production artifact locally:

```sh
node node_modules/astro/bin/astro.mjs preview --outDir dist-launch --host 127.0.0.1 --port 4322
```

## Structure

- `src/`: pages, reusable components, content data and styles.
- `public/`: approved delivery assets and security headers; preserve these files.
- `scripts/`: production build and validation scripts.
- `wrangler.json`: existing Cloudflare Pages project/output configuration.

Historical generators, raw assets, private review material, audit artifacts, credentials and generated output are excluded. The asset registry records original filenames for provenance; the build uses the included public assets.

## Backup and deployment boundary

This repository is a private backup. No GitHub Actions deployment workflow is included. Installing, building and validating locally do not deploy. Do not connect the backup to Cloudflare or run deployment commands without separate explicit approval. Existing Pages project: `heywunmi-portfolio`.
