import type { z } from "zod";

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
}

export type ContentDef = CollectionDef | SingletonDef;

export const CONTENT_ROOT = "content";
export const COLLECTIONS_DIR = `${CONTENT_ROOT}/collections`;
export const SINGLETONS_DIR = `${CONTENT_ROOT}/singletons`;
export const GENERATED_DIR = "src/generated";

export function defineCollection(def: Omit<CollectionDef, "kind">): CollectionDef {
  return { kind: "collection", ...def };
}

export function defineSingleton(def: Omit<SingletonDef, "kind">): SingletonDef {
  return { kind: "singleton", ...def };
}
