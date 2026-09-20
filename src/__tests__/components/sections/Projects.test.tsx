/**
 * 🧪 Test Suite: Projects
 *
 * La griglia progetti non ha logica, ma ha due contratti che si rompono in
 * silenzio: la copy del link di dettaglio, e il fatto che ogni card esponga
 * **due** destinazioni distinte — il case study interno e la demo o il
 * repository — allineate ai due estremi della stessa riga.
 *
 * I casi sono derivati da `profileData`, non scritti a mano: aggiungere un
 * progetto non richiede di toccare questi test.
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Projects } from '../../../components/sections/Projects';
import { projects } from '../../../data/profileData';

const liveProjects = projects.filter((project) => project.linkType === 'live');
const repoProjects = projects.filter((project) => project.linkType === 'repo');

describe('Projects', () => {
  describe('griglia', () => {
    it('renderizza una card per ogni progetto del data layer', () => {
      render(<Projects />);

      for (const project of projects) {
        expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
      }
    });

    it('espone un link di dettaglio per ogni progetto', () => {
      render(<Projects />);

      expect(screen.getAllByRole('link', { name: 'Info' })).toHaveLength(projects.length);
    });
  });

  describe('link al case study', () => {
    it('usa la dicitura "Info"', () => {
      render(<Projects />);

      expect(screen.getAllByRole('link', { name: 'Info' }).length).toBeGreaterThan(0);
    });

    it('non usa più la vecchia dicitura "Case study"', () => {
      render(<Projects />);

      expect(screen.queryByRole('link', { name: /Case study/i })).toBeNull();
    });

    it('punta alla rotta interna del progetto', () => {
      render(<Projects />);

      const links = screen.getAllByRole('link', { name: 'Info' });

      links.forEach((link, index) => {
        expect(link).toHaveAttribute('href', `/projects/${projects[index].slug}`);
      });
    });
  });

  describe('link esterno', () => {
    it('etichetta "Demo" i progetti con una demo pubblica', () => {
      render(<Projects />);

      expect(screen.getAllByRole('link', { name: 'Demo' })).toHaveLength(liveProjects.length);
    });

    it('etichetta "Codice" i progetti che puntano a un repository', () => {
      render(<Projects />);

      expect(screen.getAllByRole('link', { name: 'Codice' })).toHaveLength(repoProjects.length);
    });

    it('apre le destinazioni esterne in sicurezza', () => {
      render(<Projects />);

      const externalLinks = [
        ...screen.queryAllByRole('link', { name: 'Demo' }),
        ...screen.queryAllByRole('link', { name: 'Codice' }),
      ];

      expect(externalLinks).toHaveLength(projects.length);

      for (const link of externalLinks) {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  describe('allineamento della riga dei link', () => {
    it('tiene i due link ai due estremi della stessa riga flex', () => {
      // È la garanzia che accorciare la copy da "Case study" a "Info" non
      // scomponga il piede della card: con `justify-between` la distanza si
      // ridistribuisce da sé.
      render(<Projects />);

      const row = screen.getAllByRole('link', { name: 'Info' })[0].parentElement;

      expect(row).toHaveClass('flex', 'items-center', 'justify-between');
    });

    it('mette entrambi i link nello stesso contenitore', () => {
      render(<Projects />);

      const row = screen.getAllByRole('link', { name: 'Info' })[0].parentElement;
      const externalLinks = [
        ...screen.queryAllByRole('link', { name: 'Demo' }),
        ...screen.queryAllByRole('link', { name: 'Codice' }),
      ];

      expect(row).toContainElement(externalLinks[0]);
    });

    it('tiene il link esterno sopra l overlay cliccabile della card', () => {
      // Il titolo della card è uno stretched link (`after:inset-0`): senza
      // `relative z-10` il link esterno finirebbe sotto e non sarebbe cliccabile.
      render(<Projects />);

      const external = [
        ...screen.queryAllByRole('link', { name: 'Demo' }),
        ...screen.queryAllByRole('link', { name: 'Codice' }),
      ][0];

      expect(external).toHaveClass('relative', 'z-10');
    });
  });
});
