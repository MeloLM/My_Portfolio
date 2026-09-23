/**
 * 🧪 Test Suite: indice del blog — gerarchia delle intestazioni
 *
 * Nasce da un difetto reale: `/blog` apriva con un `h2`, perché usava
 * `SectionHeading` che allora emetteva solo quel livello. La pagina restava
 * senza radice e un crawler doveva dedurre di cosa parlasse la rotta.
 *
 * Il difetto era invisibile a occhio nudo — `h1` e `h2` qui hanno la stessa
 * identica classe — e restava invisibile anche dopo il fix: togliere `as="h1"`
 * non faceva cadere nulla, perché i test coprivano la primitiva e non la rotta.
 * Questo file copre la rotta.
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BlogPage from '../../app/blog/page';

describe('/blog', () => {
  it('apre con un h1', async () => {
    render(await BlogPage());

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Note tecniche');
  });

  it('ha una sola intestazione di primo livello', async () => {
    // I titoli dei post sono `h2`: promuoverli creerebbe più radici nella
    // stessa pagina, che per un crawler equivale a non averne nessuna.
    render(await BlogPage());

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(0);
  });
});

describe('/blog/[slug]', () => {
  it('rende una sola intestazione di primo livello per post', async () => {
    // Difetto trovato aprendo la pagina in un browser, non da un test: il
    // titolo veniva reso due volte — una dal frontmatter, una dal `#` in testa
    // al Markdown — producendo due `h1` con lo stesso testo.
    const { getBlogPost } = await import('../../lib/blog');
    const post = await getBlogPost('nextjs-app-router');

    render(<article>{post!.content}</article>);

    expect(screen.queryAllByRole('heading', { level: 1 })).toHaveLength(0);
  });

  it('declassa a h2 un eventuale # nel corpo del post', async () => {
    // Non dipende da come sono scritti i file esistenti: la mappatura passata a
    // `compileMDX` impedisce a chiunque rediga un post di creare una seconda
    // radice, anche in un post che ancora non esiste.
    const { mdxComponents } = await import('../../lib/blog');
    const H1 = mdxComponents.h1;

    render(<H1>Titolo nel corpo</H1>);

    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Titolo nel corpo');
  });
});
