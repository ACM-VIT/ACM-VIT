import type { AccessControl } from "../schema/singletons/access-control.ts";
import type { ContentDef } from "../schema/core.ts";

const camel = (kebab: string) => kebab.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const gh = (u: string) => "@" + u.replace(/^@/, "");

/**
 * Generate a GitHub CODEOWNERS file from the access-control singleton.
 *
 * This is what makes the IAM *actually enforced*: in GitHub storage mode the
 * Studio commits straight to GitHub, so the only real gate is GitHub's own
 * branch protection + CODEOWNERS review. We derive CODEOWNERS from the roles/
 * members the chapter edits in the CMS, so "who may publish what" is defined in
 * one place and compiled into the rule GitHub enforces on every PR.
 *
 * Reviewer for a content path = members whose role can PUBLISH it (canPublish
 * and may edit it). A required reviewer must approve before a PR merges, so
 * contributors (canPublish:false) can open PRs but a publisher must sign off.
 * The access-control file itself is restricted to super-admins (canManageAccess).
 */
export function generateCodeowners(ac: AccessControl, registry: ContentDef[]): string {
  const roleById = new Map(ac.roles.map((r) => [r.id, r]));

  const membersWhere = (pred: (roleId: string) => boolean): string[] =>
    ac.members
      .filter((m) => {
        const role = roleById.get(m.role);
        return role ? pred(role.id) : false;
      })
      .map((m) => gh(m.githubUsername));

  const canPublishKey = (roleId: string, camelKey: string) => {
    const r = roleById.get(roleId);
    if (!r || !r.canPublish) return false;
    return r.canEditAll || (r.canEditCollections ?? []).includes(camelKey);
  };

  // Publishers who can publish *anything* - the default owners + fallback.
  const globalPublishers = membersWhere((id) => {
    const r = roleById.get(id)!;
    return r.canPublish && r.canEditAll;
  });
  const superAdmins = membersWhere((id) => !!roleById.get(id)!.canManageAccess);

  const lines: string[] = [
    "# GENERATED from content/singletons/access-control.json by the content compiler.",
    "# Do not edit by hand - edit Access & Roles in the Content Studio and recompile.",
    "#",
    "# CODEOWNERS + branch protection on the live branch is what enforces the IAM:",
    "# a listed owner must approve a PR touching these paths before it can merge.",
    "",
  ];

  // Fallback: everything content-related needs a global publisher's review.
  if (globalPublishers.length) {
    lines.push("# Fallback - any content change needs a publisher's approval", `content/ ${globalPublishers.join(" ")}`, "");
  }

  // Per-collection / per-singleton ownership.
  lines.push("# Per-section publishers");
  for (const def of registry) {
    if (def.name === "access-control") continue; // handled separately below
    const camelKey = camel(def.name);
    const reviewers = membersWhere((id) => canPublishKey(id, camelKey));
    // Fall back to global publishers so no path is left unguarded.
    const owners = (reviewers.length ? reviewers : globalPublishers);
    if (!owners.length) continue;
    const path =
      def.kind === "collection"
        ? `content/collections/${def.name}/`
        : `content/singletons/${def.name}.json`;
    lines.push(`${path} ${owners.join(" ")}`);
  }

  // The IAM config itself: only super-admins may approve changes to it.
  if (superAdmins.length) {
    lines.push(
      "",
      "# The IAM config - only super-admins (canManageAccess) may approve changes",
      `content/singletons/access-control.json ${superAdmins.join(" ")}`,
      `.github/CODEOWNERS ${superAdmins.join(" ")}`
    );
  }

  return lines.join("\n") + "\n";
}
