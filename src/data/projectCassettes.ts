// COMPAT SHIM - content now lives in content/collections/project-cassettes/
// (raw JSON entries; not yet surfaced in the Keystatic UI because of the
// overlay/svg union). This module re-exports the compiled snapshot from
// src/generated/.
import { items as cassetteEntries } from "../generated/project-cassettes";
import type { GridProjectEntry } from "../platform/schema/collections/misc";

export type GridProject = GridProjectEntry;

export const projectCassettes: GridProject[] = cassetteEntries;

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const byName: Record<string, GridProject> = {};
for (const p of projectCassettes) {
  byName[normalize(p.name)] = p;
  byName[normalize(p.alt)] = p;
}

/** Find a project's cassette by display title (case/space/dash insensitive). */
export function getProjectCassetteByTitle(title: string): GridProject | null {
  return byName[normalize(title)] ?? null;
}
