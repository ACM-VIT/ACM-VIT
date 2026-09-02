import { parseRss } from './rssParser';
import type { BlogPost } from './types';

const RSS_URL = 'https://blog.acmvit.in/rss.xml';
const SITEMAP_URL = 'https://blog.acmvit.in/sitemap.xml';
const BASE_URL = 'https://blog.acmvit.in';

/** Estimate reading time from HTML content. */
function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, '').trim();
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Extract slug from a Hashnode blog URL. */
function extractSlug(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    return pathname.replace(/^\/|\/$/g, '');
  } catch {
    return url.replace(/^\/|\/$/g, '');
  }
}

/** Fetch blog posts from Hashnode RSS feed. */
async function fetchFromRss(): Promise<BlogPost[]> {
  const res = await fetch(RSS_URL, {
    headers: { 'User-Agent': 'ACM-VIT-Website/1.0' },
  });
  if (!res.ok) return [];

  const xml = await res.text();
  const items = parseRss(xml);

  return items.map((item) => ({
    title: item.title,
    slug: extractSlug(item.link),
    source: 'hashnode' as const,
    url: item.link,
    publishedAt: new Date(item.pubDate).toISOString(),
    author: item.author || 'ACM-VIT',
    coverImage: item.coverImage,
    brief: item.description.replace(/<[^>]+>/g, '').slice(0, 300),
    readingTime: item.contentHtml
      ? estimateReadTime(item.contentHtml)
      : estimateReadTime(item.description),
    tags: item.categories,
  }));
}

/** Parse sitemap XML for blog post URLs with dates. */
async function fetchSitemapUrls(): Promise<{ url: string; date: string }[]> {
  const res = await fetch(SITEMAP_URL, {
    headers: { 'User-Agent': 'ACM-VIT-Website/1.0' },
  });
  if (!res.ok) return [];

  const xml = await res.text();
  const entries: { url: string; date: string }[] = [];
  const urlRegex = /<url>([\s\S]*?)<\/url>/gi;
  let match;

  while ((match = urlRegex.exec(xml)) !== null) {
    const block = match[1];
    const locMatch = block.match(/<loc>(.*?)<\/loc>/i);
    const dateMatch = block.match(/<lastmod>(.*?)<\/lastmod>/i);

    if (locMatch) {
      const url = locMatch[1].trim();
      // Skip non-blog URLs (homepage, tag pages, utility pages, etc.)
      const slug = extractSlug(url);
      const excludedSlugs = new Set([
        'sitemap.xml', 'archive', 'recommendations', 'newsletter',
        'about', 'badge', 'series', 'tags',
      ]);
      if (slug && !slug.includes('/') && !excludedSlugs.has(slug)) {
        entries.push({
          url,
          date: dateMatch ? dateMatch[1].trim() : '',
        });
      }
    }
  }

  return entries;
}

/** Fetch og: meta tags from a blog page for posts not in RSS. */
async function fetchPageMeta(url: string): Promise<Partial<BlogPost> | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'ACM-VIT-Website/1.0' },
    });
    if (!res.ok) return null;

    const html = await res.text();

    const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/)
      || html.match(/<title>([^<]*)<\/title>/);
    const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/);
    const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/);
    const author = html.match(/<meta\s+name="author"\s+content="([^"]*)"/);
    const pubDate = html.match(/<meta\s+property="article:published_time"\s+content="([^"]*)"/);

    return {
      title: ogTitle?.[1] || '',
      brief: ogDesc?.[1] || '',
      coverImage: ogImage?.[1] || '',
      author: author?.[1] || 'ACM-VIT',
      publishedAt: pubDate?.[1] || '',
    };
  } catch {
    return null;
  }
}

/** Get all Hashnode blog posts, merging RSS + sitemap data. */
export async function getHashnodePosts(): Promise<BlogPost[]> {
  const [rssPosts, sitemapEntries] = await Promise.all([
    fetchFromRss(),
    fetchSitemapUrls(),
  ]);

  // Index RSS posts by slug for quick lookup
  const rssMap = new Map(rssPosts.map((p) => [p.slug, p]));
  const allPosts = [...rssPosts];

  // Find sitemap entries not covered by RSS
  const missingEntries = sitemapEntries.filter(
    (e) => !rssMap.has(extractSlug(e.url))
  );

  // Fetch metadata for missing posts (in batches to avoid rate limits)
  const batchSize = 5;
  for (let i = 0; i < missingEntries.length; i += batchSize) {
    const batch = missingEntries.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (entry) => {
        const meta = await fetchPageMeta(entry.url);
        if (!meta?.title) return null;

        const slug = extractSlug(entry.url);
        return {
          title: meta.title,
          slug,
          source: 'hashnode' as const,
          url: entry.url,
          publishedAt: meta.publishedAt || entry.date || new Date().toISOString(),
          author: meta.author || 'ACM-VIT',
          coverImage: meta.coverImage || '',
          brief: meta.brief || '',
          readingTime: 5,
          tags: [] as string[],
        } satisfies BlogPost;
      })
    );
    allPosts.push(...results.filter((p): p is BlogPost => p !== null));
  }

  return allPosts;
}

/** Fetch full blog content HTML from a Hashnode page. */
export async function getHashnodeContent(slug: string): Promise<string> {
  // RSS content is already article-scoped, so prefer it over scraping the
  // rendered Hashnode page where layout wrappers can leak into the fragment.
  const rssHtml = await fetchContentFromRss(slug);
  if (rssHtml) return cleanContentHtml(rssHtml);

  const url = `${BASE_URL}/${slug}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'ACM-VIT-Website/1.0' },
  });
  if (!res.ok) return '';

  const html = await res.text();

  // Hashnode wraps article content - try multiple selectors
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) return cleanContentHtml(articleMatch[1]);

  // Fallback: look for prose content div
  const proseMatch = html.match(/<div[^>]*class="[^"]*prose[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i);
  if (proseMatch) return cleanContentHtml(proseMatch[1]);

  return '';
}

/** Fetch article-scoped content from the Hashnode RSS feed. */
async function fetchContentFromRss(slug: string): Promise<string> {
  try {
    const rssRes = await fetch(RSS_URL, {
      headers: { 'User-Agent': 'ACM-VIT-Website/1.0' },
    });
    if (!rssRes.ok) return '';

    const rssXml = await rssRes.text();
    const items = parseRss(rssXml);
    const item = items.find((i) => extractSlug(i.link) === slug);
    return item?.contentHtml || '';
  } catch {
    return '';
  }
}

/** Clean up extracted HTML content. */
function cleanContentHtml(html: string): string {
  let cleaned = html
    // Remove non-content structural elements
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '')
    .replace(/<button[\s\S]*?<\/button>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    // Remove class/data attributes (we style with our own CSS)
    .replace(/\s+class="[^"]*"/gi, '')
    .replace(/\s+data-[a-z-]+="[^"]*"/gi, '')
    // Clean up extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Strip leading metadata (date, reading time, author card, cover image)
  // that Hashnode includes in <article> before actual content
  cleaned = stripLeadingMetadata(cleaned);
  cleaned = stripTrailingHashnodeChrome(cleaned);
  cleaned = balanceHtmlFragment(cleaned);

  return cleaned;
}

/** Strip metadata elements that appear before the first heading in scraped content. */
function stripLeadingMetadata(html: string): string {
  const headingMatch = html.match(/<h[1-6]\b/i);
  if (headingMatch?.index && headingMatch.index > 20 && headingMatch.index < 3000) {
    return html.substring(headingMatch.index);
  }
  return html;
}

/** Remove tag/footer chrome that appears after Hashnode page-scraped content. */
function stripTrailingHashnodeChrome(html: string): string {
  const patterns = [
    /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div>\s*<div>\s*<a\s+href=["']\/tag\//i,
    /<div>\s*<div>\s*<a\s+href=["']\/tag\//i,
  ];

  const cutAt = patterns
    .map((pattern) => {
      const match = html.match(pattern);
      return match?.index ?? -1;
    })
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  return cutAt === undefined ? html : html.slice(0, cutAt).trim();
}

/** Keep injected article HTML balanced so it cannot close the page layout. */
function balanceHtmlFragment(html: string): string {
  const allowedTags = new Set([
    'a', 'b', 'blockquote', 'br', 'code', 'del', 'em', 'figcaption', 'figure',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'li', 'ol', 'p',
    'pre', 's', 'span', 'strong', 'table', 'tbody', 'td', 'tfoot', 'th',
    'thead', 'tr', 'u', 'ul',
  ]);
  const voidTags = new Set(['br', 'hr', 'img']);
  const tagRe = /<!--[\s\S]*?-->|<\/?([a-z][a-z0-9-]*)(?:\s[^<>]*)?>/gi;

  let output = '';
  let lastIndex = 0;
  const stack: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = tagRe.exec(html)) !== null) {
    output += html.slice(lastIndex, match.index);
    lastIndex = tagRe.lastIndex;

    const rawTag = match[0];
    const tagName = match[1]?.toLowerCase();
    if (!tagName || !allowedTags.has(tagName)) continue;

    const isClosing = rawTag.startsWith('</');
    if (isClosing) {
      const openIndex = stack.lastIndexOf(tagName);
      if (openIndex === -1) continue;

      for (let i = stack.length - 1; i >= openIndex; i--) {
        output += `</${stack.pop()}>`;
      }
      continue;
    }

    output += sanitizeOpeningTag(rawTag, tagName);
    if (!voidTags.has(tagName) && !rawTag.endsWith('/>')) {
      stack.push(tagName);
    }
  }

  output += html.slice(lastIndex);

  while (stack.length > 0) {
    output += `</${stack.pop()}>`;
  }

  return output.trim();
}

function sanitizeOpeningTag(rawTag: string, tagName: string): string {
  const allowedAttrs: Record<string, Set<string>> = {
    a: new Set(['href', 'rel', 'target', 'title']),
    blockquote: new Set(['cite']),
    img: new Set(['alt', 'decoding', 'height', 'loading', 'src', 'title', 'width']),
    td: new Set(['colspan', 'rowspan']),
    th: new Set(['colspan', 'rowspan']),
  };
  const attrs = allowedAttrs[tagName];
  if (!attrs) return `<${tagName}>`;

  const attrParts: string[] = [];
  const attrRe = /([a-z_:][-a-z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi;
  let match: RegExpExecArray | null;

  while ((match = attrRe.exec(rawTag)) !== null) {
    const name = match[1].toLowerCase();
    const value = match[3] ?? match[4] ?? match[5] ?? '';
    if (!attrs.has(name)) continue;
    if ((name === 'href' || name === 'src') && !isSafeUrl(value)) continue;
    attrParts.push(`${name}="${escapeAttr(value)}"`);
  }

  if (tagName === 'a') {
    const hasTargetBlank = attrParts.some((attr) => attr === 'target="_blank"');
    const hasRel = attrParts.some((attr) => attr.startsWith('rel='));
    if (hasTargetBlank && !hasRel) attrParts.push('rel="noopener noreferrer"');
  }

  return attrParts.length > 0 ? `<${tagName} ${attrParts.join(' ')}>` : `<${tagName}>`;
}

function isSafeUrl(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  return (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#')
  );
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
