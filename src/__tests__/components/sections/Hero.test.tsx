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
import { personalInfo } from '../../../data/profileData';

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
