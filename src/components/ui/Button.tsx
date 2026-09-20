import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium ' +
  'transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 ' +
  '[&_svg]:size-4 [&_svg]:shrink-0';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-border bg-transparent text-foreground hover:bg-muted/60',
  ghost: 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

/** Stili condivisi fra `<button>`, `<a>` e `<Link>`, così le CTA restano identiche. */
export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string
): string {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonStyles(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Apre in una nuova scheda aggiungendo da sé `rel="noopener noreferrer"`. */
  external?: boolean;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  external = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = buttonStyles(variant, size, className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
