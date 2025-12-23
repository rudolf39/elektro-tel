---
title: "Keystatic-Integration Guide"
---
# Keystatic Integration (Technical Guide)

Diese Anleitung beschreibt, wie das **Keystatic CMS** in eine bestehende Next.js Webseite integriert wird. Sie dient als Referenz für Entwickler, die das Setup verstehen oder reproduzieren wollen.

## 1. Voraussetzungen
*   **Framework:** Next.js 15+ (App Router)
*   **Sprache:** TypeScript
*   **Paket-Manager:** npm oder pnpm

## 2. Installation
Folgende Pakete müssen installiert werden:
```bash
npm install @keystatic/core @keystatic/next
```

## 3. Die Ordner-Struktur
Damit das CMS funktioniert, müssen folgende Dateien an den richtigen Orten liegen:

```text
/
├── keystatic.config.ts        (Die Haupt-Konfiguration)
├── src/
│   ├── app/
│   │   ├── keystatic/
│   │   │   ├── layout.tsx     (Isoliertes Layout für Admin-UI)
│   │   │   ├── keystatic.tsx  (Client Component Wrapper)
│   │   │   └── [[...params]]/
│   │   │       └── page.tsx   (Die eigentliche Admin-Seite)
│   │   └── api/
│   │       └── keystatic/
│   │           └── [...params]/
│   │               └── route.ts (API-Route für lokales Speichern)
│   └── lib/
│       └── cms.ts             (Helper zum Lesen der Daten)
```

## 4. Code-Beispiele (Setup)

### A) Konfiguration (`keystatic.config.ts`)
Im Root-Verzeichnis. Definiert alle "Collections" (Daten-Typen).
```typescript
import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local', // Lokal oder 'github'
    },
    collections: {
        news: collection({
            label: 'News',
            slugField: 'title',
            path: 'content/news/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Titel' } }),
                body: fields.markdoc({ label: 'Inhalt' }),
            },
        }),
    },
});
```

### B) Layout (`src/app/keystatic/layout.tsx`)
Wichtig: Das CMS braucht ein eigenes `<html>` und `<body>` Tag, da es nicht im normalen Webseiten-Layout leben darf.
```tsx
import { makePage } from '@keystatic/next/ui/app';
import config from '../../../keystatic.config';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body>{children}</body>
        </html>
    );
}
```

### C) Admin Page (`src/app/keystatic/[[...params]]/page.tsx`)
```tsx
"use client";
import { makePage } from '@keystatic/next/ui/app';
import config from '../../../../keystatic.config';

export default makePage(config);
```

### D) API Route (`src/app/api/keystatic/[...params]/route.ts`)
Dies ist notwendig, damit Keystatic im "Local Mode" Dateien auf die Festplatte schreiben darf.
```typescript
import { makeRouteHandler } from '@keystatic/next/api';
import config from '../../../../../keystatic.config';

export const { GET, POST } = makeRouteHandler({
    config,
});
```

## 5. Daten auslesen (`src/lib/cms.ts`)

Um die Daten im Frontend anzuzeigen, nutzen wir den "Reader" API von Keystatic oder lesen direkt die Markdown-Dateien (wie in diesem Projekt).

**Variante "FileSystem" (Aktuell verwendet):**
Da wir volle Kontrolle wollen, lesen wir die Dateien per Node.js `fs` und `gray-matter`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Liste alle Dateien
const dir = path.join(process.cwd(), 'content/news');
const files = fs.readdirSync(dir);

// Lese einzelne Datei
const content = fs.readFileSync(filepath, 'utf8');
const { data, content: markdown } = matter(content);
```

**Vorteil:** Keine Abhängigkeit von Keystatic im Frontend-Build. Maximale Performance.

## 6. GitHub Integration (Der "Perfekte" Weg)

Damit das CMS auf der Live-Seite funktioniert, darf die GitHub App **nicht manuell** erstellt werden. Der folgende Prozess vermeidet Konfigurationsfehler.

### Schritt 1: API Route anlegen (Pflicht!)
Bevor Sie starten, muss diese Datei existieren: `src/app/api/keystatic/[...params]/route.ts`.
```typescript
import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

export const { GET, POST } = makeRouteHandler({ config });
```

### Schritt 2: GitHub Modus erzwingen
Stellen Sie `keystatic.config.ts` vorübergehend auf **GitHub only**:
```typescript
storage: {
    kind: 'github',
    repo: 'owner/repo-name',
},
```

### Schritt 3: Der Lokale Setup-Wizard
1.  Starten Sie den Server: `npm run dev`.
2.  Öffnen Sie `http://localhost:3000/keystatic`.
3.  Sie sehen jetzt nicht das Dashboard, sondern einen **"Setup Keystatic"** Button.
4.  Klicken Sie darauf! Keystatic führt Sie durch:
    *   App Name wählen.
    *   **"Create GitHub App"** klicken (automatisch).
    *   App auf Ihrem Repository installieren.
5.  **Ergebnis:** Keystatic erstellt automatisch eine `.env` Datei in Ihrem Projekt mit `KEYSTATIC_GITHUB_CLIENT_ID` und `SECRET`.

### Schritt 4: Deployment & Produktiv-Setzen
1.  Kopieren Sie die Werte aus der **lokalen** `.env` Datei.
2.  Fügen Sie diese in Netlify unter **"Environment variables"** ein.
3.  **WICHTIG:** Gehen Sie auf GitHub in die Settings Ihrer neuen App -> "Developer Settings" -> "Edit".
4.  Fügen Sie unter "Callback URLs" die **Live-URL** hinzu:
    `https://[IHRE-DOMAIN].netlify.app/api/keystatic/github/oauth/callback`
5.  (Optional) Stellen Sie `keystatic.config.ts` wieder auf Hybrid-Modus (Dev=Local, Prod=Github).

### Schritt 5: User hinzufügen
Um Kollegen Zugriff zu geben:
*   Fügen Sie diese einfach als **Collaborator** (mit Write-Rechten) in Ihrem GitHub Repository hinzu.
*   Es ist kein extra Keystatic-Account nötig.

