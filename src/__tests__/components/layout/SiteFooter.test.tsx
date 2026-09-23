/**
 * 🧪 Test Suite: SiteFooter
 *
 * Il footer è l'unico punto del sito raggiungibile da ogni pagina in cui
 * l'informativa privacy è linkata. Se quel link sparisce, nessun'altra cosa si
 * rompe — il sito continua a funzionare, semplicemente smette di essere
 * conforme. È esattamente il tipo di regressione che un test deve fermare.
 */

import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SiteFooter } from '../../../components/layout/SiteFooter';
import { NAV_ITEMS } from '../../../constants';
import { personalInfo, socialLinks } from '../../../data/profileData';

describe('SiteFooter', () => {
  describe('privacy', () => {
    it('linka l informativa', () => {
      render(<SiteFooter />);

      expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
        'href',
        '/privacy'
      );
    });

    it('tiene l informativa fuori dalla navigazione principale', () => {
      render(<SiteFooter />);

      // `NAV_ITEMS` alimenta anche navbar e menu mobile: infilarci /privacy
      // l'avrebbe promossa a voce di menu, che non è.
      const nav = within(screen.getByRole('navigation', { name: 'Navigazione footer' }));

      expect(nav.queryByRole('link', { name: 'Privacy Policy' })).not.toBeInTheDocument();
      expect(NAV_ITEMS.some((item) => item.href === '/privacy')).toBe(false);
    });
  });

  describe('contenuto', () => {
    it('rende una voce per ogni elemento di navigazione', () => {
      render(<SiteFooter />);

      const nav = within(screen.getByRole('navigation', { name: 'Navigazione footer' }));

      for (const { label, href } of NAV_ITEMS) {
        expect(nav.getByRole('link', { name: label })).toHaveAttribute('href', href);
      }
    });

    it('apre ogni canale social in sicurezza', () => {
      render(<SiteFooter />);

      for (const { label, href } of socialLinks) {
        const link = screen.getByRole('link', { name: label });

        expect(link).toHaveAttribute('href', href);
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });

    it('mostra l anno corrente accanto al titolare', () => {
      render(<SiteFooter />);

      const year = String(new Date().getFullYear());

      expect(screen.getByText(new RegExp(`${year}.*${personalInfo.name}`))).toBeInTheDocument();
    });
  });
});
