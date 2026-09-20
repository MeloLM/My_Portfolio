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
import { personalInfo, projects, skills, timeline } from '../../data/profileData';

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
});
