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
import { domainPageSchema, achievementsPageSchema, eventLinksSchema, redirectsSchema } from "./singletons/pages.ts";
import { z0d1akSchema } from "./singletons/z0d1ak.ts";
import { faqsPageSchema } from "./singletons/faqs.ts";
import { accessControlSchema } from "./singletons/access-control.ts";
import { pageSchema } from "./collections/pages.ts";
import {
  boardMemberSchema,
  partnerSchema,
  homeDomainSchema,
  homeProjectSchema,
  blogRefSchema,
  speakerSchema,
  eventsSectionSchema,
  siteConfigSchema,
} from "./collections/site.ts";

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
    name: "pages",
    label: "Pages",
    schema: pageSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "PageEntry",
    typeImport: "../platform/schema/collections/pages.ts",
    keystatic: { itemLabel: "title" },
  }),
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
  defineCollection({
    name: "board-members",
    label: "Board · current year",
    schema: boardMemberSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "BoardMemberEntry",
    typeImport: "../platform/schema/collections/site.ts",
    keystatic: { itemLabel: "fullName" },
    images: { imageUrl: { directory: "public/board", publicPath: "/board/" } },
  }),
  defineCollection({
    name: "partners",
    label: "Partners",
    schema: partnerSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "PartnerEntry",
    typeImport: "../platform/schema/collections/site.ts",
    keystatic: { itemLabel: "title" },
    images: { imageUrl: { directory: "public/partners", publicPath: "/partners/" } },
  }),
  defineCollection({
    name: "home-domains",
    label: "Homepage domain cards",
    schema: homeDomainSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "HomeDomainEntry",
    typeImport: "../platform/schema/collections/site.ts",
    keystatic: { itemLabel: "title" },
    images: {
      cassetteSvg: { directory: "public", publicPath: "/" },
      "techIcons.src": { directory: "public/domains", publicPath: "/domains/" },
      "aois.src": { directory: "public/aois", publicPath: "/aois/" },
    },
  }),
  defineCollection({
    name: "home-projects",
    label: "Homepage projects showcase",
    schema: homeProjectSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "HomeProjectEntry",
    typeImport: "../platform/schema/collections/site.ts",
    keystatic: { itemLabel: "cassetteAlt" },
    images: { cassetteSrc: { directory: "public/projects", publicPath: "/projects/" } },
    refs: [
      {
        to: "project-details",
        level: "warn",
        describe: "Homepage showcase cassettes should match a project detail page",
        collect: (e) => [e.slug],
      },
    ],
  }),
  defineCollection({
    name: "blog-refs",
    label: "Blog links",
    schema: blogRefSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "BlogRefEntry",
    typeImport: "../platform/schema/collections/site.ts",
    keystatic: { itemLabel: "link" },
    images: { cover: { directory: "public/blogs", publicPath: "/blogs/" } },
  }),
  defineCollection({
    name: "speakers",
    label: "Distinguished speakers",
    schema: speakerSchema,
    idField: "slug",
    orderBy: "order",
    typeName: "SpeakerEntry",
    typeImport: "../platform/schema/collections/site.ts",
    keystatic: { itemLabel: "name" },
    images: { image: { directory: "public/community", publicPath: "/community/" } },
  }),
  ...toolCollections,
  ...aoiCollections,
  ...domainPageSingletons,
  defineSingleton({
    name: "events-section",
    label: "Homepage events section",
    schema: eventsSectionSchema,
    typeName: "EventsSection",
    typeImport: "../platform/schema/collections/site.ts",
    images: { cassetteImages: { directory: "public/events", publicPath: "/events/" } },
  }),
  defineSingleton({
    name: "redirects",
    label: "Redirects",
    schema: redirectsSchema,
    typeName: "Redirects",
    typeImport: "../platform/schema/singletons/pages.ts",
  }),
  defineSingleton({
    name: "site-config",
    label: "Site config",
    schema: siteConfigSchema,
    typeName: "SiteConfig",
    typeImport: "../platform/schema/collections/site.ts",
  }),
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
  defineSingleton({
    name: "faqs-page",
    label: "FAQs page",
    schema: faqsPageSchema,
    typeName: "FaqsPage",
    typeImport: "../platform/schema/singletons/faqs.ts",
  }),
  defineSingleton({
    name: "access-control",
    label: "Access & Roles (IAM)",
    schema: accessControlSchema,
    typeName: "AccessControl",
    typeImport: "../platform/schema/singletons/access-control.ts",
  }),
];

export const collections = registry.filter((d) => d.kind === "collection");
export const singletons = registry.filter((d) => d.kind === "singleton");
