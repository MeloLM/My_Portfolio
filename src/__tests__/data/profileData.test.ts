/**
 * Invarianti del data layer.
 *
 * Questi test non verificano il contenuto (che cambia) ma le regole che lo
 * tengono coerente — in particolare quelle violate dalla V1: icone riciclate da
 * altre tecnologie e path di immagini che puntavano a file inesistenti.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SITE_URL } from '../../constants';
import {
  headline,
  metaDescription,
  metrics,
  personalInfo,
  projects,
  skills,
  summary,
  timeline,
} from '../../data/profileData';

const publicDir = join(process.cwd(), 'public');
const assetExists = (path: string) => existsSync(join(publicDir, path));

describe('skills', () => {
  it('dichiara un logo reale oppure un fallback, mai entrambi né nessuno', () => {
    for (const skill of skills) {
      const hasIcon = Boolean(skill.iconSrc);
      const hasFallback = Boolean(skill.fallbackIcon);

      expect(hasIcon !== hasFallback, `${skill.name}: iconSrc e fallbackIcon si escludono`).toBe(
        true
      );
    }
  });

  it('punta solo a file realmente presenti in public/', () => {
    for (const skill of skills) {
      if (!skill.iconSrc) continue;
      expect(assetExists(skill.iconSrc), `${skill.name}: ${skill.iconSrc} non esiste`).toBe(true);
    }
  });

  it('non riusa lo stesso logo per tecnologie diverse', () => {
    const used = skills.filter((skill) => skill.iconSrc).map((skill) => skill.iconSrc);
    expect(new Set(used).size).toBe(used.length);
  });

  it('esprime i livelli come percentuali valide', () => {
    for (const skill of skills) {
      expect(skill.level).toBeGreaterThan(0);
      expect(skill.level).toBeLessThanOrEqual(100);
    }
  });
});

describe('projects', () => {
  it('ha slug univoci e URL-safe', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('ha le immagini di anteprima presenti in public/', () => {
    for (const project of projects) {
      expect(assetExists(project.imgUrl), `${project.title}: ${project.imgUrl}`).toBe(true);
    }
  });

  it('compila tutti i campi che alimentano il case study', () => {
    for (const project of projects) {
      expect(project.longDescription.length).toBeGreaterThan(0);
      expect(project.problem.length).toBeGreaterThan(0);
      expect(project.solution.length).toBeGreaterThan(0);
      expect(project.results.length).toBeGreaterThan(0);
    }
  });

  it('non elenca il sito stesso fra i progetti passati', () => {
    // Fino alla V2.2 la card "Portfolio v1" puntava allo stesso host di
    // `SITE_URL`: il sito dichiarava come proprio canonical l'indirizzo che
    // presentava come lavoro precedente, e la card linkava a se stessa.
    // Nessun type-check poteva vederlo — sono due stringhe entrambe valide.
    const sito = new URL(SITE_URL).host;

    for (const project of projects) {
      expect(new URL(project.url).host, `${project.title} punta al sito corrente`).not.toBe(
        sito
      );
    }
  });

  it('usa link esterni assoluti e coerenti con linkType', () => {
    for (const project of projects) {
      expect(project.url).toMatch(/^https:\/\//);

      if (project.linkType === 'repo') {
        expect(project.url).toContain('github.com');
      }
    }
  });
});

describe('personalInfo', () => {
  it('espone un CV scaricabile davvero presente', () => {
    expect(assetExists(personalInfo.cvPath)).toBe(true);
  });

  it('tiene `city` e `location` d accordo fra loro', () => {
    // `city` alimenta i dati strutturati, `location` il testo in pagina: se
    // divergono, il JSON-LD dichiara una città diversa da quella che il
    // visitatore legge. È esattamente ciò che è successo con "Agrigento".
    expect(personalInfo.city.trim().length).toBeGreaterThan(0);
    expect(personalInfo.location).toContain(personalInfo.city);
  });

  it('punta a un ritratto realmente presente, se ne dichiara uno', () => {
    // `avatarSrc` è opzionale: finché resta vuoto la hero mostra il segnaposto
    // e il test non ha nulla da verificare. Appena viene valorizzato torna
    // valida la stessa regola già applicata a icone e anteprime dei progetti —
    // niente path che punta a un file inesistente.
    if (!personalInfo.avatarSrc) return;

    expect(assetExists(personalInfo.avatarSrc), personalInfo.avatarSrc).toBe(true);
  });

  it('usa profili social con URL assoluti', () => {
    for (const url of [personalInfo.github, personalInfo.linkedin, personalInfo.instagram]) {
      expect(url).toMatch(/^https:\/\//);
    }
  });
});

describe('timeline', () => {
  it('non è vuota e termina con la tappa di carriera corrente', () => {
    expect(timeline.length).toBeGreaterThan(0);
    expect(timeline[timeline.length - 1]?.type).toBe('career');
  });

  it('non ridichiara il ruolo nella tappa corrente', () => {
    // La tappa "Oggi" e l'intestazione della hero dicono la stessa cosa. Finché
    // erano due stringhe separate hanno finito per dirne due diverse.
    expect(timeline[timeline.length - 1]?.title).toBe(personalInfo.role);
  });
});

describe('metrics', () => {
  it('ne dichiara un numero che riempie la griglia', () => {
    // La striscia è `grid-cols-2 lg:grid-cols-4`: un numero non multiplo di
    // quattro lascia una riga spaiata sul desktop.
    expect(metrics.length).toBeGreaterThan(0);
    expect(metrics.length % 4).toBe(0);
  });

  it('compila sempre entrambi i lati della coppia', () => {
    for (const { value, label } of metrics) {
      expect(value.trim().length, 'valore vuoto').toBeGreaterThan(0);
      expect(label.trim().length, 'etichetta vuota').toBeGreaterThan(0);
    }
  });
});

describe('testi del posizionamento', () => {
  it('costruisce la bio a partire dalla frase di apertura', () => {
    expect(summary.startsWith(headline)).toBe(true);
  });

  it('deriva la meta description dalla stessa frase', () => {
    // Se qualcuno riscrivesse `metaDescription` a mano, come era prima della
    // V2.1, questo test cadrebbe: è esattamente la regressione da impedire.
    expect(metaDescription.startsWith(headline)).toBe(true);
  });

  it('tiene la meta description dentro lo snippet di ricerca', () => {
    // Oltre i ~160 caratteri Google tronca a metà parola. È il motivo per cui
    // la meta description non può essere `summary` per intero.
    expect(metaDescription.length).toBeLessThanOrEqual(160);
  });

  it('non riusa la meta description come bio', () => {
    // Sono due testi con due mestieri: lo snippet è corto e navigazionale, la
    // bio è completa e alimenta il JSON-LD `Person`.
    expect(summary.length).toBeGreaterThan(metaDescription.length);
  });
});
