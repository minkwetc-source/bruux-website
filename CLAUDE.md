# CLAUDE.md — BRUUX Website Project

> This is the project configuration file. Claude Code reads this FIRST at every session.
> Follow these rules strictly. Do not deviate.

---

## PROJECT IDENTITY

**Project:** BRUUX — Official website for a Gabonese creative collective
**URL target:** bruux.com (or similar, domain TBD)
**Audience:** Young creative Gabonese (18–35), 90% mobile users
**Language:** All user-facing content in French. All code comments in English.
**Purpose:** Dynamic platform — events calendar, real-time blog, photo gallery, team profiles, admin dashboard

---

## TECH STACK (MANDATORY)

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.x |
| Language | TypeScript | strict mode |
| Styling | Tailwind CSS | v4 |
| Scroll animations | GSAP + ScrollTrigger | latest |
| UI animations | Framer Motion | latest |
| Smooth scroll | Lenis | latest |
| Database | Supabase | latest |
| Auth | Supabase Auth | latest |
| Image CDN | Cloudinary | latest |
| Hosting | Vercel | free tier |

### Package Installation
```bash
npx create-next-app@14 bruux-website --typescript --tailwind --app --src-dir
cd bruux-website
npm install gsap @gsap/react framer-motion lenis @supabase/supabase-js
```

---

## PROJECT STRUCTURE

```
bruux-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with fonts, metadata, Lenis provider
│   │   ├── page.tsx                # Homepage (one-page scrollable)
│   │   ├── evenements/
│   │   │   ├── page.tsx            # Events calendar page
│   │   │   └── [slug]/page.tsx     # Individual event detail
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing
│   │   │   └── [slug]/page.tsx     # Individual article
│   │   ├── galerie/
│   │   │   └── page.tsx            # Photo gallery
│   │   ├── famille/
│   │   │   └── page.tsx            # Team profiles (#BRUXFAMILLY)
│   │   ├── contact/
│   │   │   └── page.tsx            # Contact page
│   │   └── admin/
│   │       ├── layout.tsx          # Admin layout with auth guard
│   │       ├── page.tsx            # Admin dashboard
│   │       ├── evenements/page.tsx # Manage events
│   │       ├── blog/page.tsx       # Manage articles
│   │       ├── galerie/page.tsx    # Manage photos
│   │       └── famille/page.tsx    # Manage team members
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   └── SmoothScroll.tsx    # Lenis wrapper
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Universes.tsx
│   │   │   ├── NextEvent.tsx
│   │   │   ├── GalleryQuick.tsx
│   │   │   └── Testimonials.tsx
│   │   ├── events/
│   │   │   ├── Calendar.tsx
│   │   │   ├── EventCard.tsx
│   │   │   └── EventModal.tsx
│   │   ├── blog/
│   │   │   ├── ArticleCard.tsx
│   │   │   └── ArticleContent.tsx
│   │   ├── gallery/
│   │   │   ├── MasonryGrid.tsx
│   │   │   ├── Lightbox.tsx
│   │   │   └── SessionCarousel.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── CursorFollower.tsx
│   │   └── animations/
│   │       ├── ScrollReveal.tsx    # Reusable GSAP scroll-triggered wrapper
│   │       ├── TextSplit.tsx       # Letter/word split animation
│   │       ├── Parallax.tsx        # Parallax wrapper
│   │       ├── PinSection.tsx      # GSAP pin section wrapper
│   │       ├── HorizontalScroll.tsx
│   │       └── CounterAnimation.tsx
│   ├── hooks/
│   │   ├── useGSAP.ts             # Custom GSAP hook with cleanup
│   │   ├── useLenis.ts            # Lenis scroll hook
│   │   ├── useSupabase.ts         # Supabase client hook
│   │   └── useMediaQuery.ts       # Responsive breakpoint hook
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts          # Supabase browser client
│   │   │   ├── server.ts          # Supabase server client
│   │   │   └── types.ts           # Generated database types
│   │   ├── cloudinary.ts          # Cloudinary URL builder
│   │   └── utils.ts               # Shared utilities
│   └── styles/
│       └── globals.css             # Tailwind config + custom properties
├── public/
│   ├── fonts/                      # Self-hosted Bebas Neue, Inter, DM Sans
│   ├── images/                     # Static images (logo SVG, icons)
│   └── frames/                     # Kling extracted frames (Phase 2)
├── docs/
│   ├── INFOS-BRUUX.md              # ← Brand info filled by Liv
│   └── PLAN-SITE-BRUUX.md          # ← Full site plan
├── assets/
│   ├── images/                     # BRUUX photos organized by category
│   ├── screenshots/                # Reference site screenshots for visual direction
│   └── kling-frames/               # Kling video files (Phase 2)
├── DESIGN.md                       # ← MANDATORY: read before any UI work
└── .env.local                      # Supabase + Cloudinary keys (NEVER commit)
```

---

## CRITICAL FILES TO READ

Before writing ANY code, Claude Code MUST read these files:

1. **DESIGN.md** — For ALL visual decisions (colors, fonts, spacing, animations, anti-patterns)
2. **docs/INFOS-BRUUX.md** — For brand copy, team info, event names, social links
3. **src/styles/globals.css** — To check existing CSS custom properties
4. **tailwind.config.ts** — To check existing theme extensions

---

## CODE RULES

### General
- Use **Server Components by default**. Only add `"use client"` when the component needs interactivity (hooks, event handlers, browser APIs).
- TypeScript strict mode. No `any` types. Define interfaces for all props and data.
- All files use `.tsx` extension for components, `.ts` for utilities.
- Use `import` aliases: `@/components/...`, `@/lib/...`, `@/hooks/...`

### Styling
- Tailwind CSS utility classes for all styling. NO inline styles. NO separate CSS modules.
- Extend Tailwind config with BRUUX design tokens (colors, fonts, spacing from DESIGN.md).
- Custom CSS only in `globals.css` for things Tailwind can't do (custom scrollbar, GSAP-specific styles).

### Animations
- GSAP animations go in custom hooks or in the `/components/animations/` wrappers.
- ALWAYS clean up GSAP animations in `useEffect` cleanup or `useGSAP` hook.
- Framer Motion for component-level animations (hover, mount/unmount, layout).
- GSAP ScrollTrigger for scroll-driven animations (parallax, pin, reveal).
- NEVER mix GSAP and Framer Motion on the same element.

### Data
- Supabase for all dynamic content (events, blog posts, gallery, team members).
- Use Server Components + Supabase server client for initial data fetch.
- Use client-side Supabase only for real-time subscriptions and mutations (admin).
- All Supabase queries in `/lib/supabase/` — never inline in components.

### Images
- All images served via Cloudinary URL transforms (auto format, auto quality, responsive sizes).
- Use Next.js `<Image>` component with Cloudinary loader.
- Always provide `alt` text in French.
- Hero images: priority loading. Everything else: lazy loading.

### SEO
- Every page has its own `metadata` export (title, description, Open Graph).
- All metadata in French.
- Schema.org markup for events (Google Events integration).
- Optimized for: "événements Libreville", "soirées Gabon", "BRUUX événements"

---

## FORBIDDEN — NEVER DO THIS

1. **NEVER use `"use client"` on every component** — Server Components are the default
2. **NEVER use inline styles** — Tailwind only
3. **NEVER use `var()` CSS variables without defining them** — Check globals.css first
4. **NEVER use Lorem Ipsum** — Use real BRUUX content from INFOS-BRUUX.md or realistic French placeholder
5. **NEVER use placeholder images from unsplash/picsum** — Use solid color blocks with text label until real photos are added
6. **NEVER import Google Fonts via `<link>` tag** — Self-host in `/public/fonts/` and use `next/font/local`
7. **NEVER use `setTimeout` for animations** — Use GSAP timelines or Framer Motion
8. **NEVER skip GSAP cleanup** — Memory leaks will crash mobile browsers
9. **NEVER commit `.env.local`** — Supabase and Cloudinary keys stay local
10. **NEVER add a light mode toggle** — This site is dark mode ONLY
11. **NEVER use `console.log` in production code** — Remove all debug logs
12. **NEVER create components with more than 200 lines** — Split into smaller components

---

## SUPABASE DATABASE SCHEMA

```sql
-- Events
create table events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  description text,
  date timestamptz not null,
  end_date timestamptz,
  location text,
  type text check (type in ('night-class', 'pool-party', 'soiree-speciale')),
  image_url text,
  price text,
  status text default 'upcoming' check (status in ('upcoming', 'sold-out', 'completed')),
  whatsapp_link text,
  created_at timestamptz default now()
);

-- Blog articles
create table articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  cover_image text,
  category text check (category in ('vlogs', 'courts-metrages', 'jeux-soirees', 'backstage', 'lifestyle', 'special')),
  author text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- Gallery photos
create table photos (
  id uuid default gen_random_uuid() primary key,
  title text,
  image_url text not null,
  category text check (category in ('sessions', 'evenements', 'brux-house', 'portraits')),
  session_name text,
  session_date date,
  created_at timestamptz default now()
);

-- Family members
create table members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text,
  section text check (section in ('direction', 'division-artistique', 'mannequins', 'influenceurs', 'section-a')),
  photo_url text,
  instagram text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- Newsletter subscribers
create table subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  subscribed_at timestamptz default now()
);
```

---

## DEPLOYMENT

- **Platform:** Vercel (free tier)
- **Branch:** `main` auto-deploys to production
- **Environment variables:** Set in Vercel dashboard (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, CLOUDINARY_CLOUD_NAME)
- **Domain:** Configure custom domain in Vercel settings when ready

---

*CLAUDE.md — BRUUX Website Project Configuration*
*Created for use with Claude Code CLI*
