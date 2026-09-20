/**
 * 🧪 Test Suite: Button, ButtonLink, buttonStyles
 *
 * Le primitive di `ui/` non hanno logica di dominio: quello che vale la pena
 * proteggere è il contratto verso chi le usa — varianti e taglie, possibilità di
 * sovrascrivere lo stile via `className`, inoltro di eventi e attributi ARIA al
 * nodo DOM reale.
 *
 * Le asserzioni sulle classi sono volutamente mirate a una classe distintiva per
 * variante: verificare l'intera stringa legherebbe il test alla formattazione del
 * sorgente invece che al comportamento.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button, ButtonLink, buttonStyles } from '../../../components/ui/Button';

/**
 * `buttonStyles` restituisce una stringa, e una ricerca per sottostringa
 * ingannerebbe: `'hover:bg-primary/90'` contiene `'bg-primary'`. Confrontiamo
 * quindi i singoli token, come fa `toHaveClass` sul DOM.
 */
const tokens = (classes: string): string[] => classes.split(/\s+/).filter(Boolean);

describe('Button', () => {
  describe('rendering', () => {
    it('should render its children inside a native button element', () => {
      render(<Button>Contattami</Button>);

      const button = screen.getByRole('button', { name: 'Contattami' });

      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });

    it('should render composite children such as an icon next to a label', () => {
      render(
        <Button>
          <svg data-testid="icon" />
          <span>Scarica il CV</span>
        </Button>
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Scarica il CV' })).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('should fall back to the primary variant when none is given', () => {
      render(<Button>Contattami</Button>);

      expect(screen.getByRole('button')).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('should apply the primary variant classes', () => {
      render(<Button variant="primary">Contattami</Button>);

      expect(screen.getByRole('button')).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('should apply the outline variant classes', () => {
      render(<Button variant="outline">Contattami</Button>);

      expect(screen.getByRole('button')).toHaveClass(
        'border',
        'border-border',
        'bg-transparent',
        'text-foreground'
      );
    });

    it('should apply the ghost variant classes', () => {
      render(<Button variant="ghost">Contattami</Button>);

      expect(screen.getByRole('button')).toHaveClass('text-muted-foreground');
    });

    it('should not leak the classes of one variant into another', () => {
      render(<Button variant="ghost">Contattami</Button>);

      const button = screen.getByRole('button');

      // Il ghost è trasparente e senza bordo: se comparisse una di queste classi
      // significherebbe che le varianti si sono sommate invece di sostituirsi.
      expect(button).not.toHaveClass('bg-primary');
      expect(button).not.toHaveClass('border-border');
    });

    it('should always keep the shared base classes regardless of the variant', () => {
      render(<Button variant="ghost">Contattami</Button>);

      expect(screen.getByRole('button')).toHaveClass(
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-lg'
      );
    });
  });

  describe('sizes', () => {
    it('should fall back to the md size when none is given', () => {
      render(<Button>Contattami</Button>);

      expect(screen.getByRole('button')).toHaveClass('h-11', 'px-5', 'text-sm');
    });

    it('should apply the sm size classes', () => {
      render(<Button size="sm">Contattami</Button>);

      expect(screen.getByRole('button')).toHaveClass('h-9', 'px-3');
    });

    it('should apply the lg size classes', () => {
      render(<Button size="lg">Contattami</Button>);

      expect(screen.getByRole('button')).toHaveClass('h-12', 'px-6', 'text-base');
    });

    it('should not leak the classes of one size into another', () => {
      render(<Button size="sm">Contattami</Button>);

      const button = screen.getByRole('button');

      expect(button).not.toHaveClass('h-11');
      expect(button).not.toHaveClass('h-12');
    });
  });

  describe('className merging via cn()', () => {
    it('should append a custom class that conflicts with nothing', () => {
      render(<Button className="w-full">Contattami</Button>);

      const button = screen.getByRole('button');

      expect(button).toHaveClass('w-full');
      // `w-full` non appartiene a nessuna famiglia già presente: le classi di
      // base devono sopravvivere tutte.
      expect(button).toHaveClass('inline-flex', 'rounded-lg', 'bg-primary', 'h-11');
    });

    it('should let a custom class override a base class of the same family', () => {
      render(<Button className="rounded-full">Contattami</Button>);

      const button = screen.getByRole('button');

      expect(button).toHaveClass('rounded-full');
      expect(button).not.toHaveClass('rounded-lg');
    });

    it('should let a custom class override the variant class', () => {
      render(
        <Button variant="primary" className="bg-red-500">
          Contattami
        </Button>
      );

      const button = screen.getByRole('button');

      expect(button).toHaveClass('bg-red-500');
      expect(button).not.toHaveClass('bg-primary');
    });

    it('should let a custom class override the size class', () => {
      render(
        <Button size="md" className="h-14">
          Contattami
        </Button>
      );

      const button = screen.getByRole('button');

      expect(button).toHaveClass('h-14');
      expect(button).not.toHaveClass('h-11');
    });

    it('should keep utilities from different families side by side', () => {
      // `text-sm` è una dimensione, `text-foreground` un colore: non sono in
      // conflitto e devono convivere. È il caso che si rompe per primo se `cn()`
      // viene sostituita da una concatenazione di stringhe.
      render(
        <Button variant="outline" size="md">
          Contattami
        </Button>
      );

      expect(screen.getByRole('button')).toHaveClass('text-sm', 'text-foreground');
    });

    it('should render without a className prop', () => {
      render(<Button>Contattami</Button>);

      // `cn()` riceve `undefined` come ultimo argomento: non deve finire nella
      // stringa di classi come testo.
      expect(screen.getByRole('button').className).not.toContain('undefined');
    });
  });

  describe('event and attribute forwarding', () => {
    it('should forward onClick to the underlying button', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={onClick}>Invia</Button>);
      await user.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not fire onClick while disabled', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={onClick} disabled>
          Invia
        </Button>
      );

      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      await user.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should forward the type attribute', () => {
      render(<Button type="submit">Invia</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('should forward arbitrary data attributes', () => {
      render(<Button data-testid="cta">Invia</Button>);

      expect(screen.getByTestId('cta')).toBeInTheDocument();
    });
  });

  describe('accessibility attributes', () => {
    it('should forward aria-label, aria-expanded and aria-controls to the DOM node', () => {
      render(
        <Button aria-label="Apri il menu" aria-expanded={false} aria-controls="mobile-menu">
          <svg data-testid="icon" />
        </Button>
      );

      const button = screen.getByRole('button', { name: 'Apri il menu' });

      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('should expose the disabled state to assistive technology', () => {
      render(<Button disabled>Invia</Button>);

      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should let an aria-label win over the text content for the accessible name', () => {
      render(<Button aria-label="Invia il modulo di contatto">Invia</Button>);

      expect(
        screen.getByRole('button', { name: 'Invia il modulo di contatto' })
      ).toBeInTheDocument();
    });
  });
});

describe('ButtonLink', () => {
  it('should render an anchor pointing at the given href', () => {
    render(<ButtonLink href="/projects">Progetti</ButtonLink>);

    const link = screen.getByRole('link', { name: 'Progetti' });

    expect(link).toHaveAttribute('href', '/projects');
  });

  it('should leave internal links without target or rel', () => {
    render(<ButtonLink href="/blog">Blog</ButtonLink>);

    const link = screen.getByRole('link');

    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('should open external links in a new tab with a safe rel', () => {
    // `rel="noopener noreferrer"` lo mette il componente, non chi lo usa: senza,
    // la pagina di destinazione raggiunge `window.opener`.
    render(
      <ButtonLink href="https://github.com/MeloLM" external>
        GitHub
      </ButtonLink>
    );

    const link = screen.getByRole('link', { name: 'GitHub' });

    expect(link).toHaveAttribute('href', 'https://github.com/MeloLM');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should style itself exactly like a Button with the same variant and size', () => {
    // Il contratto dichiarato da `buttonStyles`: una CTA resa come <button> e la
    // stessa CTA resa come link devono essere indistinguibili.
    render(
      <>
        <Button variant="outline" size="lg">
          CTA
        </Button>
        <ButtonLink href="/cv" variant="outline" size="lg">
          CTA
        </ButtonLink>
      </>
    );

    expect(screen.getByRole('link').className).toBe(screen.getByRole('button').className);
  });

  it('should let className override the base styles', () => {
    render(
      <ButtonLink href="/cv" className="rounded-full">
        CV
      </ButtonLink>
    );

    const link = screen.getByRole('link');

    expect(link).toHaveClass('rounded-full');
    expect(link).not.toHaveClass('rounded-lg');
  });

  it('should forward aria attributes to the anchor', () => {
    render(
      <ButtonLink href="/blog" aria-label="Vai al blog" aria-current="page">
        Blog
      </ButtonLink>
    );

    const link = screen.getByRole('link', { name: 'Vai al blog' });

    expect(link).toHaveAttribute('aria-current', 'page');
  });
});

describe('buttonStyles', () => {
  it('should default to the primary variant and the md size', () => {
    const classes = tokens(buttonStyles());

    expect(classes).toContain('bg-primary');
    expect(classes).toContain('h-11');
  });

  it('should compose base, variant, size and custom classes', () => {
    const classes = tokens(buttonStyles('outline', 'lg', 'w-full'));

    expect(classes).toContain('inline-flex');
    expect(classes).toContain('border-border');
    expect(classes).toContain('h-12');
    expect(classes).toContain('w-full');
  });

  it('should resolve a conflict in favour of the custom class', () => {
    const classes = tokens(buttonStyles('primary', 'md', 'h-14'));

    expect(classes).toContain('h-14');
    expect(classes).not.toContain('h-11');
  });

  it('should not emit an empty or undefined token when no custom class is given', () => {
    const classes = tokens(buttonStyles('ghost', 'sm'));

    expect(classes).not.toContain('undefined');
    expect(classes.every((token) => token.length > 0)).toBe(true);
  });
});
