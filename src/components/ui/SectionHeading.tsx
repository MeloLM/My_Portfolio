import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  /** Micro-etichetta sopra il titolo. */
  eyebrow: string;
  title: string;
  description?: string;
  /** Centrata di default; a sinistra quando la sezione è testuale. */
  align?: 'center' | 'left';
  /**
   * Livello dell'intestazione.
   *
   * `h2` di default, perché l'uso normale è una sezione dentro una pagina che
   * ha già il suo `h1` — la landing lo tiene nella hero. Serve `h1` quando il
   * componente apre una rotta a sé: l'indice del blog restava senza intestazione
   * di primo livello proprio per questo.
   *
   * Union chiusa e non `ElementType`: gli unici due casi sensati sono questi, e
   * lasciare passare qualunque tag avrebbe permesso di annidare i livelli a caso.
   */
  as?: 'h1' | 'h2';
  className?: string;
}

/** Intestazione di sezione: ritmo verticale e gerarchia tipografica uniformi. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-2xl text-center items-center' : 'items-start',
        className
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </span>
      <Heading className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </Heading>
      {description && (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
