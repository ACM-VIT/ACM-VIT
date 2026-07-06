import { defineCollection, defineSingleton, type ContentDef } from "./core.ts";
import { toolSchema, domainKey } from "./common.ts";
import { eventDetailSchema } from "./collections/events.ts";
import { projectDetailSchema, collectTechSlugs } from "./collections/project-details.ts";
import { aoiSchema } from "./collections/aois.ts";
import {
  gridProjectSchema,
  calendarEventSchema,
  achievementSchema,
  teamYearSchema,
  forktoberMetaSchema,
} from "./collections/misc.ts";
import { productGuideSchema } from "./collections/design-products.ts";
import { domainPageSchema, achievementsPageSchema, eventLinksSchema } from "./singletons/pages.ts";
import { z0d1akSchema } from "./singletons/z0d1ak.ts";

const DOMAINS = domainKey.options;
/** Domains whose landing page is structured around AOI sub-pages. */
const AOI_DOMAINS = ["tech", "design", "research"] as const;

const toolCollections = DOMAINS.map((domain) =>
  defineCollection({
    name: `tools-${domain}`,
    label: `Tools · ${domain}`,
    schema: toolSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "Tool",
    typeImport: "../platform/schema/common.ts",
    keystatic: { itemLabel: "name" },
  })
);

const aoiCollections = AOI_DOMAINS.map((domain) =>
  defineCollection({
    name: `aois-${domain}`,
    label: `Areas of interest · ${domain}`,
    schema: aoiSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "Aoi",
    typeImport: "../platform/schema/collections/aois.ts",
    keystatic: { itemLabel: "title" },
    refs: [
      {
        to: `tools-${domain}`,
        level: "error",
        describe: "AOI tool slugs must exist in the domain tool collection",
        collect: (e) => e.tools,
      },
      {
        to: "events",
        level: "warn",
        describe: "AOI event teasers with a slug should match an event detail page",
        collect: (e) => (e.events ?? []).map((ev: any) => ev.slug).filter(Boolean),
      },
    ],
  })
);

const domainPageSingletons = DOMAINS.map((domain) =>
  defineSingleton({
    name: `domain-${domain}`,
    label: `Domain page · ${domain}`,
    schema: domainPageSchema,
    typeName: "DomainPage",
    typeImport: "../platform/schema/singletons/pages.ts",
    refs: [
      {
        to: "events",
        level: "warn",
        describe: "Domain event teasers with a slug should match an event detail page",
        collect: (e) => (e.events ?? []).map((ev: any) => ev.slug).filter(Boolean),
      },
    ],
  })
);

export const registry: ContentDef[] = [
  defineCollection({
    name: "events",
    label: "Events",
    schema: eventDetailSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "EventDetail",
    typeImport: "../platform/schema/collections/events.ts",
    keystatic: { itemLabel: "title" },
  }),
  defineCollection({
    name: "project-details",
    label: "Projects",
    schema: projectDetailSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "ProjectDetail",
    typeImport: "../platform/schema/collections/project-details.ts",
    keystatic: { itemLabel: "title" },
    refs: [
      {
        to: "tools-tech",
        level: "error",
        describe: "Project tech stack slugs must exist in tools-tech",
        collect: collectTechSlugs,
      },
    ],
  }),
  defineCollection({
    name: "forktober-projects",
    label: "Forktober · project pages",
    schema: projectDetailSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "ProjectDetail",
    typeImport: "../platform/schema/collections/project-details.ts",
    keystatic: { itemLabel: "title" },
    refs: [
      {
        to: "tools-tech",
        level: "warn",
        describe: "Forktober tech stack slugs should exist in tools-tech",
        collect: collectTechSlugs,
      },
    ],
  }),
  defineCollection({
    name: "forktober-meta",
    label: "Forktober · repo list",
    schema: forktoberMetaSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "ForktoberMetaEntry",
    typeImport: "../platform/schema/collections/misc.ts",
    keystatic: { itemLabel: "title" },
  }),
  defineCollection({
    name: "project-cassettes",
    label: "Projects grid cassettes",
    schema: gridProjectSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "GridProjectEntry",
    typeImport: "../platform/schema/collections/misc.ts",
    // Discriminated union; Keystatic form generation doesn't model it yet.
    keystatic: false,
    refs: [
      {
        to: "project-details",
        level: "warn",
        describe: "Grid cassettes linking to /projects/<slug> should match a project page",
        collect: (e) =>
          e.url.startsWith("/projects/") ? [e.url.slice("/projects/".length)] : [],
      },
    ],
  }),
  defineCollection({
    name: "team-years",
    label: "Team · historical boards",
    schema: teamYearSchema,
    idField: "slug",
    orderBy: "slug",
    typeName: "TeamYearEntry",
    typeImport: "../platform/schema/collections/misc.ts",
    keystatic: { itemLabel: "slug" },
  }),
  defineCollection({
    name: "calendar-events",
    label: "Calendar events",
    schema: calendarEventSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "CalendarEventEntry",
    typeImport: "../platform/schema/collections/misc.ts",
    keystatic: { itemLabel: "title" },
  }),
  defineCollection({
    name: "achievements",
    label: "Achievements",
    schema: achievementSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "AchievementEntry",
    typeImport: "../platform/schema/collections/misc.ts",
    keystatic: { itemLabel: "title" },
  }),
  defineCollection({
    name: "design-products",
    label: "Design product guides",
    schema: productGuideSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "ProductGuide",
    typeImport: "../platform/schema/collections/design-products.ts",
    keystatic: { itemLabel: "name" },
  }),
  ...toolCollections,
  ...aoiCollections,
  ...domainPageSingletons,
  defineSingleton({
    name: "achievements-page",
    label: "Achievements page",
    schema: achievementsPageSchema,
    typeName: "AchievementsPage",
    typeImport: "../platform/schema/singletons/pages.ts",
  }),
  defineSingleton({
    name: "event-links",
    label: "Events section link map",
    schema: eventLinksSchema,
    typeName: "EventLinks",
    typeImport: "../platform/schema/singletons/pages.ts",
    refs: [
      {
        to: "events",
        level: "error",
        describe: "Events section title map must point at existing event pages",
        collect: (e) => e.titleToSlug.map((t: any) => t.slug),
      },
    ],
  }),
  defineSingleton({
    name: "z0d1ak",
    label: "z0d1ak CTF team",
    schema: z0d1akSchema,
    typeName: "Z0d1akData",
    typeImport: "../platform/schema/singletons/z0d1ak.ts",
  }),
];

export const collections = registry.filter((d) => d.kind === "collection");
export const singletons = registry.filter((d) => d.kind === "singleton");
