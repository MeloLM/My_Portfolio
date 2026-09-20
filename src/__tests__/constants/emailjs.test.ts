/**
 * 🧪 Test Suite: configurazione EmailJS
 *
 * `isEmailJsConfigured` è il primo dei due cancelli che tengono il form di
 * contatto in stato degradato quando le credenziali mancano. Qui se ne verifica
 * la matrice completa: assente, vuota, di soli spazi, parziale, completa.
 *
 * ⚠️ Nota importante sul comportamento reale: in Next.js le variabili
 * `NEXT_PUBLIC_*` non vengono lette a runtime, ma sostituite dal bundler con il
 * loro valore letterale **a build time**. In Vitest non c'è quella sostituzione,
 * quindi qui `process.env` è leggibile davvero e si può pilotare. La conseguenza
 * pratica in produzione è che cambiare una variabile su Vercel non ha effetto
 * finché non si ricompila: serve un redeploy.
 */

import { describe, it, expect, afterEach, vi } from 'vitest';

const KEYS = [
  'NEXT_PUBLIC_EMAILJS_SERVICE',
  'NEXT_PUBLIC_EMAILJS_TEMPLATE',
  'NEXT_PUBLIC_EMAILJS_KEY',
] as const;

type EnvKey = (typeof KEYS)[number];
type EnvPatch = Partial<Record<EnvKey, string | undefined>>;

const ORIGINAL_ENV = { ...process.env };

/**
 * Riscrive le tre variabili e ricarica il modulo: `isEmailJsConfigured` è
 * calcolata una sola volta al caricamento, quindi senza `resetModules` ogni test
 * leggerebbe il valore del primo.
 */
async function loadWithEnv(patch: EnvPatch) {
  for (const key of KEYS) {
    const value = patch[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }

  vi.resetModules();
  return import('../../constants');
}

const ALL_PRESENT: EnvPatch = {
  NEXT_PUBLIC_EMAILJS_SERVICE: 'service_test',
  NEXT_PUBLIC_EMAILJS_TEMPLATE: 'template_test',
  NEXT_PUBLIC_EMAILJS_KEY: 'key_test',
};

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.resetModules();
});

describe('isEmailJsConfigured', () => {
  describe('configurazione completa', () => {
    it('è true quando tutte e tre le variabili sono valorizzate', async () => {
      const { isEmailJsConfigured } = await loadWithEnv(ALL_PRESENT);

      expect(isEmailJsConfigured).toBe(true);
    });

    it('espone i valori letti, senza riscriverli', async () => {
      const { EMAILJS_CONFIG } = await loadWithEnv(ALL_PRESENT);

      expect(EMAILJS_CONFIG.serviceId).toBe('service_test');
      expect(EMAILJS_CONFIG.templateId).toBe('template_test');
      expect(EMAILJS_CONFIG.publicKey).toBe('key_test');
    });
  });

  describe('configurazione assente', () => {
    it('è false quando mancano tutte e tre le variabili', async () => {
      const { isEmailJsConfigured } = await loadWithEnv({});

      expect(isEmailJsConfigured).toBe(false);
    });

    it('lascia i valori a undefined invece di inventare fallback', async () => {
      // Il difetto storico della V1: `process.env.X || '<id hardcodato>'`, con la
      // credenziale reale scritta nel sorgente e committata.
      const { EMAILJS_CONFIG } = await loadWithEnv({});

      expect(EMAILJS_CONFIG.serviceId).toBeUndefined();
      expect(EMAILJS_CONFIG.templateId).toBeUndefined();
      expect(EMAILJS_CONFIG.publicKey).toBeUndefined();
    });
  });

  describe('configurazione parziale', () => {
    it('è false se manca solo il service id', async () => {
      const { isEmailJsConfigured } = await loadWithEnv({
        ...ALL_PRESENT,
        NEXT_PUBLIC_EMAILJS_SERVICE: undefined,
      });

      expect(isEmailJsConfigured).toBe(false);
    });

    it('è false se manca solo il template id', async () => {
      const { isEmailJsConfigured } = await loadWithEnv({
        ...ALL_PRESENT,
        NEXT_PUBLIC_EMAILJS_TEMPLATE: undefined,
      });

      expect(isEmailJsConfigured).toBe(false);
    });

    it('è false se manca solo la public key', async () => {
      const { isEmailJsConfigured } = await loadWithEnv({
        ...ALL_PRESENT,
        NEXT_PUBLIC_EMAILJS_KEY: undefined,
      });

      expect(isEmailJsConfigured).toBe(false);
    });
  });

  describe('valori presenti ma inutilizzabili', () => {
    it('è false con una variabile valorizzata a stringa vuota', async () => {
      const { isEmailJsConfigured } = await loadWithEnv({
        ...ALL_PRESENT,
        NEXT_PUBLIC_EMAILJS_KEY: '',
      });

      expect(isEmailJsConfigured).toBe(false);
    });

    it('è false con una variabile fatta di soli spazi', async () => {
      // `' '` è truthy: senza `trim()` il form si dichiarerebbe operativo e
      // fallirebbe soltanto al momento dell'invio.
      const { isEmailJsConfigured } = await loadWithEnv({
        ...ALL_PRESENT,
        NEXT_PUBLIC_EMAILJS_SERVICE: '   ',
      });

      expect(isEmailJsConfigured).toBe(false);
    });

    it('è false anche se tutte e tre sono fatte di spazi o tabulazioni', async () => {
      const { isEmailJsConfigured } = await loadWithEnv({
        NEXT_PUBLIC_EMAILJS_SERVICE: ' ',
        NEXT_PUBLIC_EMAILJS_TEMPLATE: '\t',
        NEXT_PUBLIC_EMAILJS_KEY: '  \n  ',
      });

      expect(isEmailJsConfigured).toBe(false);
    });
  });
});
