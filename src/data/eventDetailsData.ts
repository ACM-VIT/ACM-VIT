// COMPAT SHIM - content now lives in content/collections/events/ and
// content/singletons/event-links.json, edited via the CMS. This module
// re-exports the compiled snapshot from src/generated/.
import { items as eventEntries } from "../generated/events";
import { data as eventLinks } from "../generated/event-links";
import type { EventDetail } from "../platform/schema/collections/events";

export type {
  EventDetail,
  EventStat,
  EventTrack,
  EventScheduleItem,
  EventFaq,
  EventPrize,
  EventHighlight,
  EventSponsor,
  EventEditionLink,
  EventPastEdition,
  EventCollectibleItem,
  EventCollectibleYear,
} from "../platform/schema/collections/events";

const themeHex: Record<EventDetail["themeKey"], string> = {
  tech: "#9B51E0",
  cc: "#42CD9D",
  design: "#FF0054",
  research: "#135DE2",
  management: "#008080",
  brand: "#F95F4A",
};

export function getEventThemeHex(key: EventDetail["themeKey"]): string {
  return themeHex[key] ?? "#F95F4A";
}

export const eventDetails: Record<string, EventDetail> = Object.fromEntries(
  eventEntries.map((e) => [e.slug, e])
);

export const eventSlugs = eventEntries.map((e) => e.slug);

/** Map from Events.astro title to detail slug - keeps the cassette ordering in sync. */
export const titleToSlug: Record<string, string> = Object.fromEntries(
  eventLinks.titleToSlug.map((t) => [t.title, t.slug])
);
