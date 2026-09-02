export type BlogSource = 'hashnode' | 'medium';

export interface BlogPost {
  title: string;
  slug: string;
  source: BlogSource;
  url: string;
  publishedAt: string;       // ISO date string
  author: string;
  coverImage: string;
  brief: string;
  readingTime: number;        // minutes
  tags: string[];
}

export interface BlogPostFull extends BlogPost {
  contentHtml: string;
  headings: Heading[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}
