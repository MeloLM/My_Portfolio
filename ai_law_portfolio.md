# ⚖️ Regolamento Agente AI — Portfolio Carmelo La Mantia

> **Progetto**: portfolio personale (Next.js 14 App Router · TypeScript · Vercel)
> **Vale per**: qualsiasi agente AI che operi su questo repository
> **Ultimo aggiornamento**: 18 settembre 2026

Queste direttive sono **vincolanti**. Un task che viola una qualsiasi di queste
regole è da considerarsi fallito, indipendentemente dalla qualità del codice
prodotto.

---

## 1. 📓 Gestione log

- Ogni sessione di lavoro va documentata **all'interno della cartella `log/`**
  nella root del progetto. **Non `logs/`**, non altre varianti.
- **Nomenclatura**: numerazione progressiva a tre cifre, `log_NNN.md`, in continuità
  con l'archivio esistente. Il log successivo a `log_006.md` è `log_007.md`.
- **Struttura**: va rispettato il formato dei log storici già presenti in `log/`.
  Ogni log contiene almeno:
  - titolo descrittivo dell'intervento;
  - blocco di intestazione con data e ora locale, tipo di intervento, branch,
    collegamenti ai log precedenti, esito complessivo;
  - corpo suddiviso in cicli o task, con il ragionamento seguito e non solo l'elenco
    delle modifiche;
  - **riepilogo file** diviso in creati, modificati, eliminati;
  - **esito delle verifiche** con i comandi eseguiti e il loro output;
  - sezione **punti aperti** con ciò che resta irrisolto.
- Il log si scrive **al termine** del lavoro, non durante, e descrive ciò che è
  realmente accaduto: intoppi, tentativi falliti e decisioni scartate incluse.

## 2. 🔐 Sicurezza zero-trust

- **Mai credenziali in chiaro nel codice sorgente.** Nessun service ID, template ID,
  API key, token o public key scritti in un file versionato — **nemmeno come valore
  di fallback** dietro un `||`.
- Le credenziali si leggono **esclusivamente** da variabili d'ambiente. In Next.js
  solo il prefisso `NEXT_PUBLIC_` raggiunge il browser: il prefisso `REACT_APP_`
  è un residuo di Create React App e produce sempre `undefined`.
- Se una variabile manca, la funzionalità che ne dipende **si disabilita e lo
  dichiara all'utente**. Non deve mai fingere di funzionare.
- `.env` e ogni sua variante restano fuori dal versionamento. L'unico file
  versionato è `.env.example`, che contiene solo segnaposto.
- Una chiave pubblica per design (es. la public key EmailJS) resta comunque da
  proteggere con restrizione per dominio lato provider.

## 3. 🧮 Qualità del codice

- **TypeScript strict obbligatorio.** `"strict": true` in `tsconfig.json` non si
  disattiva per far passare una build.
- **Nessun `any` ingiustificato.** Se un tipo non è esprimibile, si usa `unknown`
  e si restringe; se serve davvero un `any`, va motivato in un commento sulla riga.
- **Nessun file `.js` o `.jsx` tollerato sotto `src/`.** Ogni nuovo componente,
  hook o utility nasce in `.ts` o `.tsx`.
- Niente nuove dipendenze esterne senza richiesta esplicita: prima si verificano
  le API native del framework. Ogni pacchetto aggiunto va dichiarato nel log.
- Codice modulare e non ripetitivo. Le primitive UI non importano il data layer.
- I contenuti stanno in `src/data/profileData.ts`, che è l'unica fonte di verità:
  nessun testo, link o dato di profilo hardcodato dentro i componenti.
- Commenti chiari e concisi, che spieghino **perché**, non cosa fa la riga sotto.

### Convenzioni di naming e ordine degli import

Regole recuperate da `PSEUDOCODE.md` prima della sua eliminazione e riscritte sullo
stack attuale: la versione originale imponeva estensioni `.js`, CSS Modules e classi
kebab-case, che la V2 non usa più.

| Artefatto | Convenzione | Esempio |
|---|---|---|
| Componenti | PascalCase, estensione `.tsx` | `SiteHeader.tsx`, `ProjectCaseStudy.tsx` |
| Hook | camelCase con prefisso `use`, `.ts` | `useScroll.ts`, `useEmail.ts` |
| Utility di libreria | camelCase, `.ts` | `lib/utils.ts`, `lib/blog.ts` |
| Tipi e interfacce | PascalCase, esportati accanto a chi li definisce | `EmailFormData`, `NavItem` |
| Costanti | SCREAMING_SNAKE_CASE | `NAV_ITEMS`, `SCROLL_THRESHOLD` |
| Rotte App Router | nomi riservati di Next.js, minuscoli | `page.tsx`, `layout.tsx`, `loading.tsx` |

Non esiste un file di stile per componente: lo stile è Tailwind nel markup e i token
stanno in `globals.css`. Una classe custom si giustifica solo quando la stessa
combinazione di utility ricorre in più punti, e allora nasce nel design system, non
come classe ad hoc accanto al componente.

Ordine degli import, dall'esterno verso l'interno:

1. `'use client'`, quando serve, come prima riga assoluta del file
2. React e Next.js
3. Pacchetti di terze parti
4. Costanti e data layer (`../constants`, `../data/profileData`)
5. Hook
6. Componenti, a partire dalle primitive di `ui/`
7. Helper di `lib/`
8. Tipi, con `import type`

Struttura interna di un componente, nell'ordine: hook e stato, effetti, handler,
helper di render, `return`.

## 4. 🚫 Blocco commit

- **Mai eseguire `git commit` o `git push` senza autorizzazione esplicita
  dell'utente**, richiesta per quel preciso commit.
- Il lavoro resta nel **working tree** fino a revisione. Non si crea un commit
  "di appoggio", non si fa `git stash` al posto di un commit, non si committa
  "tanto poi si modifica".
- Sono altrettanto vietati senza autorizzazione: `git reset --hard`,
  `git clean`, `git checkout --`, `git rebase`, `git push --force` e qualsiasi
  altra operazione che distrugga lavoro non salvato.
- Prima di ogni operazione distruttiva autorizzata va verificato **cosa verrebbe
  cancellato** (`git clean -nd`), mettendo al riparo i file non tracciati che non
  fanno parte del lavoro in corso.

## 5. ✅ Verifica obbligatoria

Nessun task è concluso finché non passano, in quest'ordine:

```bash
npx tsc --noEmit      # 0 errori
npx vitest run        # suite completa verde
```

- Se il task tocca componenti, rotte o configurazione, va aggiunto anche
  `npx next lint` e una `next build` completa.
- L'esito va riportato **con l'output reale**. Se un controllo fallisce o viene
  saltato, va dichiarato: mai annunciare un task completato su una verifica non
  eseguita.
- Una modifica che rompe un test esistente non si chiude cancellando il test.

## 6. 🖥️ Build e ambiente Node

- **Mentre `npm run dev` è in esecuzione è vietato lanciare `npm run build`** sulla
  stessa cartella `.next`: la scrittura simultanea corrompe i chunk e produce
  build "verdi" che poi esplodono a runtime.
- Per testare una build di produzione è consentito fermare il dev server, ma la
  cosa **va notificata all'utente**.
- Se al termine di una sessione resta attivo un server (dev o produzione), va
  inserito un **avviso esplicito in chiusura di report**, con la porta occupata.
- Dopo la disinstallazione di un pacchetto o un cambio di configurazione, la build
  si esegue con `.next` eliminata: una build incrementale può riusare una cache
  incoerente.
- ⚠️ Il repository risiede in una cartella sincronizzata da OneDrive. Errori
  `Permission denied`, `MODULE_NOT_FOUND` intermittenti o `npm ci` rifiutato dal
  sistema operativo vanno sospettati come interferenza del sync **prima** che come
  problemi di codice: tipicamente si risolvono terminando i processi Node residui
  e ripetendo l'operazione.

## 7. 🗣️ Lingua e comunicazione

- **Italiano** per log, file markdown, commenti al codice e testi dell'interfaccia.
- Nomi di file, variabili, funzioni e messaggi di commit in inglese, secondo la
  convenzione già in uso nel repository.
- Se mancano informazioni per implementare una sezione: **fermarsi e chiedere**.
  Non si inventano dati di profilo, contenuti di progetti, metriche o risultati.
- I numeri riportati (test passati, dimensioni del bundle, punteggi) devono
  provenire da un comando realmente eseguito in quella sessione.

---

## 📎 Riferimenti rapidi

| Cosa | Dove |
|---|---|
| Contenuti del profilo | `src/data/profileData.ts` |
| Architettura | `ARCHITECTURE.md` |
| Roadmap e debito tecnico | `TODO.md` |
| Archivio log | `log/` |
| Prompt di riscrittura V2 | `PROMPT_PORTFOLIO_V2.md` |
| Variabili d'ambiente | `.env.example` |
