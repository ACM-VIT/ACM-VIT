// COMPAT SHIM - content now lives in content/collections/achievements/ and
// content/singletons/achievements-page.json, edited via the CMS. This module
// re-exports the compiled snapshot from src/generated/.
import { items as achievementEntries } from "../generated/achievements";
import { data as pageData } from "../generated/achievements-page";
import type { AchievementEntry } from "../platform/schema/collections/misc";

export type Achievement = AchievementEntry;

export type Stat = {
  num: string;
  label: string;
  sub?: string;
};

/** Headline numbers for the stat band. */
export const stats: Stat[] = pageData.stats;

/** The reel of achievements, newest first. */
export const achievements: Achievement[] = achievementEntries;
