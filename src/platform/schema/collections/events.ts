import { z } from "zod";
import { statSchema, linkSchema } from "../common.ts";

export const eventThemeKey = z.enum(["tech", "cc", "design", "research", "management", "brand"]);

export const eventCollectibleItemSchema = z.object({
  name: z.string(),
  image: z.string().optional(),
  desc: z.string().optional(),
});

export const eventSponsorSchema = z.object({
  name: z.string(),
  tier: z.string().optional(),
  logo: z.string().optional(),
});

export const eventPastEditionSchema = z.object({
  year: z.string(),
  edition: z.string(),
  description: z.string(),
  links: z.array(linkSchema).optional(),
  collectibles: z.array(eventCollectibleItemSchema).optional(),
  sponsors: z.array(eventSponsorSchema).optional(),
});

export const eventDetailSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  title: z.string(),
  tagline: z.string(),
  eyebrow: z.string(),
  themeKey: eventThemeKey,
  cassetteSvg: z.string(),
  shortDescription: z.string(),
  longDescription: z.array(z.string()),
  format: z.string(),
  duration: z.string(),
  mode: z.enum(["Offline", "Online", "Hybrid"]),
  audience: z.string(),
  team: z.string(),
  organizedBy: z.string(),
  firstHeld: z.string().optional(),
  recurrence: z.string(),
  registrationUrl: z.string(),
  primaryCtaLabel: z.string(),
  stats: z.array(statSchema),
  tracks: z.array(z.object({ name: z.string(), description: z.string() })),
  schedule: z.array(
    z.object({ time: z.string(), title: z.string(), description: z.string().optional() })
  ),
  prizes: z.array(
    z.object({ place: z.string(), value: z.string(), note: z.string().optional() })
  ),
  highlights: z.array(
    z.object({ year: z.string(), title: z.string(), description: z.string() })
  ),
  perks: z.array(z.string()),
  faq: z.array(z.object({ q: z.string(), a: z.string() })),
  socials: z.array(linkSchema).optional(),
  pastEditions: z.array(eventPastEditionSchema).optional(),
  collectibles: z
    .array(z.object({ year: z.string(), items: z.array(eventCollectibleItemSchema) }))
    .optional(),
  instagramHandle: z.string().optional(),
  isAcmW: z.boolean().optional(),
  hideCtaBanner: z.boolean().optional(),
  themeColor: z.string().optional(),
  themeColorSecondary: z.string().optional(),
  speaker: z
    .object({
      name: z.string(),
      role: z.string(),
      institution: z.string(),
      image: z.string(),
      bio: z.array(z.string()),
      profileUrl: z.string().optional(),
    })
    .optional(),
});

export type EventDetail = z.infer<typeof eventDetailSchema>;
export type EventStat = z.infer<typeof statSchema>;
export type EventTrack = { name: string; description: string };
export type EventScheduleItem = { time: string; title: string; description?: string };
export type EventFaq = { q: string; a: string };
export type EventPrize = { place: string; value: string; note?: string };
export type EventHighlight = { year: string; title: string; description: string };
export type EventSponsor = z.infer<typeof eventSponsorSchema>;
export type EventEditionLink = z.infer<typeof linkSchema>;
export type EventPastEdition = z.infer<typeof eventPastEditionSchema>;
export type EventCollectibleItem = z.infer<typeof eventCollectibleItemSchema>;
export type EventCollectibleYear = { year: string; items: EventCollectibleItem[] };
