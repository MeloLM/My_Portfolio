/**
 * Landing page.
 *
 * Interamente Server Component tranne navbar e form contatti, che hanno stato:
 * nessun loading screen artificiale, nessun gate client davanti al contenuto.
 * La pagina è HTML statico al primo byte.
 */

import { SiteHeader } from '../components/layout/SiteHeader';
import { SiteFooter } from '../components/layout/SiteFooter';
import { Hero } from '../components/sections/Hero';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { Timeline } from '../components/sections/Timeline';
import { Contact } from '../components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Vai al contenuto
      </a>

      <SiteHeader />

      <main id="main-content">
        <Hero />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
