// COMPAT SHIM - content now lives in content/collections/tools-management/ and
// content/singletons/domain-management.json, edited via the CMS. The theme
// color is a design token and stays in code. This module re-exports the
// compiled snapshot from src/generated/.
import { items as tools } from "../generated/tools-management";
import { data as page } from "../generated/domain-management";
import type { Tool, DomainEvent } from "../platform/schema/common";

export const MANAGEMENT_THEME_COLOR = "#008080";

export type MgmtTool = Tool;
export type MgmtEvent = DomainEvent;

export const mgmtTools: MgmtTool[] = tools;

export const mgmtHero = page.hero;
export const mgmtDescription = page.description;
export const mgmtStats = page.stats;
export const mgmtEvents: MgmtEvent[] = page.events ?? [];
export const mgmtFooterMessage = page.footerMessage;
