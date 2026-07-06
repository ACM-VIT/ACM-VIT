import { z } from "zod";

/** Grid cassette on /projects. Discriminated on `kind`. */
export const gridProjectSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("overlay"),
    slug: z.string(),
    order: z.number().optional(),
    name: z.string(),
    color: z.string(),
    image: z.string(),
    alt: z.string(),
    url: z.string(),
    sizePercent: z.number(),
    sizeAxis: z.enum(["width", "height"]),
    offsetY: z.number(),
  }),
  z.object({
    kind: z.literal("svg"),
    slug: z.string(),
    order: z.number().optional(),
    name: z.string(),
    color: z.string(),
    cassetteSvg: z.string(),
    alt: z.string(),
    url: z.string(),
    comingSoon: z.boolean().optional(),
  }),
]);
export type GridProjectEntry = z.infer<typeof gridProjectSchema>;

export const calendarDomain = z.enum(["tech", "design", "research", "management", "cc", "blog"]);
export type EventDomain = z.infer<typeof calendarDomain>;

export const calendarEventSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  id: z.string(),
  title: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  domain: calendarDomain,
  description: z.string(),
  location: z.string(),
  href: z.string().optional(),
});
export type CalendarEventEntry = z.infer<typeof calendarEventSchema>;

export const achievementSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  title: z.string(),
  org: z.string(),
  year: z.string(),
  blurb: z.string(),
  place: z.string().optional(),
  image: z.string().optional(),
});
export type AchievementEntry = z.infer<typeof achievementSchema>;

export const teamMemberSchema = z.object({
  title: z.string(),
  fullName: z.string(),
  position: z.string(),
  imageUrl: z.string(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  googleScholarUrl: z.string().optional(),
  isW: z.boolean().optional(),
});
export type TeamMemberEntry = z.infer<typeof teamMemberSchema>;

export const teamYearSchema = z.object({
  slug: z.string(),
  year: z.number(),
  /** Display label when the board spanned two academic years, e.g. "2019-2020". */
  label: z.string().optional(),
  members: z.array(teamMemberSchema),
});
export type TeamYearEntry = z.infer<typeof teamYearSchema>;

export const forktoberMetaSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  title: z.string(),
  repo: z.string(),
  years: z.array(z.number()),
  description: z.string(),
});
export type ForktoberMetaEntry = z.infer<typeof forktoberMetaSchema>;
