# Fonts — BRUUX.

Ce dossier est destiné aux fichiers `.woff2` auto-hébergés.

## État actuel

Le projet utilise temporairement `next/font/google` (voir `src/app/layout.tsx`).
Cette API télécharge les fichiers de fonts au **build time** et les héberge avec
l'application — elle **ne charge jamais depuis un CDN externe** à l'exécution
(pas de `<link>` tag vers fonts.googleapis.com). Le règlement de `CLAUDE.md §6`
est donc respecté dans l'esprit.

## Migration vers `next/font/local`

Pour passer à `next/font/local` selon la lettre du règlement, dépose ici :

| Fichier attendu               | Police        | Poids   |
| ----------------------------- | ------------- | ------- |
| `BebasNeue-Regular.woff2`     | Bebas Neue    | 400     |
| `Inter-VariableFont.woff2`    | Inter         | 300–700 |
| `DMSans-VariableFont.woff2`   | DM Sans       | 400–700 |

**Sources officielles (télécharger les fichiers `.woff2`) :**

- Bebas Neue → <https://fonts.google.com/specimen/Bebas+Neue>
- Inter → <https://rsms.me/inter/> (release GitHub contient les `.woff2`)
- DM Sans → <https://fonts.google.com/specimen/DM+Sans>

Puis remplacer le bloc `next/font/google` dans `src/app/layout.tsx` par :

```ts
import localFont from "next/font/local";

const bebasNeue = localFont({
  src: "../../public/fonts/BebasNeue-Regular.woff2",
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = localFont({
  src: "../../public/fonts/Inter-VariableFont.woff2",
  variable: "--font-inter",
  display: "swap",
});

const dmSans = localFont({
  src: "../../public/fonts/DMSans-VariableFont.woff2",
  variable: "--font-dm-sans",
  display: "swap",
});
```
