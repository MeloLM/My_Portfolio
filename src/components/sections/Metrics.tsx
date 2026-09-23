/**
 * Striscia dei numeri chiave, subito sotto la hero.
 *
 * Server Component: solo testo, nessuna interazione, zero JavaScript al client.
 *
 * Il markup è una lista di definizioni e non quattro `div`: un numero e la sua
 * didascalia sono esattamente una coppia termine/descrizione, e così uno screen
 * reader annuncia "Progetti realizzati, 10+" invece di leggere otto frammenti
 * slegati. L'ordine visivo è invertito da `flex-col-reverse`, che tiene il
 * numero in alto lasciando nel DOM l'ordine in cui la coppia si legge.
 */

import { metrics } from '../../data/profileData';

export function Metrics() {
  return (
    <section aria-label="Numeri in sintesi" className="border-y border-border/60 bg-card/20">
      <div className="container">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 lg:grid-cols-4 lg:py-16">
          {metrics.map(({ value, label }) => (
            /*
              `justify-end` non è cosmetico. In `flex-col-reverse` l'asse
              principale corre dal basso verso l'alto, quindi il default
              impacchetta i figli in fondo: un'etichetta che va a capo — come
              "Progetti realizzati" a 375px — spinge in alto il proprio numero e
              lo disallinea dagli altri della riga. `justify-end` impacchetta
              verso l'alto, così i numeri restano su una linea comune e a
              crescere verso il basso sono le etichette.
            */
            <div
              key={label}
              className="flex flex-col-reverse items-center justify-end gap-2 text-center"
            >
              <dt className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {label}
              </dt>
              <dd className="text-gradient text-4xl font-bold tracking-tight sm:text-5xl">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
