import { z } from "zod";
import { teamMemberSchema } from "./misc.ts";

/**
 * Collections migrated from the legacy src/content/ Keystatic singletons
 * (board, partners, domains, projects, blogs, speakers). One entry per item
 * instead of one giant array per file.
 */

export const boardMemberSchema = teamMemberSchema.extend({
  slug: z.string(),
  order: z.number().optional(),
});
export type BoardMemberEntry = z.infer<typeof boardMemberSchema>;

export const partnerSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  title: z.string(),
  imageUrl: z.string().optional(),
  link: z.string().optional(),
});
export type PartnerEntry = z.infer<typeof partnerSchema>;

/** Homepage domain cards + /domains/[domain] pages. */
export const homeDomainSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  key: z.string(),
  title: z.string(),
  description: z.string(),
  themeColor: z.string(),
  cassetteSvg: z.string().optional(),
  buttonText: z.string().optional(),
  techIcons: z.array(z.object({ src: z.string().optional(), alt: z.string().optional() })),
  aois: z.array(z.object({ src: z.string().optional(), alt: z.string().optional() })),
});
export type HomeDomainEntry = z.infer<typeof homeDomainSchema>;

/** Homepage projects showcase cassette (art + button styling). */
export const homeProjectSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  cassetteSrc: z.string().optional(),
  // Full standalone cassette art (like the /projects grid). When set, the
  // showcase renders it directly instead of wrapping a photo in a Cassette frame.
  cassetteSvg: z.string().optional(),
  cassetteAlt: z.string(),
  description1: z.string(),
  description2: z.string().optional(),
  primaryBgColor: z.string(),
  primaryTextColor: z.string().optional(),
  primaryBorderColor: z.string().optional(),
  primaryBorderRadius: z.string().optional(),
  visitWebsiteText: z.string().optional(),
  visitWebsiteUrl: z.string().optional(),
  visitWebsiteBgColor: z.string().optional(),
  visitWebsiteTextColor: z.string().optional(),
  visitWebsiteBorderColor: z.string().optional(),
  visitWebsiteBorderRadius: z.string().optional(),
  icons: z
    .array(
      z.object({
        type: z.string().optional(),
        backgroundColor: z.string().optional(),
        textColor: z.string().optional(),
        borderColor: z.string().optional(),
        iconColor: z.string().optional(),
        borderRadius: z.string().optional(),
        url: z.string().optional(),
      })
    )
    .optional(),
  textColor: z.string().optional(),
  contentBlockBackground: z.string().optional(),
  hoverShadow: z.string().optional(),
});
export type HomeProjectEntry = z.infer<typeof homeProjectSchema>;

export const blogRefSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  link: z.string(),
  cover: z.string().optional(),
});
export type BlogRefEntry = z.infer<typeof blogRefSchema>;

export const speakerSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  name: z.string(),
  subtitle: z.string().optional(),
  role: z.string().optional(),
  image: z.string().optional(),
  sessionTitle: z.string().optional(),
  sessionTitleHighlight: z.string().optional(),
  description: z.array(z.string()),
});
export type SpeakerEntry = z.infer<typeof speakerSchema>;

/** Homepage Events section: cassette art + per-cassette info map. */
export const eventsSectionSchema = z.object({
  cassetteImages: z.array(z.string()),
  info: z.array(
    z.object({
      key: z.string(),
      title: z.string(),
      site: z.string().optional(),
      description: z.string(),
    })
  ),
});
export type EventsSection = z.infer<typeof eventsSectionSchema>;

export const siteConfigSchema = z.object({
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
});
export type SiteConfig = z.infer<typeof siteConfigSchema>;
