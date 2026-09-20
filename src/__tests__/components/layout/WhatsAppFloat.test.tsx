/**
 * 🧪 Test Suite: WhatsAppFloat
 *
 * Il pulsante è fisso su ogni pagina, quindi i rischi non sono estetici: coprire
 * la navbar, rubare il focus, o puntare a un URL scollegato dal data layer.
 *
 * L'URL atteso non è scritto a mano nei test ma letto da `socialLinks`: se
 * qualcuno cambia il numero o il messaggio precompilato il test continua a
 * passare, mentre se il componente smette di leggere la fonte unica fallisce.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { WhatsAppFloat } from '../../../components/layout/WhatsAppFloat';
import { socialLinks } from '../../../data/profileData';

const whatsapp = socialLinks.find((link) => link.platform === 'whatsapp');

describe('WhatsAppFloat', () => {
  describe('collegamento', () => {
    it('renderizza un link raggiungibile dagli screen reader', () => {
      render(<WhatsAppFloat />);

      expect(screen.getByRole('link', { name: 'Contattami su WhatsApp' })).toBeInTheDocument();
    });

    it('legge href dal data layer invece di ricostruirlo', () => {
      render(<WhatsAppFloat />);

      expect(screen.getByRole('link')).toHaveAttribute('href', whatsapp?.href);
    });

    it('punta a wa.me con il messaggio precompilato', () => {
      render(<WhatsAppFloat />);

      const href = screen.getByRole('link').getAttribute('href') ?? '';

      expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    });

    it('apre in una nuova scheda con un rel sicuro', () => {
      render(<WhatsAppFloat />);

      const link = screen.getByRole('link');

      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('posizionamento', () => {
    it('è fisso in basso a destra', () => {
      render(<WhatsAppFloat />);

      expect(screen.getByRole('link')).toHaveClass('fixed', 'bottom-6', 'right-6');
    });

    it('resta sotto la navbar e lo skip link nello stacking order', () => {
      // La navbar è z-50 e lo skip link z-[60]: il pulsante non deve coprirli.
      render(<WhatsAppFloat />);

      const link = screen.getByRole('link');

      expect(link).toHaveClass('z-40');
      expect(link).not.toHaveClass('z-50');
    });

    it('ha un bersaglio tattile abbondantemente sopra i 44px', () => {
      // `size-14` vale 56px per lato.
      render(<WhatsAppFloat />);

      expect(screen.getByRole('link')).toHaveClass('size-14', 'rounded-full');
    });
  });

  describe('stile e movimento', () => {
    it('usa i token semantici invece di un esadecimale nel markup', () => {
      render(<WhatsAppFloat />);

      const link = screen.getByRole('link');

      expect(link).toHaveClass('bg-whatsapp', 'text-whatsapp-foreground');
      expect(link.className).not.toMatch(/#[0-9a-f]{3,6}/i);
    });

    it('accompagna lo hover con uno stato active, per il tap su touch', () => {
      // Su touch un :hover resta incollato dopo il tap: senza `active:` il
      // pulsante resterebbe ingrandito.
      render(<WhatsAppFloat />);

      expect(screen.getByRole('link')).toHaveClass('hover:scale-110', 'active:scale-95');
    });

    it('annulla l ingrandimento con prefers-reduced-motion', () => {
      render(<WhatsAppFloat />);

      expect(screen.getByRole('link')).toHaveClass(
        'motion-reduce:transition-none',
        'motion-reduce:hover:scale-100'
      );
    });
  });

  describe('accessibilità', () => {
    it('nasconde l icona agli screen reader, che leggono già aria-label', () => {
      const { container } = render(<WhatsAppFloat />);

      expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    });

    it('è raggiungibile da tastiera', async () => {
      const user = userEvent.setup();

      render(<WhatsAppFloat />);
      await user.tab();

      expect(screen.getByRole('link')).toHaveFocus();
    });

    it('non espone testo visibile che duplichi l etichetta', () => {
      render(<WhatsAppFloat />);

      expect(screen.getByRole('link')).toHaveTextContent('');
    });
  });
});

describe('socialLinks — voce WhatsApp', () => {
  it('esiste nel data layer', () => {
    expect(whatsapp).toBeDefined();
  });

  it('espone un URL assoluto https', () => {
    expect(whatsapp?.href).toMatch(/^https:\/\//);
  });

  it('ha una label usabile come aria-label', () => {
    expect(whatsapp?.label).toBe('WhatsApp');
  });

  it('non introduce piattaforme duplicate', () => {
    const platforms = socialLinks.map((link) => link.platform);

    expect(new Set(platforms).size).toBe(platforms.length);
  });

  it('espone solo URL assoluti su tutti i canali', () => {
    for (const link of socialLinks) {
      expect(link.href).toMatch(/^https:\/\//);
    }
  });
});
