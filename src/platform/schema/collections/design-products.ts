import { z } from "zod";

export const productSwatchSchema = z.object({
  name: z.string(),
  hex: z.string(),
  on: z.string(),
  use: z.string(),
});
export type ProductSwatch = z.infer<typeof productSwatchSchema>;

export const productTypeFaceSchema = z.object({
  family: z.string(),
  role: z.string(),
  weights: z.string(),
  note: z.string().optional(),
  css: z.string(),
  sample: z.string(),
  sampleSize: z.string().optional(),
  sampleWeight: z.number().optional(),
  approximate: z.boolean().optional(),
});
export type ProductTypeFace = z.infer<typeof productTypeFaceSchema>;

export const productLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  kind: z.enum(["website", "play", "appstore", "read"]),
});
export type ProductLink = z.infer<typeof productLinkSchema>;

export const productLogoCardSchema = z.object({
  label: z.string(),
  src: z.string().optional(),
  width: z.number().optional(),
  text: z
    .object({
      content: z.string(),
      css: z.string(),
      size: z.string(),
      weight: z.number().optional(),
    })
    .optional(),
  bg: z.string(),
  fg: z.string(),
});
export type ProductLogoCard = z.infer<typeof productLogoCardSchema>;

export const productIconographySchema = z.object({
  images: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
      label: z.string().optional(),
      bg: z.string().optional(),
    })
  ),
  bullets: z.array(z.string()),
});
export type ProductIconography = z.infer<typeof productIconographySchema>;

export const productExtraSchema = z.object({
  title: z.string(),
  intro: z.string().optional(),
  items: z.array(z.object({ name: z.string(), desc: z.string() })),
});
export type ProductExtra = z.infer<typeof productExtraSchema>;

export const productGuideSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  name: z.string(),
  wordmark: z.string().optional(),
  tagline: z.string(),
  category: z.string(),
  story: z.array(z.string()),
  accent: z.string(),
  accentTonal: z.string(),
  hero: z.object({ bg: z.string(), fg: z.string(), sub: z.string() }),
  logo: z
    .object({ src: z.string(), width: z.number(), invert: z.boolean().optional() })
    .optional(),
  facts: z.array(z.object({ label: z.string(), value: z.string() })),
  logos: z.array(productLogoCardSchema),
  logoNote: z.string(),
  palette: z.array(productSwatchSchema),
  paletteNote: z.string(),
  type: z.array(productTypeFaceSchema),
  typeNote: z.string(),
  icons: productIconographySchema,
  personality: z.object({ do: z.array(z.string()), dont: z.array(z.string()) }),
  motifs: z.array(z.object({ title: z.string(), desc: z.string() })),
  extras: z.array(productExtraSchema).optional(),
  shots: z.array(z.object({ src: z.string(), alt: z.string() })).optional(),
  links: z.array(productLinkSchema),
  googleFonts: z.string().optional(),
});
export type ProductGuide = z.infer<typeof productGuideSchema>;
