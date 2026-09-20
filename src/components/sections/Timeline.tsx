/**
 * Timeline di carriera, verticale e asimmetrica: colonna stretta per l'anno,
 * colonna larga per il contenuto, un unico filo conduttore a sinistra.
 *
 * Nessun carosello, nessuna paginazione, nessun bottone di navigazione: il
 * percorso si legge scorrendo, come qualsiasi altro contenuto della pagina.
 */

import { Briefcase, GraduationCap, Target, type LucideIcon } from 'lucide-react';
import { timeline, type TimelineType } from '../../data/profileData';
import { SectionHeading } from '../ui/SectionHeading';

/** Mappa esaustiva sui tipi di tappa. */
const typeIcons: Record<TimelineType, LucideIcon> = {
  education: GraduationCap,
  work: Briefcase,
  career: Target,
};

const typeLabels: Record<TimelineType, string> = {
  education: 'Formazione',
  work: 'Lavoro',
  career: 'Obiettivo',
};

export function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-20 border-t border-border/60 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Percorso"
          title="Come ci sono arrivato"
          description="Un passaggio graduale dall'istruzione tecnica allo sviluppo full-stack, con il lavoro a fare da palestra per le soft skill."
          align="left"
          className="max-w-2xl"
        />

        <ol className="mt-16 max-w-3xl">
          {timeline.map((event, index) => {
            const Icon = typeIcons[event.type];
            const isLast = index === timeline.length - 1;

            return (
              <li
                key={`${event.year}-${event.title}`}
                className={`relative grid gap-2 border-l pl-8 sm:grid-cols-[140px_1fr] sm:gap-8 ${
                  isLast ? 'border-l-transparent pb-0' : 'border-border pb-12'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background"
                >
                  <Icon className="size-3.5 text-primary" />
                </span>

                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    {event.year}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {typeLabels[event.type]}
                  </span>
                </div>

                <div className="pt-1">
                  <h3 className="text-lg font-semibold tracking-tight">{event.title}</h3>
                  <p className="mt-0.5 text-sm text-primary">{event.subtitle}</p>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
