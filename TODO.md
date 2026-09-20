# 📋 TODO — Rewrite V2 (Next.js 14 + TypeScript + Tailwind)

> **Aggiornato**: 18 settembre 2026
> **Contesto**: riscrittura della Landing Page. Abbandonato definitivamente il tema
> "Dark Souls". Design dark nativo, minimalista, corporate, font Inter, ampi spazi
> vuoti. Styling: **Tailwind CSS** + componenti stile **shadcn/ui**.

---

## 🚫 Debito tecnico V1 — errori da NON ripetere

Checklist estratta dall'audit della V1. Ogni voce era un errore realmente presente
nella vecchia codebase.

- [x] Rimuovere variabili con prefisso CRA `REACT_APP_`, usare solo `NEXT_PUBLIC_`.
- [x] Nessuna credenziale EmailJS hardcoded nel sorgente (nemmeno come fallback).
- [x] Ripristinare l'accessibilità del Blog (attualmente buildato ma senza link nella UI).
- [x] Aggiornare `sitemap.ts` per includere le rotte dinamiche di post e progetti.
- [x] Non usare icone placeholder riciclate. Se manca l'SVG, usare icone generiche (es. `lucide-react`) o solo testo.
- [x] Sostituire l'OG image 512x512 con una 1200x630.
- [x] Rimuovere immagini enormi non ottimizzate (background da 2.3MB) e usare solo `next/image` (WebP/AVIF).
- [x] Eliminare il loading screen artificiale da 800ms.
- [x] Completare la migrazione TypeScript: zero file `.js` o `.jsx` residui.
- [x] Rimuovere il CSS monolitico (`App.css` da 1600 righe) e adottare Tailwind.
- [x] Rimuovere file morti (CursorTrail, PageTransition, ecc.) e dipendenze inutili (react-mailchimp-subscribe).
- [x] Correggere la documentazione stantia.

---

## ✅ Come è stata chiusa ogni voce

| # | Voce | Intervento |
|---|------|-----------|
| 1 | `REACT_APP_` | `constants/index.ts`, `.env` e `.env.example` migrati a `NEXT_PUBLIC_EMAILJS_*` |
| 2 | Credenziali hardcoded | Fallback rimossi. Senza variabili il form si disabilita e mostra l'email diretta (`isEmailJsConfigured`) |
| 3 | Blog orfano | `/blog` presente in `NAV_ITEMS`: compare in navbar desktop, menu mobile e footer |
| 4 | Sitemap | `sitemap.ts` genera home + `/blog` + 6 case study + ogni post, leggendo dal data layer |
| 5 | Icone riciclate | `Skill.iconSrc` solo con logo autentico, altrimenti `fallbackIcon` lucide. Next.js/PostgreSQL/Supabase/AI usano icone generiche. Tre test bloccano la regressione |
| 6 | OG image | `app/opengraph-image.tsx` genera 1200x630 con `next/og` (runtime edge) |
| 7 | Immagini pesanti | `banner-bg2.png` (2.3MB) eliminato e sostituito da un gradiente CSS. Screenshot portfolio 2.59MB PNG → 183KB WebP. `public/` da ~7MB a 1.9MB |
| 8 | Loading screen | Rimosso con `HomePage.tsx`. `app/loading.tsx` ora appare solo nelle navigazioni reali |
| 9 | TypeScript | `strict: true` attivo, zero file `.js` sotto `src/` |
| 10 | CSS monolitico | `App.css`, `index.css` e `src/styles/` eliminati; token in `globals.css` + `tailwind.config.ts` |
| 11 | File e dipendenze morti | Eliminati `common/` e `cards/` interi, `utils/`, `scripts/`. Disinstallati bootstrap, react-bootstrap, react-bootstrap-icons, bootstrap-icons, react-multi-carousel, react-mailchimp-subscribe, react-icons, prop-types |
| 12 | Documentazione | README e ARCHITECTURE riscritti, LICENSE MIT aggiunta (il badge puntava a un 404). I quattro documenti V1 eliminati: le regole ancora valide di ARCHITECTURE_MOBILE e CONCEPTMAP sono confluite in ARCHITECTURE.md (`Responsive e mobile`, `Server / Client boundary`), le convenzioni di naming di PSEUDOCODE in `ai_law_portfolio.md` §3, i task reali di TODO_MOBILE nel backlog qui sotto |

---

## 🗺️ Roadmap riscrittura

- [x] **TASK 0** — Salvataggio debito tecnico (questo file)
- [x] **TASK 1** — Data layer & tipizzazione (`src/data/profileData.ts`, TS strict)
- [x] **TASK 2** — Setup styling & core UI (Tailwind, tema dark, root layout)
- [x] **TASK 3** — Costruzione Landing Page (Navbar, Hero, Skills, Timeline, Contact)

---

## 📌 Backlog

### Prossimi passi
- [ ] Rivedere la landing su dispositivo reale: iPhone SE 375px, Galaxy S21 360px,
      tablet 768px, con verifica su Safari iOS (WebKit è l'unico motore a mostrare
      i problemi di safe area e di altezza del viewport)
- [ ] Sostituire `min-h-screen` con `100dvh` nelle schermate a tutta altezza
      (`layout.tsx`, `error.tsx`, `loading.tsx`): con `100vh` la toolbar di Safari
      iOS taglia il contenuto in fondo
- [ ] Applicare `env(safe-area-inset-*)` a header e footer e aggiungere
      `viewportFit: 'cover'` all'export `viewport`: oggi su iPhone con notch la
      navbar sticky finisce sotto l'isola dinamica
- [x] Screenshot della V2 nel README (`public/img/portfolio-v2.webp`, 1902x908, 43 kB)
- [ ] Decidere l'immagine della card "Portfolio v1": oggi mostra `portfolio-v1.webp`,
      coerente con il titolo del progetto. Se in vetrina deve andare la V2, vanno
      cambiati insieme titolo, slug e immagine — non la sola immagine
- [ ] Ruotare le credenziali EmailJS: quelle vecchie sono nella storia di git
- [ ] Attivare il domain allowlist su EmailJS (Account → Security)

### Debito residuo
- [ ] Completare i test sui componenti. Coperti: `Button`, `Field`, `Badge`, `Hero`
      (suite da 23 a 108 test). Restano scoperti `SectionHeading`, `SocialIcons` e
      `Starfield` — quest'ultimo solo indirettamente via `Hero.test.tsx`: il loop e
      le tre condizioni di stop richiederebbero un mock del contesto 2D
- [ ] Valutare se `Field` debba cablare da sé `aria-describedby` e `aria-invalid`
      sul figlio invece di lasciarlo a ogni chiamante: oggi `Contact.tsx` riscrive
      l'id a mano come stringa letterale, e nessun type-check sorveglia quel legame
- [ ] Sezione "About/CV" che renderizzi `education`, `workExperience` e `languages`
      (dati presenti in `profileData.ts` ma oggi non mostrati da nessuna pagina)
- [ ] Riportare `/blog` e `/projects/[slug]` a una revisione tipografica dedicata
- [ ] Configurare il dominio custom `carmelolamantia.it` a livello DNS
