/**
 * 📝 Blog utility functions
 * Legge i file MDX dalla cartella src/content/blog
 */

import fs from 'fs';
import path from 'path';
import { createElement, type ComponentProps } from 'react';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

/**
 * Sostituzioni applicate al Markdown dei post.
 *
 * La pagina del post rende già un `h1` dal frontmatter. Un `#` nel corpo ne
 * creerebbe un secondo, e due radici valgono quanto nessuna per un crawler —
 * è esattamente ciò che accadeva a entrambi i post, che ripetevano il proprio
 * titolo come prima riga. Qualunque `#` scende quindi a `h2`: la gerarchia
 * resta corretta qualunque cosa scriva chi redige il post, invece di dipendere
 * dal fatto che se lo ricordi.
 *
 * Esportata perché sia verificabile da sola: `createElement` e non JSX perché
 * questo è un `.ts`.
 */
export const mdxComponents = {
  h1: (props: ComponentProps<'h1'>) => createElement('h2', props),
};

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
}

export interface BlogPostFull {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    tags: string[];
    readingTime: number;
  };
  content: React.ReactElement;
}

// Calcola tempo di lettura (200 wpm)
function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug: file.replace('.mdx', ''),
      title: data.title ?? '',
      date: data.date ?? '',
      description: data.description ?? '',
      tags: data.tags ?? [],
      readingTime: calcReadingTime(content),
    };
  });

  // Sort by date descending
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPostFull | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content: mdxContent, data } = matter(raw);

  const { content } = await compileMDX({
    source: mdxContent,
    options: { parseFrontmatter: false },
    components: mdxComponents,
  });

  return {
    slug,
    frontmatter: {
      title: data.title ?? '',
      date: data.date ?? '',
      description: data.description ?? '',
      tags: data.tags ?? [],
      readingTime: calcReadingTime(mdxContent),
    },
    content,
  };
}
