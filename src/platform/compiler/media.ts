/**
 * Media audit stage of the content compiler.
 *
 * - Walks public/ into a lightweight manifest (path, bytes, mtime).
 * - Verifies every asset path referenced from content actually exists
 *   (extension-swap tolerant: the site's webp pipeline serves .webp with
 *   original-format failsafes, and domain pages swap .webp for .svg).
 * - Emits a usage index (asset -> referencing entries) and an advisory
 *   orphan-candidate list. Orphans are candidates only: several directories
 *   are read dynamically (the gallery walks the directory, scroll videos are
 *   frame sequences) and code references assets grep can't see - never delete
 *   from this list without checking, see the "Dynamic asset loading" note.
 */
import { readdirSync, statSync, existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const ASSET_RE = /\.(webp|avif|png|jpe?g|svg|gif|ico|mp4|webm|mp3|wav|pdf|lottie|json5)$/i;
const SWAP_EXTS = ["webp", "svg", "png", "jpg", "jpeg", "avif"];

/** Directories consumed dynamically - excluded from orphan candidacy. */
const DYNAMIC_DIRS = [
  "gallery/",
  "scroll-video-frames/",
  "contact-scroll-frames/",
  "grep/",
  "docs/",
  // Merch asset paths are built from item slugs at runtime.
  "merch/",
  // Design-guideline pages build asset paths from logo naming conventions.
  "design/",
];

/** "/board/2024/foo.webp" -> "/board/2024/foo" (extension stripped). */
export function stemOf(path: string): string {
  return path.replace(/\.[a-z0-9]+$/i, "");
}

export interface MediaFile {
  path: string;
  bytes: number;
  mtime: number;
}

export function scanPublic(root: string): MediaFile[] {
  const publicDir = join(root, "public");
  const files: MediaFile[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      if (name === ".DS_Store") continue;
      const full = join(dir, name);
      const st = statSync(full);
      if (st.isDirectory()) walk(full);
      else files.push({ path: "/" + relative(publicDir, full), bytes: st.size, mtime: st.mtimeMs });
    }
  };
  walk(publicDir);
  return files;
}

/** All local asset paths mentioned anywhere in a compiled content value. */
export function collectAssetRefs(value: unknown, out: Set<string>) {
  if (typeof value === "string") {
    if (value.startsWith("/") && ASSET_RE.test(value)) out.add(value);
  } else if (Array.isArray(value)) {
    for (const v of value) collectAssetRefs(v, out);
  } else if (value && typeof value === "object") {
    for (const v of Object.values(value)) collectAssetRefs(v, out);
  }
}

/** Does the file exist, allowing the site's known extension fallbacks? */
export function assetExists(root: string, path: string): boolean {
  const full = join(root, "public", path);
  if (existsSync(full)) return true;
  const m = path.match(/^(.*)\.([a-z0-9]+)$/i);
  if (!m) return false;
  return SWAP_EXTS.some((ext) => ext !== m[2].toLowerCase() && existsSync(join(root, "public", `${m[1]}.${ext}`)));
}

/** Paths mentioned as string literals anywhere under src/ (advisory only). */
export function collectCodeRefs(root: string): Set<string> {
  const out = new Set<string>();
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const st = statSync(full);
      if (st.isDirectory()) {
        if (name === "generated" || name === "node_modules") continue;
        walk(full);
      } else if (/\.(astro|ts|tsx|js|mjs|css|scss|json)$/.test(name)) {
        const text = readFileSync(full, "utf8");
        for (const m of text.matchAll(/["'`(](\/[A-Za-z0-9_\-./]+\.(?:webp|avif|png|jpe?g|svg|gif|ico|mp4|webm|mp3|wav|pdf|ttf|otf|woff2?))["'`)]/g)) {
          out.add(m[1]);
        }
      }
    }
  };
  walk(join(root, "src"));
  return out;
}

export function isDynamicPath(path: string): boolean {
  return DYNAMIC_DIRS.some((d) => path.startsWith("/" + d));
}
