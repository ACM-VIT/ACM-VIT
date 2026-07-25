import type { APIContext } from "astro";
import { isAuthenticated } from "./session";

/**
 * Gate a CMS page behind login. Everything under /cms except the login page
 * itself requires an authenticated Studio session; unauthenticated visitors are
 * bounced to the branded login at /cms.
 *
 * Usage in a page frontmatter:
 *   const gate = requireCmsAuth(Astro); if (gate) return gate;
 *
 * In local dev there's no Keystatic auth, so this always passes (dev acts as
 * owner). In production it checks Keystatic's GitHub session cookie.
 */
export function requireCmsAuth(context: APIContext): Response | null {
  if (isAuthenticated(context.cookies)) return null;
  return context.redirect("/cms", 302);
}
