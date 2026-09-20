/**
 * 🧪 Test Suite: Badge
 *
 * `Badge` è la primitiva più piccola del design system: nessuno stato, nessuna
 * variante, nessuno spread di props. La sua superficie pubblica è `children` più
 * `className`, quindi è lì che si concentra il test — in particolare sul fatto
 * che `cn()` lasci sovrascrivere lo stile di base senza far evaporare il resto.
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '../../../components/ui/Badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('should render its text inside a span', () => {
      render(<Badge>TypeScript</Badge>);

      const badge = screen.getByText('TypeScript');

      expect(badge).toBeVisible();
      expect(badge.tagName).toBe('SPAN');
    });

    it('should render composite children', () => {
      render(
        <Badge>
          <svg data-testid="icon" />
          <span>Next.js</span>
        </Badge>
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
    });

    it('should render non-string children such as a number', () => {
      render(<Badge>{2026}</Badge>);

      expect(screen.getByText('2026')).toBeVisible();
    });

    it('should stay inline so several badges can flow on one line', () => {
      render(<Badge>React</Badge>);

      expect(screen.getByText('React')).toHaveClass('inline-flex', 'items-center');
    });
  });

  describe('default styling', () => {
    it('should apply the base surface, border and typography classes', () => {
      render(<Badge>Tailwind</Badge>);

      expect(screen.getByText('Tailwind')).toHaveClass(
        'rounded-md',
        'border',
        'border-border',
        'bg-muted/40',
        'text-xs',
        'font-medium',
        'text-muted-foreground'
      );
    });

    it('should not emit an undefined token when no className is given', () => {
      render(<Badge>Vitest</Badge>);

      expect(screen.getByText('Vitest').className).not.toContain('undefined');
    });
  });

  describe('className merging via cn()', () => {
    it('should append a custom class that conflicts with nothing', () => {
      render(<Badge className="uppercase">PostgreSQL</Badge>);

      const badge = screen.getByText('PostgreSQL');

      expect(badge).toHaveClass('uppercase');
      // Nulla di quanto sopra appartiene alla stessa famiglia di `uppercase`:
      // lo stile di base deve restare intatto.
      expect(badge).toHaveClass('rounded-md', 'border-border', 'bg-muted/40', 'text-xs');
    });

    it('should let a custom class override the border radius', () => {
      render(<Badge className="rounded-full">Supabase</Badge>);

      const badge = screen.getByText('Supabase');

      expect(badge).toHaveClass('rounded-full');
      expect(badge).not.toHaveClass('rounded-md');
    });

    it('should let a custom class override the background', () => {
      render(<Badge className="bg-primary/10">In evidenza</Badge>);

      const badge = screen.getByText('In evidenza');

      expect(badge).toHaveClass('bg-primary/10');
      expect(badge).not.toHaveClass('bg-muted/40');
    });

    it('should let a custom class override the padding', () => {
      render(<Badge className="px-4">Node.js</Badge>);

      const badge = screen.getByText('Node.js');

      expect(badge).toHaveClass('px-4');
      expect(badge).not.toHaveClass('px-2.5');
      // `py-1` è una famiglia diversa da `px-4` e non va toccata.
      expect(badge).toHaveClass('py-1');
    });

    it('should override the font size without dropping the text colour', () => {
      // `text-sm` è una dimensione, `text-muted-foreground` un colore: solo la
      // prima deve sostituire la classe di base.
      render(<Badge className="text-sm">Vercel</Badge>);

      const badge = screen.getByText('Vercel');

      expect(badge).toHaveClass('text-sm', 'text-muted-foreground');
      expect(badge).not.toHaveClass('text-xs');
    });

    it('should apply the last of several conflicting custom classes', () => {
      render(<Badge className="rounded-none rounded-full">MDX</Badge>);

      const badge = screen.getByText('MDX');

      expect(badge).toHaveClass('rounded-full');
      expect(badge).not.toHaveClass('rounded-none');
      expect(badge).not.toHaveClass('rounded-md');
    });
  });
});
