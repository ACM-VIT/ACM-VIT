// COMPAT SHIM - content now lives in content/collections/tools-tech/,
// content/collections/aois-tech/ and content/singletons/domain-tech.json,
// edited via the CMS. The theme color is a design token and stays in code.
// This module re-exports the compiled snapshot from src/generated/.
import { items as tools } from "../generated/tools-tech";
import { items as aois } from "../generated/aois-tech";
import { data as page } from "../generated/domain-tech";
import type { Tool, DomainEvent } from "../platform/schema/common";
import type { Aoi, AoiProject } from "../platform/schema/collections/aois";

export const TECH_THEME_COLOR = "#9B51E0";

export type TechTool = Tool;
export type TechAOI = Aoi;
export type TechProject = AoiProject;
export type TechEvent = DomainEvent;

export const techTools: TechTool[] = tools;
export const techAOIs: TechAOI[] = aois;

export const techHero = page.hero;
export const techDescription = page.description;
export const techStats = page.stats;
export const techFooterMessage = page.footerMessage;
