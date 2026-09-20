/**
 * Pagina del singolo articolo — /blog/[slug].
 *
 * Interamente Server Component: il contenuto MDX viene renderizzato sul server,
 * senza il wrapper client che la V1 usava solo per importare un CSS.
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getBlogPosts, getBlogPost } from '../../../lib/blog';
import { PageShell } from '../../../components/layout/PageShell';
import { Badge } from '../../../components/ui/Badge';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      type: 'article',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <PageShell>
      <article className="container max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Tutti gli articoli
        </Link>

        <header className="mt-8 border-b border-border/60 pb-8">
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight">
            {frontmatter.title}
          </h1>

          <p className="mt-4 text-sm text-muted-foreground">
            {frontmatter.date} · {frontmatter.readingTime} min di lettura
          </p>

          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {frontmatter.description}
          </p>
        </header>

        <div className="prose prose-invert mt-10 max-w-none prose-headings:tracking-tight prose-a:text-primary prose-code:rounded prose-code:bg-muted/60 prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-card/60">
          {content}
        </div>
      </article>
    </PageShell>
  );
}
