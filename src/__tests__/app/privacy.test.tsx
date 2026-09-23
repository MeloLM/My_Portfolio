/**
 * 🧪 Test Suite: Informativa privacy
 *
 * Qui il rischio non è estetico. Un'informativa che dichiara meno di quello che
 * il sito fa davvero non è una pagina brutta: è una dichiarazione falsa. Questi
 * test presidiano i tre punti in cui il testo può allontanarsi dal codice senza
 * che nulla si rompa:
 *
 *   1. i recapiti del titolare, che devono venire dal data layer e non essere
 *      ricopiati a mano nel markup;
 *   2. l'elenco dei dati raccolti, che deve coprire ogni campo del modulo;
 *   3. i riferimenti che rendono esercitabili i diritti — il `mailto:` e il
 *      link al Garante.
 *
 * Il primo presidio contro il punto 2 non è un test ma il tipo: `collectedData`
 * è un `Record<keyof EmailFormData, string>`, quindi aggiungere un campo al form
 * senza dichiararlo nell'informativa non compila. Il test copre il passo che il
 * tipo non vede: che le etichette finiscano davvero in pagina.
 */

import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PrivacyPage from '../../app/privacy/page';
import { NOTICE_STORAGE_KEY } from '../../constants';
import { personalInfo } from '../../data/profileData';

/**
 * Matcher su testo spezzato fra più elementi, insensibile ai metacaratteri.
 *
 * `personalInfo.location` vale "Canicattì (AG), Sicilia": passarlo a `RegExp`
 * trasformerebbe "(AG)" in un gruppo di cattura, e la ricerca fallirebbe pur
 * essendo il testo in pagina.
 */
const hasText = (needle: string) => (_content: string, element: Element | null) =>
  element?.textContent?.includes(needle) ?? false;

/** La pagina monta l'intero guscio: le query vanno ristrette al contenuto. */
function renderPrivacy() {
  render(<PrivacyPage />);
  return within(screen.getByRole('main'));
}

describe('Informativa privacy', () => {
  describe('struttura', () => {
    it('espone il titolo come intestazione di primo livello', () => {
      const main = renderPrivacy();

      // `SectionHeading` emette un `h2`: usarlo qui avrebbe lasciato la pagina
      // senza `h1`, come succede oggi a /blog.
      expect(main.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Informativa sulla Privacy'
      );
    });

    it('dichiara una data di ultimo aggiornamento', () => {
      const main = renderPrivacy();

      expect(main.getByText(/Ultimo aggiornamento/i)).toBeInTheDocument();
    });
  });

  describe('titolare del trattamento', () => {
    it('legge nome e località dal data layer', () => {
      const main = renderPrivacy();

      expect(main.getByText(personalInfo.name)).toBeInTheDocument();
      expect(main.getAllByText(hasText(personalInfo.location)).length).toBeGreaterThan(0);
    });

    it('rende scrivibile il titolare da ogni sezione che lo cita', () => {
      const main = renderPrivacy();

      const mailto = main.getAllByRole('link', { name: personalInfo.email });

      // Titolare, revoca del consenso, esercizio dei diritti: tre sezioni
      // rimandano all'email, e da tutte e tre dev'essere un link cliccabile.
      expect(mailto.length).toBeGreaterThanOrEqual(3);
      for (const link of mailto) {
        expect(link).toHaveAttribute('href', `mailto:${personalInfo.email}`);
      }
    });
  });

  describe('dati raccolti', () => {
    it('elenca ogni campo che il modulo di contatto trasmette', () => {
      const main = renderPrivacy();

      // Le stesse etichette del form. Se un campo venisse aggiunto lì e non
      // qui, il type-check cadrebbe prima ancora di arrivare a questo test.
      for (const label of [
        'Nome',
        'Cognome',
        'Indirizzo email',
        'Numero di telefono (facoltativo)',
        'Testo del messaggio',
      ]) {
        expect(main.getByText(label), `manca "${label}"`).toBeInTheDocument();
      }
    });
  });

  describe('trasparenza sui destinatari', () => {
    it('nomina il servizio che recapita i messaggi', () => {
      const main = renderPrivacy();

      // Il modulo non invia a un server del titolare: passa da un responsabile
      // esterno, e ometterlo sarebbe l'omissione più grave dell'informativa.
      expect(main.getByText('EmailJS')).toBeInTheDocument();
    });

    it("nomina il fornitore di hosting che tratta i dati di connessione", () => {
      const main = renderPrivacy();

      expect(main.getByText('Vercel')).toBeInTheDocument();
    });
  });

  describe('coerenza con il banner', () => {
    it('dichiara il dato che la nota informativa salva nel browser', () => {
      const main = renderPrivacy();

      // `CookieBanner` scrive in `localStorage`. Finché lo fa, la sezione 6 non
      // può più dire che il sito non salva nulla: dichiararlo qui è ciò che
      // tiene l'informativa vera.
      expect(main.getAllByText(hasText(NOTICE_STORAGE_KEY)).length).toBeGreaterThan(0);
    });

    it('non nega i cookie che la nota dichiara', () => {
      const main = renderPrivacy();

      // La nota in sovrimpressione dice "solo cookie tecnici essenziali".
      // Finché lo dice, questa pagina non può affermare in assoluto che il
      // sito non ne installa: sarebbero due dichiarazioni opposte sullo
      // stesso dominio. Qui si resta sul preciso — niente profilazione — e si
      // nomina per esteso l'unico dato salvato.
      expect(main.queryByText(/non installa cookie/i)).not.toBeInTheDocument();
      expect(main.getAllByText(hasText('non usa cookie di profilazione')).length).toBeGreaterThan(0);
    });

    it('non promette più l assenza di un banner', () => {
      const main = renderPrivacy();

      expect(main.queryByText(/non troverai alcun banner/i)).not.toBeInTheDocument();
    });
  });

  describe('diritti', () => {
    it('indirizza al Garante per il reclamo', () => {
      const main = renderPrivacy();

      const garante = main.getByRole('link', { name: /Garante/i });

      expect(garante).toHaveAttribute('href', 'https://www.garanteprivacy.it');
      expect(garante).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
