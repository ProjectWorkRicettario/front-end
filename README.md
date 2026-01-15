# Frontend

Breve documentazione del frontend dell'applicazione.

**Descrizione**

- Frontend React costruito con Vite. Offre autenticazione, pagine di inventario e profilo.

**Tecnologie**

- React
- Vite
- React Router

**Requisiti**

- Node.js 16+ e `npm` (o `pnpm`/`yarn`).

**Installazione**

```bash
npm install
```

**Avvio in sviluppo**

```bash
npm run dev
```

**Build produzione**

```bash
npm run build
npm run preview    # per testare la build localmente
```

**Script utili**

- `dev`: avvia Vite in modalità sviluppo
- `build`: crea la build di produzione
- `preview`: serve la build per testing

**Struttura del progetto**

- `src/` — codice sorgente principale
- `src/components/` — componenti React (es. [HeaderBar.jsx](src/components/HeaderBar.jsx))
- `src/pages/` — pagine principali (es. [Login.jsx](src/pages/Login.jsx), [InventoryPage.jsx](src/pages/InventoryPage.jsx))
- `src/contexts/` — contesti React (es. [AuthContext.jsx](src/contexts/AuthContext.jsx))
- `src/services/` — servizi per API (es. [authService.js](src/services/authService.js))
- `src/styles/` — fogli di stile CSS
- `public/` — asset statici

**Configurazione & environment**

- Come piattaforma di deploy abbiamo usato Vercel usando come file di configurazione `vercel.json` presente nel progetto.

**Deploy**

- Eseguito `npm run build` su Vercel.
