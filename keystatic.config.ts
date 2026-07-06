import { config } from '@keystatic/core';
import { generatedCollections, generatedSingletons } from './src/platform/keystatic/generated-config.ts';

/**
 * The admin UI is generated from the schema registry
 * (src/platform/schema/registry.ts) - the Zod schemas are the single source
 * of truth. Add a collection there; the admin UI follows. See PLATFORM.md.
 */
export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: {
          owner: (process.env.KEYSTATIC_GITHUB_REPO_OWNER || 'ACM-VIT') as any,
          name: (process.env.KEYSTATIC_GITHUB_REPO_NAME || 'ACM-VIT') as any,
        },
      }
    : {
        kind: 'local',
      },

  ui: {
    brand: {
      name: 'ACM VIT CMS',
    },
  },

  collections: {
    ...generatedCollections,
  },

  singletons: {
    ...generatedSingletons,
  },
});
