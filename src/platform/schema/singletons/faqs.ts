import { z } from "zod";

/** A single question/answer, with an optional inline link in the answer area. */
export const faqSchema = z.object({
  q: z.string().describe("The question"),
  a: z.string().describe("The answer"),
  link: z
    .object({
      href: z.string().describe("Link target, e.g. /sleeve-notes#homage"),
      text: z.string().describe("Link label"),
    })
    .optional(),
});

/** One coloured accordion group on the /faqs page. */
export const faqCategorySchema = z.object({
  id: z.string().describe("Anchor/id slug, e.g. basics"),
  label: z.string().describe("Category heading"),
  accent: z.string().describe("Accent hex, e.g. #F95F4A"),
  faqs: z.array(faqSchema),
});

/** The whole /faqs page: an ordered list of categories. */
export const faqsPageSchema = z.object({
  categories: z.array(faqCategorySchema),
});
export type FaqsPage = z.infer<typeof faqsPageSchema>;
export type FaqCategory = z.infer<typeof faqCategorySchema>;
export type Faq = z.infer<typeof faqSchema>;
