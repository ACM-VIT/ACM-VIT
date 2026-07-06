# Content platform

Git-based content platform for acmvit.in. Content lives as per-entry JSON in
`content/`, is validated and compiled into typed modules by a content compiler,
and is edited through the Keystatic admin UI at `/keystatic` - whose forms are
generated from the same schemas the compiler validates against. The site stays
fully static: zero runtime content fetches.

```
editors ──> /keystatic admin ──┐
                               ▼
                        content/ (JSON)          src/platform/schema/ (Zod)
                               │                          │
                               ▼                          │
                     content compiler  ◄──────────────────┘
     validate · normalize · refs · publishing · media audit · redirects
                               │
                               ▼
              src/generated/ (typed modules + reports)
                               │
                               ▼
      blocks + shims ──> pages/sections ──> astro build ──> CF edge
```

## The one rule

**Editors ship content. Developers ship capability.**
Content changes = edit JSON via `/keystatic` - no code review needed, the
compiler gates correctness. New *kinds* of content = add a schema in
`src/platform/schema/`; new *sections* = add a block in `src/blocks/` +
`src/platform/blocks/registry.ts`. Forms, validation, and types follow
automatically.

## Layout

| Path | What |
|---|---|
| `content/collections/<name>/<id>.json` | One file per entry - 24 collections (events, projects, tools, AOIs, team years, board, partners, home-domains, home-projects, blog-refs, speakers, pages, ...) |
| `content/singletons/<name>.json` | One-off documents (domain pages, z0d1ak, events-section, redirects, site-config, ...) |
| `src/platform/schema/` | Zod schemas + `registry.ts` - **single source of truth** for every content shape |
| `src/platform/blocks/registry.ts` | Block catalogue: the sections pages can be composed from |
| `src/platform/compiler/` | Validation, ref integrity, publishing filter, media audit, redirects emission |
| `src/platform/keystatic/` | Generates the entire Keystatic admin config from the registry |
| `src/blocks/*.astro` | Block components (section wrappers), mapped in `src/components/PageSections.astro` |
| `src/generated/` | Compiled snapshot + `usage.json` + `media-report.json` + `manifest.json` (gitignored) |
| `src/data/*.ts` | Compat shims re-exporting the snapshot under the old import paths |

## Commands

- `npm run content:compile` - validate + regenerate everything. Runs before
  `dev` and `build`; a broken entry can never ship. Rerun manually after
  editing content while the dev server is up.
- Fresh clone: run it once so `src/generated/` exists.

## What the compiler enforces

- Schema validation per entry; slug must match filename; duplicates fail.
- Referential integrity (project tech slugs -> tools, AOI tools -> domain
  tools, link maps -> event pages...). Error-level dangles fail the build.
- **Publishing workflow**: every collection entry accepts `visibility:
  "draft"`, `publishFrom`, `publishUntil` (ISO dates). Drafts and out-of-window
  entries are excluded from the snapshot; the fields never reach the bundle.
  Scheduling is realized by rebuilds - see infra setup below.
- **Media audit**: every asset path referenced from content must exist under
  `public/` (extension-swap tolerant for the webp/svg fallback pipelines).
  `src/generated/media-report.json` carries a usage index and an *advisory*
  orphan-candidate list - dynamic loaders (gallery, scroll frames, merch,
  design guides) are excluded, but never delete without checking.
- **Redirects**: `content/singletons/redirects.json` emits `public/_redirects`
  (Cloudflare Pages format). Add a rule whenever a slug changes.
- Canonicalization of Keystatic's empty-optional serialization ("" / null /
  [] / empty objects -> absent). Explicit `false` booleans are kept.
- Usage reverse-index (`usage.json`) - who references what, for safe deletes.

## Composed pages

Pages are ordered lists of **blocks** (`pages` collection). The homepage is
`content/collections/pages/home.json`: reorder sections or toggle them off in
the CMS. New entries in the collection ship at `/p/<slug>` on the next build
with zero code (namespaced under `/p/` so they can never shadow a hand-built
route).

Blocks are deliberately code: they own animation, layout, and data access.
Adding one = component in `src/blocks/`, entry in the block registry, mapping
in `PageSections.astro` - the build fails if the three drift. Blocks read
their own content from the snapshot, so section instances stay tiny
(`{block, enabled}`).

## Adding things

- **Entry**: `/keystatic` -> collection -> Add (or drop a JSON file).
- **Field**: extend the schema; form/type/validation update automatically.
- **Collection**: schema file + registry entry + content directory.
- **Block**: component + registry entry + `PageSections` mapping.
- **Image fields**: list them in the registry def's `images:` map and the
  admin renders an upload widget storing a plain public path.
- Shapes Keystatic can't model (discriminated unions like project-cassettes):
  `keystatic: false` - still compiled + validated, edit the JSON directly.

## Theme tokens stay in code

Domain theme colors, `DOMAIN_COLORS`, animation presets - presentation lives
in code and is reviewed like code. Editors cannot change brand from the CMS.

## Infra setup (not automatable from the repo)

1. **Scheduled publishing**: create a Cloudflare Pages deploy hook, then a
   Cloudflare Worker cron trigger (or GitHub Actions `schedule:`) that POSTs
   it daily (hourly if embargo times matter). `publishFrom`/`publishUntil`
   then take effect without anyone touching anything.
2. **Admin access control**: put `/keystatic` and `/api/keystatic/*` behind
   Cloudflare Access (Zero Trust -> Applications; allow the org's Google
   Workspace). Keystatic's production GitHub storage additionally requires
   `KEYSTATIC_GITHUB_REPO_OWNER`/`KEYSTATIC_GITHUB_REPO_NAME` and its GitHub
   App setup; until that's configured, edit locally and push - the compiler
   gates either path.
3. **Per-collection roles**: Keystatic has no RBAC. Enforce socially +
   via GitHub branch protection now; a thin authz proxy in front of
   `/api/keystatic` keyed on CF Access identity is the upgrade path.

## Remaining roadmap

- OG image generation at compile (satori/resvg) - needs new deps.
- Static site search (Pagefind postbuild).
- Hash-addressed media on R2 with upload-time variants (extend
  `scripts/upload-images-r2.mjs` against `media-report.json`).
- Block-level props in the page composer (per-block Zod props schemas are
  already supported by the registry types; the Keystatic conditional-field
  mapping is the missing piece).
- Known cleanup: 3 junk test entries in `home-projects` (`abcd`, `testing`,
  `pls-work` - flagged by compile warnings, runtime-filtered today); the
  8 advisory orphan candidates in `media-report.json`.
