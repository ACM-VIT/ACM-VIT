import { z } from "zod";
import { statSchema } from "../common.ts";

export const projectStatusSchema = z.enum([
  "online",
  "degraded",
  "maintenance",
  "offline",
  "archived",
]);
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export const projectLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  kind: z
    .enum(["github", "website", "play", "appstore", "download", "docs", "demo", "external"])
    .optional(),
});
export type ProjectLink = z.infer<typeof projectLinkSchema>;

export const projectDeveloperSchema = z.object({
  name: z.string().optional(),
  github: z.string(),
  role: z.string().optional(),
});
export type ProjectDeveloper = z.infer<typeof projectDeveloperSchema>;

export const projectDesignerSchema = z.object({
  name: z.string(),
  linkedin: z.string(),
  role: z.string().optional(),
});
export type ProjectDesigner = z.infer<typeof projectDesignerSchema>;

export const projectVersionSchema = z.object({
  label: z.string(),
  year: z.string(),
  blurb: z.string(),
  techSlugs: z.array(z.string()),
  developers: z.array(projectDeveloperSchema).optional(),
  designers: z.array(projectDesignerSchema).optional(),
  links: z.array(projectLinkSchema).optional(),
  themeColor: z.string().optional(),
});
export type ProjectVersion = z.infer<typeof projectVersionSchema>;

export const projectDetailSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  title: z.string(),
  tagline: z.string(),
  eyebrow: z.string(),
  themeColor: z.string(),
  themeColorSecondary: z.string().optional(),
  shortDescription: z.string(),
  longDescription: z.array(z.string()),
  status: projectStatusSchema,
  statusNote: z.string().optional(),
  cassetteSvg: z.string().optional(),
  heroImage: z.string().optional(),
  gallery: z.array(z.object({ src: z.string(), alt: z.string() })).optional(),
  galleryLayout: z.enum(["phone", "landscape"]).optional(),
  stats: z.array(statSchema).optional(),
  features: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
  techStack: z.array(z.object({ category: z.string(), slugs: z.array(z.string()) })),
  developers: z.array(projectDeveloperSchema).optional(),
  designers: z.array(projectDesignerSchema).optional(),
  links: z.array(projectLinkSchema),
  versions: z.array(projectVersionSchema).optional(),
  commitGraphSeed: z.number().optional(),
});
export type ProjectDetail = z.infer<typeof projectDetailSchema>;
export type ProjectStat = z.infer<typeof statSchema>;
export type ProjectFeature = { title: string; description: string };

/** Every tech slug referenced by a project entry (main stack + versions). */
export function collectTechSlugs(entry: ProjectDetail): string[] {
  const fromStack = entry.techStack.flatMap((g) => g.slugs);
  const fromVersions = (entry.versions ?? []).flatMap((v) => v.techSlugs);
  return [...fromStack, ...fromVersions];
}
