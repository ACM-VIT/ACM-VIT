import { parseRss } from './rssParser';
import type { BlogPost } from './types';

const RSS_URL = 'https://medium.com/feed/acmvit';
const COLLECTION_ID = 'ca03ad075de6';
const STREAM_API = `https://medium.com/_/api/collections/${COLLECTION_ID}/stream`;
const BASE_URL = 'https://medium.com/acmvit';

/** Estimate reading time from HTML content. */
function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, '').trim();
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Extract slug from a Medium URL. */
function extractSlug(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const segments = pathname.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
  } catch {
    return '';
  }
}

/** Extract first meaningful image from HTML content. */
function extractFirstImage(html: string): string {
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    if (src.includes('medium.com') && !src.includes('stat?') && !src.includes('1*')) {
      return src;
    }
    if (src.includes('cdn-images')) return src;
  }
  return '';
}

/** Strip Medium's JSON hijack prefix and parse. */
function parseMediumJson(text: string): Record<string, unknown> | null {
  try {
    // Medium prepends ])}while(1);</x> to JSON responses
    const cleaned = text.replace(/^[^\{]*/, '');
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

/** Fetch older posts from Medium's stream API (paginated). */
async function fetchFromStreamApi(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  let cursor: number | null = null;
  const seenSlugs = new Set<string>();
  const maxPages = 12;

  for (let page = 0; page < maxPages; page++) {
    const url = cursor
      ? `${STREAM_API}?to=${cursor}&limit=25`
      : `${BASE_URL}?format=json`;

    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ACM-VIT-Website/1.0)' },
      });
      if (!res.ok) break;

      const text = await res.text();
      const data = parseMediumJson(text);
      if (!data) break;

      const payload = (data as Record<string, unknown>).payload as Record<string, unknown> | undefined;
      const refs = payload?.references as Record<string, unknown> | undefined;
      const postRefs = refs?.Post as Record<string, Record<string, unknown>> | undefined;
      const userRefs = refs?.User as Record<string, Record<string, unknown>> | undefined;

      if (!postRefs || Object.keys(postRefs).length === 0) break;

      for (const [, post] of Object.entries(postRefs)) {
        const slug = post.uniqueSlug as string;
        if (!slug || seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);

        const title = post.title as string || '';
        // Skip non-article entries
        if (!title || title.toLowerCase().includes('how to write for us')) continue;

        const ts = post.firstPublishedAt as number || 0;
        const creatorId = post.creatorId as string || '';
        const virtuals = post.virtuals as Record<string, unknown> | undefined;
        const readingTime = Math.ceil((virtuals?.readingTime as number) || 3);
        const previewImage = post.previewImage as Record<string, unknown> | undefined;
        const previewImg2 = virtuals?.previewImage as Record<string, unknown> | undefined;
        const imageId = (previewImage?.imageId as string) || (previewImg2?.imageId as string) || '';

        const authorName = creatorId && userRefs?.[creatorId]
          ? (userRefs[creatorId].name as string || 'ACM-VIT')
          : 'ACM-VIT';

        posts.push({
          title,
          slug,
          source: 'medium',
          url: `${BASE_URL}/${slug}`,
          publishedAt: ts ? new Date(ts).toISOString() : new Date().toISOString(),
          author: authorName,
          coverImage: imageId ? `https://cdn-images-1.medium.com/max/1024/${imageId}` : '',
          brief: '',
          readingTime,
          tags: [],
        });
      }

      // Get pagination cursor
      const paging = payload?.paging as Record<string, unknown> | undefined;
      const nextObj = paging?.next as Record<string, unknown> | undefined;
      const nextTo = nextObj?.to as number | undefined;
      if (!nextTo || nextTo === cursor) break;
      cursor = nextTo;
    } catch {
      break;
    }
  }

  return posts;
}

/** Fetch blog posts from Medium RSS feed. */
async function fetchFromRss(): Promise<BlogPost[]> {
  const res = await fetch(RSS_URL, {
    headers: { 'User-Agent': 'ACM-VIT-Website/1.0' },
  });
  if (!res.ok) return [];

  const xml = await res.text();
  const items = parseRss(xml);

  return items.map((item) => {
    const coverImage = item.coverImage || extractFirstImage(item.contentHtml || item.description);
    return {
      title: item.title,
      slug: extractSlug(item.link),
      source: 'medium' as const,
      url: item.link,
      publishedAt: new Date(item.pubDate).toISOString(),
      author: item.author || 'ACM-VIT',
      coverImage,
      brief: item.description.replace(/<[^>]+>/g, '').slice(0, 300),
      readingTime: item.contentHtml ? estimateReadTime(item.contentHtml) : 5,
      tags: item.categories,
    };
  });
}

/**
 * Older Medium posts not available in RSS feed (RSS caps at 10).
 * These are static since they're historical (2018-2019) and won't change.
 */
const ARCHIVE_POSTS: BlogPost[] = [
  { title: 'Getting Started with Lottie Animations (Android)', slug: 'getting-started-with-lottie-animations-android-2c225ad2c467', source: 'medium', url: `${BASE_URL}/getting-started-with-lottie-animations-android-2c225ad2c467`, publishedAt: '2019-02-05T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'A guide to getting started with Lottie animations in Android apps.', readingTime: 2, tags: ['Android', 'Lottie', 'Animations'] },
  { title: 'My favorite things about React Js', slug: 'my-favorite-things-about-react-js-3300261d256c', source: 'medium', url: `${BASE_URL}/my-favorite-things-about-react-js-3300261d256c`, publishedAt: '2019-01-12T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'Exploring the best features of React Js for building modern web applications.', readingTime: 3, tags: ['React', 'JavaScript', 'Web Development'] },
  { title: 'AUGMENTED REALITY: EXPLORED', slug: 'augmented-reality-explored-fc811b5eb770', source: 'medium', url: `${BASE_URL}/augmented-reality-explored-fc811b5eb770`, publishedAt: '2019-01-06T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'An exploration of Augmented Reality technology and its applications.', readingTime: 4, tags: ['AR', 'Augmented Reality', 'Technology'] },
  { title: 'My first experience with Electron.Js', slug: 'my-first-experience-with-electron-js-e9153e871ff7', source: 'medium', url: `${BASE_URL}/my-first-experience-with-electron-js-e9153e871ff7`, publishedAt: '2019-01-05T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'Building desktop apps with Electron.js - a first-time experience.', readingTime: 3, tags: ['Electron', 'JavaScript', 'Desktop Apps'] },
  { title: 'Li-Fi: The Future Of Internet', slug: 'li-fi-the-future-of-internet-e573eab6bd0d', source: 'medium', url: `${BASE_URL}/li-fi-the-future-of-internet-e573eab6bd0d`, publishedAt: '2019-01-03T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'How Li-Fi technology could revolutionize internet connectivity using light.', readingTime: 4, tags: ['Li-Fi', 'Internet', 'Networking'] },
  { title: 'Efficient & Minimalistic designing using Semantic UI', slug: 'efficient-minimalistic-designing-using-semantic-ui-51c468b02ea2', source: 'medium', url: `${BASE_URL}/efficient-minimalistic-designing-using-semantic-ui-51c468b02ea2`, publishedAt: '2018-12-27T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'Building clean, minimalistic UIs with the Semantic UI framework.', readingTime: 3, tags: ['Semantic UI', 'Web Design', 'CSS'] },
  { title: 'GET STARTED WITH FLASK', slug: 'get-started-with-flask-b006fd08f96e', source: 'medium', url: `${BASE_URL}/get-started-with-flask-b006fd08f96e`, publishedAt: '2018-12-16T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'A beginner-friendly introduction to building web apps with Python Flask.', readingTime: 4, tags: ['Flask', 'Python', 'Backend'] },
  { title: 'Introduction to WebSockets', slug: 'introduction-to-websockets-b6ed4a7fa934', source: 'medium', url: `${BASE_URL}/introduction-to-websockets-b6ed4a7fa934`, publishedAt: '2018-12-09T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'Understanding WebSockets for real-time bidirectional communication.', readingTime: 3, tags: ['WebSockets', 'Web Development', 'Real-time'] },
  { title: 'What is VR, AR and MR?', slug: 'what-is-vr-ar-and-mr-e76aed29dc6b', source: 'medium', url: `${BASE_URL}/what-is-vr-ar-and-mr-e76aed29dc6b`, publishedAt: '2018-11-05T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'Breaking down Virtual Reality, Augmented Reality, and Mixed Reality.', readingTime: 4, tags: ['VR', 'AR', 'MR', 'Technology'] },
  { title: 'The Essence of Machine Learning', slug: 'the-essence-of-machine-learning-5cf32844f9a', source: 'medium', url: `${BASE_URL}/the-essence-of-machine-learning-5cf32844f9a`, publishedAt: '2018-08-27T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'An introductory guide to the fundamentals of Machine Learning.', readingTime: 5, tags: ['Machine Learning', 'AI', 'Data Science'] },
  { title: 'Docker Secrets in/out', slug: 'docker-secret-in-out-94c66eb4376b', source: 'medium', url: `${BASE_URL}/docker-secret-in-out-94c66eb4376b`, publishedAt: '2018-08-23T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'Managing secrets securely in Docker containers.', readingTime: 3, tags: ['Docker', 'DevOps', 'Security'] },
  { title: 'Smart Cities', slug: 'smart-cities-d25429f74b71', source: 'medium', url: `${BASE_URL}/smart-cities-d25429f74b71`, publishedAt: '2018-06-29T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'How technology is shaping the future of urban living.', readingTime: 4, tags: ['Smart Cities', 'IoT', 'Technology'] },
  { title: 'Man in the Middle Attacks and Ettercap', slug: 'man-in-the-middle-attacks-and-ettercap-f9ae9f8eca3e', source: 'medium', url: `${BASE_URL}/man-in-the-middle-attacks-and-ettercap-f9ae9f8eca3e`, publishedAt: '2018-06-27T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'Understanding MITM attacks and how Ettercap is used in network security.', readingTime: 4, tags: ['Cybersecurity', 'MITM', 'Ettercap'] },
  { title: 'Quantum Computers: The Future of Computing', slug: 'quantum-computers-the-future-of-computing-57025996ded4', source: 'medium', url: `${BASE_URL}/quantum-computers-the-future-of-computing-57025996ded4`, publishedAt: '2018-08-08T00:00:00.000Z', author: 'ACM-VIT', coverImage: '', brief: 'How quantum computing is set to transform the future of technology.', readingTime: 5, tags: ['Quantum Computing', 'Technology', 'Future'] },
];

/** Get all Medium posts by merging RSS + archive. */
export async function getMediumPosts(): Promise<BlogPost[]> {
  const [rssPosts, apiPosts] = await Promise.all([
    fetchFromRss().catch(() => [] as BlogPost[]),
    fetchFromStreamApi().catch(() => [] as BlogPost[]),
  ]);

  // Merge: RSS > API > Archive (RSS has richest metadata)
  const slugMap = new Map<string, BlogPost>();
  for (const post of ARCHIVE_POSTS) {
    slugMap.set(post.slug, post);
  }
  for (const post of apiPosts) {
    slugMap.set(post.slug, post);
  }
  for (const post of rssPosts) {
    slugMap.set(post.slug, post);
  }

  return Array.from(slugMap.values());
}

/** Convert Medium paragraph markups to inline HTML. */
function applyMarkups(text: string, markups: Array<{ type: number; start: number; end: number; href?: string }>): string {
  if (!markups || markups.length === 0) return escapeHtml(text);

  // Sort markups by start position (descending) to apply from end to start
  const sorted = [...markups].sort((a, b) => b.start - a.start);
  const chars = Array.from(text); // handle unicode correctly

  for (const m of sorted) {
    const inner = chars.slice(m.start, m.end).join('');
    let wrapped: string;
    switch (m.type) {
      case 1: wrapped = `<strong>${escapeHtml(inner)}</strong>`; break;
      case 2: wrapped = `<em>${escapeHtml(inner)}</em>`; break;
      case 3: wrapped = `<a href="${m.href || '#'}" target="_blank" rel="noopener noreferrer">${escapeHtml(inner)}</a>`; break;
      case 10: wrapped = `<code>${escapeHtml(inner)}</code>`; break;
      default: wrapped = escapeHtml(inner);
    }
    chars.splice(m.start, m.end - m.start, wrapped);
  }

  return chars.join('');
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Convert Medium JSON paragraphs to HTML. */
function paragraphsToHtml(paragraphs: Array<Record<string, unknown>>): string {
  const parts: string[] = [];

  for (const p of paragraphs) {
    const type = p.type as number;
    const text = (p.text as string) || '';
    const markups = (p.markups as Array<{ type: number; start: number; end: number; href?: string }>) || [];
    const content = applyMarkups(text, markups);
    const metadata = p.metadata as Record<string, string> | undefined;

    switch (type) {
      case 1: // Paragraph
        parts.push(`<p>${content}</p>`);
        break;
      case 2: // H2
        parts.push(`<h2>${content}</h2>`);
        break;
      case 3: // H3 (title - skip, already shown in page header)
        break;
      case 4: { // Image
        const imageId = metadata?.id || '';
        if (imageId) {
          parts.push(`<figure><img src="https://cdn-images-1.medium.com/max/1024/${imageId}" alt="${escapeHtml(text)}" />${text ? `<figcaption>${escapeHtml(text)}</figcaption>` : ''}</figure>`);
        }
        break;
      }
      case 6: // Block quote
        parts.push(`<blockquote><p>${content}</p></blockquote>`);
        break;
      case 7: // Pull quote
        parts.push(`<blockquote><p>${content}</p></blockquote>`);
        break;
      case 8: // Code block
        parts.push(`<pre><code>${escapeHtml(text)}</code></pre>`);
        break;
      case 9: // UL item
        parts.push(`<li>${content}</li>`);
        break;
      case 10: // OL item
        parts.push(`<li>${content}</li>`);
        break;
      case 11: // Iframe/embed
        break;
      case 13: // H4
        parts.push(`<h4>${content}</h4>`);
        break;
      default:
        if (text.trim()) parts.push(`<p>${content}</p>`);
    }
  }

  // Wrap consecutive <li> elements in <ul>
  const html = parts.join('\n');
  return html.replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);
}

/** Fetch full content from Medium's JSON API for a specific post. */
async function fetchContentFromJson(slug: string): Promise<string> {
  try {
    const url = `${BASE_URL}/${slug}?format=json`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ACM-VIT-Website/1.0)' },
    });
    if (!res.ok) return '';

    const text = await res.text();
    const data = parseMediumJson(text);
    if (!data) return '';

    const payload = data.payload as Record<string, unknown> | undefined;
    const value = payload?.value as Record<string, unknown> | undefined;
    const content = value?.content as Record<string, unknown> | undefined;
    const bodyModel = content?.bodyModel as Record<string, unknown> | undefined;
    const paragraphs = bodyModel?.paragraphs as Array<Record<string, unknown>> | undefined;

    if (!paragraphs || paragraphs.length === 0) return '';

    // Skip first paragraph if it's the title (type 3)
    const body = paragraphs[0]?.type === 3 ? paragraphs.slice(1) : paragraphs;
    return paragraphsToHtml(body);
  } catch {
    return '';
  }
}

/** Fetch full blog content from Medium. Tries RSS first, falls back to JSON API. */
export async function getMediumContent(slug: string): Promise<string> {
  // Try RSS first (has richest HTML for recent posts)
  try {
    const res = await fetch(RSS_URL, {
      headers: { 'User-Agent': 'ACM-VIT-Website/1.0' },
    });
    if (res.ok) {
      const xml = await res.text();
      const items = parseRss(xml);
      const item = items.find((i) => extractSlug(i.link) === slug);
      if (item?.contentHtml) {
        return cleanMediumHtml(item.contentHtml);
      }
    }
  } catch { /* fall through */ }

  // Fallback: fetch from Medium's JSON API
  return fetchContentFromJson(slug);
}

/** Clean up Medium HTML content. */
function cleanMediumHtml(html: string): string {
  return html
    .replace(/<img[^>]*src="https:\/\/medium\.com\/_\/stat[^>]*>/gi, '')
    .replace(/\s+class="[^"]*"/gi, '')
    .replace(/\s+data-[a-z-]+="[^"]*"/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
