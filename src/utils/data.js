// ============================================================================
// 📊 DATA.JS - Dati centralizzati del portfolio
// Ultimo aggiornamento: 11 Gennaio 2026
// ============================================================================

// 🎯 SKILLS - Competenze tecniche e soft skills
export const SKILLS = [
  {
    title: "Front-End",
    icon: "./assets/icon/frontEnd.png",
    skill: [
      { skill: "HTML5", percentage: "85%" },
      { skill: "CSS3", percentage: "80%" },
      { skill: "JavaScript", percentage: "75%" },
      { skill: "React.js", percentage: "70%" },
    ],
  },
  {
    title: "Back-End",
    icon: "./assets/icon/backEnd.png",
    skill: [
      { skill: "PHP", percentage: "75%" },
      { skill: "Node.js", percentage: "65%" },
      { skill: "Laravel", percentage: "60%" },
      { skill: "MySQL", percentage: "70%" },
    ],
  },
  {
    title: "Tools",
    icon: "./assets/icon/tools.png",
    skill: [
      { skill: "Git & GitHub", percentage: "80%" },
      { skill: "Visual Studio Code", percentage: "90%" },
      { skill: "WordPress", percentage: "65%" },
      { skill: "GitHub Copilot", percentage: "75%" },
    ],
  },
  {
    title: "Soft Skills",
    icon: "./assets/icon/soft_skill.png",
    skill: [
      { skill: "Problem Solving", percentage: "85%" },
      { skill: "Time Management", percentage: "80%" },
      { skill: "Team Work", percentage: "80%" },
      { skill: "Communication", percentage: "75%" },
    ],
  },
];

// 💼 WORK EXPERIENCES - Esperienze lavorative (ordine cronologico inverso)
export const WORK_EXPS = [
  {
    title: "Addetto alla Logistica",
    company: "Rueesch srl - Abbigliamento Professionale",
    location: "Canicattì (AG), Sicilia",
    date: "2025 - Presente",
    respons: [
      "Time Management: Gestione efficiente dei tempi per garantire il rispetto delle scadenze di consegna e ottimizzare i flussi di lavoro.",
      "Lavoro in Team: Collaborazione con colleghi per coordinare le attività di magazzino e garantire un servizio efficiente.",
      "Precisione Operativa: Controllo accurato dell'inventario, gestione delle spedizioni e verifica della qualità dei prodotti.",
    ],
  },
  {
    title: "Addetto alle Vendite",
    company: "Rivendita Tabacchi 25",
    location: "Canicattì (AG), Sicilia",
    date: "2023 - 2024",
    respons: [
      "Problem Solving: Risoluzione rapida di problematiche con clienti e gestione di situazioni complesse al banco.",
      "Customer Care: Assistenza clienti professionale, consulenza sui prodotti e fidelizzazione della clientela.",
      "Affidabilità e Gestione Cassa: Responsabilità nella gestione delle transazioni finanziarie e chiusura cassa.",
    ],
  },
  {
    title: "Cameriere",
    company: "VII Coorte Ristorante",
    location: "Roma (Lazio)",
    date: "2022 - 2023",
    respons: [
      "Gestione dello Stress: Capacità di lavorare efficacemente sotto pressione durante i servizi più intensi.",
      "Comunicazione Efficace: Interazione professionale con clienti italiani e internazionali, presa ordini e suggerimenti.",
      "Adattabilità: Flessibilità nel gestire diverse situazioni e ambienti dinamici del settore ristorazione.",
    ],
  },
];

// 🚀 PROJECTS - Progetti personali (dal CV)
export const PROJECTS = [
  {
    title: "Shooter Game",
    description: "Gioco sparatutto sviluppato con Phaser 3. Gameplay dinamico con nemici, power-up e sistema di punteggio.",
    image: "./assets/image/projects/shooter.jpg",
    technologies: ["JavaScript", "Phaser 3", "HTML5 Canvas", "CSS"],
    github: "https://github.com/MeloLM",
    demo: "https://melolm.github.io/shooter", // Aggiorna con link reale
  },
  {
    title: "My Portfolio",
    description: "Portfolio personale custom sviluppato con React. Design moderno, responsive e ottimizzato per SEO.",
    image: "./assets/image/projects/portfolio.jpg",
    technologies: ["React", "Bootstrap", "CSS3", "JavaScript"],
    github: "https://github.com/MeloLM/My_Portfolio",
    demo: "https://melolm.github.io/My_Portfolio",
  },
  {
    title: "SoulsSpace Blog",
    description: "Blog funzionale in sviluppo con Laravel. Sistema di articoli, categorie e gestione utenti.",
    image: "./assets/image/projects/blog.jpg",
    technologies: ["Laravel", "PHP", "MySQL", "Blade"],
    github: "https://github.com/MeloLM/soulsspace",
    demo: null, // In progress
  },
  {
    title: "Sushi Menu",
    description: "Menu interattivo all-you-can-eat sviluppato in React. Interfaccia intuitiva per ordinazioni digitali.",
    image: "./assets/image/projects/sushi.jpg",
    technologies: ["React", "CSS3", "JavaScript", "JSON"],
    github: "https://github.com/MeloLM",
    demo: "https://melolm.github.io/sushi-menu", // Aggiorna con link reale
  },
];

// 🎓 EDUCATION - Formazione (opzionale, per future implementazioni)
export const EDUCATION = [
  {
    title: "Laurea Triennale in Ingegneria Informatica",
    institution: "Università E-campus",
    location: "AG, Sicilia",
    date: "2025 - In corso",
  },
  {
    title: "Corso Full Stack Developer",
    institution: "Aulab srl",
    location: "Bari",
    date: "Gennaio 2023 - Aprile 2023",
  },
  {
    title: "Corso Tecnico Gestione Siti Web",
    institution: "Empatia",
    location: "Canicattì (AG)",
    date: "2021 - 2022",
  },
  {
    title: "Diploma C.A.T. (Costruzioni, Ambiente e Territorio)",
    institution: "IISS Galileo Galilei",
    location: "Canicattì (AG)",
    date: "2014 - 2019",
  },
];

// 📞 CONTACT INFO - Informazioni di contatto
export const CONTACT_INFO = {
  phone: "+39 351 084 5851",
  email: "carmelo.la.mantia00@gmail.com",
  location: "Agrigento, Sicilia, Italy",
  github: "https://github.com/MeloLM",
  linkedin: "https://linkedin.com/in/carmelo-la-mantia", // Aggiorna con link reale
  portfolio: "https://melolm.github.io/My_Portfolio",
};