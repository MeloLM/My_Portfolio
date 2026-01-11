# 📋 TODO.md - Portfolio Carmelo La Mantia

> Roadmap di sviluppo e storico delle modifiche

---

## 🔴 ALTA PRIORITÀ

### Performance & Ottimizzazione
- [ ] **Lazy loading immagini** — Aggiungere `loading="lazy"` alle immagini
- [ ] **Convertire immagini in WebP** — Ridurre dimensioni assets
- [ ] **Rimuovere @emailjs/browser** — Dipendenza non utilizzata in package.json

### Accessibilità (a11y)
- [ ] **Aggiungere aria-labels** — Bottoni navigazione, link social
- [ ] **Alt text descrittivi** — Migliorare alt delle immagini
- [ ] **Focus states** — Migliorare visibilità focus per navigazione tastiera
- [ ] **Skip to content** — Link per saltare la navigazione

### SEO & Meta
- [ ] **Canonical URL** — Aggiungere `<link rel="canonical">`
- [ ] **Sitemap.xml** — Creare sitemap per search engines
- [ ] **Structured Data** — Aggiungere JSON-LD schema Person/Portfolio

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
- [ ] **Download CV PDF** — Bottone download invece di Google Docs link

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
| Alta Priorità | 7 | 0 | 7 |
| Media Priorità | 10 | 0 | 10 |
| Bassa Priorità | 12 | 0 | 12 |
| **TOTALE** | **29** | **0** | **29** |

*Ultimo aggiornamento: 11 Gennaio 2026*
