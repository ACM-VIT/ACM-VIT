import type { APIRoute } from 'astro';
import { getBlogDates } from '../../lib/blog';

export const GET: APIRoute = async () => {
  try {
    const dates = await getBlogDates();
    return new Response(JSON.stringify(dates), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
