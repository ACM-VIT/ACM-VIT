import type { BlogPost, BlogPostFull, BlogSource } from './types';
import { getHashnodePosts, getHashnodeContent } from './hashnode';
import { getMediumPosts, getMediumContent } from './medium';
import { processContent } from './content';

// Build-time memo: Header + MobileNavbar both request the latest posts on every
// page, on top of the blog pages themselves. Cache the first fetch so a full
// build hits Hashnode/Medium once instead of per-page.
let allPostsPromise: Promise<BlogPost[]> | null = null;

/** Fetch all blog posts from both sources, sorted by date (newest first). */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (allPostsPromise) return allPostsPromise;

  allPostsPromise = (async () => {
    const [hashnode, medium] = await Promise.all([
      getHashnodePosts().catch(() => [] as BlogPost[]),
      getMediumPosts().catch(() => [] as BlogPost[]),
    ]);

    const all = [...hashnode, ...medium];

    // Sort by published date, newest first
    all.sort((a, b) => {
      const da = new Date(a.publishedAt).getTime();
      const db = new Date(b.publishedAt).getTime();
      return db - da;
    });

    return all;
  })();

  return allPostsPromise;
}

/** Fetch a single blog post with full content. */
export async function getPost(source: BlogSource, slug: string): Promise<BlogPostFull | null> {
  // Fetch all posts to find the matching one
  const posts = await getAllPosts();
  const post = posts.find((p) => p.source === source && p.slug === slug);

  if (!post) return null;

  // Fetch full content based on source
  let rawHtml = '';
  if (source === 'hashnode') {
    rawHtml = await getHashnodeContent(slug);
  } else {
    rawHtml = await getMediumContent(slug);
  }

  const { html, headings } = processContent(rawHtml);

  return {
    ...post,
    contentHtml: html,
    headings,
  };
}

/** Get blog publish dates for calendar integration. */
export async function getBlogDates(): Promise<{ title: string; date: string; url: string; source: BlogSource }[]> {
  const posts = await getAllPosts();
  return posts.map((p) => ({
    title: p.title,
    date: p.publishedAt.split('T')[0],
    url: `/blogs/${p.source}/${p.slug}`,
    source: p.source,
  }));
}

export type { BlogPost, BlogPostFull, BlogSource } from './types';
