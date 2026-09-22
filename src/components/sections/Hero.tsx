/**
 * Hero della landing.
 *
 * Resta un Server Component: nessuno stato e nessun effetto qui dentro. L'unico
 * JavaScript che questa sezione spedisce al client è `Starfield`, il canvas
 * decorativo di sfondo, che si monta da sé senza far diventare client il resto
 * dell'albero.
 *
 * Lo sfondo di base è un gradiente CSS (`bg-hero-glow`), non l'immagine da 2.3MB
 * che la V1 caricava come background; il canvas si sovrappone a quel gradiente e
 * resta sotto al contenuto.
 *
 * Layout: due colonne da `lg` in su — testo a sinistra, ritratto a destra. Sotto
 * `lg` la griglia collassa a una colonna e il ritratto finisce sotto al testo,
 * non sopra: così l'`h1` resta il primo elemento sia nel DOM che a schermo, che
 * è insieme l'ordine di lettura per uno screen reader e l'elemento che il
 * browser sceglie come LCP.
 */

import Image from 'next/image';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { personalInfo, socialLinks, summary } from '../../data/profileData';
import { ButtonLink } from '../ui/Button';
import { socialIcons } from '../ui/SocialIcons';
import { Starfield } from '../ui/Starfield';

/** Iniziali del segnaposto, derivate dal nome invece di essere riscritte a mano. */
const initials = personalInfo.name
  .split(' ')
  .map((part) => part.charAt(0))
  .join('');

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero-glow pb-24 pt-32 sm:pb-32 sm:pt-40">
      {/*
        `isolate` confina il canvas in questo stacking context: senza, uno
        z-index negativo scivolerebbe dietro allo sfondo della pagina e le stelle
        sparirebbero.
      */}
      <Starfield />

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Colonna testo: centrata su mobile, allineata a sinistra da `lg`. */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/70" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Disponibile per nuove opportunità
            </p>

            <h1 className="mt-8 text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {personalInfo.name}
            </h1>

            <p className="mt-6 text-balance text-2xl font-semibold tracking-tight text-gradient sm:text-3xl">
              {personalInfo.role} · {personalInfo.tagline}
            </p>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {summary}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={personalInfo.cvPath} size="lg" download external>
                <Download aria-hidden="true" />
                Scarica CV
              </ButtonLink>
              <ButtonLink href="/#projects" variant="outline" size="lg">
                Vedi Progetti
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
            </div>

            {/*
              `flex-wrap` non è decorativo: quattro icone, il separatore e la
              località su una riga sola sforano i 360px del Galaxy S21 e la
              sezione è `overflow-hidden`, quindi l'eccedenza verrebbe tagliata
              invece che mostrata.
            */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
              {socialLinks.map(({ platform, label, href }) => {
                const Icon = socialIcons[platform];

                return (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-md text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
              <span aria-hidden="true" className="h-4 w-px bg-border" />
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {personalInfo.location}
              </span>
            </div>
          </div>

          {/*
            Colonna ritratto. Il riquadro esiste sempre e ha proporzioni fisse:
            è lui a tenere lo spazio, quindi la presenza o l'assenza della foto
            non sposta di un pixel la colonna di testo accanto.
          */}
          <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <div
              data-testid="hero-portrait"
              className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-2xl shadow-primary/5"
            >
              {personalInfo.avatarSrc ? (
                <Image
                  src={personalInfo.avatarSrc}
                  alt={`Ritratto di ${personalInfo.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 80vw"
                  className="object-cover"
                />
              ) : (
                /*
                  Segnaposto: `aria-hidden` perché le iniziali non sono
                  un'informazione, sono il buco lasciato dalla foto. Il nome è
                  già nell'`h1` a fianco.
                */
                <div
                  aria-hidden="true"
                  className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted/40 to-card/60"
                >
                  <span className="select-none text-6xl font-bold tracking-tight text-muted-foreground/30">
                    {initials}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
