'use client';

/**
 * Nota informativa che compare alla prima visita.
 *
 * ## Perché non è un gate di consenso
 *
 * Il sito non fa profilazione, non ha analytics e non installa cookie di terze
 * parti. L'unico dato scritto nel browser è questa conferma di lettura, un
 * valore strettamente funzionale: rientra fra gli strumenti tecnici che non
 * richiedono consenso, quindi la nota informa e basta. Chiuderla non abilita
 * nulla, perché nulla era disabilitato, e non esiste un pulsante "rifiuta"
 * perché non ci sarebbe niente da rifiutare.
 *
 * Il testo in pagina è la forma breve. La versione precisa — che quel dato sta
 * in `localStorage` e non in un cookie HTTP — vive nella sezione 6 di
 * `/privacy`, insieme al nome esatto della chiave. Le due pagine vanno tenute
 * d'accordo: se questo componente cambia ciò che salva, va aggiornata anche
 * quella, e un test presidia il legame.
 *
 * ## Idratazione
 *
 * Lo stato parte da `false` e nessuno lo cambia durante il render. Server e
 * primo render client producono quindi lo stesso identico HTML — cioè niente —
 * e il banner appare solo dopo l'effetto. Leggere `localStorage` direttamente
 * in `useState` avrebbe rotto l'idratazione: sul server quell'oggetto non
 * esiste. Un test lo presidia via `renderToString`.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NOTICE_STORAGE_KEY } from '../../constants';
import { buttonStyles } from './Button';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(NOTICE_STORAGE_KEY) === null) setVisible(true);
    } catch {
      // Storage negato: navigazione privata, cookie bloccati, policy aziendali.
      // Non potendo sapere se la nota è già stata letta, la si mostra. Ripetersi
      // è un fastidio; tacere sarebbe una mancata informativa.
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);

    try {
      window.localStorage.setItem(NOTICE_STORAGE_KEY, 'letta');
    } catch {
      // Se non si può scrivere, la nota tornerà alla visita successiva. È una
      // degradazione accettabile: non c'è nessun altro posto dove salvarla, e
      // inventarne uno significherebbe tracciare l'utente per non disturbarlo.
    }
  };

  if (!visible) return null;

  return (
    <section
      aria-label="Informativa sui cookie"
      className={[
        // Sopra il pulsante WhatsApp (z-40), sotto navbar e skip link.
        'fixed z-50',
        // Su mobile occupa la larghezza ma sta *sopra* il FAB: quello è a
        // `bottom-6` ed è alto 56px, quindi arriva a 80px dal fondo. A 96px la
        // nota lo scavalca invece di coprirlo.
        'bottom-24 left-4 right-4',
        // Da sm in poi è un riquadro flottante in basso a sinistra, largo al
        // massimo 400px: il FAB resta a destra e i due non si incontrano mai.
        'sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[400px]',
        'rounded-xl border border-border bg-card p-5 shadow-2xl shadow-black/50',
        'animate-fade-up motion-reduce:animate-none',
      ].join(' ')}
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        Questo sito utilizza solo cookie tecnici essenziali. Nessun dato viene tracciato o ceduto
        a terzi per scopi di marketing.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={dismiss} className={buttonStyles('primary', 'sm')}>
          OK, ho capito
        </button>

        <Link href="/privacy" className={buttonStyles('ghost', 'sm')}>
          Leggi la Policy
        </Link>
      </div>
    </section>
  );
}
