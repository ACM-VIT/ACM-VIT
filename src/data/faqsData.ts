// COMPAT SHIM - content now lives in content/singletons/faqs-page.json, edited
// via the CMS. This module re-exports the compiled snapshot from src/generated/.
import { data as pageData } from "../generated/faqs-page";
import type { FaqCategory, Faq } from "../platform/schema/singletons/faqs";

export type { FaqCategory, Faq };

/** The ordered accordion groups shown on /faqs. */
export const categories: FaqCategory[] = pageData.categories;
