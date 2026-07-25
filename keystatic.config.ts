import { config } from '@keystatic/core';
import { generatedCollections, generatedSingletons } from './src/platform/keystatic/generated-config.ts';
import { BrandMark } from './src/platform/keystatic/BrandMark.tsx';

/**
 * The admin UI is generated from the schema registry
 * (src/platform/schema/registry.ts) - the Zod schemas are the single source
 * of truth. Add a collection there; the admin UI follows. See PLATFORM.md.
 *
 * Access control (who may edit/publish what) is governed via the access-control
 * singleton -> generated .github/CODEOWNERS + branch protection. See ACCESS.md.
 * `branchPrefix` namespaces every branch the Studio creates as `studio/*`, so
 * draft/review branches are easy to spot and protect. Editing on a branch +
 * opening a PR is the review path; a protected live branch is what enforces it.
 */
export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: {
          owner: (process.env.KEYSTATIC_GITHUB_REPO_OWNER || 'JuxtaRYCT') as any,
          name: (process.env.KEYSTATIC_GITHUB_REPO_NAME || 'ACM-VIT-website-yash') as any,
        },
        branchPrefix: 'studio/',
      }
    : {
        kind: 'local',
      },

  ui: {
    brand: {
      name: 'ACM·VIT',
      mark: BrandMark,
    },
  },

  collections: {
    ...generatedCollections,
  },

  singletons: {
    ...generatedSingletons,
  },
});
