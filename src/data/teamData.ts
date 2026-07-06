// COMPAT SHIM - content now lives in content/collections/team-years/ and is
// edited via the CMS. This module re-exports the compiled snapshot from
// src/generated/ so existing imports keep working. Run: npm run content:compile
// The current board (latest year) is still sourced live from the Keystatic
// `board` singleton in team.astro.
import { items as teamYearEntries } from "../generated/team-years";
import type { TeamMemberEntry } from "../platform/schema/collections/misc";

export type TeamMember = TeamMemberEntry;

export interface TeamDivisionDef {
  key: string;
  label: string;
  accent: string;
}

export const boardDivision: TeamDivisionDef = {
  key: "board",
  label: "Board",
  accent: "#F95F4A",
};

/** The live board year, rendered from the Keystatic `board` singleton. */
export const CURRENT_BOARD_YEAR = 2026;

const yearsDesc = teamYearEntries.map((y) => y.year).sort((a, b) => b - a);

export const teamYears: readonly number[] = [CURRENT_BOARD_YEAR, ...yearsDesc];

export const yearLabels: Record<number, string> = Object.fromEntries(
  teamYearEntries.filter((y) => y.label).map((y) => [y.year, y.label!])
);
export const yearLabel = (year: number): string =>
  yearLabels[year] ?? String(year);

export const historicalBoards: Record<number, TeamMember[]> = Object.fromEntries(
  teamYearEntries.map((y) => [y.year, y.members])
);

export const board2025 = historicalBoards[2025];
export const board2024 = historicalBoards[2024];
export const board2023 = historicalBoards[2023];
export const board2022 = historicalBoards[2022];
export const board2021 = historicalBoards[2021];
export const board2020 = historicalBoards[2020];
export const board2019 = historicalBoards[2019];
export const board2018 = historicalBoards[2018];
export const board2017 = historicalBoards[2017];
