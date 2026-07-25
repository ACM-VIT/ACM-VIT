import type { MiddlewareHandler } from "astro";
import { isAuthenticated } from "./platform/access/session";

// Keystatic's admin UI + API routes are injected by @keystatic/astro from
// node_modules, so we can't edit them at the page level. This middleware layers
// two things on top, keyed off the /keystatic path:
//   1. Theme    - inject the studio stylesheet into the admin HTML.
//   2. Redirect - after sign-in, land on our dashboard, not Keystatic's.
//
// Note: content writes are NOT enforceable here. In GitHub storage mode the
// browser commits straight to the GitHub GraphQL API (createCommitOnBranch),
// so writes never pass through this server. Real write/publish enforcement is
// GitHub-native - branch protection + CODEOWNERS + the branch/PR workflow.
// See ACCESS.md.
const THEME_LINK = '<link rel="stylesheet" href="/keystatic-theme.css">';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { pathname } = context.url;

  // 2. Post-login redirect: the bare admin home -> our dashboard. Only the exact
  //    home, so deep links (/keystatic/collection/...) still open the editor.
  if (pathname === "/keystatic" || pathname === "/keystatic/") {
    if (isAuthenticated(context.cookies)) {
      return context.redirect("/cms/dashboard", 302);
    }
  }

  const res = await next();

  // 1. Theme injection for the admin UI pages (not the /api data route).
  const isAdminUi = pathname === "/keystatic" || pathname.startsWith("/keystatic/");
  if (isAdminUi && (res.headers.get("content-type") || "").includes("text/html")) {
    const html = await res.text();
    const themed = html.includes("</head>")
      ? html.replace("</head>", `${THEME_LINK}</head>`)
      : THEME_LINK + html;
    const headers = new Headers(res.headers);
    headers.delete("content-length");
    return new Response(themed, { status: res.status, statusText: res.statusText, headers });
  }

  return res;
};
