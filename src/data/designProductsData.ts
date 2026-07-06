// COMPAT SHIM - content now lives in content/collections/design-products/ and
// is edited via the CMS. This module re-exports the compiled snapshot from
// src/generated/.
import { items as guideEntries } from "../generated/design-products";
import type { ProductGuide } from "../platform/schema/collections/design-products";

export type {
  ProductGuide,
  ProductSwatch,
  ProductTypeFace,
  ProductLink,
  ProductLogoCard,
  ProductIconography,
  ProductExtra,
} from "../platform/schema/collections/design-products";

export const productGuides: ProductGuide[] = guideEntries;

export function getProductGuide(slug: string): ProductGuide | undefined {
  return productGuides.find((p) => p.slug === slug);
}
