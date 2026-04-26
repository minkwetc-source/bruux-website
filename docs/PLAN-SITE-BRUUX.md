# PLAN COMPLET — SITE WEB BRUUX. (v3 — Option A Monochrome + Or)

---

## 1. VISION DU SITE

BRUUX n'est pas juste un site vitrine. C'est une **plateforme vivante** qui reflète l'énergie de la marque : événements, contenu lifestyle, communauté, et la créativité gabonaise.

Le site doit être :
- **Dynamique** — calendrier modifiable, blog en temps réel, contenu qui bouge
- **Immersif** — design sombre, animations cinématiques au scroll, photos plein écran
- **Spectaculaire** — animations style Apple avec vos VRAIES photos (via Kling 3.0)
- **Facile à gérer** — l'équipe BRUUX peut modifier le contenu sans toucher au code
- **Mobile-first** — 90% du public gabonais navigue sur mobile

---

## 2. SITES DE RÉFÉRENCE

Ces 4 sites définissent le niveau de qualité et le style qu'on vise :

| Site | URL | Ce qu'on prend |
|------|-----|----------------|
| **Boiler Room** | boilerroom.tv | Structure contenu-first, dark theme radical, ambiance communautaire |
| **Lusion** | lusion.co | Niveau d'animation au scroll, transitions cinématiques, cursor follower |
| **Dennis Snellenberg** | dennissnellenberg.com | Typographie bold oversized, smooth scroll, animations de texte |
| **Montreux Jazz Festival** | montreuxjazzfestival.com | Structure calendrier/événements, mélange photos immersives + infos pratiques |

---

## 3. TECH STACK

| Élément | Technologie | Pourquoi |
|---------|------------|----------|
| **Frontend** | Next.js 14 (App Router) + TypeScript | Framework moderne, rapide, excellent SEO |
| **Style** | Tailwind CSS v4 | Design rapide et cohérent, parfait avec Claude Code |
| **Animations scroll** | GSAP + ScrollTrigger | Animations au scroll de niveau professionnel |
| **Animations UI** | Framer Motion | Transitions de page, hover effects, apparitions |
| **Smooth scroll** | Lenis | Scroll fluide et "beurré" sur tout le site |
| **Animations vidéo** | Kling 3.0 + extraction de frames | Animations cinématiques avec vos vraies photos (Temps 2) |
| **Génération d'images** | Nano Banana 2 (optionnel) | Éléments visuels complémentaires via Gemini |
| **Base de données** | Supabase (gratuit) | Calendrier, blog, galerie, membres |
| **Authentification** | Supabase Auth | Connexion admin pour modifier le contenu |
| **Images** | Cloudinary (gratuit) | Optimisation automatique des photos |
| **Hébergement** | Vercel (gratuit) | Déploiement automatique, rapide en Afrique |

---

## 4. SKILLS CLAUDE CODE (8 skills)

Ces skills donnent du contexte à Claude Code pour qu'il produise un meilleur résultat. Ils ne consomment PAS de crédits. Installation gratuite et instantanée.

| Catégorie | Skill | Ce qu'il fait |
|-----------|-------|---------------|
| **Essentiel** | Frontend Design (Anthropic) | Force Claude Code à choisir une direction esthétique avant de coder |
| **Essentiel** | Taste Skill (anti-slop) | Empêche le design générique et moche |
| **Essentiel** | Nano Banana 2 | Génération d'images via Google Gemini |
| **Animation** | Animation Design Skills (freshtechbro) | 23 skills pour GSAP, Framer Motion, Three.js, etc. |
| **Qualité** | Baseline UI | Corrige espacement, typographie, états des composants |
| **Qualité** | Fixing Motion/Performance | Accessibilité + performance des animations |
| **Qualité** | Web Asset Generator | Favicons, icônes d'app, images réseaux sociaux |
| **Contexte** | Context7 (MCP Server) | Récupère la doc à jour de tous les frameworks utilisés |

---

## 5. FICHIERS DE CONFIGURATION

Ces fichiers sont essentiels pour que Claude Code produise un résultat de qualité professionnelle :

| Fichier | Emplacement | Rôle |
|---------|-------------|------|
| **CLAUDE.md** | Racine du projet | Configuration projet : tech stack, structure, règles de code, interdictions. Claude Code le lit en premier. |
| **DESIGN.md** | Racine du projet | Design system complet : palette Option A, typographie, composants, animations, anti-patterns. Claude Code le consulte pour chaque décision visuelle. |
| **INFOS-BRUUX.md** | docs/ | Infos de la marque : réseaux sociaux, univers, hashtags, équipe. Claude Code y puise le contenu réel. **Template fourni : INFOS-BRUUX-TEMPLATE.md** |
| **Screenshots de référence** | assets/screenshots/ | Captures d'écran des 4 sites de référence pour montrer à Claude Code le style visuel qu'on veut. |

---

## 6. SYSTÈME D'ANIMATIONS

### Niveau 1 — Animations code avancées (GSAP + Framer Motion)
Ces animations sont faites en code pur, sans vidéo. Elles sont déjà très impressionnantes :

- **Parallax multicouche** : les images de fond bougent à des vitesses différentes au scroll, créant un effet de profondeur 3D
- **Scroll-triggered reveals** : les textes, images, et cartes apparaissent avec des animations cinématiques (slide + fade + scale) quand tu scrolles
- **Pin sections** : certaines sections restent "collées" à l'écran pendant que le contenu change (effet utilisé par Apple)
- **Text splitting** : les titres apparaissent lettre par lettre ou mot par mot (style Dennis Snellenberg)
- **Image sequence on scroll** : une série d'images qui change au scroll (comme un flipbook)
- **Horizontal scroll** : une section qui défile horizontalement pendant que tu scrolles verticalement (pour la galerie)
- **Cursor follower** : un élément qui suit le curseur avec un effet magnétique (style Lusion)
- **Smooth scroll** : le scroll de toute la page est fluide et "beurré" (avec Lenis)
- **3D tilt cards** : les cartes s'inclinent en 3D quand tu passes la souris dessus
- **Reveal mask** : les images se révèlent derrière un masque qui se déplace au scroll
- **Loading screen** : écran de chargement avec le logo BRUUX. animé + glow doré
- **Page transitions** : transitions cinématiques entre les pages (Framer Motion)

### Niveau 2 — Animations Kling (vraies photos BRUUX — Temps 2)
Ces animations utilisent vos vraies photos transformées en vidéos par Kling 3.0 :

**Comment ça marche :**
1. Tu choisis 2 vraies photos BRUUX (ex: portrait session → photo de groupe événement)
2. Tu les mets dans Kling 3.0 comme "start frame" et "end frame"
3. Kling génère une vidéo de transition fluide entre les 2 images (2-5 secondes)
4. Claude Code extrait chaque frame de la vidéo (30-60 images)
5. Ces frames sont affichées une par une au scroll → animation cinématique

**Où utiliser les animations Kling sur le site :**
- **HERO** : transition entre 3-4 photos BRUUX emblématiques
- **Entre les sections** : transitions visuelles spectaculaires
- **Page "Nos Univers"** : transition entre les 3 univers (Event → House → Artistique)

**Photos à préparer pour Kling :**
| Animation | Photo départ | Photo fin |
|-----------|-------------|-----------|
| Hero intro | Logo BRUUX sur fond noir | Photo de groupe événement |
| Transition Event | Photo soirée Night Class | Photo Pool Party |
| Transition House | Photo lifestyle canapé | Photo backstage tournage |
| Transition Artistique | Portrait bruxsessionpick | Photo mannequin en mouvement |

---

## 7. DESIGN & IDENTITÉ VISUELLE — OPTION A MONOCHROME + OR

**Palette validée par Simon le 21/04/2026.**

Pour le détail complet, voir **DESIGN.md**. Voici le résumé :

### Palette de couleurs
| Rôle | Couleur | Code |
|------|---------|------|
| Fond principal | Noir profond | `#0A0A0A` |
| Fond cartes/sections | Noir élevé | `#141414` |
| Bordures | Gris sombre | `#1E1E1E` |
| Texte principal | Blanc pur | `#FFFFFF` |
| Texte secondaire | Gris moyen | `#888888` |
| **Accent unique** | **Or BRUUX** | **`#C4A35A`** |
| Accent hover | Or clair | `#D4B86A` |

**Une seule couleur d'accent (or doré)** — pas de bleu, pas de vert, pas de rouge. Tout le site est en noir/blanc/gris avec des touches d'or pour les éléments importants (boutons, dates, badges, liens).

### Typographies
| Rôle | Police | Utilisation |
|------|--------|-------------|
| **Titres** | Bebas Neue | Tous les titres, uppercase, très grand (80-120px hero, 48-64px sections) |
| **Corps** | Inter | Texte courant, descriptions, paragraphes |
| **UI / Labels** | DM Sans | Boutons, badges, labels, navigation |

**Interdits :** Roboto, Arial, Helvetica, Montserrat, toute police serif.

### Boutons
- Bords **droits** (border-radius 0) — pas de boutons arrondis
- Primary : fond or #C4A35A, texte noir
- Outline : bordure blanche fine, fond transparent
- White : fond blanc, texte noir

### Responsive
- **Desktop** : grille 3 colonnes, grandes photos, navigation horizontale, toutes les animations
- **Tablette** : grille 2 colonnes, menu hamburger
- **Mobile** : 1 colonne, bouton WhatsApp flottant, animations simplifiées
- **Note** : les animations Kling sont remplacées par des crossfades simples sur mobile (performance)

---

## 8. STRUCTURE DU SITE — PAGES ET SECTIONS

### PAGE 1 : ACCUEIL (One-page scrollable)

#### Section HERO ★ ANIMATION KLING (Temps 2)
- Plein écran (100vh)
- Fond noir avec glow doré subtil (radial gradient rgba(196,163,90,0.08))
- **Temps 1 :** Image de fond avec parallax GSAP + overlay gradient noir
- **Temps 2 :** Animation Kling au scroll (séquence de frames entre vos meilleures photos)
- Logo BRUUX. qui apparaît avec animation fade-in + scale
- Tagline : *"Créativité. Événement. Famille."* — apparition mot par mot (TextSplit)
- **Smooth scroll** avec Lenis sur toute la page
- Menu de navigation fixe en haut (transparent → noir au scroll, animation GSAP)

#### Section À PROPOS ★ ANIMATION GSAP
- Fond #141414
- Layout 2 colonnes : texte à gauche (ScrollReveal), photo à droite (Parallax)
- Label "QUI SOMMES-NOUS" en or #C4A35A
- Titre "Une nouvelle culture gabonaise" en Bebas Neue
- Compteurs animés : événements, membres, villes

#### Section NOS UNIVERS ★ ANIMATION GSAP
3 cartes interactives avec **3D tilt effect** au hover :

**BRUX EVENT** — Label or, Night Class · Pool Party · Soirées → /evenements
**BRUX HOUSE** — Label or, Vlogs · Courts-métrages · Backstage → /blog
**DIVISION ARTISTIQUE** — Label or, Mannequinat · Photo · Direction artistique → /galerie

#### Section PROCHAIN ÉVÉNEMENT ★ PIN SECTION
- **Pin section** avec countdown timer géant (Bebas Neue)
- Badge or "PROCHAIN ÉVÉNEMENT"
- Bouton or "Réserver ma place" avec effet magnétique
- Se met à jour automatiquement depuis Supabase

#### Section GALERIE RAPIDE ★ HORIZONTAL SCROLL
- **Horizontal scroll** : les photos défilent horizontalement pendant le scroll vertical
- Au hover : zoom + brightness shift
- Bouton or "Voir toute la galerie"

#### FOOTER
- Logo BRUUX avec animation au hover
- Liens réseaux sociaux avec hover or
- Newsletter : input sombre + bouton or "S'inscrire"
- Copyright

---

### PAGE 2 : ÉVÉNEMENTS (/evenements)

#### Calendrier Dynamique
- **Vue calendrier mensuel** — design dark, points or sur les jours avec événement
- Au clic → modal avec détails + bouton WhatsApp
- **Filtres** : Night Class, Pool Party, Soirée spéciale
- **Vue liste** alternative pour mobile
- Événements stockés dans **Supabase** → modifiables depuis le dashboard admin
- **Animation GSAP** : le calendrier se construit case par case

#### Événements à venir
- Grandes cartes mises en avant, dates en or, countdown, bouton or "Réserver"

#### Événements passés
- Cartes plus petites, badge "TERMINÉ" grisé, stagger animation

---

### PAGE 3 : BLOG / BRUX HOUSE (/blog)

#### Blog en temps réel
- Articles créés et modifiés depuis le **dashboard admin** (Supabase)
- Catégories : Vlogs, Courts-métrages, Jeux & Soirées, Backstage, Lifestyle, Spécial
- Filtres en chips avec état actif en or
- Article à la une en grand format
- Grille de cartes avec badge catégorie or, ScrollReveal stagger

#### Chaque article contient :
- Photo de couverture plein écran avec **parallax**
- Badge catégorie or + date + auteur
- Titre en Bebas Neue avec TextSplit animation
- Contenu markdown rendu en HTML
- Vidéos YouTube/TikTok intégrées
- Boutons de partage (WhatsApp, copier le lien)
- Section "Articles similaires"

---

### PAGE 4 : GALERIE (/galerie)

#### Galerie photo style Pinterest ★ ANIMATION GSAP
- Grille Masonry avec **stagger reveal** au scroll
- Filtres : Sessions, Événements, Brux House, Portraits (état actif or)
- Au clic → lightbox plein écran
- Lazy loading

#### Sessions bruxsessionpick
- Section dédiée avec les cadres colorés (marron #8B6914, vert foncé #1a3a2a, gris-bleu #4a5568)
- **Horizontal scroll** pour parcourir les sessions

---

### PAGE 5 : LA FAMILLE (/famille)

#### #BRUXFAMILLY ★ ANIMATION GSAP
- Titre "#BRUXFAMILLY" en Bebas Neue très grand
- Grille de profils avec **stagger reveal**
- Chaque profil : photo ronde + nom + rôle + lien Instagram
- Au hover : scale + glow or subtil
- Sections : Direction, Division Artistique, Mannequins, Influenceurs, Section A

#### Rejoindre la famille
- Formulaire avec labels flottants, inputs sombres
- Bouton or "Envoyer ma candidature"
- Les candidatures arrivent dans Supabase

---

### PAGE 6 : CONTACT (/contact)

- 2 colonnes (formulaire + infos)
- Formulaire avec labels flottants, inputs sombres, bouton or "Envoyer"
- WhatsApp, Instagram, TikTok avec icônes et hover or
- Map Google Maps de Libreville (style dark)

---

## 9. DASHBOARD ADMIN

Espace protégé par mot de passe (Supabase Auth) où l'équipe BRUUX peut :

- **Événements** : créer, modifier, supprimer, marquer comme terminé
- **Blog** : écrire des articles avec éditeur markdown, publier/brouillon
- **Galerie** : ajouter/supprimer des photos, organiser par catégorie
- **Membres** : ajouter/modifier les profils de la famille BRUUX

Design dark fonctionnel, sidebar avec navigation, stats sur le dashboard principal.

---

## 10. FONCTIONNALITÉS SPÉCIALES

- **Bouton WhatsApp flottant** : toujours visible, pulse animation, message pré-rempli. Essentiel au Gabon.
- **Newsletter** : inscription email depuis le footer
- **SEO Gabon** : balises optimisées pour "événements Libreville", "soirées Gabon", Schema.org pour Google Events
- **Analytics** : Google Analytics ou Plausible
- **Cursor follower** : effet magnétique sur desktop (style Lusion)
- **Loading screen** : logo BRUUX. animé avec glow or au premier chargement

---

## 11. PLAN D'EXÉCUTION EN 2 TEMPS

### ⚡ TEMPS 1 — Le site complet avec animations code
Le site est déjà magnifique avec GSAP + Framer Motion + Lenis + palette monochrome + or.
Durée : ~3-4 heures avec Claude Code (8-10 prompts).

### 🎬 TEMPS 2 — Ajouter les animations Kling
Quand le site de base est prêt, tu crées les vidéos dans Kling 3.0 et tu les intègres.
Durée : ~30 minutes avec Claude Code (1 prompt) + temps de génération Kling.

Voir le fichier **TUTO-CLAUDE-CODE-BRUUX.md** pour les prompts détaillés de chaque étape.

---

## 12. BUDGET ESTIMÉ

| Élément | Coût |
|---------|------|
| Next.js + Tailwind + GSAP + Framer Motion + Lenis | Gratuit |
| Supabase (free tier) | Gratuit |
| Vercel (free tier) | Gratuit |
| Cloudinary (free tier) | Gratuit |
| Kling 3.0 (free tier : 66 crédits/jour) | Gratuit |
| Skills Claude Code (8 skills) | Gratuit |
| Nano Banana 2 (~0.04€/image) | ~2-5€ total |
| Domaine (.com) | ~12€/an |
| **TOTAL** | **~15-17€** pour tout |

Le site est quasi gratuit à faire tourner. C'est un argument de vente massif pour Simon et Henri.

---

*Plan v3 — Projet site BRUUX (Option A Monochrome + Or)*
*Palette validée par Simon le 21/04/2026*
*À utiliser avec Claude Code + les fichiers CLAUDE.md, DESIGN.md, INFOS-BRUUX.md*
