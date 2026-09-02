import type { Heading } from './types';

/** Extract headings from HTML content for Table of Contents. */
export function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const re = /<h([1-6])[^>]*(?:\sid="([^"]*)")?[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  let counter = 0;

  while ((match = re.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const existingId = match[2];
    const rawText = match[3].replace(/<[^>]+>/g, '').trim();

    if (!rawText) continue;

    const id = existingId || slugify(rawText) + `-${counter++}`;
    headings.push({ id, text: rawText, level });
  }

  return headings;
}

/** Inject IDs into heading tags for anchor linking. */
export function injectHeadingIds(html: string, headings: Heading[]): string {
  let headingIndex = 0;

  return html.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi, (full, level, attrs, content) => {
    if (headingIndex >= headings.length) return full;

    const heading = headings[headingIndex];
    const rawText = content.replace(/<[^>]+>/g, '').trim();

    if (rawText === heading.text) {
      headingIndex++;
      // Only add id if not already present
      if (!attrs.includes('id=')) {
        return `<h${level} id="${heading.id}"${attrs}>${content}</h${level}>`;
      }
    }

    return full;
  });
}

/** Convert text to URL-safe slug. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

/** Make all images in blog content lazy-loaded and responsive. */
export function enhanceImages(html: string): string {
  return html.replace(
    /<img([^>]*)>/gi,
    (_, attrs: string) => {
      // Add loading="lazy" if not present
      if (!attrs.includes('loading=')) {
        attrs += ' loading="lazy"';
      }
      // Add decoding="async" if not present
      if (!attrs.includes('decoding=')) {
        attrs += ' decoding="async"';
      }
      return `<img${attrs}>`;
    }
  );
}

/** Process raw HTML content for rendering. */
export function processContent(html: string): { html: string; headings: Heading[] } {
  const headings = extractHeadings(html);
  let processed = injectHeadingIds(html, headings);
  processed = enhanceImages(processed);
  return { html: processed, headings };
}
