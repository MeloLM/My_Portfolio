import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/** Etichetta compatta per tag tecnologici e metadati. */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-muted/40 px-2.5 py-1',
        'text-xs font-medium text-muted-foreground',
        className
      )}
    >
      {children}
    </span>
  );
}
