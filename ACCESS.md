# Access & Publishing (IAM) — ACM-VIT Content Studio

How editor access and publishing are governed, and the one-time GitHub setup
that makes the rules actually enforced.

---

## 1. The model in one paragraph

Editors work in the **Content Studio** (`/cms` → `/keystatic`). In production
the Studio uses **GitHub storage**: when someone saves, their browser commits
straight to GitHub. Because writes never pass through our server, the real
enforcement is **GitHub's own branch protection + CODEOWNERS** — not app code.
We make that governable from the CMS: a super-admin edits **Access & Roles**
(the `access-control` singleton), the compiler turns it into `.github/CODEOWNERS`,
and GitHub enforces it on every pull request.

```
Access & Roles (CMS)  ─►  content/singletons/access-control.json
        │  npm run content:compile  (also runs in CI on change)
        ▼
.github/CODEOWNERS  ─►  GitHub branch protection enforces review on PRs
```

## 2. Roles

Defined in **Access & Roles**; edit freely. Seeded roles:

| Role | Edit | Publish | Manage access |
|------|------|---------|---------------|
| **Owner** | everything | yes | yes (super-admin) |
| **Editor** | everything | yes | no |
| **Contributor** | a chosen list of collections | no (proposes) | no |
| **Viewer** | nothing (read-only) | no | no |

Each role has: `canEditAll`, `canEditCollections[]` (camelCase keys, e.g.
`events`, `boardMembers`), `canPublish`, `canManageAccess`. **Members** map a
GitHub username to a role. `defaultRole` covers signed-in users not listed
(seeded to `viewer` — deny by default).

## 3. What each piece enforces

- **The dashboard** (`/cms/dashboard`) is permission-aware: sections you can't
  edit are shown view-only, the IAM card only appears for super-admins. This is
  UX/guidance — it guides, it doesn't secure.
- **CODEOWNERS** (generated) requires an approval from a listed **publisher**
  before a PR touching a path can merge. The IAM file itself and CODEOWNERS are
  restricted to super-admins.
- **Branch protection** (you set this up, once — §4) is what makes the above
  binding: it blocks direct pushes to the live branch and requires the code-owner
  review.
- **`branchPrefix: 'studio/'`** (in `keystatic.config.ts`) namespaces every
  branch the Studio creates, so drafts are easy to see and protect.

## 4. One-time GitHub setup (required to enforce)

Do this once on the content repo (`ACM-VIT/ACM-VIT`):

0. **Set up login (GitHub App + env).** Local dev needs nothing — Keystatic runs
   in local storage with no login and the Studio treats you as owner. Production
   login needs a GitHub App and four env vars:

   | Var | Where | What |
   |-----|-------|------|
   | `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | build (`.env` / CI) | The App's slug |
   | `KEYSTATIC_GITHUB_CLIENT_ID` | Worker **secret** | From the App |
   | `KEYSTATIC_GITHUB_CLIENT_SECRET` | Worker **secret** | From the App |
   | `KEYSTATIC_SECRET` | Worker **secret** | `openssl rand -hex 32` |
   | `KEYSTATIC_GITHUB_REPO_OWNER` / `_NAME` | `wrangler.json` vars | Content repo |

   Create the App (GitHub → Settings → Developer settings → GitHub Apps → New):
   callback `https://acmvit.juxtaryct.com/api/keystatic/github/oauth/callback`,
   permissions Contents + Pull requests = Read & write, Metadata = Read-only;
   install it on the content repo. Set the secrets with
   `npx wrangler secret put KEYSTATIC_GITHUB_CLIENT_ID` (etc). Or just open
   `/keystatic` in prod and use Keystatic's "set up GitHub" wizard, which creates
   the App and gives you the values. Full notes in `.env.example`.

1. **Commit CODEOWNERS.** It's generated at `.github/CODEOWNERS` by
   `npm run content:compile`. Make sure it's committed (it is *not* gitignored).
2. **Fill in real usernames.** In the CMS → Access & Roles, replace the seeded
   `REPLACE_WITH_*` members with real GitHub logins, save, and recompile (CI does
   this automatically — §5).
3. **Protect the live branch.** Repo → Settings → Branches → Add rule for `main`:
   - ✅ Require a pull request before merging
   - ✅ Require review from **Code Owners**
   - ✅ Require approvals: **1**
   - (Strict separation) ✅ Do not allow bypassing the above settings
4. **Give editors repo access.** Everyone who uses the Studio needs **Write** on
   the repo (Keystatic commits as them). Branch protection is what stops Write
   from meaning "push anything to live".

### Two presets

- **Strict** (recommended for a rotating student board): enable "Do not allow
  bypassing". Every change — even an owner's — needs a second publisher's
  approval. True separation of duties.
- **Lite**: leave bypassing allowed. Owners/Editors can merge their own PRs
  (effectively publish live); Contributors still need a publisher's approval
  because they aren't code owners. Less friction, still gated.

## 5. Keeping enforcement in sync

`.github/workflows/sync-codeowners.yml` runs when `access-control.json` changes:
it recompiles and commits the regenerated `CODEOWNERS`. So the flow is fully
CMS-driven — edit Access & Roles, save, and the enforced rule updates itself.
You can also run it manually: **Actions → Sync CODEOWNERS from IAM → Run**.

To change access by hand: edit `content/singletons/access-control.json`, run
`npm run content:compile`, commit `.github/CODEOWNERS`.

## 6. The honest boundary

CMS-level IAM governs changes made **through the Studio + PRs**. Anyone with repo
**Write** can, in principle, bypass the CMS with a direct `git` operation — which
branch protection blocks for the live branch, but the repo is still the outer
trust boundary. **Keep repo Write to people the chapter trusts.** If you need to
grant editing to people you don't want touching the repo at all, that requires a
different storage model (a service-account commit proxy or Keystatic Cloud) —
out of scope for this setup, noted here so the limit is explicit.

## 7. Files

| File | Role |
|------|------|
| `content/singletons/access-control.json` | Source of truth (edit in CMS) |
| `src/platform/schema/singletons/access-control.ts` | Zod schema |
| `src/platform/access/permissions.ts` | Resolve a user → permissions |
| `src/platform/access/session.ts` | Identify the signed-in GitHub user |
| `src/platform/access/codeowners.ts` | IAM → CODEOWNERS generator |
| `.github/CODEOWNERS` | **Generated.** What GitHub enforces |
| `.github/workflows/sync-codeowners.yml` | Keeps CODEOWNERS in sync |
| `src/pages/cms/dashboard.astro` | Permission-aware control room |
