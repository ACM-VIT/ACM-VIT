/**
 * Keystatic collections + singletons generated from the schema registry.
 * Spread into keystatic.config.ts. Defs marked `keystatic: false` (shapes the
 * form generator can't model yet) are skipped - their JSON under content/ is
 * still compiled + validated like everything else.
 */
import { collections as collectionDefs, singletons as singletonDefs } from "../schema/registry.ts";
import { keystaticCollection, keystaticSingleton } from "./zod-adapter.ts";

export const generatedCollections = Object.fromEntries(
  collectionDefs
    .filter((d) => d.keystatic !== false)
    .map((d) => [d.name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), keystaticCollection(d)])
);

export const generatedSingletons = Object.fromEntries(
  singletonDefs
    .filter((d) => d.keystatic !== false)
    .map((d) => [d.name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), keystaticSingleton(d)])
);
