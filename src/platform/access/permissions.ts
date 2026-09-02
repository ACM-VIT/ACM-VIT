import { data as accessControl } from "../../generated/access-control";
import type { Role, Member } from "../schema/singletons/access-control";

export type ResolvedPermissions = {
  username: string | null;
  role: Role | null;
  /** True when the username is an explicitly listed member (not the default role). */
  isKnownMember: boolean;
  canManageAccess: boolean;
  canPublish: boolean;
  canEditAll: boolean;
  editableCollections: string[];
  canEdit: (collectionKey: string) => boolean;
};

/**
 * Resolve what a signed-in user may do. In dev, the built-in "dev-owner" (or an
 * unknown user) is granted the owner role so the Studio is fully exercisable
 * without auth; set CMS_DEV_USER to a real login to test a specific role.
 */
export function resolvePermissions(username: string | null): ResolvedPermissions {
  const { roles, members, defaultRole } = accessControl;

  const member: Member | undefined = username
    ? members.find((m) => m.githubUsername.toLowerCase() === username.toLowerCase())
    : undefined;

  let roleId = member?.role ?? defaultRole ?? null;

  // Dev convenience: no GitHub auth locally -> act as owner unless overridden.
  if (!member && import.meta.env.DEV && (!username || username === "dev-owner")) {
    roleId = "owner";
  }

  const role = roleId ? roles.find((r) => r.id === roleId) ?? null : null;
  const editableCollections = role?.canEditAll ? [] : role?.canEditCollections ?? [];

  return {
    username,
    role,
    isKnownMember: !!member,
    canManageAccess: !!role?.canManageAccess,
    canPublish: !!role?.canPublish,
    canEditAll: !!role?.canEditAll,
    editableCollections,
    canEdit: (key) => !!role && (role.canEditAll || (role.canEditCollections ?? []).includes(key)),
  };
}

export const allRoles = accessControl.roles;
export const allMembers = accessControl.members;
