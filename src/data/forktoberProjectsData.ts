// COMPAT SHIM - content now lives in content/collections/forktober-meta/ and
// content/collections/forktober-projects/, edited via the CMS. This module
// re-exports the compiled snapshot from src/generated/.
import { items as metaEntries } from "../generated/forktober-meta";
import { items as detailEntries } from "../generated/forktober-projects";
import type { ForktoberMetaEntry } from "../platform/schema/collections/misc";
import type { ProjectDetail } from "../platform/schema/collections/project-details";

export type ForktoberMeta = ForktoberMetaEntry;

export const forktoberMeta: ForktoberMeta[] = metaEntries;

export const forktoberByYear: Record<number, ForktoberMeta[]> = (() => {
  const map: Record<number, ForktoberMeta[]> = {};
  for (const p of forktoberMeta) {
    for (const y of p.years) {
      (map[y] ||= []).push(p);
    }
  }
  return map;
})();

export const forktoberYears = Object.keys(forktoberByYear)
  .map(Number)
  .sort((a, b) => b - a);

export const forktoberProjectDetails: Record<string, ProjectDetail> = Object.fromEntries(
  detailEntries.map((e) => [e.slug, e])
);
