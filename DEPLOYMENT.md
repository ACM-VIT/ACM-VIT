# Deployment Guide — ACM-VIT Website

Complete, reproducible instructions for deploying this site. Covers the primary
target (**Cloudflare Workers** via Wrangler), the **R2 CDN** setup for heavy
assets, secrets, CI/CD, rollback, and how to deploy to **other platforms**
(Cloudflare Pages, Vercel, Netlify, Node/VPS, Docker).

---

## Contents

1. [Architecture at a glance](#1-architecture-at-a-glance)
2. [Prerequisites](#2-prerequisites)
3. [Environment variables — full reference](#3-environment-variables--full-reference)
4. [Local development](#4-local-development)
5. [CDN setup (Cloudflare R2)](#5-cdn-setup-cloudflare-r2)
6. [Build](#6-build)
7. [Deploy to Cloudflare Workers (primary target)](#7-deploy-to-cloudflare-workers-primary-target)
8. [CI/CD (optional — GitHub Actions)](#8-cicd-optional--github-actions)
9. [Rollback](#9-rollback)
10. [Deploying to other platforms](#10-deploying-to-other-platforms)
11. [Troubleshooting](#11-troubleshooting)
12. [Deploy checklist (Cloudflare Workers)](#12-deploy-checklist-cloudflare-workers)

**TL;DR (routine deploy, assets unchanged):**

```bash
nvm use && npm ci && npm run build && npx wrangler deploy
```

---

## 1. Architecture at a glance

| Piece | What it is |
|-------|------------|
| Framework | **Astro 5** (`output: 'server'` — server-side rendered, not static) |
| Adapter | `@astrojs/cloudflare` — builds a Cloudflare **Worker** |
| Runtime entry | `dist/_worker.js/index.js` |
| Static assets | `dist/` served via the Worker `ASSETS` binding |
| CMS | Keystatic (GitHub-backed, `ACM-VIT/ACM-VIT`) |
| SSR API routes | `src/pages/api/contact.ts` (Resend email), `src/pages/api/blog-dates.ts` |
| Content pipeline | `content/` JSON + Zod → `src/platform/compiler/compile.ts` → `src/generated/*` (regenerated every build; gitignored) |
| Heavy-asset CDN | Cloudflare **R2** bucket (`acm-vit-website-cdn`) served at `https://juxtaryct.com` |
| Live URL | `https://acmvit.juxtaryct.com` (custom domain on the Worker) |

**Key mental model:** the build produces a Worker + a `dist/` asset folder.
Wrangler uploads both to Cloudflare. Selected heavy folders under `public/`
are *additionally* mirrored to an R2 bucket and referenced from the CDN domain
at build time. `PUBLIC_*` env vars are **inlined into the bundle at build
time**; everything else is a **runtime** Worker var/secret.

---

## 2. Prerequisites

- **Node.js ≥ 22.18** (repo pins **24** in `.nvmrc`). Use `nvm use` or install Node 24.
- **npm** (repo ships `package-lock.json` — do not switch package managers).
- **Wrangler** (installed as a dev dependency; invoke with `npx wrangler …`).
- A **Cloudflare account** with:
  - Workers enabled.
  - **R2** enabled (for the asset/media/image CDN).
  - Access to the DNS zone for the site domain (`juxtaryct.com` / `acmvit.juxtaryct.com`).
- A **GitHub** account with access to `ACM-VIT/ACM-VIT` (for Keystatic CMS auth, optional for a plain deploy).
- A **Resend** account + API key (for the contact form to actually send mail).

Install dependencies:

```bash
nvm use            # picks up Node 24 from .nvmrc
npm ci             # clean, lockfile-exact install (preferred for deploys)
```

---

## 3. Environment variables — full reference

`PUBLIC_*` vars are **baked into the client/build at build time** (Vite inlines
them), so they must be present *wherever the build runs* (your laptop or CI).
Non-`PUBLIC_` vars are **runtime** values read on the Worker.

Copy the template and fill it in:

```bash
cp .env.example .env
```

| Variable | Scope | Purpose |
|----------|-------|---------|
| `PUBLIC_SITE_URL` | build | Canonical site URL. Feeds `og:image`, canonical tags, sitemap, robots. Prod uses `https://acmvit.juxtaryct.com`. **Not in `.env.example` — add it manually.** If unset, `astro.config` defaults to `https://www.acmvit.in` (wrong for the juxtaryct deploy — set it explicitly). |
| `PUBLIC_CDN_URL` | build | Base URL for the **static-asset CDN** (`getAssetUrl`). Only an allowlist of folders is routed to it (see §5.4). Currently `https://juxtaryct.com`. |
| `PUBLIC_MEDIA_CDN_URL` | build | Base URL for **audio + video** (`getMediaUrl`) → `/audio/*`, `/videos/*`. |
| `PUBLIC_IMAGE_CDN_URL` | build | Base URL for **board + team photos** (`getImageUrl`) → `/board/*`, `/team/*`. |
| `PUBLIC_ASSETS_PREFIX` | build | *Optional.* If set, routes the hashed `_astro/*` JS/CSS bundles to that host (Astro `build.assetsPrefix`). **Leave empty** unless you also upload `dist/_astro` to that host every build. |
| `PUBLIC_CONTACT_ENDPOINT` | build | URL the contact form POSTs to (usually `/api/contact`). |
| `R2_ENDPOINT` | upload only | `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` — S3 API endpoint for the upload scripts. |
| `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | upload only | R2 API token (Object Read & Write). Needed only where upload scripts run. |
| `R2_MEDIA_BUCKET_NAME` | upload only | Bucket for `deploy:media` (audio/videos). |
| `R2_IMAGES_BUCKET_NAME` | upload only | Bucket for `deploy:images` (board/team). |
| `R2_ASSETS_BUCKET_NAME` | upload only | Bucket for `deploy:cdn` (the rest of `public/`). |
| `RESEND_API_KEY` | **runtime secret** | Resend API key. Read on the Worker at request time. **Never bake into the bundle.** |
| `RESEND_FROM` | runtime secret | Verified "from" address for Resend. |
| `KEYSTATIC_GITHUB_REPO_OWNER` / `_NAME` | build+runtime | Keystatic target repo. Default `ACM-VIT` / `ACM-VIT` (also set in `wrangler.json` `vars`). |

> The `updateCDN.js` postbuild script (legacy AWS S3 + CloudFront) is **dormant
> by design**. It runs only when `NODE_ENV=production` *and* AWS creds are set.
> Leave the `AWS_*` vars empty — the current CDN is R2, not S3.

---

## 4. Local development

```bash
npm run dev        # runs content:compile (prebuild) then `astro dev`
```

- Uses `.env` for `PUBLIC_*` values.
- With CDN vars **empty**, all assets resolve from the local origin, so you can
  develop without any R2 setup.
- To exercise the Worker runtime locally (SSR + `locals.runtime.env`), build then:
  ```bash
  npm run build
  npx wrangler dev            # serves the built Worker locally
  ```
  For runtime secrets in `wrangler dev`, create a **`.dev.vars`** file:
  ```
  RESEND_API_KEY=re_xxx
  RESEND_FROM=hello@acmvit.in
  ```
  > ⚠️ `.dev.vars` is **not** in `.gitignore` currently — add it before creating
  > the file so you don't commit secrets:
  > ```bash
  > echo ".dev.vars" >> .gitignore
  > ```

---

## 5. CDN setup (Cloudflare R2)

The site offloads heavy files to an R2 bucket and references them from a CDN
domain. There are three logical CDNs that (today) all point at the **same
bucket** `acm-vit-website-cdn`, exposed at `https://juxtaryct.com`.

### 5.1 Create the bucket (once)

Dashboard → **R2** → *Create bucket* → e.g. `acm-vit-website-cdn`.

### 5.2 Enable public access

Either works; the object keys mirror the site paths (`/videos/x.mp4` → key
`videos/x.mp4`), so no path rewriting is needed.

- **r2.dev subdomain** (quick, rate-limited — dev/test):
  Bucket → *Settings* → *Public Access* → enable **R2.dev subdomain**.
  Gives `https://pub-<hash>.r2.dev`.
  ```bash
  npx wrangler r2 bucket dev-url enable acm-vit-website-cdn
  npx wrangler r2 bucket dev-url get   acm-vit-website-cdn
  ```
- **Custom domain** (production): Bucket → *Settings* → *Custom Domains* →
  add `juxtaryct.com` (must be a zone on your Cloudflare account). Wait until
  **Active**.

### 5.3 Create an R2 API token (for uploads)

Dashboard → **R2** → *Manage R2 API Tokens* → create **Object Read & Write**
token. Put the values in `.env`: `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`,
`R2_SECRET_ACCESS_KEY`.

### 5.4 What goes on the CDN (current policy)

| Helper | Env var | Folders routed to CDN |
|--------|---------|-----------------------|
| `getMediaUrl` | `PUBLIC_MEDIA_CDN_URL` | `/audio`, `/videos` |
| `getImageUrl` | `PUBLIC_IMAGE_CDN_URL` | `/board`, `/team` |
| `getAssetUrl` | `PUBLIC_CDN_URL` | **allowlist only** — `/design`, `/design-guide`, `/gallery`, `/projects`, `/aois`, `/merch`, `/contact-scroll-frames`, `/scroll-video-frames` |

Everything else (`/logos`, `/partners`, `/icons`, `/cassettes`, `/about`,
`/events`, `/blogs`, `_astro/*`, HTML …) stays on the **origin Worker**.

The allowlist lives in `src/utils/cdn.ts` (`CDN_ASSET_PREFIXES`). To add/remove
a folder from the CDN, edit that array — no other change needed.

### 5.5 Upload assets to R2

Run the uploader(s) from the repo root (needs the `R2_*` vars in `.env`). Each
script mirrors `public/…` → bucket, skipping files already present with the
same size (idempotent, safe to re-run):

```bash
npm run deploy:media     # public/audio + public/videos      -> R2_MEDIA_BUCKET_NAME
npm run deploy:images    # public/board + public/team        -> R2_IMAGES_BUCKET_NAME
npm run deploy:cdn       # the rest of public/ (allowlisted)  -> R2_ASSETS_BUCKET_NAME
```

> `deploy:cdn` uploads the **whole `public/` tree**; only the allowlisted
> folders are actually *referenced* from the CDN, but mirroring everything keeps
> the bucket a complete superset and makes future allowlist changes zero-touch.

**Re-upload only when the source files change.** Because the allowlist folders
use stable filenames (not content-hashed), remember: the uploader sets a
long-lived immutable `Cache-Control`. If you *replace* a file under an
allowlisted folder without renaming it, purge it from the CDN (R2 → object →
delete, or re-upload — but browsers/edge may serve the old one until TTL). For
frequently-changing assets prefer a new filename.

---

## 6. Build

```bash
npm run build
```

What happens, in order:

1. **`prebuild`** → `content:compile` regenerates `src/generated/*` from
   `content/` + `src/data/*`. (Never hand-edit `src/generated/*` — it is
   overwritten here and is gitignored.)
2. **`astro build`** → emits the Worker to `dist/_worker.js/` and static assets
   to `dist/`.
3. **`postbuild`** → `updateCDN.js` runs but **exits immediately** unless
   `NODE_ENV=production` + AWS creds are set (dormant; ignore).

Verify the CDN routing baked correctly (optional sanity check):

```bash
# allowlisted folders should point at the CDN host:
grep -rIoh 'https://juxtaryct.com/design/[^"]*' dist --include='*.html' | head
# _astro and other folders should stay origin-relative (no juxtaryct.com):
grep -rc 'juxtaryct.com/_astro/' dist --include='*.html'   # expect 0
```

---

## 7. Deploy to Cloudflare Workers (primary target)

The Worker is configured by **`wrangler.json`**:

```jsonc
{
  "name": "content-platform-acm-vit",
  "compatibility_date": "2026-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "main": "dist/_worker.js/index.js",
  "workers_dev": false,
  "routes": [{ "pattern": "acmvit.juxtaryct.com", "custom_domain": true }],
  "assets": { "directory": "dist", "binding": "ASSETS" },
  "vars": { "KEYSTATIC_GITHUB_REPO_OWNER": "ACM-VIT", "KEYSTATIC_GITHUB_REPO_NAME": "ACM-VIT" }
}
```

### 7.1 Authenticate

```bash
npx wrangler login          # opens browser OAuth
# — or, for CI, set an API token:
export CLOUDFLARE_API_TOKEN=…   # token with Workers Scripts:Edit, Workers Routes:Edit, R2 if uploading
export CLOUDFLARE_ACCOUNT_ID=…
```

### 7.2 Set runtime secrets (once per environment, and on rotation)

These are **not** baked into the bundle; the Worker reads them at request time
(`locals.runtime.env`):

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put RESEND_FROM
```

Non-secret runtime config (like the Keystatic repo) is already in
`wrangler.json` `vars`; add more there if needed.

### 7.3 Full deploy sequence

```bash
nvm use
npm ci

# 1) (only if CDN assets changed) push assets to R2
npm run deploy:cdn
npm run deploy:media
npm run deploy:images

# 2) build the Worker + assets (PUBLIC_* read from .env here)
npm run build

# 3) publish to Cloudflare
npx wrangler deploy
```

`wrangler deploy` uploads `dist/_worker.js` + the `dist/` assets and binds the
`acmvit.juxtaryct.com` custom domain (from `wrangler.json`). `workers_dev:
false` means there is no `*.workers.dev` URL — traffic is via the custom domain
only.

### 7.4 Custom domain / DNS

The route is declared as a `custom_domain` in `wrangler.json`, so Wrangler
provisions it automatically **provided the zone `juxtaryct.com` is on the same
Cloudflare account**. If DNS lives elsewhere, either move the zone to Cloudflare
or replace the route with a `routes` pattern + a manual proxied DNS record.

### 7.5 Verify the deploy

```bash
curl -sI https://acmvit.juxtaryct.com/ | grep -iE 'HTTP|server|cf-cache-status'
# a CDN asset (R2):
curl -sI https://juxtaryct.com/merch/merch-lineup.webp | grep -iE 'HTTP|content-type'
# an origin asset (Worker):
curl -sI https://acmvit.juxtaryct.com/logos/logos-acm-logo-black.webp | grep -iE 'HTTP|cf-cache-status'
```

Then load the site and confirm: homepage renders, the contact form submits
(exercises the Resend secret), the design pages / gallery / merch pull images
from `juxtaryct.com`, and `_astro` JS/CSS load from `acmvit.juxtaryct.com`.

---

## 8. CI/CD (optional — GitHub Actions)

No workflow exists yet. Minimal example (`.github/workflows/deploy.yml`):

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 24, cache: npm }
      - run: npm ci

      # PUBLIC_* must exist at build time:
      - name: Build
        env:
          PUBLIC_SITE_URL: https://acmvit.juxtaryct.com
          PUBLIC_CDN_URL: https://juxtaryct.com
          PUBLIC_MEDIA_CDN_URL: https://juxtaryct.com
          PUBLIC_IMAGE_CDN_URL: https://juxtaryct.com
          PUBLIC_CONTACT_ENDPOINT: /api/contact
        run: npm run build

      # (optional) sync assets to R2
      - name: Upload assets to R2
        env:
          R2_ENDPOINT: ${{ secrets.R2_ENDPOINT }}
          R2_ACCESS_KEY_ID: ${{ secrets.R2_ACCESS_KEY_ID }}
          R2_SECRET_ACCESS_KEY: ${{ secrets.R2_SECRET_ACCESS_KEY }}
          R2_ASSETS_BUCKET_NAME: acm-vit-website-cdn
          R2_MEDIA_BUCKET_NAME: acm-vit-website-cdn
          R2_IMAGES_BUCKET_NAME: acm-vit-website-cdn
        run: npm run deploy:cdn && npm run deploy:media && npm run deploy:images

      - name: Deploy Worker
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: deploy
```

Store `RESEND_API_KEY` / `RESEND_FROM` as **Worker secrets** (§7.2) once — they
don't belong in the workflow. Add the R2 + Cloudflare tokens as **GitHub Actions
secrets**.

---

## 9. Rollback

- **Fast:** Cloudflare dashboard → Workers & Pages → the Worker → *Deployments*
  → pick a previous version → *Rollback*.
- **CLI:**
  ```bash
  npx wrangler deployments list
  npx wrangler rollback [<version-id>]
  ```
- **CDN assets:** R2 has no versioning by default. To revert an asset, re-upload
  the previous file (same key) and clear the edge cache.

---

## 10. Deploying to other platforms

This project is built for Cloudflare with `@astrojs/cloudflare` and
`output: 'server'`. Because there are **SSR API routes** (`/api/contact`,
`/api/blog-dates`) and dynamic rendering, a pure static export is **not**
possible without removing that functionality. Each alternative platform requires
**swapping the Astro adapter** in `astro.config.mjs`. In every case, the CDN/R2
setup (§5) and the `PUBLIC_*` build-time vars stay the same — only the runtime
host changes, and runtime secrets move to that platform's env settings.

### 10.1 Cloudflare Pages

The same `@astrojs/cloudflare` build works on Pages.

```bash
npm run build
npx wrangler pages deploy dist --project-name acm-vit-website
```

Or connect the GitHub repo in the Pages dashboard with:
- Build command: `npm run build`
- Output directory: `dist`
- Env vars: all `PUBLIC_*` (build) + `RESEND_API_KEY` / `RESEND_FROM` (runtime).

> Note: `wrangler.json` targets **Workers**, not Pages. For Pages, configuration
> (routes, vars, secrets) is set in the Pages project settings instead.

### 10.2 Vercel

```bash
npm i @astrojs/vercel
```

```js
// astro.config.mjs
import vercel from '@astrojs/vercel/serverless';
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  // …rest unchanged
});
```

- Deploy with the Vercel Git integration or `vercel --prod`.
- Add `PUBLIC_*` (build) and `RESEND_API_KEY` / `RESEND_FROM` (runtime) in
  Vercel → Project → Settings → Environment Variables.
- Remove `wrangler.json` reliance; Vercel provides its own routing.

### 10.3 Netlify

```bash
npm i @astrojs/netlify
```

```js
// astro.config.mjs
import netlify from '@astrojs/netlify';
export default defineConfig({ output: 'server', adapter: netlify(), /* … */ });
```

- Deploy via Netlify Git integration or `netlify deploy --prod`.
- `netlify.toml` (if used): build command `npm run build`, publish `dist`.
- Set the same env vars in Netlify → Site settings → Environment.

### 10.4 Node.js server / VPS (self-hosted)

```bash
npm i @astrojs/node
```

```js
// astro.config.mjs
import node from '@astrojs/node';
export default defineConfig({ output: 'server', adapter: node({ mode: 'standalone' }), /* … */ });
```

```bash
npm run build
# runtime secrets via real env vars:
RESEND_API_KEY=re_xxx RESEND_FROM=hello@acmvit.in \
  HOST=0.0.0.0 PORT=4321 node ./dist/server/entry.mjs
```

Put it behind Nginx/Caddy for TLS, and use a process manager (pm2/systemd).
The API routes read `process.env.*` (the contact route falls back to
`process.env` when there's no CF runtime), so plain env vars work.

### 10.5 Docker (with the Node adapter)

```dockerfile
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# PUBLIC_* must be present at build:
ARG PUBLIC_SITE_URL
ARG PUBLIC_CDN_URL
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL PUBLIC_CDN_URL=$PUBLIC_CDN_URL
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
ENV HOST=0.0.0.0 PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
```

Pass `RESEND_API_KEY` / `RESEND_FROM` at `docker run -e …` (runtime).

---

## 11. Troubleshooting

| Symptom | Cause / Fix |
|---------|-------------|
| Site JS/CSS 404 after enabling a CDN | `PUBLIC_ASSETS_PREFIX` was set but `_astro` isn't on that host. Unset it (default) — `_astro` should stay on the origin Worker. |
| CDN images 404 | Asset not uploaded to R2, or bucket/domain not public. Run the matching `deploy:*` script; confirm §5.2 public access. |
| A folder isn't coming from the CDN | It's not in `CDN_ASSET_PREFIXES` (`src/utils/cdn.ts`), or it's referenced by a raw literal path not wrapped in `getAssetUrl` / `getMediaUrl` / `getImageUrl`. |
| Contact form 500 / "Missing RESEND…" | `RESEND_API_KEY` / `RESEND_FROM` not set as Worker secrets (§7.2). |
| `deploy:cdn` uploads to the wrong bucket | Set `R2_ASSETS_BUCKET_NAME` in `.env` (it no longer defaults to a valid bucket). |
| Stale content after asset replace | Long immutable `Cache-Control` on R2 objects. Rename the file or purge the edge/object. |
| Build fails in `content:compile` | Fix the source in `content/` or `src/data/*`; don't edit `src/generated/*` (regenerated). |
| Custom domain not provisioning | Zone must be on the same Cloudflare account (§7.4). |
| `updateCDN.js` doing unexpected uploads | It's the legacy S3/CloudFront path; keep `AWS_*` empty and `NODE_ENV` non-production for deploys that shouldn't touch it. |

---

## 12. Deploy checklist (Cloudflare Workers)

- [ ] `nvm use` (Node 24) and `npm ci`
- [ ] `.env` has correct `PUBLIC_*` (esp. `PUBLIC_SITE_URL`, `PUBLIC_CDN_URL`, media/image CDN)
- [ ] Worker secrets set: `RESEND_API_KEY`, `RESEND_FROM`
- [ ] Changed assets uploaded to R2 (`deploy:cdn` / `deploy:media` / `deploy:images`)
- [ ] `npm run build` succeeds
- [ ] `npx wrangler deploy`
- [ ] Verify homepage, contact form, CDN vs origin asset hosts (§7.5)
