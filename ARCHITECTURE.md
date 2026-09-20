# Architettura — V2

> Aggiornato: 18 settembre 2026
> Riscritto dopo la migrazione a Tailwind CSS. La versione precedente di questo
> documento descriveva l'architettura a Bootstrap + `App.css` monolitico, oggi
> rimossa.

---

## Principi

1. **Un solo posto per i contenuti.** Testi, skill, progetti e timeline stanno in
   `src/data/profileData.ts`. I componenti non hardcodano nulla: leggono da lì.
2. **Server Component per default.** `'use client'` compare solo dove serve stato
   (navbar mobile, form contatti). La landing è HTML statico al primo byte.
3. **Nessun CSS fuori dal design system.** I colori esistono una volta sola come
   custom property; i componenti usano nomi semantici, mai esadecimali.
4. **Type-safety reale.** `strict: true`, zero `any`, union chiuse dove una svista
   deve diventare un errore di compilazione.

---

## Flusso dei dati

```
src/data/profileData.ts          (single source of truth, tipizzato)
        │
        ├──► app/layout.tsx      JSON-LD Person + WebSite, metadata
        ├──► app/opengraph-image OG image 1200x630
        ├──► app/sitemap.ts      URL di progetti e articoli
        ├──► sections/Hero       anagrafica, summary, CV, social
        ├──► sections/Skills     skill raggruppate per categoria
        ├──► sections/Projects   card + link ai case study
        ├──► sections/Timeline   tappe del percorso
        ├──► sections/Contact    recapiti diretti
        └──► projects/[slug]     case study completo
```

Cambiare un progetto in `profileData.ts` aggiorna card, case study, sitemap e
structured data insieme. Nella V1 questi quattro punti divergevano.

---

## Struttura dei componenti

| Livello | Cartella | Responsabilità |
|---------|----------|----------------|
| Primitive | `components/ui/` | Elementi senza dominio: `Button`, `Badge`, `Field`, `SectionHeading`, `SocialIcons` |
| Layout | `components/layout/` | `SiteHeader`, `SiteFooter`, `PageShell` (guscio delle pagine interne) |
| Sezioni | `components/sections/` | Blocchi della landing e case study: conoscono i dati |

Regola di dipendenza: `sections` → `ui`, mai il contrario. Le primitive non
importano `profileData`.

---

## Design system

I token vivono in `src/app/globals.css` come canali HSL (senza `hsl()`), così
Tailwind può comporli con l'opacità: `bg-primary/10`, `border-border/60`.
`tailwind.config.ts` li mappa su nomi semantici.

```
--background  222 84% 5%     Slate 950   sfondo
--foreground  210 40% 98%    Slate 50    testo
--primary     217 91% 60%    Blue 500    accento, focus ring
--card        222 47% 11%    Slate 900   superfici
--border      215 28% 17%                bordi e separatori
```

Due utility di sfondo sostituiscono immagini: `bg-hero-glow` (gradiente radiale
dietro l'hero, al posto di un PNG da 2.3MB) e `bg-grid`.

---

## Responsive e mobile

Tailwind è mobile-first per costruzione: un'utility senza prefisso vale da 0px in
su e i prefissi `sm:`/`md:`/`lg:` sono soglie minime. Nel progetto non esiste una
sola media query scritta a mano.

`tailwind.config.ts` non ridefinisce `screens`, quindi valgono le soglie di
default. L'unico override riguarda il `container`, fermo a 1200px invece di
1536px. La V1 dichiarava una scala parallela (480/768/1024/1200) che non
corrispondeva a quella realmente compilata.

| Prefisso | Soglia | Uso nel progetto |
|----------|--------|------------------|
| — | 0px | Base mobile |
| `sm:` | 640px | Telefoni grandi, griglie a 2 colonne |
| `md:` | 768px | Comparsa della navbar desktop |
| `lg:` | 1024px | Griglie a 3 colonne |
| `xl:` | 1280px | Rifiniture tipografiche |
| `2xl:` | 1536px | Oltre il container, che si ferma a 1200px |

Regole di piattaforma, indipendenti dallo stack:

- Bersaglio tattile di almeno 44x44px su ogni elemento interattivo.
- Un `:hover` su touch resta incollato dopo il tap. Tailwind 3.4 espone
  `future.hoverOnlyWhenSupported`, oggi non attivo: finché resta così, ogni hover
  vistoso va accompagnato da uno stato `active:`.
- `prefers-reduced-motion` azzera animazioni e scroll morbido (vedi Accessibilità).

Obiettivi Core Web Vitals: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms. INP ha sostituito
FID come metrica di responsività nel marzo 2024.

---

## Rendering

| Rotta | Modalità | Note |
|-------|----------|------|
| `/` | Statica | Client component solo per navbar e form |
| `/projects/[slug]` | SSG | `generateStaticParams` sui 6 slug |
| `/blog` | Statica | Lista da MDX letti a build time |
| `/blog/[slug]` | SSG | MDX renderizzato server-side |
| `/opengraph-image` | Edge, on demand | Il percorso Node di `@vercel/og` fallisce in prerender su Windows |
| `/sitemap.xml`, `/robots.txt` | Statiche | Generate dal data layer |

### Server / Client boundary

Un componente diventa client solo se ha stato, effetti o event handler, e va tenuto
il più in basso possibile nell'albero: `'use client'` su un genitore trascina nel
bundle anche i figli che non ne avrebbero bisogno. Oggi i file marcati sono cinque.

| File | Perché è client |
|------|-----------------|
| `components/layout/SiteHeader.tsx` | Stato del menu mobile, `useScroll`, listener su `Escape` |
| `components/sections/Contact.tsx` | Stato del form e gestione dell'invio |
| `components/ui/Starfield.tsx` | Canvas 2D, `requestAnimationFrame`, IntersectionObserver |
| `hooks/useEmail.ts` | Usa `useState`: marcato all'origine, così i consumatori non devono saperlo |
| `app/error.tsx` | Gli error boundary di React sono client per contratto |

Tutto il resto è Server Component, `ProjectCaseStudy` incluso: nella V1 era marcato
`'use client'` pur non avendo stato, e portava nel bundle un albero intero senza
motivo.

---

## Accessibilità

- Skip link verso `#main-content` su ogni pagina.
- Un solo `:focus-visible` globale, con ring sul colore primario.
- Menu mobile: `aria-expanded`, `aria-controls`, chiusura con `Escape`, scroll del
  body bloccato mentre è aperto.
- Form: `<label htmlFor>` esplicite e visibili, `aria-invalid` e `aria-describedby`
  sui campi in errore, esito annunciato via `role="status"` con `aria-live`.
- Barre di livello delle skill esposte come `role="meter"` con valori ARIA.
- `prefers-reduced-motion` azzera animazioni e scroll morbido.

---

## Test

| File | Copre |
|------|-------|
| `__tests__/hooks/useScroll.test.ts` | Soglia, direzione, cleanup del listener |
| `__tests__/hooks/useEmail.test.ts` | Validazione del form contatti |
| `__tests__/data/profileData.test.ts` | Invarianti del data layer |

I test sui dati sono quelli che impediscono le regressioni della V1: verificano
che ogni skill abbia un logo autentico **oppure** un fallback (mai entrambi, mai
nessuno), che nessun logo sia riusato per due tecnologie diverse e che ogni path
di immagine esista davvero in `public/`.

---

## CI

`.github/workflows/ci.yml`: lint → type-check → test → build. Il deploy non passa
da qui: Vercel builda e pubblica tramite Git integration.
