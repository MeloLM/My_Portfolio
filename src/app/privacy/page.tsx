/**
 * Informativa privacy.
 *
 * Server Component statico: nessuno stato, nessun effetto, zero JavaScript
 * spedito al client. È coerente col contenuto — una pagina che dichiara di non
 * eseguire tracciamento non può essere quella che carica più script del sito.
 *
 * Il testo descrive ciò che il codice fa davvero, verificato prima di scriverlo:
 * nessun cookie, nessuno storage del browser, nessuno strumento di statistica,
 * font serviti dal dominio del sito. L'unico punto in cui il sito raccoglie dati
 * personali è il modulo di contatto in `sections/Contact.tsx`, che li trasmette
 * via EmailJS.
 *
 * ⚠️ Questo è un testo tecnico, non un parere legale: descrive il trattamento
 * come risulta dal codice. La responsabilità della dichiarazione resta del
 * titolare.
 */

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { personalInfo } from '../../data/profileData';
import type { EmailFormData } from '../../hooks/useEmail';
import { NOTICE_STORAGE_KEY } from '../../constants';
import { PageShell } from '../../components/layout/PageShell';
import { SectionHeading } from '../../components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Informativa sulla Privacy',
  description:
    'Come vengono trattati i dati inviati tramite il modulo di contatto. Nessun cookie, nessun tracciamento.',
};

/**
 * Data dell'ultima revisione del testo.
 *
 * Scritta a mano di proposito: derivarla dalla build la farebbe cambiare a ogni
 * deploy anche senza che una virgola dell'informativa sia stata toccata, cioè
 * dichiarerebbe una revisione mai avvenuta. Va aggiornata quando cambia il testo.
 */
const LAST_UPDATED = '23 settembre 2026';

/**
 * Campi che il modulo di contatto raccoglie, con l'etichetta che l'utente legge.
 *
 * Il tipo non è decorativo: è la chiave di `EmailFormData`, cioè della struttura
 * che `useEmail` passa a EmailJS. Aggiungere un campo al form senza dichiararlo
 * qui **non compila**. È lo stesso presidio già usato per `socialIcons`, e qui
 * vale doppio: un'informativa che elenca meno dati di quelli effettivamente
 * raccolti è una dichiarazione falsa, non una svista di documentazione.
 */
const collectedData: Record<keyof EmailFormData, string> = {
  firstName: 'Nome',
  lastName: 'Cognome',
  email: 'Indirizzo email',
  phone: 'Numero di telefono (facoltativo)',
  message: 'Testo del messaggio',
};

/** Paragrafo di sezione: un solo posto per il ritmo verticale della pagina. */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

/** Link all'email del titolare: ricorre in tre sezioni, sta scritto una volta. */
function MailLink() {
  return (
    <a
      href={`mailto:${personalInfo.email}`}
      className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
    >
      {personalInfo.email}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="container max-w-3xl">
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="Privacy"
          title="Informativa sulla Privacy"
          description="Come vengono trattati i dati che invii tramite il modulo di contatto, ai sensi dell'articolo 13 del Regolamento (UE) 2016/679."
        />

        <Section title="1. Titolare del trattamento">
          <p>
            Il titolare del trattamento è <strong className="text-foreground">{personalInfo.name}</strong>,{' '}
            {personalInfo.location}.
          </p>
          <p>
            Per qualsiasi richiesta relativa ai tuoi dati personali puoi scrivere a <MailLink />.
          </p>
        </Section>

        <Section title="2. Dati raccolti">
          <p>
            Questo sito raccoglie dati personali in un solo punto: il modulo di contatto. I campi
            trasmessi sono quelli che compili tu, e nient&apos;altro.
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            {Object.entries(collectedData).map(([field, label]) => (
              <li key={field}>{label}</li>
            ))}
          </ul>
          <p>
            Non esistono aree riservate, registrazioni, newsletter o form di altro tipo. Navigare
            il sito senza scrivere un messaggio non comporta alcuna raccolta di dati da parte del
            titolare.
          </p>
        </Section>

        <Section title="3. Finalità e base giuridica">
          <p>
            I dati servono <strong className="text-foreground">esclusivamente a rispondere al tuo
            messaggio</strong>. Non vengono usati per comunicazioni promozionali, non vengono ceduti
            né venduti a terzi e non alimentano alcuna profilazione.
          </p>
          <p>
            La base giuridica è il consenso che presti inviando il modulo, ai sensi
            dell&apos;art. 6, par. 1, lett. a) del GDPR. Puoi revocarlo in qualsiasi momento
            scrivendo a <MailLink />: la revoca non pregiudica la liceità del trattamento
            effettuato prima di essa.
          </p>
        </Section>

        <Section title="4. A chi vengono comunicati i dati">
          <p>
            Il modulo non invia i dati a un server gestito dal titolare. Li trasmette tramite{' '}
            <strong className="text-foreground">EmailJS</strong>, che recapita il messaggio alla
            casella di posta del titolare e agisce come responsabile del trattamento. EmailJS è
            fornito da una società con sede negli Stati Uniti: il trasferimento avviene sulla base
            delle garanzie previste dal Capo V del GDPR.
          </p>
          <p>
            Il sito è ospitato su <strong className="text-foreground">Vercel</strong>, che in quanto
            fornitore di hosting tratta i dati tecnici di connessione — indirizzo IP, data e ora
            della richiesta, tipo di browser — nei propri registri di servizio, per finalità di
            sicurezza e funzionamento dell&apos;infrastruttura.
          </p>
          <p>Nessun altro soggetto riceve i dati.</p>
        </Section>

        <Section title="5. Conservazione">
          <p>
            I messaggi restano nella casella di posta del titolare per il tempo necessario a gestire
            la conversazione e le eventuali richieste successive, e vengono cancellati quando non
            servono più. Puoi chiederne la cancellazione in qualsiasi momento, anche subito dopo
            l&apos;invio.
          </p>
        </Section>

        <Section title="6. Assenza di cookie e di tracciamento">
          <p>
            Questo sito <strong className="text-foreground">non usa cookie di profilazione</strong>,
            né propri né di terze parti. Non sono presenti strumenti di statistica, mappe di calore,
            pixel dei social network o sistemi di tracciamento pubblicitario di alcun genere.
          </p>
          <p>
            L&apos;unico dato salvato nel tuo browser è la conferma di aver letto la nota che
            compare alla prima visita. Per la precisione non è un cookie ma una voce di{' '}
            <code className="text-foreground">localStorage</code>, con la chiave{' '}
            <code className="text-foreground">{NOTICE_STORAGE_KEY}</code>: serve soltanto a non
            riproporti la stessa nota a ogni pagina. Non è un identificatore, non viene trasmesso
            a nessuno e puoi rimuoverlo in qualsiasi momento svuotando i dati del sito dal tuo
            browser. Essendo strettamente necessario al funzionamento, rientra fra gli strumenti
            tecnici che non richiedono il tuo consenso.
          </p>
          <p>
            I caratteri tipografici sono serviti dal dominio del sito stesso e non da un fornitore
            esterno: aprire una pagina non genera richieste verso server di terze parti.
          </p>
          <p>
            La nota che compare alla prima visita è quindi informativa e non un modulo di consenso:
            non essendoci nulla da autorizzare, chiuderla non abilita nulla che fosse prima
            disabilitato.
          </p>
        </Section>

        <Section title="7. I tuoi diritti">
          <p>In qualsiasi momento puoi esercitare i diritti previsti dagli artt. 15-22 del GDPR:</p>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            <li>accedere ai dati che ti riguardano e chiederne copia;</li>
            <li>chiederne la rettifica, se inesatti o incompleti;</li>
            <li>chiederne la cancellazione;</li>
            <li>chiedere la limitazione del trattamento o opporti ad esso;</li>
            <li>ricevere i dati in formato strutturato e leggibile da dispositivo automatico;</li>
            <li>revocare il consenso già prestato.</li>
          </ul>
          <p>
            È sufficiente scrivere a <MailLink />. La risposta arriva entro un mese dalla richiesta,
            come previsto dall&apos;art. 12 del GDPR.
          </p>
          <p>
            Se ritieni che il trattamento dei tuoi dati violi il Regolamento, hai inoltre diritto di
            proporre reclamo al{' '}
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
            >
              Garante per la protezione dei dati personali
            </a>
            .
          </p>
        </Section>

        <Section title="8. Modifiche a questa informativa">
          <p>
            Eventuali aggiornamenti vengono pubblicati su questa pagina. Ultimo aggiornamento:{' '}
            <strong className="text-foreground">{LAST_UPDATED}</strong>.
          </p>
        </Section>
      </div>
    </PageShell>
  );
}
