# 📋 TODO.md - Portfolio Carmelo La Mantia

> Roadmap di sviluppo e storico delle modifiche

---

## 🔴 ALTA PRIORITÀ

### Performance & Ottimizzazione
- [x] **Lazy loading immagini** — Aggiunto `loading="lazy"` a tutte le immagini ✅
- [ ] **Convertire immagini in WebP** — Ridurre dimensioni assets
- [x] **Rimuovere @emailjs/browser** — Dipendenza rimossa da package.json ✅

### Accessibilità (a11y)
- [x] **Aggiungere aria-labels** — Aggiunti a bottoni navigazione, link social ✅
- [x] **Alt text descrittivi** — Migliorato alt di tutte le immagini ✅
- [x] **Focus states** — Aggiunti focus:visible styles in App.css ✅
- [x] **Skip to content** — Aggiunto link per saltare la navigazione ✅

### SEO & Meta
- [x] **Canonical URL** — Aggiunto `<link rel="canonical">` ✅
- [x] **Sitemap.xml** — Creato sitemap per search engines ✅
- [x] **Structured Data** — Aggiunto JSON-LD schema Person/Portfolio ✅

---

## 🟡 MEDIA PRIORITÀ

### UI/UX Enhancements
- [ ] **Animazioni scroll (AOS)** — Installare `aos` o `framer-motion`
- [ ] **Dark/Light mode** — Toggle tema con CSS variables
- [ ] **Scroll progress indicator** — Barra progresso lettura pagina
- [ ] **Back to top button** — Bottone per tornare in cima
- [ ] **Loading skeleton** — Placeholder durante caricamento

### Contenuti
- [ ] **Screenshot reali progetti** — Sostituire profile.jpg con screenshot veri
- [ ] **Sezione Testimonials** — Carousel recensioni clienti
- [ ] **Blog/Articoli** — Collegare Medium/Dev.to o sistema markdown
- [x] **Download CV PDF** — Bottone download invece di Google Docs link ✅

### Internazionalizzazione
- [ ] **i18n setup** — Installare `react-i18next`
- [ ] **Toggle lingua IT/EN** — Switch in navbar
- [ ] **Tradurre contenuti** — Hero, Skills, Projects, Contact

---

## 🟢 BASSA PRIORITÀ (Nice to Have)

### Visual Effects
- [ ] **Particles background** — `react-particles` per effetti decorativi
- [ ] **3D elements** — Three.js per modelli 3D
- [ ] **Gradient animations** — Animare i colori di sfondo
- [ ] **Cursor effects** — Cursore personalizzato

### Funzionalità Extra
- [ ] **Chatbot FAQ** — Widget chat per domande frequenti
- [ ] **Analytics** — Google Analytics o Plausible
- [ ] **PWA completa** — Service worker, offline mode
- [ ] **Email form backup** — Implementare EmailJS come alternativa WhatsApp

### DevOps
- [ ] **GitHub Actions** — CI/CD automatico
- [ ] **Husky pre-commit** — Lint e format automatici
- [ ] **Unit tests** — Test componenti principali
- [ ] **Lighthouse CI** — Monitoraggio performance

---

## ✅ COMPLETATI

### 11 Gennaio 2026 - SEO & Accessibility Update
- [x] **Canonical URL** — Aggiunto `<link rel="canonical">` in index.html
- [x] **Sitemap.xml** — Creato public/sitemap.xml per search engines
- [x] **Structured Data JSON-LD** — Aggiunto schema Person con knowsAbout, sameAs
- [x] **Lazy loading immagini** — Aggiunto `loading="lazy"` a Hero, SkillCard, ProjectCard, ContactCard, MobileNav
- [x] **Aria-labels completi** — Aggiunti a Vnavbar, MobileNav, SkillCard, ProjectCard, ContactCard
- [x] **Alt text descrittivi** — Migliorati tutti gli alt delle immagini
- [x] **Focus states CSS** — Aggiunti stili focus:visible in App.css
- [x] **Skip to content** — Aggiunto link accessibilità in App.js
- [x] **CV download locale** — Sostituito Google Docs con PDF locale
- [x] **Rimosso @emailjs/browser** — Dipendenza non utilizzata rimossa
- [x] **Robots.txt aggiornato** — Aggiunto riferimento sitemap
- [x] **Resource hints** — Aggiunti preconnect/dns-prefetch per CDN
- [x] **Meta tags completi** — og:locale, og:site_name, twitter:creator, googlebot
- [x] **Homepage in package.json** — Configurato per GitHub Pages

### 11 Gennaio 2026
- [x] **Fix import React non necessari** — Rimosso `import { React }` da tutti i 12 componenti (React 17+ JSX transform)
- [x] **Fix typo slidesToShow** — Corretto `slideToShow` → `slidesToShow` in WorkExp.js responsive settings
- [x] **Fix typo Webpack** — Corretto `Webapack` → `Webpack` in data.js SKILLS
- [x] **Creato CODE_CONTEXT.md** — Documentazione AI-optimized per LLM
- [x] **Aggiornato README.md** — Versione professionale per GitHub con badges

### 20 Dicembre 2024
- [x] **Fix link MobileNav** — Corretti anchor links (#skills, #projects, #work-exp, #contact)
- [x] **Aggiunto "Hire Me" in MobileNav** — Bottone CV anche in menu mobile
- [x] **Footer anno dinamico** — `new Date().getFullYear()` invece di hardcoded
- [x] **ContactForm completo** — Campi nome e messaggio con WhatsApp integration
- [x] **Sezione Projects** — Creati Projects.js, ProjectCard.js + CSS
- [x] **Array PROJECTS** — Aggiunto in utils/data.js con schema completo
- [x] **Meta tag SEO** — Open Graph, Twitter Cards, meta description

### 2024 (Versione iniziale)
- [x] **Setup progetto React** — Create React App
- [x] **Hero section** — Introduzione + foto profilo
- [x] **Skills section** — Cards cliccabili + progress bars
- [x] **Work Experience** — Carousel con react-slick
- [x] **Contact section** — Cards contatto + form
- [x] **Navbar responsive** — Desktop + mobile overlay
- [x] **Footer** — Copyright con nome sviluppatore

---

## 📊 STATISTICHE

| Categoria | Totali | Completati | In Attesa |
|-----------|--------|------------|-----------|
| Alta Priorità | 10 | 9 | 1 |
| Media Priorità | 10 | 1 | 9 |
| Bassa Priorità | 12 | 0 | 12 |
| **TOTALE** | **32** | **10** | **22** |

*Ultimo aggiornamento: 11 Gennaio 2026*
