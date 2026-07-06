import { z } from "zod";

/**
 * Content platform schema core.
 *
 * A collection is a directory of per-entry JSON files under content/collections/<name>/.
 * A singleton is a single JSON file under content/singletons/<name>.json.
 * The Zod schema is the single source of truth: the compiler validates against it,
 * TypeScript types are inferred from it, and the Keystatic admin UI is generated from it.
 */

export interface RefRule {
  /** Target collection name the ids must exist in. */
  to: string;
  /** error fails the compile; warn prints and continues. */
  level: "error" | "warn";
  /** Human description shown in compile reports. */
  describe: string;
  /** Extract referenced ids from one entry. */
  collect: (entry: any) => string[];
}

export interface CollectionDef {
  kind: "collection";
  /** Directory name + generated module name. */
  name: string;
  label: string;
  schema: z.ZodTypeAny;
  /** Field used as the entry id; must equal the filename (sans .json). */
  idField: string;
  /** Sort key for the compiled array. "order" fields are numeric. */
  orderBy?: string;
  refs?: RefRule[];
  /** Type emitted into src/generated/<name>.ts. */
  typeName: string;
  /** Module path (relative to src/generated/) exporting the type. */
  typeImport: string;
  /** false = hidden from the Keystatic admin UI (still compiled + validated). */
  keystatic?: false | { itemLabel?: string };
  /**
   * Dot-paths of string fields that hold image public paths, mapped to their
   * upload location. The admin UI renders these as image upload fields; the
   * stored value stays a plain public path string. Array elements use the
   * array field's path (e.g. "techIcons.src", "cassetteImages").
   */
  images?: Record<string, { directory: string; publicPath: string }>;
}

export interface SingletonDef {
  kind: "singleton";
  name: string;
  label: string;
  schema: z.ZodTypeAny;
  refs?: RefRule[];
  typeName: string;
  typeImport: string;
  keystatic?: false | object;
  images?: Record<string, { directory: string; publicPath: string }>;
}

export type ContentDef = CollectionDef | SingletonDef;

export const CONTENT_ROOT = "content";
export const COLLECTIONS_DIR = `${CONTENT_ROOT}/collections`;
export const SINGLETONS_DIR = `${CONTENT_ROOT}/singletons`;
export const GENERATED_DIR = "src/generated";

/**
 * Publishing workflow fields, added to every object-shaped collection schema.
 * The compiler drops entries that are drafts or outside their publish window
 * and strips these fields from the emitted snapshot, so the site never sees
 * them. Scheduling is realized by any rebuild (set up a cron deploy hook -
 * see PLATFORM.md).
 */
export const publishingFields = {
  visibility: z
    .enum(["published", "draft"])
    .optional()
    .describe("Draft entries are excluded from the built site"),
  publishFrom: z
    .string()
    .optional()
    .describe("ISO date (YYYY-MM-DD); entry is hidden before this date"),
  publishUntil: z
    .string()
    .optional()
    .describe("ISO date (YYYY-MM-DD); entry is hidden after this date"),
};
export const PUBLISHING_KEYS = Object.keys(publishingFields);

export function defineCollection(def: Omit<CollectionDef, "kind">): CollectionDef {
  const schema =
    def.schema instanceof z.ZodObject ? def.schema.extend(publishingFields) : def.schema;
  return { kind: "collection", ...def, schema };
}

export function defineSingleton(def: Omit<SingletonDef, "kind">): SingletonDef {
  return { kind: "singleton", ...def };
}
