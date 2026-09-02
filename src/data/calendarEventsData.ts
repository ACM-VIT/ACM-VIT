// COMPAT SHIM - calendar entries now live in content/collections/calendar-events/
// and are edited via the CMS. DOMAIN_COLORS is presentation (theme tokens), so it
// stays in code. This module re-exports the compiled snapshot from src/generated/.
// NOTE: imported from client-side <script> tags too - keep it bundle-safe
// (type-only imports from the schema package, values only from src/generated/).
import { items as calendarEntries } from "../generated/calendar-events";
import type { CalendarEventEntry, EventDomain } from "../platform/schema/collections/misc";

export type { EventDomain } from "../platform/schema/collections/misc";
export type CalendarEvent = CalendarEventEntry;

export const DOMAIN_COLORS: Record<EventDomain, { bg: string; text: string; border: string; label: string; cassette: string }> = {
  tech:       { bg: 'rgba(155, 81, 224, 0.2)',  text: '#9B51E0', border: '#9B51E0', label: 'Tech',               cassette: '/cassettes/cassettes-cassette-tech.webp' },
  design:     { bg: 'rgba(255, 0, 84, 0.2)', text: '#FF0054', border: '#FF0054', label: 'Design',             cassette: '/cassettes/cassettes-cassette-design.webp' },
  research:   { bg: 'rgba(19, 93, 226, 0.2)', text: '#135DE2', border: '#135DE2', label: 'Research',           cassette: '/cassettes/cassettes-cassette-research.webp' },
  management: { bg: 'rgba(0, 180, 180, 0.2)',   text: '#00B4B4', border: '#00B4B4', label: 'Management',         cassette: '/cassettes/cassettes-cassette-management.webp' },
  cc:         { bg: 'rgba(66, 205, 157, 0.2)',   text: '#42CD9D', border: '#42CD9D', label: 'Competitive Coding', cassette: '/cassettes/cassettes-cassette-cc.webp' },
  blog:       { bg: 'rgba(249, 95, 74, 0.2)',    text: '#F95F4A', border: '#F95F4A', label: 'Blog Post',          cassette: '/cassettes/cassettes-cassette-tech.webp' },
};

export const SAMPLE_EVENTS: CalendarEvent[] = calendarEntries;
