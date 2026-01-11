export const SKILLS = [
  {
    title: "Front-End",
    icon: "./assets/icon/frontEnd.png",
    skill: [
      {skill: "HTML5", percentage: "80%"},
      {skill: "React.js", percentage: "65%"},
      {skill: "JavaScript", percentage: "70%"},
      {skill: "CSS3", percentage: "60%"}
      ],
  },
  {
    title: "Back-End",
    icon: "./assets/icon/backEnd.png",
    skill: [
      {skill: "Node.js", percentage: "80%"},
      {skill: "MySql", percentage: "65%"},
      {skill: "PHP", percentage: "70%"},
      {skill: "COBOL", percentage: "20%"}  
      ],
  },
  {
    title: "Tools",
    icon: "./assets/icon/tools.png",
    skill: [
      {skill: "Git & GitHub", percentage: "80%"},
      {skill: "Visual Studio Code", percentage: "85%"},
      {skill: "Webpack", percentage: "70%"},
      {skill: "Responsive Design", percentage: "60%"}
      ],
  },
  {
    title: "Soft Skills",
    icon: "./assets/icon/soft_skill.png",
    skill: [
      {skill: "Problem-solving", percentage: "80%"},
      {skill: "Collaboration", percentage: "75%"},
      {skill: "Attention to Detail", percentage: "70%"},
      {skill: "Communicate to client", percentage: "60%"}
      ],
  }
];


export const WORK_EXPS = [
  {
  title: "Addetto Vendite Tabacchi",
  date: "2023 luglio - 2024 gennaio",
  respons: [
    "Vendita di prodotti: La vendita di tabacchi, sigarette, sigari, articoli da fumo, cartine e accessori correlati è una delle mansioni principali. Il personale del tabacchi assiste i clienti nella scelta dei prodotti, fornisce informazioni sui diversi tipi di tabacco e offre consulenza sui prodotti disponibili.",
    "Gestione delle transazioni finanziarie: Presso un tabacchi, il personale gestisce anche transazioni finanziarie come la vendita di biglietti per i mezzi pubblici, ricariche telefoniche, pagamento di bollette e servizi di gioco come lotterie e gratta e vinci. È responsabile dell'accurata registrazione delle transazioni e dell'assolvimento degli obblighi fiscali.",
    "Controllo dell'età e del rispetto delle normative: Un'altra importante mansione è garantire il rispetto delle leggi in materia di età minima per l'acquisto di prodotti del tabacco. Il personale del tabacchi deve verificare l'età dei clienti e assicurarsi che non vendano tabacco a persone sotto l'età legale. Inoltre, devono essere a conoscenza delle normative locali riguardanti la vendita di tabacco e assicurarsi che il negozio sia conforme a tali regolamenti.",
    ],
  },
  {
  title: "Cameriere Ristorante",
  date: "2018 - 2023",
  respons: [
    "Servizio ai clienti: Il cameriere è responsabile di accogliere i clienti, accompagnandoli al loro tavolo e fornendo loro i menu. Durante il pasto, il cameriere prende gli ordini, suggerisce piatti o bevande, serve il cibo e le bevande, e si assicura che i clienti abbiano tutto ciò di cui hanno bisogno per godersi il pasto, come posate pulite o ulteriori condimenti.",
    "Gestione delle ordinazioni e dei pagamenti: Il cameriere registra accuratamente gli ordini dei clienti, assicurandosi di prendere nota di eventuali modifiche o richieste speciali. Alla fine del pasto, emette il conto ai clienti, accetta i pagamenti e fornisce lo scontrino o la ricevuta. Deve anche essere in grado di gestire i pagamenti in contanti e con carta di credito o debito.",
    "Mantenimento della pulizia e dell'ordine: Durante il servizio, il cameriere mantiene la pulizia e l'ordine nell'area dei tavoli, rimuovendo piatti vuoti e posate sporche, pulendo eventuali schizzi o macchie e preparando i tavoli per i nuovi clienti. Alla fine della giornata lavorativa, partecipa alla pulizia generale del ristorante, che può includere la pulizia dei tavoli, delle sedie, del pavimento e dei bagni.",
    ],
  },
  {
  title: "Full-Stack Web Developer",
  date: "2023 - in corso",
  respons: [
    "Sviluppo del front-end: Il full-stack web developer è responsabile della creazione del front-end di un sito web o di un'applicazione web. Ciò include la scrittura di codice HTML, CSS e JavaScript per creare interfacce utente interattive e responsive. Utilizzando framework come React, Angular o Vue.js, il full-stack developer progetta e implementa le pagine web per garantire un'esperienza utente ottimale.",
    "Sviluppo del back-end: Questa mansione implica la progettazione e lo sviluppo del back-end di un'applicazione web, che gestisce le funzionalità non visibili agli utenti finali. Il full-stack developer utilizza linguaggi di programmazione come JavaScript (Node.js), Python (Django o Flask), Ruby (Ruby on Rails) o Java (Spring) per creare server, database e API che supportano il funzionamento del sito o dell'applicazione.",
    "Gestione dei database e delle operazioni: Il full-stack developer è spesso coinvolto nella gestione dei database utilizzati dall'applicazione. Questo include la progettazione del database, la creazione di schemi, la scrittura di query SQL o l'utilizzo di ORM (Object-Relational Mapping) per interagire con il database. Inoltre, può essere coinvolto nella gestione delle operazioni del server, ad esempio il deployment dell'applicazione su server cloud come AWS, Azure o Google Cloud Platform, e la configurazione di servizi come Docker o Kubernetes per la gestione dei container.",
    ],
  },
];

// 📌 PROGETTI - Modifica qui per aggiungere/rimuovere progetti
export const PROJECTS = [
  {
    title: "Portfolio Personale",
    description: "Il mio portfolio personale realizzato con React, Bootstrap e animazioni CSS. Design moderno e responsive.",
    image: "./assets/image/profile.jpg", // Sostituisci con screenshot del progetto
    technologies: ["React", "Bootstrap", "CSS3", "JavaScript"],
    github: "https://github.com/MeloLM",
    demo: null // Aggiungi link demo quando disponibile
  },
  {
    title: "Progetto E-Commerce",
    description: "Piattaforma e-commerce con carrello, autenticazione utenti e gestione ordini. Backend in Node.js.",
    image: "./assets/image/profile.jpg", // Sostituisci con screenshot del progetto
    technologies: ["React", "Node.js", "MySQL", "Express"],
    github: "https://github.com/MeloLM",
    demo: null
  },
  {
    title: "Dashboard Analytics",
    description: "Dashboard interattiva per visualizzazione dati con grafici e statistiche in tempo reale.",
    image: "./assets/image/profile.jpg", // Sostituisci con screenshot del progetto
    technologies: ["React", "Chart.js", "API REST", "CSS"],
    github: "https://github.com/MeloLM",
    demo: null
  }
];

// 💡 SUGGERIMENTO: Per aggiungere un nuovo progetto, copia questa struttura:
// {
//   title: "Nome Progetto",
//   description: "Descrizione breve del progetto",
//   image: "./assets/image/nome-screenshot.jpg",
//   technologies: ["Tech1", "Tech2", "Tech3"],
//   github: "https://github.com/username/repo",
//   demo: "https://link-demo.com"  // o null se non c'è demo
// }