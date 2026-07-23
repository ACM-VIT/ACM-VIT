import type { APIRoute } from "astro";
import { eventSlugs } from "../data/eventDetailsData";
import { projectSlugs } from "../data/projectDetailsData";
import { techAOIs } from "../data/techDomainData";
import { designAOIs } from "../data/designDomainData";
import { researchAOIs } from "../data/researchDomainData";
import { productGuides } from "../data/designProductsData";

export const prerender = true;

// Hand-maintained list of static routes. Dynamic routes below derive from the
// same data files that drive getStaticPaths, so they stay in sync with builds.
const staticPaths = [
  "/",
  "/events",
  "/projects",
  "/blogs",
  "/grep",
  "/gallery",
  "/achievements",
  "/merchandise",
  "/merchandise/2026",
  "/merchandise/2026/view",
  "/merchandise/2025",
  "/merchandise/2025/view",
  "/merchandise/2024",
  "/merchandise/2024/view",
  "/merchandise/2023",
  "/merchandise/2023/view",
  "/merchandise/board-farewell",
  "/merchandise/other",
  "/cassette-builder",
  "/community",
  "/team",
  "/partners",
  "/z0d1ak",
  "/calendar",
  "/faqs",
  "/code-of-conduct",
  "/sitemap",
  "/domains/tech",
  "/domains/cc",
  "/domains/design",
  "/domains/management",
  "/domains/research",
  "/design",
  "/design/logo",
  "/design/color",
  "/design/typography",
  "/design/grid",
  "/design/spacing",
  "/design/motion",
  "/design/styles",
  "/design/social",
  "/design/voice",
  "/design/website",
  "/design/footers",
  "/design/resources",
  "/sleeve-notes",
  "/sleeve-notes/giants",
];

const paths = [
  ...staticPaths,
  ...eventSlugs.map((s) => `/events/${s}`),
  ...projectSlugs.map((s) => `/projects/${s}`),
  ...techAOIs.map((a) => `/domains/tech/${a.key}`),
  ...designAOIs.map((a) => `/domains/design/${a.key}`),
  ...researchAOIs.map((a) => `/domains/research/${a.key}`),
  ...productGuides.map((p) => `/design/products/${p.slug}`),
];

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? "https://www.acmvit.in/").replace(/\/$/, "");
  const urls = paths
    .map((p) => `  <url><loc>${base}${p}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
