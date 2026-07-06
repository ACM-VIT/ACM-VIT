// COMPAT SHIM - content now lives in content/collections/tools-cc/ and
// content/singletons/domain-cc.json, edited via the CMS. The theme color is a
// design token and stays in code. This module re-exports the compiled
// snapshot from src/generated/.
import { items as tools } from "../generated/tools-cc";
import { data as page } from "../generated/domain-cc";
import type { Tool, DomainEvent } from "../platform/schema/common";

export const CC_THEME_COLOR = "#42CD9D";

export type CcTool = Tool;
export type CcEvent = DomainEvent;

export const ccTools: CcTool[] = tools;

export const ccHero = page.hero;
export const ccDescription = page.description;
export const ccStats = page.stats;
export const ccEvents: CcEvent[] = page.events ?? [];
export const ccFooterMessage = page.footerMessage;
