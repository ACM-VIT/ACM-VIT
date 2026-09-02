import { z } from "zod";

/**
 * IAM for the Content Studio. Roles define *what* a person may edit and whether
 * they may publish; members map a GitHub username to a role. Super-admins edit
 * this in the CMS (Access & Roles), so access is itself content - versioned in
 * git, auditable, no extra infrastructure.
 *
 * Enforcement note: with Keystatic's GitHub storage, edits commit to the repo as
 * the signed-in user, so these rules govern what happens *through the Studio*.
 * Repo write access is the outer boundary - keep it to trusted maintainers.
 */

export const roleSchema = z.object({
  id: z.string().describe("Stable role id, e.g. editor"),
  label: z.string().describe("Display name, e.g. Editor"),
  description: z.string().optional(),
  /** Can edit every collection/singleton. Overrides canEditCollections. */
  canEditAll: z.boolean().default(false),
  /** Specific content keys this role may edit (camelCase, e.g. events, boardMembers). */
  canEditCollections: z.array(z.string()).default([]),
  /** May publish to the live branch (vs proposing changes for review). */
  canPublish: z.boolean().default(false),
  /** May manage roles + members (super-admin). */
  canManageAccess: z.boolean().default(false),
});
export type Role = z.infer<typeof roleSchema>;

export const memberSchema = z.object({
  githubUsername: z.string().describe("GitHub login the person signs in with"),
  name: z.string().optional().describe("Display name"),
  role: z.string().describe("Role id from the roles list"),
});
export type Member = z.infer<typeof memberSchema>;

export const accessControlSchema = z.object({
  /** If a signed-in user isn't listed as a member, they get this role id (or none). */
  defaultRole: z.string().optional(),
  roles: z.array(roleSchema),
  members: z.array(memberSchema),
});
export type AccessControl = z.infer<typeof accessControlSchema>;
