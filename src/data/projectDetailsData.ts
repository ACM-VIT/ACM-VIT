// COMPAT SHIM - content now lives in content/collections/project-details/ and
// is edited via the CMS. This module re-exports the compiled snapshot from
// src/generated/.
import { items as projectEntries } from "../generated/project-details";
import { techTools, type TechTool } from "./techDomainData";
import type { ProjectDetail } from "../platform/schema/collections/project-details";

export type {
  ProjectDetail,
  ProjectStat,
  ProjectLink,
  ProjectDeveloper,
  ProjectDesigner,
  ProjectStatus,
  ProjectVersion,
  ProjectFeature,
} from "../platform/schema/collections/project-details";

const techBySlug: Record<string, TechTool> = Object.fromEntries(
  techTools.map((t) => [t.slug, t])
);

export function lookupTechTool(slug: string): TechTool | undefined {
  return techBySlug[slug];
}

export const projectDetails: Record<string, ProjectDetail> = Object.fromEntries(
  projectEntries.map((e) => [e.slug, e])
);

export const projectSlugs = projectEntries.map((e) => e.slug);
