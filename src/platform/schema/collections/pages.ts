import { z } from "zod";
import { blockNames } from "../../blocks/registry.ts";

/**
 * A composed page: an ordered list of block instances. Blocks are
 * self-contained sections (see src/platform/blocks/registry.ts) that read
 * their own content from the compiled snapshot, so a section instance only
 * needs to say which block and whether it's on.
 */
export const pageSectionSchema = z.object({
  block: z.enum(blockNames).describe("Which section to render (see the block registry)"),
  enabled: z.boolean().describe("Toggle off to hide without deleting"),
});
export type PageSection = z.infer<typeof pageSectionSchema>;

export const pageSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  title: z.string(),
  description: z.string().optional().describe("SEO meta description"),
  sections: z.array(pageSectionSchema),
});
export type PageEntry = z.infer<typeof pageSchema>;
