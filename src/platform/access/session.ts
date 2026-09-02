import type { AstroCookies } from "astro";

/** Keystatic's GitHub session cookie (github storage mode). */
const GH_COOKIE = "keystatic-gh-access-token";

export type CmsUser = {
  username: string | null;
  authenticated: boolean;
  source: "dev" | "github" | "none";
};

/**
 * Identify the signed-in Studio user.
 * - Local dev: Keystatic has no auth, so we return a dev identity (owner via
 *   permissions). Set CMS_DEV_USER to impersonate a real login.
 * - Production: read Keystatic's GitHub session cookie and resolve the login
 *   from the GitHub API. No second login - we reuse Keystatic's session.
 */
export async function getCmsUser(cookies: AstroCookies): Promise<CmsUser> {
  if (import.meta.env.DEV) {
    return {
      username: import.meta.env.CMS_DEV_USER || "dev-owner",
      authenticated: true,
      source: "dev",
    };
  }

  const token = cookies.get(GH_COOKIE)?.value;
  if (!token) return { username: null, authenticated: false, source: "none" };

  try {
    const res = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "acm-vit-content-studio",
        Accept: "application/vnd.github+json",
      },
    });
    if (!res.ok) return { username: null, authenticated: false, source: "none" };
    const json = (await res.json()) as { login?: string };
    return {
      username: json.login ?? null,
      authenticated: !!json.login,
      source: "github",
    };
  } catch {
    return { username: null, authenticated: false, source: "none" };
  }
}

export function isAuthenticated(cookies: AstroCookies): boolean {
  if (import.meta.env.DEV) return true;
  return !!cookies.get(GH_COOKIE)?.value;
}
