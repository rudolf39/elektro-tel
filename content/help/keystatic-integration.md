# Technische Dokumentation: Keystatic Integration (Complete Guide)

Diese Anleitung deckt den gesamten Zyklus ab: Von der **Installation** über die **Einrichtung** bis hin zum **Verständnis**, wie alles funktioniert.

---

## TEIL 1: INSTALLATION & SETUP (VON NULL)

Wenn Sie Keystatic in ein *neues* Next.js Projekt integrieren wollen, folgen Sie diesen Schritten.

### 1. Pakete installieren
```bash
npm install @keystatic/core @keystatic/next
```

### 2. Dateien erstellen
Sie benötigen 4 Basis-Dateien.

**A. Konfiguration (`keystatic.config.ts` im Root):**
```typescript
import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'github',
        repo: 'user/repo', // Ihr GitHub Repo
    },
    collections: {
        // Hier kommen Ihre Daten-Typen hin
    },
});
```

**B. Admin Layout (`src/app/keystatic/layout.tsx`):**
Das CMS braucht ein isoliertes Layout (ohne Tailwind der Hauptseite).
```tsx
import { makePage } from '@keystatic/next/ui/app';
import config from '../../../keystatic.config';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head />
            <body>{children}</body>
        </html>
    );
}
```

**C. Admin Page (`src/app/keystatic/[[...params]]/page.tsx`):**
```tsx
"use client";
import { makePage } from '@keystatic/next/ui/app';
import config from '../../../../keystatic.config';

export default makePage(config);
```

**D. API Route (`src/app/api/keystatic/[...params]/route.ts`):**
```typescript
import { makeRouteHandler } from '@keystatic/next/api';
import config from '../../../../../keystatic.config';

export const { GET, POST } = makeRouteHandler({
    config,
});
```

### 3. GitHub Integration (Verknüpfung)
Damit Keystatic auf Ihr Repo zugreifen darf, brauchen Sie eine **GitHub OAuth App**.

**Der einfache Weg (Localhost Wizard):**
1.  Setzen Sie `keystatic.config.ts` vorübergehend auf `kind: 'local'`.
2.  Starten Sie `npm run dev` und gehen Sie auf `http://localhost:3000/keystatic`.
3.  Ändern Sie die Config zurück auf `kind: 'github'` (während der Server läuft).
4.  Die Seite zeigt nun einen Button **"Create GitHub App"**.
5.  Klicken Sie darauf und folgen Sie den Anweisungen. Keystatic erstellt die App automatisch für Sie.

**Der manuelle Weg (GitHub Settings):**
1.  GitHub -> Settings -> Developer Settings -> OAuth Apps -> New OAuth App.
2.  **Homepage URL:** `http://localhost:3000` (für lokal) oder Ihre Live-URL.
3.  **Callback URL:** `https://[IHRE-DOMAIN]/api/keystatic/github/oauth/callback`.

### 4. Environment Variablen
Speichern Sie diese Werte in Ihrer `.env.local` (lokal) und bei **Netlify** (live):

*   `KEYSTATIC_GITHUB_CLIENT_ID`: (Aus der GitHub OAuth App)
*   `KEYSTATIC_GITHUB_CLIENT_SECRET`: (Aus der GitHub OAuth App)
*   `KEYSTATIC_SECRET`: Ein langer zufälliger String (z.B. via `openssl rand -base64 32`).
*   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`: Der Name Ihrer App (z.B. `elektro-tel-cms`).

---

## TEIL 2: WIE ES FUNKTIONIERT (DEEP DIVE)

Diese Webseite nutzt **Keystatic** als Content Management System (CMS). Anders als klassische CMS (wie WordPress) hat Keystatic **keine Datenbank**.

*   **Speicherort:** Alle Inhalte werden als **Dateien (Markdown/JSON)** direkt im GitHub-Repository gespeichert.
*   **Vorteil:** Volle Versionskontrolle, kein Datenbank-Server nötig, extrem schnell.
*   **Integration:** Keystatic ist direkt in die Next.js App integriert (unter `/keystatic`).

### Die Architektur
```text
[Benutzer im CMS] -> klickt "Speichern"
      ↓
[GitHub API] -> erstellt Datei "content/references/neues-projekt.md"
      ↓
[Netlify] -> bemerkt Änderung -> Startet "Build"
      ↓
[Next.js Build] -> `src/lib/cms.ts` liest die .md Datei
      ↓
[Webseite] -> Generiert statisches HTML mit dem neuen Inhalt
```

---

## 2. Beispiel-Ablauf: Eine neue Referenz erstellen

Hier sehen wir uns genau an, was passiert, wenn Sie eine neue Referenz anlegen.

### Schritt A: Im CMS (Das Interface)
In `keystatic.config.ts` ist definiert, wie das Formular aussieht:

```typescript
// Auszug aus keystatic.config.ts
references: collection({
    label: 'Referenzen',
    path: 'content/references/*', // Hier landen die Dateien
    schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        client: fields.text({ label: 'Bauherr' }),
        image: fields.image({ label: 'Bild', ... }),
        // ...
    },
}),
```

Wenn Sie das Formular ausfüllen und speichern, passiert Schritt B.

### Schritt B: Im Dateisystem (Das Ergebnis)
Keystatic erstellt automatisch eine Datei: `content/references/neubau-musterfirma.md`.

```yaml
---
title: "Neubau Musterfirma"
client: "Muster AG"
image: "/images/references/neubau.jpg"
date: "2024-12-23"
---

Hier steht der Beschreibungstext, den Sie im Editor eingegeben haben.
```

### Schritt C: Im Code (Das Auslesen)
Unsere Datei `src/lib/cms.ts` ist das Herzstück. Sie liest diese Dateien ein.

```typescript
// Auszug aus src/lib/cms.ts
export function getAllReferences() {
    // 1. Suche Ordner "content/references"
    const dir = path.join(process.cwd(), "content", "references");
    
    // 2. Lese alle Dateien
    const files = fs.readdirSync(dir);

    // 3. Wandle Text in Daten um
    return files.map(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        const { data, content: body } = matter(content); // Parsing
        return { ...data, body }; // Fertiges Objekt für React
    });
}
```

### Schritt D: Im Frontend (Die Anzeige)
Die Seite `src/app/(site)/referenzen/page.tsx` holt sich die Daten und zeigt sie an.

```tsx
// Auszug aus src/app/(site)/referenzen/page.tsx
import { getAllReferences } from "@/lib/cms";

export default function ReferencesPage() {
    // Hier werden die Daten geladen (Server-Side)
    const refs = getAllReferences();

    return (
        <div>
            {refs.map(item => (
                <div key={item.slug}>
                    <h2>{item.title}</h2>
                    <p>Bauherr: {item.client}</p>
                    <img src={item.image} />
                </div>
            ))}
        </div>
    );
}
```

---

## 3. Konfiguration: Wie ändere ich etwas?

Alles wird in **2 Dateien** gesteuert.

### 1. `keystatic.config.ts` (Das CMS-Formular)
Hier definieren Sie, welche Felder es gibt.
*   Wollen Sie ein neues Feld "Architekt" bei Referenzen?
*   Fügen Sie es hier hinzu: `architect: fields.text({ label: 'Architekt' }),`

### 2. `src/lib/cms.ts` (Der Daten-Lader)
Hier müssen Sie meistens nichts ändern, außer Sie legen eine komplett neue "Collection" (z.B. "Produkte") an. Dann brauchen Sie eine neue Funktion `getAllProducts()`.

---

## 4. Checkliste für neue Features

Wenn Sie einen ganz neuen Bereich (z.B. "Dienstleistungen") bauen wollen:

1.  **Config:** In `keystatic.config.ts` eine `services` Collection anlegen.
2.  **Ordner:** Ordner `content/services` erstellen (wichtig, sonst Error!).
3.  **CMS:** In `src/lib/cms.ts` eine `getAllServices()` Funktion schreiben (kopieren Sie einfach `getAllReferences` und ändern Sie den Pfad).
4.  **Frontend:** Eine Seite `src/app/services/page.tsx` bauen, die `getAllServices()` aufruft.

Fertig! Das CMS füllt nun automatisch die neue Seite.

