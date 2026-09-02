// COMPAT SHIM - content now lives in content/collections/tools-research/,
// content/collections/aois-research/ and content/singletons/domain-research.json,
// edited via the CMS. The theme color is a design token and stays in code.
// This module re-exports the compiled snapshot from src/generated/.
import { items as tools } from "../generated/tools-research";
import { items as aois } from "../generated/aois-research";
import { data as page } from "../generated/domain-research";
import type { Tool } from "../platform/schema/common";
import type { Aoi } from "../platform/schema/collections/aois";

export const RESEARCH_THEME_COLOR = "#135DE2";

export type ResearchTool = Tool;
export type ResearchAOI = Aoi;

export const researchTools: ResearchTool[] = tools;
export const researchAOIs: ResearchAOI[] = aois;

export const researchHero = page.hero;
export const researchDescription = page.description;
export const researchStats = page.stats;
export const researchFooterMessage = page.footerMessage;
