/**
 * Content compiler.
 *
 * Reads content/ (per-entry JSON), validates every entry against its Zod
 * schema, enforces referential integrity across collections, then emits
 * typed modules into src/generated/ plus a usage reverse-index and a hashed
 * manifest. The site imports only the generated modules - never content/
 * directly - so a broken entry can never ship: the compile fails first.
 *
 * Run: npm run content:compile   (also runs on predev/prebuild)
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { registry } from "../schema/registry.ts";
import {
  COLLECTIONS_DIR,
  SINGLETONS_DIR,
  GENERATED_DIR,
  PUBLISHING_KEYS,
  type CollectionDef,
  type SingletonDef,
} from "../schema/core.ts";

const root = process.cwd();
const errors: string[] = [];
const warnings: string[] = [];

function fail(msg: string) {
  errors.push(msg);
}
function warn(msg: string) {
  warnings.push(msg);
}

function readJson(path: string): unknown {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    fail(`${path}: invalid JSON - ${(e as Error).message}`);
    return undefined;
  }
}

function formatZodIssues(prefix: string, issues: { path: (string | number)[]; message: string }[]) {
  for (const issue of issues) {
    fail(`${prefix}: ${issue.path.join(".") || "(root)"} - ${issue.message}`);
  }
}

import { normalizeValue } from "./normalize.ts";
import { scanPublic, collectAssetRefs, assetExists, collectCodeRefs, isDynamicPath, stemOf } from "./media.ts";

// ---- Publishing workflow ---------------------------------------------------
// Drafts and entries outside their publish window are excluded from the
// snapshot; the workflow fields themselves never reach the site bundle.

const today = new Date().toISOString().slice(0, 10);
let unpublished = 0;

function isLive(entry: any): boolean {
  if (entry.visibility === "draft") return false;
  if (entry.publishFrom && today < entry.publishFrom) return false;
  if (entry.publishUntil && today > entry.publishUntil) return false;
  return true;
}

function stripPublishing(entry: any): any {
  for (const k of PUBLISHING_KEYS) delete entry[k];
  return entry;
}

// ---- Load + validate ------------------------------------------------------

const compiledCollections = new Map<string, any[]>();
const compiledSingletons = new Map<string, any>();

for (const def of registry) {
  if (def.kind === "collection") {
    const dir = join(root, COLLECTIONS_DIR, def.name);
    if (!existsSync(dir)) {
      fail(`[${def.name}] missing directory ${COLLECTIONS_DIR}/${def.name}`);
      compiledCollections.set(def.name, []);
      continue;
    }
    const entries: any[] = [];
    const seen = new Set<string>();
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
      const raw = readJson(join(dir, file));
      if (raw === undefined) continue;
      const parsed = def.schema.safeParse(normalizeValue(def.schema, raw));
      if (!parsed.success) {
        formatZodIssues(`[${def.name}] ${file}`, parsed.error.issues);
        continue;
      }
      const entry = parsed.data;
      const id = String(entry[def.idField]);
      if (id !== file.replace(/\.json$/, "")) {
        fail(`[${def.name}] ${file}: ${def.idField} "${id}" does not match filename`);
      }
      if (seen.has(id)) fail(`[${def.name}] duplicate id "${id}"`);
      seen.add(id);
      if (!isLive(entry)) {
        unpublished++;
        continue;
      }
      entries.push(stripPublishing(entry));
    }
    if (def.orderBy === "order") {
      entries.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    } else if (def.orderBy) {
      entries.sort((a, b) => String(a[def.orderBy!]).localeCompare(String(b[def.orderBy!])));
    }
    compiledCollections.set(def.name, entries);
  } else {
    const file = join(root, SINGLETONS_DIR, `${def.name}.json`);
    if (!existsSync(file)) {
      fail(`[${def.name}] missing singleton ${SINGLETONS_DIR}/${def.name}.json`);
      continue;
    }
    const raw = readJson(file);
    if (raw === undefined) continue;
    const parsed = def.schema.safeParse(normalizeValue(def.schema, raw));
    if (!parsed.success) {
      formatZodIssues(`[${def.name}] ${def.name}.json`, parsed.error.issues);
      continue;
    }
    compiledSingletons.set(def.name, parsed.data);
  }
}

// ---- Referential integrity + usage reverse-index --------------------------

const idsByCollection = new Map<string, Set<string>>();
for (const def of registry) {
  if (def.kind !== "collection") continue;
  const ids = new Set<string>(
    (compiledCollections.get(def.name) ?? []).map((e) => String(e[def.idField]))
  );
  idsByCollection.set(def.name, ids);
}

/** usage[toCollection][id] = list of "collection/entryId" (or "singleton:name") referencing it. */
const usage: Record<string, Record<string, string[]>> = {};

function checkRefs(
  def: CollectionDef | SingletonDef,
  entry: any,
  from: string
) {
  for (const rule of def.refs ?? []) {
    const targetIds = idsByCollection.get(rule.to);
    if (!targetIds) {
      fail(`[${def.name}] ref rule targets unknown collection "${rule.to}"`);
      continue;
    }
    for (const id of rule.collect(entry)) {
      (usage[rule.to] ??= {})[id] ??= [];
      if (!usage[rule.to][id].includes(from)) usage[rule.to][id].push(from);
      if (!targetIds.has(id)) {
        const msg = `[${def.name}] ${from}: dangling ref "${id}" -> ${rule.to} (${rule.describe})`;
        rule.level === "error" ? fail(msg) : warn(msg);
      }
    }
  }
}

for (const def of registry) {
  if (!def.refs?.length) continue;
  if (def.kind === "collection") {
    for (const entry of compiledCollections.get(def.name) ?? []) {
      checkRefs(def, entry, `${def.name}/${entry[def.idField]}`);
    }
  } else {
    const data = compiledSingletons.get(def.name);
    if (data) checkRefs(def, data, `singleton:${def.name}`);
  }
}

// ---- Media audit ------------------------------------------------------------

const mediaFiles = scanPublic(root);
const mediaByPath = new Map(mediaFiles.map((f) => [f.path, f]));
const assetUsage: Record<string, string[]> = {};
const missingAssets: string[] = [];

function auditAssets(sourceId: string, value: unknown) {
  const refs = new Set<string>();
  collectAssetRefs(value, refs);
  for (const path of refs) {
    (assetUsage[path] ??= []).push(sourceId);
    if (!assetExists(root, path)) {
      missingAssets.push(`${sourceId} -> ${path}`);
      warn(`[media] ${sourceId}: references missing asset ${path}`);
    }
  }
}

for (const def of registry) {
  if (def.kind === "collection") {
    for (const entry of compiledCollections.get(def.name) ?? []) {
      auditAssets(`${def.name}/${entry[def.idField]}`, entry);
    }
  } else {
    const data = compiledSingletons.get(def.name);
    if (data) auditAssets(`singleton:${def.name}`, data);
  }
}

const codeRefs = collectCodeRefs(root);
// The webp pipeline keeps original-format failsafes next to every .webp, and
// domain pages swap extensions at runtime - so a file counts as referenced if
// any extension-sibling (same stem) is referenced.
const referencedStems = new Set(
  [...Object.keys(assetUsage), ...codeRefs].map(stemOf)
);
const orphanCandidates = mediaFiles
  .filter(
    (f) =>
      !referencedStems.has(stemOf(f.path)) &&
      !isDynamicPath(f.path) &&
      !/favicon|robots|_redirects|assetsignore|\.txt$|\.xml$/.test(f.path)
  )
  .map((f) => f.path);

// ---- Emit -----------------------------------------------------------------

if (errors.length === 0) {
  const outDir = join(root, GENERATED_DIR);
  mkdirSync(outDir, { recursive: true });
  const manifest: Record<string, { hash: string; count?: number }> = {};

  const header = (def: { name: string }) =>
    `// AUTO-GENERATED from content/ by the content compiler. DO NOT EDIT.\n` +
    `// Edit content/**/${def.name} entries (or the Keystatic admin UI) and run: npm run content:compile\n`;

  for (const def of registry) {
    let body: string;
    if (def.kind === "collection") {
      const entries = compiledCollections.get(def.name) ?? [];
      body =
        header(def) +
        `import type { ${def.typeName} } from "${def.typeImport}";\n\n` +
        `export const items: ${def.typeName}[] = ${JSON.stringify(entries, null, 2)};\n`;
      manifest[def.name] = {
        hash: createHash("sha256").update(JSON.stringify(entries)).digest("hex").slice(0, 12),
        count: entries.length,
      };
    } else {
      const data = compiledSingletons.get(def.name);
      body =
        header(def) +
        `import type { ${def.typeName} } from "${def.typeImport}";\n\n` +
        `export const data: ${def.typeName} = ${JSON.stringify(data, null, 2)};\n`;
      manifest[def.name] = {
        hash: createHash("sha256").update(JSON.stringify(data)).digest("hex").slice(0, 12),
      };
    }
    writeFileSync(join(outDir, `${def.name}.ts`), body);
  }

  writeFileSync(join(outDir, "usage.json"), JSON.stringify(usage, null, 2));
  writeFileSync(
    join(outDir, "manifest.json"),
    JSON.stringify({ builtAt: new Date().toISOString(), content: manifest }, null, 2)
  );
  // Cloudflare Pages picks up public/_redirects at deploy time. Generated
  // from the redirects singleton so slug changes never strand old URLs.
  const redirects = compiledSingletons.get("redirects");
  if (redirects) {
    const lines = redirects.rules.map((r: any) => `${r.from} ${r.to} ${r.status}`);
    writeFileSync(
      join(root, "public", "_redirects"),
      "# GENERATED from content/singletons/redirects.json - do not edit.\n" + lines.join("\n") + "\n"
    );
  }

  writeFileSync(
    join(outDir, "media-report.json"),
    JSON.stringify(
      {
        files: mediaFiles.length,
        bytesTotal: mediaFiles.reduce((n, f) => n + f.bytes, 0),
        contentReferenced: Object.keys(assetUsage).length,
        missing: missingAssets,
        // Advisory only - dynamic loaders and slug-built paths mean absence of
        // a reference here does NOT prove an asset is unused.
        orphanCandidates,
        usage: assetUsage,
      },
      null,
      2
    )
  );
}

// ---- Report ---------------------------------------------------------------

const nCollections = registry.filter((d) => d.kind === "collection").length;
const nSingletons = registry.length - nCollections;
const nEntries = [...compiledCollections.values()].reduce((n, a) => n + a.length, 0);

for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  ERROR ${e}`);
console.log(
  `content: ${nEntries} entries across ${nCollections} collections + ${nSingletons} singletons - ` +
    `${errors.length} error(s), ${warnings.length} warning(s)` +
    (unpublished ? ` - ${unpublished} draft/scheduled entr${unpublished === 1 ? "y" : "ies"} held back` : "")
);
console.log(
  `media: ${mediaByPath.size} files, ${Object.keys(assetUsage).length} referenced by content, ` +
    `${missingAssets.length} missing, ${orphanCandidates.length} orphan candidate(s) (advisory - see media-report.json)`
);
if (errors.length > 0) {
  console.error("content compile FAILED - nothing emitted");
  process.exit(1);
}
