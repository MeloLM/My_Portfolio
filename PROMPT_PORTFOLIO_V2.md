Agisci come Senior Full Stack Developer. Il nostro obiettivo è ricostruire la Landing Page del mio portfolio in Next.js 14 (App Router) + TypeScript. 
Abbandoniamo definitivamente il vecchio tema "Dark Souls". Il nuovo design deve ispirarsi al template "AstroWind": Dark mode nativa, minimalista, corporate, font Inter, ampi spazi vuoti. Useremo Tailwind CSS e componenti stile shadcn/ui.

PRIMA DI SCRIVERE CODICE, esegui il TASK 0.

TASK 0: SALVATAGGIO DEBITO TECNICO
Crea o aggiorna il file `TODO.md` nella root del progetto inserendo questa esatta checklist di errori della V1 che NON dovremo ripetere durante la riscrittura:
- [ ] Rimuovere variabili con prefisso CRA `REACT_APP_`, usare solo `NEXT_PUBLIC_`.
- [ ] Nessuna credenziale EmailJS hardcoded nel sorgente (nemmeno come fallback).
- [ ] Ripristinare l'accessibilità del Blog (attualmente buildato ma senza link nella UI).
- [ ] Aggiornare `sitemap.ts` per includere le rotte dinamiche di post e progetti.
- [ ] Non usare icone placeholder riciclate. Se manca l'SVG, usare icone generiche (es. `lucide-react`) o solo testo.
- [ ] Sostituire l'OG image 512x512 con una 1200x630.
- [ ] Rimuovere immagini enormi non ottimizzate (background da 2.3MB) e usare solo `next/image` (WebP/AVIF).
- [ ] Eliminare il loading screen artificiale da 800ms.
- [ ] Completare la migrazione TypeScript: zero file `.js` o `.jsx` residui.
- [ ] Rimuovere il CSS monolitico (`App.css` da 1600 righe) e adottare Tailwind.
- [ ] Rimuovere file morti (CursorTrail, PageTransition, ecc.) e dipendenze inutili (react-mailchimp-subscribe).
- [ ] Correggere la documentazione stantia.

TASK 1: DATA LAYER & TIPIZZAZIONE
Aggiorna `src/data/profileData.ts` scrivendo codice 100% TypeScript strict. 
Ecco i dati unici da usare (Single Source of Truth):
- Personale: Carmelo La Mantia — Jr Full Stack Developer. Tagline: "AI-Augmented Development · Next.js · Laravel". Base: Agrigento, Sicilia. Email: carmelo.la.mantia00@gmail.com.
- Summary: "Jr Full Stack Developer specializzato nello stack Next.js/TypeScript e PHP/Laravel. Progetta e realizza applicazioni web full-stack curando performance, accessibilità e type-safety, con approccio AI-Augmented (AI come acceleratore di scaffolding, refactoring e code review, mantenendo il controllo sulle scelte architetturali). In parallelo, laurea triennale in Ingegneria Informatica."
- Skills (Livelli in %): HTML5 90, CSS3 85, JavaScript 85, TypeScript 78, React 80, Next.js 78, Bootstrap 85, PHP 78, Laravel 75, MySQL 72, PostgreSQL 75, Supabase 70, Node.js 65, Git 80, GitHub 82, Vite 72, Docker 60, AI-Augmented Dev 88.
- Progetti: 1. SubSync (Next.js, React, TS, Zustand); 2. Souls Space Platform (Laravel 10, PHP, MySQL); 3. Knight Shooter (JS, Phaser 3, Vite); 4. Portfolio v1 (Next.js 14, TS); 5. Black Template (HTML5, CSS, JS); 6. Sushi Restaurant (React, CSS Modules).
- Timeline: 2014-2019 Diploma C.A.T. → 2021-2022 Tecnico Web → 2023 Bootcamp Full Stack → 2023-2024 Esperienze lavorative → 2025 Università & Lavoro → Oggi: obiettivo Jr Full Stack Developer.

TASK 2: SETUP STYLING & CORE UI
- Elimina `App.css`.
- Configura Tailwind CSS. Imposta il tema dark di base: Sfondo Slate 950 (#020617), Testo Slate 50 (#f8fafc), Primary Accent Blue 500 (#3b82f6).
- Riscrivi il Root Layout (`src/app/layout.tsx`) applicando il font `Inter` e il nuovo background.

TASK 3: COSTRUZIONE LANDING PAGE (`app/(marketing)/page.tsx` o `app/page.tsx`)
- Navbar: Sticky, backdrop-blur, link a Progetti, Blog, Contatti.
- Hero: H1 gigante, tagline testuale sfumata, bottoni "Scarica CV" e "Vedi Progetti" puliti, stile shadcn.
- Skills: Usa un layout a griglia Bento. Stile card: sfondo scuro, bordo sottile traslucido. Usa le icone di `lucide-react` temporaneamente se mancano gli SVG.
- Timeline: Layout verticale asimmetrico minimale (nessun carosello complesso).
- Contact Form: Riscrivi la UI in stile dashboard moderna. Sfondo input grigio scuro. Usa EmailJS MA solo con variabili `process.env.NEXT_PUBLIC_`. Nessun fallback hardcodato.

REGOLE DI ESECUZIONE:
Lavora eseguendo un task alla volta. Alla fine di ogni task, verifica che `tsc --noEmit` non dia errori prima di passare al successivo. Stampami un log breve alla fine di ogni Task. Conferma di aver compreso e procedi con il TASK 0.
