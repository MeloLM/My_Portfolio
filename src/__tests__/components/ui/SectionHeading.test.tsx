/**
 * 🧪 Test Suite: SectionHeading
 *
 * Il livello dell'intestazione non è una scelta estetica: un `h2` senza `h1`
 * sopra lascia la pagina senza radice, e per un crawler è la differenza fra
 * sapere di cosa parla la rotta e doverlo indovinare. L'indice del blog aveva
 * esattamente questo difetto, invisibile a lint, type-check e a occhio nudo —
 * perché `h1` e `h2` qui sono resi con la stessa identica classe.
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionHeading } from '../../../components/ui/SectionHeading';

describe('SectionHeading', () => {
  describe('livello dell intestazione', () => {
    it('usa h2 quando non viene chiesto altro', () => {
      // Il default serve le sezioni della landing, che vivono sotto l'h1 della
      // hero: cambiarlo introdurrebbe un secondo h1 in home.
      render(<SectionHeading eyebrow="Progetti" title="Cosa ho costruito" />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Cosa ho costruito');
      expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    });

    it('sale a h1 quando apre una rotta a sé', () => {
      render(<SectionHeading as="h1" eyebrow="DevLog" title="Note tecniche" />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Note tecniche');
      expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    });

    it('non cambia la resa tipografica cambiando livello', () => {
      // Il livello è semantica, non dimensione: le due varianti devono essere
      // indistinguibili a schermo, altrimenti correggere la SEO di una pagina
      // ne cambierebbe anche il design.
      const { unmount } = render(<SectionHeading as="h1" eyebrow="A" title="Titolo" />);
      const classiH1 = screen.getByRole('heading', { level: 1 }).className;
      unmount();

      render(<SectionHeading eyebrow="A" title="Titolo" />);

      expect(screen.getByRole('heading', { level: 2 }).className).toBe(classiH1);
    });
  });

  describe('contenuto', () => {
    it('rende eyebrow e titolo', () => {
      render(<SectionHeading eyebrow="Contatti" title="Lavoriamo insieme" />);

      expect(screen.getByText('Contatti')).toBeInTheDocument();
      expect(screen.getByRole('heading')).toHaveTextContent('Lavoriamo insieme');
    });

    it('omette la descrizione quando non è passata', () => {
      const { container } = render(<SectionHeading eyebrow="X" title="Y" />);

      expect(container.querySelectorAll('p')).toHaveLength(0);
    });

    it('rende la descrizione quando c è', () => {
      render(<SectionHeading eyebrow="X" title="Y" description="Una riga di contesto." />);

      expect(screen.getByText('Una riga di contesto.')).toBeInTheDocument();
    });
  });
});
