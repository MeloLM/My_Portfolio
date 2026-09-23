/**
 * Indice del blog. Raggiungibile dalla navbar e dal footer, presente in sitemap:
 * nella V1 esisteva solo per chi ne conosceva l'URL.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getBlogPosts } from '../../lib/blog';
import { PageShell } from '../../components/layout/PageShell';
import { Badge } from '../../components/ui/Badge';
import { SectionHeading } from '../../components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'DevLog',
  description: 'Note tecniche su Next.js, TypeScript e sviluppo web.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <PageShell>
      <div className="container max-w-3xl">
        <SectionHeading
          as="h1"
          eyebrow="DevLog"
          title="Note tecniche"
          description="Quello che imparo mentre costruisco, scritto per ritrovarlo dopo."
          align="left"
        />

        <ul className="mt-12 flex flex-col divide-y divide-border/60 border-y border-border/60">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-3 py-8">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {post.date} · {post.readingTime} min di lettura
                </span>

                <h2 className="flex items-start gap-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                  {post.title}
                  <ArrowUpRight
                    className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </h2>

                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>

                <span className="mt-1 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
