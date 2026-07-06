import { z } from "zod";
import { domainEventSchema } from "../common.ts";

/** Work sample embedded on design AOI pages. */
export const designWorkSchema = z.object({
  title: z.string().optional(),
  href: z.string(),
  platform: z.enum(["youtube", "instagram"]),
  thumb: z.string(),
});
export type DesignWork = z.infer<typeof designWorkSchema>;

export const aoiProjectSchema = z.object({
  title: z.string(),
  desc: z.string(),
  cassette: z.string().optional(),
  href: z.string().optional(),
});
export type AoiProject = z.infer<typeof aoiProjectSchema>;

/**
 * Area-of-interest page. Superset across domains: tech AOIs carry projects +
 * events, design AOIs carry works, research AOIs are plain.
 */
export const aoiSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  key: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  longDescription: z.array(z.string()),
  cassetteSrc: z.string(),
  tools: z.array(z.string()),
  projects: z.array(aoiProjectSchema).optional(),
  events: z.array(domainEventSchema).optional(),
  works: z.array(designWorkSchema).optional(),
});
export type Aoi = z.infer<typeof aoiSchema>;
