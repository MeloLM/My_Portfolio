import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  /** Micro-etichetta sopra il titolo. */
  eyebrow: string;
  title: string;
  description?: string;
  /** Centrata di default; a sinistra quando la sezione è testuale. */
  align?: 'center' | 'left';
  className?: string;
}

/** Intestazione di sezione: ritmo verticale e gerarchia tipografica uniformi. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
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
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
