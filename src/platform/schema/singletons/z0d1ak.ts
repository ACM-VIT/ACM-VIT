import { z } from "zod";

export const ratingYearSchema = z.object({
  year: z.number(),
  globalRank: z.number(),
  countryRank: z.number(),
  ratingPoints: z.number(),
  events: z.number(),
});
export type RatingYear = z.infer<typeof ratingYearSchema>;

export const ctfAchievementSchema = z.object({
  event: z.string(),
  place: z.number(),
  ratingPoints: z.number().optional(),
  ctfPoints: z.number().optional(),
  x: z.number(),
  y: z.number(),
  magnitude: z.number(),
});
export type CtfAchievement = z.infer<typeof ctfAchievementSchema>;

export const z0d1akSchema = z.object({
  ratingHistory: z.array(ratingYearSchema),
  /** Best world rank ever held. Only ever lower this, never raise it. */
  bestWorldRank: z.number(),
  achievements: z.array(ctfAchievementSchema),
  /** Star-map trail segments; indexes into achievements. */
  achievementLines: z.array(z.object({ from: z.number(), to: z.number() })),
  members: z.array(z.object({ name: z.string(), id: z.number() })),
  recentResults: z.array(
    z.object({
      event: z.string(),
      place: z.number(),
      ctfPoints: z.number(),
      ratingPoints: z.number(),
    })
  ),
  timeline: z.array(
    z.object({
      year: z.number(),
      title: z.string(),
      rank: z.string(),
      rating: z.number(),
      events: z.number(),
      blurb: z.string(),
      highlight: z.string(),
    })
  ),
  present: z.object({ label: z.string(), rank: z.string(), note: z.string() }),
});
export type Z0d1akData = z.infer<typeof z0d1akSchema>;
