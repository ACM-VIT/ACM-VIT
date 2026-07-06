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
             validate · normalize · check refs · derive
                               │
                               ▼
                    src/generated/ (typed modules)
                               │
                               ▼
                  src/data/* shims ──> pages/sections ──> astro build ──> CF edge
```

## The one rule

**Editors ship content. Developers ship capability.**
Content changes = edit JSON via `/keystatic` (or directly) - no code review
needed, the compiler gates correctness. New *kinds* of content = add a schema
in `src/platform/schema/` - the admin form, validation, and types follow
automatically.

## Layout

| Path | What |
|---|---|
| `content/collections/<name>/<id>.json` | One file per entry (events, projects, tools, AOIs, team years, calendar, achievements, design products, forktober, cassettes) |
| `content/singletons/<name>.json` | One-off documents (domain pages, z0d1ak, achievements stat band, event link map) |
| `src/platform/schema/` | Zod schemas + `registry.ts` - **single source of truth** for every content shape |
| `src/platform/compiler/compile.ts` | Validates content, checks refs, normalizes, emits `src/generated/` |
| `src/platform/keystatic/` | Generates the Keystatic admin config from the schema registry |
| `src/generated/` | Compiled snapshot (gitignored - run `npm run content:compile`) |
| `src/data/*.ts` | Compat shims re-exporting the snapshot under the old import paths |
| `src/content/*.json` | Legacy Keystatic singletons (board, blogs, partners, speakers...) - predate the platform, still work |

## Commands

- `npm run content:compile` - validate + regenerate the snapshot. Runs
  automatically before `dev` and `build`, so a broken entry can never ship:
  the build fails first, with the file and field named.
- Fresh clone: run `npm run content:compile` once before the editor stops
  complaining about `src/generated/` imports.
- Content edited while `astro dev` is running? Re-run `content:compile` to
  refresh the snapshot (the dev server hot-reloads the generated modules).

## What the compiler enforces

- Every entry validates against its Zod schema (unknown fields are lossless -
  schemas cover every field; a parity check proved 379/379 entries roundtrip).
- Entry `slug` must match its filename; duplicates fail.
- Referential integrity: project tech slugs must exist in `tools-tech`, AOI
  tool lists must exist in the domain's tool collection, the Events-section
  link map must point at real event pages, etc. Dangling error-level refs fail
  the build (this caught a real broken link on the CC domain page on day one).
- A usage reverse-index (`src/generated/usage.json`) records who references
  what - the seed for safe-delete and orphan reporting.
- Canonicalization: Keystatic writes `""` / `null` / `[]` / all-empty objects
  for empty optional fields; the compiler prunes those back to "absent" so
  site logic keeps its original semantics. Explicit `false` booleans are kept.

## Adding things

**A new entry** - `/keystatic`, pick the collection, Add. Or drop a JSON file
in the collection directory. Compile validates either way.

**A new field** - add it to the schema in `src/platform/schema/collections/`.
The admin form, TS type, and validation update automatically. Optional fields
are backwards-compatible with existing entries; required fields will list
every entry that needs backfilling when you compile.

**A new collection** - schema file + entry in `registry.ts` + a directory
under `content/collections/`. That's all: form UI, validation, generated
module, manifest hash all follow from the registry entry.

**Shapes Keystatic can't model** (discriminated unions like the projects-grid
cassettes): mark `keystatic: false` in the registry. Entries stay compiler-
validated; edit the JSON directly.

## Theme tokens stay in code

Domain theme colors (`TECH_THEME_COLOR`...), `DOMAIN_COLORS`, and the board
division accent are presentation, not content - they live in the shims. An
editor cannot change brand colors from the dashboard; a redesign is a code
change, reviewed like one.

## Roadmap (see the architecture doc for the full phasing)

- Phase 2: block registry + page composition (pages as ordered section
  instances referencing schema-validated block props).
- Phase 3: media manifest on R2 (hash-addressed, usage-tracked, upload-time
  variants).
- Phase 4: roles via Cloudflare Access, branch-based drafts + preview deploys,
  cron rebuilds so `publishWindow` fields make scheduling/expiry data-driven.
- Migrate the legacy `src/content/` singleton-arrays into per-entry
  collections under `content/` and retire the handwritten Keystatic config.
