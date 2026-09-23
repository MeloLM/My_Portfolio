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
- [x] Ruotare le credenziali EmailJS. Public key rigenerata il 20 settembre 2026,
      variabili aggiornate su Vercel e redeploy eseguito: la tripla finita nei log
      della V1 non è più utilizzabile
- [x] ~~Attivare il domain allowlist su EmailJS~~ — **scartato consapevolmente**: la
      restrizione per dominio richiede un piano a pagamento. Su un portfolio
      personale con quota di 200 email al mese il rischio di abuso è accettato.
      Vedi `log/log_007.md`, Ciclo E
- [x] Rendere cliccabile il `mailto:` nel messaggio di errore di invio. Risolto con
      `EmailErrorKind` in `useEmail`: il link compare solo su `'send'`, non sugli
      errori di validazione, che si correggono nel form
- [x] WhatsApp come canale di contatto: voce in `socialLinks`, pulsante flottante
      `WhatsAppFloat` nel root layout, propagazione in Hero, Footer e Contact
- [x] Copy delle card progetti da "Case study" a "Info", presidiata da test
- [x] Numero WhatsApp reale al posto del segnaposto. Non riscritto a mano: il link
      deriva da `personalInfo.phone` togliendo i non-cifra, quindi il numero resta
      in un solo punto e alimenta insieme `tel:` e la chat. Nessuna esposizione
      nuova: il numero era già pubblicato e reso come link `tel:` in pagina
- [x] `SITE_URL` sciolto: la V2 è pubblicata su `my-portfolio-vert-ten-56`.
      Canonical, OpenGraph, JSON-LD, `sitemap.ts` e `robots.ts` seguono da soli,
      perché leggono tutti quella costante. La card "Portfolio v1" resta sul
      vecchio host, che è ancora online, e un test impedisce ai due di tornare a
      coincidere come accadeva prima. Link "Sito" del README allineato
- [x] Allineare i dati di località: nuovo campo `personalInfo.city` agganciato a
      `addressLocality` del JSON-LD e alle keyword SEO, che prima dichiaravano
      "Agrigento" scritto a mano. Accento di "Canicattì" uniformato e README
      allineato. Un test impedisce a `city` e `location` di divergere di nuovo
- [ ] Scegliere la foto della hero e valorizzare `personalInfo.avatarSrc`: oggi
      il campo è vuoto e la colonna destra mostra un riquadro 4:5 con le
      iniziali. Bastano due passi — salvare il file in `public/img/` e scrivere
      qui il path — e da quel momento il test del data layer ne sorveglia
      l'esistenza. Il riquadro tiene già lo spazio, quindi aggiungere la foto
      non sposta il layout
- [x] Riunificare il posizionamento. `role` diventa "Full Stack Developer",
      `tagline` reintegra lo stack completo e colloca l'IA come metodo. Sciolte
      le due copie scritte a mano: la tappa "Oggi" della timeline legge
      `personalInfo.role`, e la meta description non è più hardcodata in
      `layout.tsx`. La stringa "Jr" non compare più nell'HTML servito
- [x] Portare la meta description sotto un'unica fonte. Non punta a `summary`
      per intero (476 caratteri: Google tronca lo snippet intorno ai 160) ma a
      `headline`, la frase di apertura da cui `summary` stessa è composta. Tre
      test presidiano derivazione e tetto di lunghezza
- [x] Ripristinato `PROMPT_PORTFOLIO_V2.md`, cancellato per errore dal working
      tree: resta come registro storico
- [x] Informativa privacy per il rilascio pubblico: nuova rotta statica
      `/privacy`, micro-testo sotto il pulsante di invio e link nel footer.
      L'elenco dei dati raccolti è un `Record<keyof EmailFormData, string>`:
      aggiungere un campo al form senza dichiararlo nell'informativa **non
      compila**. Aggiunte tre sezioni che il brief non elencava ma che l'art. 13
      GDPR richiede — destinatari (EmailJS come responsabile, Vercel come
      hosting), conservazione e reclamo al Garante
- [x] Nota informativa in sovrimpressione (`CookieBanner`) e striscia delle
      metriche sotto la hero. Il testo della nota **non** dichiara "cookie
      tecnici": il sito non ne installa nessuno, e affermarlo avrebbe reso falsa
      la sezione 6 di `/privacy`. L'informativa è stata riallineata: ora dichiara
      il solo dato realmente salvato, la chiave `localStorage` letta da
      `constants`, e non promette più l'assenza di un banner
- [x] Idratazione del banner verificata su browser reale (Edge via Playwright):
      HTML servito privo del banner, console **senza errori né warning** a 375px
      e 1280px, e il percorso accetta → ricarica → resta chiuso provato end to end
- [x] Allineamento metriche corretto dopo averlo visto rotto: a 375px
      "Progetti realizzati" va a capo e con `flex-col-reverse` spingeva in alto
      il proprio numero. Risolto con `justify-end`; i valori ora condividono la
      stessa linea (354/354 e 474/474 su mobile, 454×4 su desktop)
- [x] "10+ Progetti realizzati" resta un valore scritto a mano. Comprende
      lavori passati, offline o sotto NDA che non sono in vetrina: non va
      derivato da `projects.length`, che conta solo ciò che è mostrabile.
      Motivazione annotata accanto al dato, dove qualcuno la cercherà
- [ ] Verificare in DevTools sul deploy reale che l'informativa dica il vero:
      scheda Application → Cookies e Storage vuote, e nel pannello Network
      nessuna richiesta verso domini di terze parti. Il codice non ne contiene,
      ma è una dichiarazione pubblica e va guardata sull'ambiente servito
- [ ] Far rileggere l'informativa a chi di dovere prima del rilascio: il testo
      descrive fedelmente cosa fa il codice, ma resta una dichiarazione legale
      di cui il titolare risponde. Da confermare in particolare la base
      giuridica scelta (consenso, art. 6.1.a) e il periodo di conservazione,
      oggi espresso come "il tempo necessario" e non con una durata precisa
- [x] Gerarchia dei titoli sistemata. `SectionHeading` accetta `as?: 'h1' | 'h2'`
      e `/blog` la usa: era l'unica rotta senza radice, perché case study e post
      un `h1` ce l'avevano già. Aprendo le rotte in un browser è però emerso che
      `/blog/[slug]` ne aveva **due** — il titolo era scritto sia nel frontmatter
      sia come `#` in testa al Markdown. Rimossa la riga duplicata dai due post
      e mappato `h1 → h2` in `compileMDX`, così vale anche per i post futuri
- [ ] Rivedere il sottotitolo della hero: `role · tagline` fa 77 caratteri e da
      `lg` in su sta in una colonna di ~536px, quindi manda a capo su tre righe.
      Da guardare su schermo prima di decidere se accorciare la tagline

### Debito residuo
- [ ] Completare i test sui componenti. Coperti: `Button`, `Field`, `Badge`, `Hero`,
      `Contact`, `Projects`, `WhatsAppFloat`, `SiteFooter`, `CookieBanner`,
      `Metrics`, `SectionHeading` e le rotte `/privacy` e `/blog` (suite da 23 a
      226 test). Restano scoperti `SocialIcons`, `SiteHeader` e `Starfield` —
      quest'ultimo solo indirettamente via `Hero.test.tsx`: il loop e le tre
      condizioni di stop richiederebbero un mock del contesto 2D
- [ ] Valutare se `Field` debba cablare da sé `aria-describedby` e `aria-invalid`
      sul figlio invece di lasciarlo a ogni chiamante: oggi `Contact.tsx` riscrive
      l'id a mano come stringa letterale, e nessun type-check sorveglia quel legame
- [ ] Sezione "About/CV" che renderizzi `education`, `workExperience` e `languages`
      (dati presenti in `profileData.ts` ma oggi non mostrati da nessuna pagina)
- [ ] Riportare `/blog` e `/projects/[slug]` a una revisione tipografica dedicata
- [ ] Configurare il dominio custom `carmelolamantia.it` a livello DNS
