import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? "https://www.acmvit.in/").replace(/\/$/, "");

  // Disallow only crawl-worthless routes: server endpoints (/api/) and the
  // auth-gated CMS admin. Everything else (incl. CSS/JS) stays crawlable so
  // Google can render pages. NOTE: Disallow is crawl control, not de-indexing -
  // externally linked disallowed URLs can still be indexed. Anything that must
  // stay out of results needs a `noindex` on the page itself.
  const lines = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /cms/",
    "",
    `Sitemap: ${base}/sitemap.xml`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
