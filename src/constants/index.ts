/**
 * Costanti globali dell'applicazione.
 *
 * Tenuto volutamente minimale: valori di timing, thresholds e regole di
 * validazione realmente usati dai componenti. Nella V1 questo modulo accumulava
 * costanti di feature rimosse (temi, lingua, typewriter, parallax, carosello) e,
 * soprattutto, le credenziali EmailJS in chiaro.
 *
 * @module constants
 */

// ============================================================================
// SITO
// ============================================================================

/**
 * URL base del sito, senza slash finale.
 *
 * Alimenta `metadataBase`, canonical, OpenGraph, JSON-LD, `sitemap.ts` e
 * `robots.ts`: è l'unico punto da cambiare per migrare dominio.
 *
 * Nota: punta ancora al dominio Vercel perché carmelolamantia.it non è
 * configurato a livello DNS.
 */
export const SITE_URL = 'https://my-profile-ten-beta.vercel.app';

// ============================================================================
// TIMING (millisecondi)
// ============================================================================

/** Scroll oltre il quale la navbar assume il fondo opaco. */
export const SCROLL_THRESHOLD = 24;

/** Durata di visualizzazione dei messaggi di esito del form. */
export const FEEDBACK_DURATION = 5000;

// ============================================================================
// VALIDAZIONE
// ============================================================================

export const VALIDATION = {
  minNameLength: 2,
  minMessageLength: 10,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export type ValidationRules = typeof VALIDATION;

// ============================================================================
// EMAILJS
// ============================================================================

/**
 * Configurazione EmailJS letta esclusivamente da variabili `NEXT_PUBLIC_`.
 *
 * Due regole, entrambe violate dalla V1:
 * 1. In Next.js solo il prefisso `NEXT_PUBLIC_` arriva al bundle client: con
 *    `REACT_APP_` (eredità di Create React App) i valori sono sempre `undefined`.
 * 2. Nessun fallback hardcodato. Se le variabili mancano il form si disabilita
 *    e lo dichiara, invece di far finta di funzionare con credenziali committate
 *    nel sorgente e leggibili da chiunque abbia accesso al repository.
 */
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_KEY,
} as const;

/** True solo se tutte e tre le variabili sono presenti e non vuote. */
export const isEmailJsConfigured: boolean = Boolean(
  EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey
);

// ============================================================================
// NAVIGAZIONE
// ============================================================================

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

/**
 * Voci della navbar. Il Blog è incluso: nella V1 le rotte esistevano ed erano
 * buildate, ma nessun link della UI le raggiungeva.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Competenze', href: '/#skills' },
  { label: 'Progetti', href: '/#projects' },
  { label: 'Percorso', href: '/#timeline' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contatti', href: '/#contact' },
];
