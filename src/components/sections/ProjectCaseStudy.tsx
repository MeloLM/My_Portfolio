/**
 * Case study di un progetto: contesto, problema, soluzione, risultati.
 *
 * Server Component — nella V1 era marcato 'use client' pur non avendo stato,
 * spedendo al browser JavaScript per del contenuto puramente statico.
 */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, ExternalLink } from 'lucide-react';
import type { Project } from '../../data/profileData';
import { PageShell } from '../layout/PageShell';
import { Badge } from '../ui/Badge';
import { ButtonLink } from '../ui/Button';
import { GithubIcon } from '../ui/SocialIcons';

export default function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <PageShell>
      <article className="container max-w-4xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Tutti i progetti
        </Link>

        <header className="mt-8">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="mt-8">
            <ButtonLink href={project.url} external>
              {project.linkType === 'live' ? (
                <>
                  Apri la demo
                  <ExternalLink aria-hidden="true" />
                </>
              ) : (
                <>
                  Codice su GitHub
                  <GithubIcon className="size-4" />
                </>
              )}
            </ButtonLink>
          </div>
        </header>

        <div className="relative mt-12 aspect-video overflow-hidden rounded-xl border border-border bg-muted/30">
          <Image
            src={project.imgUrl}
            alt={`Interfaccia del progetto ${project.title}`}
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <section className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {project.longDescription}
          </p>
        </section>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <section className="rounded-xl border border-border/80 bg-card/40 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
              Il problema
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-card/40 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
              La soluzione
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              {project.solution}
            </p>
          </section>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Risultati</h2>
          <ul className="mt-6 flex flex-col gap-3">
            {project.results.map((result) => (
              <li key={result} className="flex items-start gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {result}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </PageShell>
  );
}
