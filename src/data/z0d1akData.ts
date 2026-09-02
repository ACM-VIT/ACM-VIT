// COMPAT SHIM - content now lives in content/singletons/z0d1ak.json and is
// edited via the CMS. Only verified CTFtime figures live there; do not invent
// results. Star-map line segments are stored as {from,to} objects and mapped
// back to tuples here. This module re-exports the compiled snapshot from
// src/generated/.
import { data } from "../generated/z0d1ak";
import type { RatingYear, CtfAchievement } from "../platform/schema/singletons/z0d1ak";

export type { RatingYear } from "../platform/schema/singletons/z0d1ak";
export type Achievement = CtfAchievement;
export type Member = { name: string; id: number };
export type ResultRow = { event: string; place: number; ctfPoints: number; ratingPoints: number };
export type TimelineEra = {
  year: number;
  title: string;
  rank: string;
  rating: number;
  events: number;
  blurb: string;
  highlight: string;
};

export const ratingHistory: RatingYear[] = data.ratingHistory;
export const current = ratingHistory[0];

/** Best world rank ever held. Only ever lower this, never raise it. */
export const bestWorldRank = data.bestWorldRank;

export const achievements: Achievement[] = data.achievements;

/** A single sequential trail traced through the results, left to right. */
export const achievementLines: [number, number][] = data.achievementLines.map(
  (l) => [l.from, l.to]
);

export const members: Member[] = data.members;
export const recentResults: ResultRow[] = data.recentResults;
export const timeline: TimelineEra[] = data.timeline;
export const present = data.present;
