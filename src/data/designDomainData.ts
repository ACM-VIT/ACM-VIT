// COMPAT SHIM - content now lives in content/collections/tools-design/,
// content/collections/aois-design/ and content/singletons/domain-design.json,
// edited via the CMS. The theme color is a design token and stays in code.
// This module re-exports the compiled snapshot from src/generated/.
import { items as tools } from "../generated/tools-design";
import { items as aois } from "../generated/aois-design";
import { data as page } from "../generated/domain-design";
import type { Tool } from "../platform/schema/common";
import type { Aoi } from "../platform/schema/collections/aois";

export const DESIGN_THEME_COLOR = "#FF0054";

export type DesignTool = Tool;
export type DesignAOI = Aoi;
export type { DesignWork } from "../platform/schema/collections/aois";

export const designTools: DesignTool[] = tools;
export const designAOIs: DesignAOI[] = aois;

export const designHero = page.hero;
export const designDescription = page.description;
export const designStats = page.stats;
export const designFooterMessage = page.footerMessage;
