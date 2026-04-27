import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// Force the reader to use local storage even in production.
// This ensures your public site stays fast and never hits GitHub rate limits.
const localConfig = {
  ...keystaticConfig,
  storage: { kind: 'local' } as const
};

export const reader = createReader(process.cwd(), localConfig);
