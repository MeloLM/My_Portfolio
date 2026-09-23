import type { MetadataRoute } from 'next';
import { SITE_URL } from '../constants';
import { projects } from '../data/profileData';
import { getBlogPosts } from '../lib/blog';

/**
 * Sitemap completa di tutte le rotte indicizzabili.
 *
 * La V1 elencava solo la home e quattro ancore (`/#skills`, `/#projects`, ...):
 * le ancore non sono URL distinti per un crawler, mentre le pagine che esistevano
 * davvero — sei case study e i post del blog — non comparivano affatto.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getBlogPosts();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
