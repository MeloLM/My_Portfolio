/**
 * Sezione competenze, disposta a griglia Bento: le celle hanno peso diverso in
 * base a quanto conta il gruppo, invece di una griglia uniforme di card uguali.
 *
 * Le icone seguono la regola del data layer: logo reale quando esiste, altrimenti
 * un'icona generica lucide. Mai il logo di un'altra tecnologia.
 */

import Image from 'next/image';
import { Cloud, Database, Layers, Sparkles, type LucideIcon } from 'lucide-react';
import {
  skillCategories,
  skills,
  type FallbackIcon,
  type Skill,
  type SkillCategory,
} from '../../data/profileData';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../../lib/utils';

/** Mappa esaustiva: aggiungere un valore a FallbackIcon rompe qui la compilazione. */
const fallbackIcons: Record<FallbackIcon, LucideIcon> = {
  Layers,
  Database,
  Cloud,
  Sparkles,
};

/** Ampiezza di ciascuna cella nella griglia a 6 colonne. */
const cellSpan: Record<SkillCategory, string> = {
  frontend: 'lg:col-span-4',
  backend: 'lg:col-span-2',
  data: 'lg:col-span-2',
  tooling: 'lg:col-span-4',
  practice: 'lg:col-span-6',
};

function SkillRow({ skill }: { skill: Skill }) {
  const Fallback = skill.fallbackIcon ? fallbackIcons[skill.fallbackIcon] : null;

  return (
    <li className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60">
        {skill.iconSrc ? (
          <Image
            src={skill.iconSrc}
            alt=""
            width={20}
            height={20}
            className="size-5 object-contain"
          />
        ) : Fallback ? (
          <Fallback className="size-4 text-primary" aria-hidden="true" />
        ) : null}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate text-sm font-medium text-foreground">{skill.name}</span>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
            {skill.level}%
          </span>
        </span>
        <span
          role="meter"
          aria-label={`Livello ${skill.name}`}
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-muted"
        >
          <span
            className="block h-full rounded-full bg-primary/80"
            style={{ width: `${skill.level}%` }}
          />
        </span>
      </span>
    </li>
  );
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-border/60 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Competenze"
          title="Lo stack con cui lavoro"
          description="Frontend e backend, più il metodo di lavoro. Le percentuali indicano quanto mi muovo in autonomia su ciascuna tecnologia, non un punteggio assoluto."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {skillCategories.map((category) => {
            const categorySkills = skills.filter((skill) => skill.category === category.id);

            return (
              <article
                key={category.id}
                className={cn(
                  'rounded-xl border border-border/80 bg-card/40 p-6 transition-colors hover:border-border',
                  cellSpan[category.id]
                )}
              >
                <h3 className="text-sm font-semibold text-foreground">{category.label}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{category.description}</p>

                <ul
                  className={cn(
                    'mt-6 grid gap-4',
                    categorySkills.length > 4 && 'sm:grid-cols-2',
                    category.id === 'practice' && 'sm:max-w-sm'
                  )}
                >
                  {categorySkills.map((skill) => (
                    <SkillRow key={skill.name} skill={skill} />
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
