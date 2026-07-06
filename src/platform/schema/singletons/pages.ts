import { z } from "zod";
import { statSchema, domainEventSchema } from "../common.ts";

/** Copy + stats band for a /domains/<domain> page. */
export const domainPageSchema = z.object({
  hero: z.string(),
  description: z.array(z.string()),
  stats: z.array(statSchema),
  footerMessage: z.string(),
  /** Management + CC list events directly on the domain page instead of AOIs. */
  events: z.array(domainEventSchema).optional(),
});
export type DomainPage = z.infer<typeof domainPageSchema>;

export const achievementsPageSchema = z.object({
  stats: z.array(
    z.object({ num: z.string(), label: z.string(), sub: z.string().optional() })
  ),
});
export type AchievementsPage = z.infer<typeof achievementsPageSchema>;

/** Maps Events.astro display titles to event detail slugs. */
export const eventLinksSchema = z.object({
  titleToSlug: z.array(z.object({ title: z.string(), slug: z.string() })),
});
export type EventLinks = z.infer<typeof eventLinksSchema>;
