/**
 * Griglia progetti. Ogni card porta a un case study interno (/projects/[slug])
 * e, separatamente, alla demo o al repository: la CTA esterna dichiara quale
 * delle due è, invece del generico "Vedi il progetto".
 */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '../../data/profileData';
import { GithubIcon } from '../ui/SocialIcons';
import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-t border-border/60 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Progetti"
          title="Cosa ho costruito"
          description="Sei progetti fra applicazioni full-stack, dashboard e un browser game. Ognuno ha una pagina di dettaglio con problema, soluzione e risultati."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border/80 bg-card/40 transition-colors hover:border-border"
            >
              <div className="relative aspect-video overflow-hidden border-b border-border/60 bg-muted/30">
                <Image
                  src={project.imgUrl}
                  alt={`Anteprima del progetto ${project.title}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold tracking-tight">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none"
                  >
                    {project.title}
                  </Link>
                </h3>

                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Case study
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {project.linkType === 'live' ? (
                      <>
                        Demo
                        <ExternalLink className="size-4" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        Codice
                        <GithubIcon className="size-4" />
                      </>
                    )}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
