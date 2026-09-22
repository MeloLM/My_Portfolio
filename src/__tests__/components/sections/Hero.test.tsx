/**
 * 🧪 Test Suite: Hero + Starfield
 *
 * Il canvas di sfondo è decorativo, quindi il rischio non è che si veda male: è
 * che si metta in mezzo. Questi test presidiano il confine — il canvas resta
 * fuori dall'albero di accessibilità, non intercetta il puntatore e non sposta
 * l'ordine di tabulazione delle due CTA.
 *
 * Il rendering avviene senza contesto 2D: jsdom non implementa `getContext`, e
 * qui lo stubbiamo esplicitamente a `null` per due motivi — silenziare il
 * "Not implemented" del virtual console e verificare che `Starfield` degradi in
 * silenzio quando il canvas non è disponibile, invece di far esplodere la hero.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { Hero } from '../../../components/sections/Hero';
import { personalInfo, summary } from '../../../data/profileData';

const originalGetContext = HTMLCanvasElement.prototype.getContext;

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => null);
});

afterAll(() => {
  HTMLCanvasElement.prototype.getContext = originalGetContext;
});

describe('Hero', () => {
  describe('content', () => {
    it('should render the name as the page heading', () => {
      render(<Hero />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(personalInfo.name);
    });

    it('should render the bio from the data layer', () => {
      render(<Hero />);

      // La bio non è scritta qui dentro: se cambia in `profileData` questo test
      // continua a valere, mentre una copia incollata nel markup lo romperebbe.
      expect(screen.getByText(summary)).toBeInTheDocument();
    });

    it('should render both call to action links', () => {
      render(<Hero />);

      expect(screen.getByRole('link', { name: /Scarica CV/i })).toHaveAttribute(
        'href',
        personalInfo.cvPath
      );
      expect(screen.getByRole('link', { name: /Vedi Progetti/i })).toHaveAttribute(
        'href',
        '/#projects'
      );
    });
  });

  describe('starfield background', () => {
    it('should render a canvas inside the hero', () => {
      const { container } = render(<Hero />);

      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('should keep the canvas out of the accessibility tree', () => {
      const { container } = render(<Hero />);

      expect(container.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true');
    });

    it('should keep the canvas behind the content and transparent to the pointer', () => {
      const { container } = render(<Hero />);

      // `pointer-events-none` è ciò che tiene cliccabili le CTA sotto al canvas;
      // `z-[-1]` è ciò che lo tiene dietro di esse.
      expect(container.querySelector('canvas')).toHaveClass(
        'pointer-events-none',
        'absolute',
        'inset-0',
        'z-[-1]',
        'h-full',
        'w-full'
      );
    });

    it('should isolate the hero so the negative z-index cannot escape it', () => {
      const { container } = render(<Hero />);

      // Senza `isolate` il canvas scivolerebbe dietro allo sfondo della pagina.
      expect(container.firstChild).toHaveClass('relative', 'isolate', 'overflow-hidden');
    });

    it('should render the hero even when no 2D context is available', () => {
      // `getContext` è stubbato a null: se `Starfield` non gestisse il caso, il
      // rendering dell'intera sezione fallirebbe.
      expect(() => render(<Hero />)).not.toThrow();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('portrait column', () => {
    it('should not request an image while no portrait is configured', () => {
      // Il segnaposto non è solo estetica: puntare `<Image>` a un file che non
      // esiste produce un 400 dell'ottimizzatore e l'icona di immagine rotta.
      render(<Hero />);

      if (personalInfo.avatarSrc) return;

      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('should keep the placeholder out of the accessibility tree', () => {
      render(<Hero />);

      if (personalInfo.avatarSrc) return;

      // Le iniziali sono il buco lasciato dalla foto, non un'informazione: il
      // nome per esteso è già nell'`h1` accanto.
      //
      // Si verifica l'antenato `aria-hidden` e non l'assenza del nodo: le query
      // `ByText` leggono il DOM, non l'albero di accessibilità, quindi trovano
      // comunque un elemento nascosto agli assistive tech.
      const initials = personalInfo.name
        .split(' ')
        .map((part) => part.charAt(0))
        .join('');

      expect(screen.getByText(initials).closest('[aria-hidden="true"]')).not.toBeNull();
    });

    it('should render the portrait after the heading in reading order', () => {
      // Su mobile la griglia collassa a una colonna e segue l'ordine del DOM:
      // l'`h1` deve restare il primo elemento, sia per chi legge con uno screen
      // reader sia perché è lui l'LCP della pagina.
      render(<Hero />);

      const heading = screen.getByRole('heading', { level: 1 });
      const portrait = screen.getByTestId('hero-portrait');

      expect(heading.compareDocumentPosition(portrait)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  describe('keyboard access', () => {
    it('should reach the first call to action with a single Tab', async () => {
      const user = userEvent.setup();

      render(<Hero />);
      await user.tab();

      expect(screen.getByRole('link', { name: /Scarica CV/i })).toHaveFocus();
    });

    it('should reach the second call to action with the next Tab', async () => {
      const user = userEvent.setup();

      render(<Hero />);
      await user.tab();
      await user.tab();

      expect(screen.getByRole('link', { name: /Vedi Progetti/i })).toHaveFocus();
    });

    it('should not place the canvas in the tab order', async () => {
      const user = userEvent.setup();

      const { container } = render(<Hero />);
      const canvas = container.querySelector('canvas');

      await user.tab();

      expect(canvas).not.toHaveFocus();
      expect(canvas).not.toHaveAttribute('tabindex');
    });
  });
});
