/**
 * Profile Data — Single Source of Truth
 *
 * Contiene dati anagrafici, competenze, progetti e timeline di carriera.
 * Nessun componente deve hardcodare contenuti: tutto passa da qui.
 *
 * Regole del modulo:
 * - TypeScript strict, zero `any`, array esposti come `readonly`.
 * - Nessuna dipendenza da React o da librerie di UI: è un modulo di soli dati.
 * - Le icone delle skill puntano a un logo reale oppure, se il logo non esiste,
 *   dichiarano un'icona generica lucide-react. Mai loghi riciclati da altre
 *   tecnologie (errore della V1: Next.js col logo React, PostgreSQL con quello
 *   di MySQL, Supabase con quello di MongoDB).
 *
 * @module data/profileData
 */

// ============================================================================
// TIPI
// ============================================================================

/** Tipologia di tappa nella timeline di carriera. */
export type TimelineType = 'education' | 'work' | 'career';

/** Raggruppamento delle competenze nella griglia Bento. */
export type SkillCategory = 'frontend' | 'backend' | 'data' | 'tooling' | 'practice';

/**
 * Icone generiche lucide-react ammesse come fallback.
 * Union chiusa: il componente che le renderizza mappa esaustivamente ogni valore,
 * quindi aggiungerne una qui costringe il compilatore a segnalare la mappa mancante.
 */
export type FallbackIcon = 'Layers' | 'Database' | 'Cloud' | 'Sparkles';

/** Destinazione del link di un progetto: demo pubblica o repository. */
export type ProjectLinkType = 'live' | 'repo';

/**
 * Canali social esposti nella UI.
 *
 * Union chiusa come `FallbackIcon`: chi renderizza questi link mappa
 * esaustivamente ogni valore su un'icona, quindi aggiungerne uno qui costringe il
 * compilatore a segnalare la mappa incompleta invece di lasciare un buco a runtime.
 */
export type SocialPlatform = 'github' | 'linkedin' | 'instagram' | 'whatsapp';

/** Voce social: la UI non conosce gli URL, li legge da qui. */
export interface SocialLink {
  readonly platform: SocialPlatform;
  /** Usata come `aria-label`: è l'unico testo che raggiunge gli screen reader. */
  readonly label: string;
  readonly href: string;
}

/** Dati anagrafici e recapiti. */
export interface PersonalInfo {
  readonly name: string;
  readonly role: string;
  readonly tagline: string;
  readonly location: string;
  readonly birthDate: string;
  /**
   * Comune di residenza isolato, senza provincia né regione.
   *
   * Esiste separato da `location` perché i dati strutturati vogliono la sola
   * città in `addressLocality`, mentre `location` è una stringa pensata per
   * essere letta in pagina. Tenerli distinti evita che il JSON-LD dichiari una
   * località diversa da quella mostrata.
   */
  readonly city: string;
  readonly phone: string;
  readonly email: string;
  readonly linkedin: string;
  readonly github: string;
  readonly instagram: string;
  /** Path del CV dentro public/. */
  readonly cvPath: string;
}

/**
 * Competenza tecnica.
 * `iconSrc` è valorizzato SOLO quando in public/img/icon/ esiste il logo
 * autentico della tecnologia; altrimenti si usa `fallbackIcon`.
 */
export interface Skill {
  readonly name: string;
  /** Livello di padronanza, 0-100. */
  readonly level: number;
  readonly category: SkillCategory;
  /** Path assoluto del logo reale dentro public/ (es. "/img/icon/react.png"). */
  readonly iconSrc?: string;
  /** Icona lucide-react usata quando iconSrc è assente. */
  readonly fallbackIcon?: FallbackIcon;
}

/** Etichette leggibili delle categorie di competenza. */
export interface SkillCategoryMeta {
  readonly id: SkillCategory;
  readonly label: string;
  readonly description: string;
}

/** Raggruppamento testuale delle competenze, usato nella sezione CV. */
export interface TechnicalSkills {
  readonly languages: readonly string[];
  readonly software: readonly string[];
  readonly tools: readonly string[];
  readonly frameworks: readonly string[];
  readonly aiTools: readonly string[];
}

/** Voce del percorso formativo. */
export interface EducationEntry {
  readonly period: string;
  readonly institution: string;
  readonly location: string;
  readonly title: string;
  readonly description: string;
}

/** Progetto di portfolio, con i campi che alimentano il case study. */
export interface Project {
  /** Identificativo URL-safe: alimenta la rotta /projects/[slug]. */
  readonly slug: string;
  readonly title: string;
  /** Descrizione breve mostrata nella card. */
  readonly description: string;
  /** Descrizione estesa mostrata nel case study. */
  readonly longDescription: string;
  readonly problem: string;
  readonly solution: string;
  readonly results: readonly string[];
  /** Path assoluto dell'immagine dentro public/. */
  readonly imgUrl: string;
  /** Link esterno al progetto. */
  readonly url: string;
  /** Distingue una demo pubblica da un repository, per etichettare la CTA. */
  readonly linkType: ProjectLinkType;
  readonly tech: readonly string[];
}

/** Esperienza lavorativa. */
export interface WorkExperience {
  readonly period: string;
  readonly company: string;
  readonly location: string;
  readonly role: string;
  readonly skills: readonly string[];
}

/** Lingua parlata con livello. */
export interface Language {
  readonly language: string;
  readonly level: string;
  /** Valutazione da 1 a 5. */
  readonly stars: number;
}

/** Tappa della timeline di carriera. */
export interface TimelineEvent {
  readonly year: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly type: TimelineType;
}

// ============================================================================
// ANAGRAFICA
// ============================================================================

export const personalInfo: PersonalInfo = {
  name: 'Carmelo La Mantia',
  role: 'Jr Full Stack Developer',
  tagline: 'AI-Augmented Development · Next.js · Laravel',
  city: 'Canicattì',
  location: 'Canicattì (AG), Sicilia',
  birthDate: '12/09/2000',
  phone: '+39 3510845851',
  email: 'carmelo.la.mantia00@gmail.com',
  linkedin: 'https://www.linkedin.com/in/carmelo-la-mantia-web-developer/',
  github: 'https://github.com/MeloLM',
  instagram: 'https://www.instagram.com/carmelo_coding/',
  cvPath: '/CV_Carmelo_la_mantia_2026.pdf',
};

/**
 * Canali social, in ordine di rilevanza professionale.
 *
 * Fonte unica: prima della V2.1 Hero e SiteFooter dichiaravano ciascuno il proprio
 * array identico, e aggiungere un canale significava ricordarsi di farlo in due
 * punti. Ora entrambi iterano questo.
 *
 * ⚠️ Il numero WhatsApp è un SEGNAPOSTO e va sostituito con quello reale prima di
 * pubblicare: il link porta a una chat inesistente. Formato `wa.me`: prefisso
 * internazionale senza `+` né spazi, messaggio precompilato in `?text=`.
 */
export const socialLinks: readonly SocialLink[] = [
  {
    platform: 'github',
    label: 'GitHub',
    href: personalInfo.github,
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    href: personalInfo.linkedin,
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    href: personalInfo.instagram,
  },
  {
    platform: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/393000000000?text=Ciao%20Carmelo%20ti%20contatto%20per%20delle%20info',
  },
];

export const summary =
  'Jr Full Stack Developer specializzato nello stack Next.js/TypeScript e PHP/Laravel. ' +
  'Progetta e realizza applicazioni web full-stack curando performance, accessibilità e ' +
  'type-safety, con approccio AI-Augmented (AI come acceleratore di scaffolding, refactoring ' +
  'e code review, mantenendo il controllo sulle scelte architetturali). In parallelo, laurea ' +
  'triennale in Ingegneria Informatica.';

// ============================================================================
// COMPETENZE
// ============================================================================

export const skillCategories: readonly SkillCategoryMeta[] = [
  { id: 'frontend', label: 'Frontend', description: 'Interfacce, accessibilità, design system' },
  { id: 'backend', label: 'Backend', description: 'API, autenticazione, logica applicativa' },
  { id: 'data', label: 'Database', description: 'Modellazione dati e persistenza' },
  { id: 'tooling', label: 'Tooling & DevOps', description: 'Build, versionamento, deploy' },
  { id: 'practice', label: 'Metodo', description: 'Come lavoro, non solo con cosa' },
];

export const skills: readonly Skill[] = [
  // Frontend
  { name: 'HTML5', level: 90, category: 'frontend', iconSrc: '/img/icon/html.png' },
  { name: 'CSS3', level: 85, category: 'frontend', iconSrc: '/img/icon/css.png' },
  { name: 'JavaScript', level: 85, category: 'frontend', iconSrc: '/img/icon/javascript.png' },
  { name: 'TypeScript', level: 78, category: 'frontend', iconSrc: '/img/icon/typescriptren.png' },
  { name: 'React', level: 80, category: 'frontend', iconSrc: '/img/icon/react.png' },
  // Logo Next.js assente in public/img/icon/: icona generica, non il logo React.
  { name: 'Next.js', level: 78, category: 'frontend', fallbackIcon: 'Layers' },
  { name: 'Bootstrap', level: 85, category: 'frontend', iconSrc: '/img/icon/bootstrap.png' },

  // Backend
  { name: 'PHP', level: 78, category: 'backend', iconSrc: '/img/icon/php.png' },
  { name: 'Laravel', level: 75, category: 'backend', iconSrc: '/img/icon/laravel.jpg' },
  { name: 'Node.js', level: 65, category: 'backend', iconSrc: '/img/icon/nodejs.png' },

  // Database
  { name: 'MySQL', level: 72, category: 'data', iconSrc: '/img/icon/mysql.png' },
  // Logo PostgreSQL assente: icona generica, non quello di MySQL.
  { name: 'PostgreSQL', level: 75, category: 'data', fallbackIcon: 'Database' },
  // Logo Supabase assente: icona generica, non quello di MongoDB.
  { name: 'Supabase', level: 70, category: 'data', fallbackIcon: 'Cloud' },

  // Tooling
  { name: 'Git', level: 80, category: 'tooling', iconSrc: '/img/icon/git.png' },
  { name: 'GitHub', level: 82, category: 'tooling', iconSrc: '/img/icon/github.png' },
  { name: 'Vite', level: 72, category: 'tooling', iconSrc: '/img/icon/vite.png' },
  { name: 'Docker', level: 60, category: 'tooling', iconSrc: '/img/icon/docker.png' },

  // Metodo
  // Non è la tecnologia di un singolo vendor: icona generica invece del logo ChatGPT.
  { name: 'AI-Augmented Dev', level: 88, category: 'practice', fallbackIcon: 'Sparkles' },
];

/**
 * Elenco testuale delle competenze per la sezione CV.
 * Nota: non ancora renderizzato da alcun componente della landing (candidato per
 * una futura sezione "About/CV"), ma è dato di profilo reale e va conservato.
 */
export const technicalSkills: TechnicalSkills = {
  languages: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'PHP 8.2+', 'SQL'],
  software: ['Linux', 'Postman', 'Docker', 'VS Code'],
  tools: ['Git', 'GitHub', 'GitHub Actions', 'Vite', 'Vercel'],
  frameworks: ['Next.js 14', 'React 18', 'Laravel 11', 'Bootstrap 5', 'Phaser 3'],
  aiTools: ['GitHub Copilot', 'Claude Code', 'Prompt Engineering', 'AI-Assisted Refactoring'],
};

// ============================================================================
// PROGETTI
// ============================================================================

export const projects: readonly Project[] = [
  {
    slug: 'subsync',
    title: 'SubSync',
    description:
      'Dashboard per il monitoraggio delle spese in abbonamenti: tracciamento dei pagamenti, costo mensile normalizzato (Burn Rate) e gestione degli abbonamenti condivisi.',
    longDescription:
      'SubSync centralizza tutti gli abbonamenti ricorrenti di un utente e ne calcola il costo reale. Le sottoscrizioni con cicli di fatturazione diversi (mensile, trimestrale, annuale) vengono normalizzate su base mensile per ottenere un Burn Rate confrontabile. Costruita con Next.js e TypeScript, usa Zustand come store globale per mantenere sincronizzati dashboard, filtri e calcoli derivati senza prop drilling.',
    problem:
      'Gli abbonamenti digitali si accumulano silenziosamente e il costo reale resta invisibile: cicli di fatturazione eterogenei rendono difficile capire quanto si spende davvero ogni mese, e gli abbonamenti divisi con altre persone falsano ulteriormente il totale.',
    solution:
      'Normalizzazione di ogni piano su base mensile per un Burn Rate confrontabile, gestione delle quote per gli abbonamenti condivisi e stato globale con Zustand per ricalcolare i totali in tempo reale al variare di filtri e sottoscrizioni.',
    results: [
      'Burn Rate mensile normalizzato su cicli di fatturazione eterogenei',
      'Gestione degli abbonamenti condivisi con ripartizione delle quote',
      'State management centralizzato con Zustand, TypeScript end-to-end',
    ],
    imgUrl: '/img/subsyncScreen.png',
    url: 'https://sub-sync-repo.vercel.app/',
    linkType: 'live',
    tech: ['Next.js', 'React', 'TypeScript', 'Zustand'],
  },
  {
    slug: 'souls-space-platform',
    title: 'Souls Space Platform',
    description:
      'Piattaforma full-stack con architettura MVC: autenticazione Laravel Fortify e area riservata con CRUD completo.',
    longDescription:
      'Piattaforma full-stack con architettura MVC in Laravel. Autenticazione sicura tramite Laravel Fortify, gestione dei ruoli utente, area riservata con CRUD completo protetto da middleware. Database MySQL con relazioni gestite via Eloquent ORM.',
    problem:
      'Implementare un sistema di autenticazione robusto con ruoli differenziati e sezioni protette per contenuti riservati.',
    solution:
      'Laravel Fortify per autenticazione sicura out-of-the-box, middleware personalizzati per la gestione dei ruoli, Eloquent ORM per query type-safe.',
    results: [
      'Autenticazione sicura con Laravel Fortify',
      'CRUD completo con relazioni Eloquent',
      'Interfaccia responsive',
    ],
    imgUrl: '/img/project_soul.jpeg',
    url: 'https://github.com/MeloLM/Carmelo_GamesSpace',
    linkType: 'repo',
    tech: ['Laravel 10', 'PHP', 'MySQL'],
  },
  {
    slug: 'knight-shooter',
    title: 'Knight Shooter',
    description:
      'Browser game 2D con architettura event-driven modulare, object pooling per i nemici e pathfinding.',
    longDescription:
      'Knight Shooter è un browser game 2D realizzato con Phaser 3 e Vite. L architettura event-driven modulare separa nettamente la logica di gioco dalla presentazione. Il sistema di object pooling ricicla gli sprite dei nemici riducendo l allocazione di memoria; il pathfinding usa un A* semplificato per movimenti fluidi degli avversari.',
    problem:
      'Creare un gioco browser performante senza framework pesanti, gestendo decine di entità simultanee senza cali di framerate.',
    solution:
      'Object pooling per riciclare gli oggetti ed evitare pressione sul garbage collector, architettura a eventi per disaccoppiare i moduli, rendering ottimizzato con sprite atlas.',
    results: [
      'Framerate stabile a 60 FPS',
      'Architettura modulare estendibile',
      'Zero dipendenze runtime oltre Phaser 3',
    ],
    imgUrl: '/img/project_Shooter_knight.jpeg',
    url: 'https://game-shooter-clm.vercel.app/',
    linkType: 'live',
    tech: ['JavaScript', 'Phaser 3', 'Vite'],
  },
  {
    slug: 'portfolio-v1',
    title: 'Portfolio v1',
    description:
      'Prima versione di questo portfolio: SPA a tema, animazioni CSS complesse e migrazione da Create React App a Next.js 14.',
    longDescription:
      'Prima iterazione del portfolio personale, nata su Create React App e migrata a Next.js 14 App Router. Ha fatto da banco di prova per SSR, Metadata API, testing con Vitest e pipeline CI su GitHub Actions. La V2 ne conserva i contenuti e ne abbandona il tema grafico.',
    problem:
      'Differenziarsi dai portfolio standard con un identità visiva forte, mantenendo performance e accessibilità ad alto livello.',
    solution:
      'Next.js 14 App Router per SSR e ottimizzazione automatica, TypeScript per la type-safety, testing con Vitest e pipeline CI su GitHub Actions.',
    results: [
      'Migrazione completa da Create React App a Next.js 14 App Router',
      'Suite di test unitari eseguita in CI a ogni push',
      'SEO server-side: Metadata API, JSON-LD, sitemap e robots dinamici',
    ],
    imgUrl: '/img/portfolio-v1.webp',
    url: 'https://my-profile-ten-beta.vercel.app/',
    linkType: 'live',
    tech: ['Next.js 14', 'TypeScript'],
  },
  {
    slug: 'black-template',
    title: 'Black Template',
    description:
      'Template dark minimalista e personalizzabile, struttura responsive mobile-first e zero dipendenze.',
    longDescription:
      'Template HTML/CSS/JS minimale con design scuro. Struttura responsive mobile-first, CSS custom properties per una tematizzazione rapida, layout flessibile con CSS Grid e Flexbox.',
    problem:
      'Creare un template riutilizzabile, minimale ma di impatto visivo, senza dipendere da framework pesanti.',
    solution:
      'HTML5 semantico, CSS3 con custom properties e Grid layout, JavaScript vanilla per le interazioni, zero dipendenze esterne.',
    results: [
      'Zero dipendenze esterne',
      'Responsive mobile-first',
      'CSS custom properties per la tematizzazione',
    ],
    imgUrl: '/img/project_moon.jpeg',
    url: 'https://github.com/MeloLM/Black_template_Carmelo_LM',
    linkType: 'repo',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    slug: 'sushi-restaurant',
    title: 'Sushi Restaurant',
    description:
      'Interfaccia per la consultazione di un menù, costruita su componenti riutilizzabili e filtri per categoria.',
    longDescription:
      'Applicazione React per la consultazione del menù di un ristorante sushi. Componenti riutilizzabili per ogni voce del menù, filtri per categoria e transizioni CSS per una navigazione fluida su mobile.',
    problem:
      'Realizzare un interfaccia menù interattiva e piacevole per utenti mobile, con navigazione rapida per categoria.',
    solution:
      'Componenti React modulari e riutilizzabili, CSS Modules per lo styling scoped, filtri di categoria per la navigazione rapida.',
    results: [
      'Componenti interamente riutilizzabili',
      'UI ottimizzata per mobile',
      'Filtri per categoria interattivi',
    ],
    imgUrl: '/img/project_sushi.jpeg',
    url: 'https://sushi-project-carmelo-lm.vercel.app/',
    linkType: 'live',
    tech: ['React', 'CSS Modules'],
  },
];

// ============================================================================
// PERCORSO
// ============================================================================

export const education: readonly EducationEntry[] = [
  {
    period: '2025 - in corso',
    institution: 'Università eCampus',
    location: 'Online / Agrigento',
    title: 'Laurea Triennale in Ingegneria Informatica',
    description: 'Percorso accademico in corso, per consolidare le basi teoriche e ingegneristiche.',
  },
  {
    period: 'Gennaio 2023 - Aprile 2023',
    institution: 'Aulab srl',
    location: 'Bari',
    title: 'Corso Full Stack Developer',
    description: 'Bootcamp intensivo su metodologia Agile Scrum e stack PHP/Laravel/React.',
  },
  {
    period: '2021 - 2022',
    institution: 'Empatia',
    location: 'Canicattì (Agrigento)',
    title: 'Corso di Tecnico gestione siti web',
    description: 'Formazione tecnica su gestione e sviluppo di siti web.',
  },
  {
    period: '2014 - 2019',
    institution: 'IISS Galileo Galilei',
    location: 'Canicattì (Agrigento)',
    title: 'Diploma di Istruzione Tecnica — C.A.T.',
    description: 'Diploma tecnico in Costruzioni, Ambiente e Territorio.',
  },
];

export const workExperience: readonly WorkExperience[] = [
  {
    period: '2025 - in corso',
    company: 'Rueesch srl',
    location: 'Canicattì (Agrigento)',
    role: 'Addetto alla logistica',
    skills: ['Gestione flussi', 'Coordinamento team', 'Rispetto delle scadenze'],
  },
  {
    period: '2023 - 2024',
    company: 'Rivendita Tabacchi 25',
    location: 'Canicattì (Agrigento)',
    role: 'Addetto alle vendite',
    skills: ['Gestione cassa', 'Assistenza clienti', 'Problem solving'],
  },
  {
    period: '2022 - 2023',
    company: 'VII Coorte Ristorante',
    location: 'Roma',
    role: 'Cameriere',
    skills: ['Lavoro in team', 'Gestione dello stress', 'Comunicazione'],
  },
];

export const languages: readonly Language[] = [
  { language: 'Italiano', level: 'Madrelingua', stars: 5 },
  { language: 'Inglese', level: 'Intermedio', stars: 4 },
  { language: 'Spagnolo', level: 'Base', stars: 2 },
];

// ============================================================================
// TIMELINE
// ============================================================================

export const timeline: readonly TimelineEvent[] = [
  {
    year: '2014 — 2019',
    title: 'Diploma C.A.T.',
    subtitle: 'IISS Galileo Galilei',
    description: 'Diploma tecnico in Costruzioni, Ambiente e Territorio.',
    type: 'education',
  },
  {
    year: '2021 — 2022',
    title: 'Tecnico Web',
    subtitle: 'Empatia',
    description: 'Corso di gestione e sviluppo siti web: primo contatto strutturato con il codice.',
    type: 'education',
  },
  {
    year: '2023',
    title: 'Bootcamp Full Stack',
    subtitle: 'Aulab srl',
    description: 'Bootcamp intensivo su PHP, Laravel, React e metodologia Agile Scrum.',
    type: 'education',
  },
  {
    year: '2023 — 2024',
    title: 'Esperienze lavorative',
    subtitle: 'Vendite e ristorazione',
    description: 'Soft skill sul campo: gestione dello stress, problem solving e lavoro in team.',
    type: 'work',
  },
  {
    year: '2025',
    title: 'Università e lavoro',
    subtitle: 'Ingegneria Informatica · Rueesch srl',
    description: 'Avvio della laurea triennale in Ingegneria Informatica, affiancata al lavoro.',
    type: 'work',
  },
  {
    year: 'Oggi',
    title: 'Jr Full Stack Developer',
    subtitle: 'Obiettivo professionale',
    description:
      'Alla ricerca di un team dove applicare lo stack Next.js/Laravel su progetti reali e complessi.',
    type: 'career',
  },
];
