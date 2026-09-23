/**
 * 🧪 Test Suite: CookieBanner
 *
 * Tre rischi distinti, tre gruppi di test.
 *
 *   **Idratazione** — il banner dipende da `localStorage`, che sul server non
 *   esiste. Se lo stato iniziale lo leggesse durante il render, l'HTML servito
 *   e quello del primo render client divergerebbero e React segnalerebbe un
 *   mismatch. Si verifica renderizzando davvero sul server con `renderToString`,
 *   non ispezionando il codice.
 *
 *   **Persistenza** — la nota deve sparire dopo la conferma e non tornare.
 *
 *   **Storage negato** — in navigazione privata `localStorage` può lanciare sia
 *   in lettura sia in scrittura. Il banner deve degradare, non far esplodere la
 *   pagina che lo ospita: è montato nel root layout, quindi un'eccezione qui
 *   porterebbe giù ogni rotta del sito.
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CookieBanner } from '../../../components/ui/CookieBanner';
import { NOTICE_STORAGE_KEY } from '../../../constants';

// `vi.mocked` sull'oggetto non tipizza i metodi in profondità: vanno presi uno
// per uno, altrimenti `tsc` non vede `mockReturnValue` pur girando i test.
const getItem = vi.mocked(window.localStorage.getItem);
const setItem = vi.mocked(window.localStorage.setItem);

/** Nota mai letta: `getItem` restituisce `null`, come fa il browser vero. */
function notaMaiLetta() {
  getItem.mockReturnValue(null);
}

beforeEach(() => {
  vi.clearAllMocks();
  notaMaiLetta();
});

describe('CookieBanner', () => {
  describe('idratazione', () => {
    it('non produce alcun markup sul server', () => {
      // Se qualcuno spostasse la lettura di `localStorage` dentro `useState`,
      // qui comparirebbe del markup (o un'eccezione): in entrambi i casi il
      // client renderizzerebbe qualcosa di diverso e l'idratazione fallirebbe.
      expect(renderToString(<CookieBanner />)).toBe('');
    });

    it('non legge lo storage durante il render', () => {
      renderToString(<CookieBanner />);

      expect(getItem).not.toHaveBeenCalled();
    });
  });

  describe('prima visita', () => {
    it('mostra la nota quando non risulta ancora letta', () => {
      render(<CookieBanner />);

      expect(screen.getByRole('region', { name: 'Informativa sui cookie' })).toBeInTheDocument();
    });

    it('rimanda all informativa completa', () => {
      render(<CookieBanner />);

      expect(screen.getByRole('link', { name: 'Leggi la Policy' })).toHaveAttribute(
        'href',
        '/privacy'
      );
    });

    it('non offre un rifiuto che non avrebbe nulla da rifiutare', () => {
      // Il solo dato salvato è funzionale e non richiede consenso: un pulsante
      // "Rifiuta" prometterebbe una scelta che non esiste. Se un domani venisse
      // aggiunto un trattamento facoltativo, questo test va rimosso di
      // proposito — ed è il punto in cui ci si accorge che serve un vero gate.
      render(<CookieBanner />);

      const nota = screen.getByRole('region', { name: 'Informativa sui cookie' });

      expect(within(nota).getAllByRole('button')).toHaveLength(1);
      expect(within(nota).queryByRole('button', { name: /rifiut|nega/i })).not.toBeInTheDocument();
    });

    it('dichiara che nulla viene tracciato o ceduto', () => {
      render(<CookieBanner />);

      const testo = screen.getByRole('region', { name: 'Informativa sui cookie' }).textContent;

      expect(testo).toMatch(/nessun dato viene tracciato o ceduto a terzi/i);
    });
  });

  describe('persistenza della scelta', () => {
    it('sparisce alla conferma', async () => {
      const user = userEvent.setup();

      render(<CookieBanner />);
      await user.click(screen.getByRole('button', { name: 'OK, ho capito' }));

      expect(screen.queryByRole('region', { name: 'Informativa sui cookie' })).not.toBeInTheDocument();
    });

    it('registra la scelta con la chiave dichiarata nell informativa', async () => {
      const user = userEvent.setup();

      render(<CookieBanner />);
      await user.click(screen.getByRole('button', { name: 'OK, ho capito' }));

      // La stessa costante che /privacy mostra all'utente: se cambiasse solo
      // qui, l'informativa dichiarerebbe una chiave inesistente.
      expect(setItem).toHaveBeenCalledWith(NOTICE_STORAGE_KEY, expect.any(String));
    });

    it('non ricompare a chi ha già confermato', () => {
      getItem.mockReturnValue('letta');

      render(<CookieBanner />);

      expect(screen.queryByRole('region', { name: 'Informativa sui cookie' })).not.toBeInTheDocument();
    });
  });

  describe('storage negato', () => {
    it('mostra comunque la nota se non può sapere se è già stata letta', () => {
      getItem.mockImplementation(() => {
        throw new DOMException('denied', 'SecurityError');
      });

      // Ripetersi è un fastidio; tacere sarebbe una mancata informativa.
      expect(() => render(<CookieBanner />)).not.toThrow();
      expect(screen.getByRole('region', { name: 'Informativa sui cookie' })).toBeInTheDocument();
    });

    it('si chiude anche quando la scrittura fallisce', async () => {
      const user = userEvent.setup();
      setItem.mockImplementation(() => {
        throw new DOMException('quota', 'QuotaExceededError');
      });

      render(<CookieBanner />);
      await user.click(screen.getByRole('button', { name: 'OK, ho capito' }));

      // Tornerà alla visita successiva, ma la sessione corrente non si rompe.
      expect(screen.queryByRole('region', { name: 'Informativa sui cookie' })).not.toBeInTheDocument();
    });
  });
});
