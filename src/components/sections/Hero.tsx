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
 */

import { ArrowRight, Download, MapPin } from 'lucide-react';
import { personalInfo, summary } from '../../data/profileData';
import { ButtonLink } from '../ui/Button';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons';
import { Starfield } from '../ui/Starfield';

const socials = [
  { label: 'GitHub', href: personalInfo.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: personalInfo.linkedin, Icon: LinkedinIcon },
  { label: 'Instagram', href: personalInfo.instagram, Icon: InstagramIcon },
];

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
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
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

          <div className="mt-10 flex items-center gap-5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-md text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-5" />
              </a>
            ))}
            <span aria-hidden="true" className="h-4 w-px bg-border" />
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />
              {personalInfo.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
