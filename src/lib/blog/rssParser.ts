/** Lightweight RSS/Atom parser for Cloudflare Workers (no DOMParser). */

export interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  description: string;
  coverImage: string;
  categories: string[];
  contentHtml: string;
}

/** Extract text between XML tags. Returns first match or fallback. */
function tagContent(xml: string, tag: string, fallback = ''): string {
  // Handle CDATA sections
  const cdataRe = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, 'i');
  const cdataMatch = xml.match(cdataRe);
  if (cdataMatch) return cdataMatch[1].trim();

  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const match = xml.match(re);
  return match ? match[1].trim() : fallback;
}

/** Extract attribute value from a tag. */
function attrValue(xml: string, tag: string, attr: string): string {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']*)["']`, 'i');
  const match = xml.match(re);
  return match ? match[1] : '';
}

/** Extract all category/tag values from an item. */
function extractCategories(itemXml: string): string[] {
  const cats: string[] = [];
  const re = /<category[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/gi;
  let match;
  while ((match = re.exec(itemXml)) !== null) {
    const val = match[1].trim();
    if (val) cats.push(val);
  }
  return cats;
}

/** Extract cover image from various RSS patterns. */
function extractCoverImage(itemXml: string): string {
  // media:content url
  const mediaUrl = attrValue(itemXml, 'media:content', 'url');
  if (mediaUrl) return mediaUrl;

  // enclosure url
  const encUrl = attrValue(itemXml, 'enclosure', 'url');
  if (encUrl) return encUrl;

  // First <img> in description/content
  const imgMatch = itemXml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];

  return '';
}

/** Parse RSS XML string into structured items. */
export function parseRss(xml: string): RssItem[] {
  const items: RssItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    items.push({
      title: decodeEntities(tagContent(block, 'title')),
      link: tagContent(block, 'link') || tagContent(block, 'guid'),
      pubDate: tagContent(block, 'pubDate'),
      author: tagContent(block, 'dc:creator') || tagContent(block, 'author'),
      description: tagContent(block, 'description'),
      coverImage: extractCoverImage(block),
      categories: extractCategories(block),
      contentHtml: tagContent(block, 'content:encoded'),
    });
  }

  return items;
}

/** Basic HTML entity decoder. */
function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}
