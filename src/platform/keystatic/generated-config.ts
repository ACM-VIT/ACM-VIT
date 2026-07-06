/**
 * Keystatic collections + singletons generated from the schema registry.
 * Spread into keystatic.config.ts. Defs marked `keystatic: false` (shapes the
 * form generator can't model yet) are skipped - their JSON under content/ is
 * still compiled + validated like everything else.
 */
import { collections as collectionDefs, singletons as singletonDefs } from "../schema/registry.ts";
import { keystaticCollection, keystaticSingleton } from "./zod-adapter.ts";

/** Legacy singletons in keystatic.config.ts already use some of these keys. */
const KEY_RENAMES: Record<string, string> = { events: "eventPages" };

export const generatedCollections = Object.fromEntries(
  collectionDefs
    .filter((d) => d.keystatic !== false)
    .map((d) => {
      const key = d.name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return [KEY_RENAMES[key] ?? key, keystaticCollection(d)];
    })
);

export const generatedSingletons = Object.fromEntries(
  singletonDefs
    .filter((d) => d.keystatic !== false)
    .map((d) => [d.name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), keystaticSingleton(d)])
);
