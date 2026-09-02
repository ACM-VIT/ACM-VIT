import { z } from "zod";

/** Shared field shapes reused across collections. */

export const domainKey = z.enum(["tech", "design", "research", "management", "cc"]);
export type DomainKey = z.infer<typeof domainKey>;

export const statSchema = z.object({
  value: z.string(),
  label: z.string(),
});
export type Stat = z.infer<typeof statSchema>;

export const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

/** Tool logo shown on domain pages; one collection per domain. */
export const toolSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  name: z.string(),
  svgFile: z.string(),
  colorHex: z.string(),
  isDark: z.boolean().optional(),
  monochrome: z.boolean().optional(),
});
export type Tool = z.infer<typeof toolSchema>;

/** Event/project cassette teaser used inside AOI pages and domain singletons. */
export const domainEventSchema = z.object({
  title: z.string(),
  desc: z.string(),
  cassette: z.string(),
  slug: z.string().optional(),
  external: z.boolean().optional(),
  href: z.string().optional(),
});
export type DomainEvent = z.infer<typeof domainEventSchema>;
