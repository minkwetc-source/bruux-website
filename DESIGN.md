# DESIGN SYSTEM — BRUUX.

> This file is the single source of truth for all visual decisions on the BRUUX website.
> Claude Code MUST read this file before generating any UI component, page, or layout.
> Every color, font size, spacing value, and animation timing defined here is MANDATORY.

---

## 1. BRAND IDENTITY

BRUUX is a creative collective based in Libreville, Gabon. Events, content creation, modeling, community.
The brand is **bold, dark, premium, unapologetic**. Think Boiler Room meets luxury streetwear.

**Logo:** Geometric sans-serif "BRUUX." with a circle motif and dot. Black and white only.
**Tone:** Confident, youthful, Gabonese energy. Never corporate, never generic.

**Reference sites (steal from these):**
- **Boiler Room** (boilerroom.tv) → community-first dark layout, content grid
- **Lusion** (lusion.co) → scroll animation level, cinematic transitions, cursor follower
- **Dennis Snellenberg** (dennissnellenberg.com) → oversized bold typography, smooth scroll, text animations
- **Montreux Jazz Festival** (montreuxjazzfestival.com) → event calendar structure, immersive festival energy

---

## 2. COLOR PALETTE — OPTION A: MONOCHROME + GOLD

**Approved by Simon on 2026-04-21.**

### Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0A0A0A` | Page background. NEVER use pure `#000000`. |
| `--bg-surface` | `#141414` | Cards, modals, elevated sections. |
| `--bg-elevated` | `#1A1A1A` | Hover states on cards, active elements. |

### Borders & Separators
| Token | Hex | Usage |
|-------|-----|-------|
| `--border-subtle` | `rgba(255,255,255,0.06)` | Default card borders, section dividers. |
| `--border-medium` | `rgba(255,255,255,0.12)` | Input fields, hover borders. |
| `--border-strong` | `#1E1E1E` | Hard dividers between major sections. |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#FFFFFF` | Headings, important text. |
| `--text-secondary` | `#888888` | Body text, descriptions, labels. |
| `--text-tertiary` | `#555555` | Placeholders, disabled states, captions. |
| `--text-muted` | `#333333` | Extremely subtle text, watermarks. |

### Accent — BRUUX Gold
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#C4A35A` | Primary CTAs, event dates, highlights, links on hover. |
| `--accent-hover` | `#D4B86A` | Hover state for gold elements. |
| `--accent-subtle` | `rgba(196,163,90,0.12)` | Gold glow backgrounds, subtle badges. |
| `--accent-border` | `rgba(196,163,90,0.3)` | Gold border for highlighted cards. |

### Gradients
- **Gold fade:** `linear-gradient(90deg, #0a0a0a, #c4a35a, #0a0a0a)` — horizontal divider accent
- **Hero glow:** `radial-gradient(circle, rgba(196,163,90,0.08) 0%, transparent 70%)` — subtle background glow
- **Card hover:** `linear-gradient(135deg, #141414, #1a1a1a)` — subtle depth on hover

### EXCEPTION: bruxsessionpick Frame Colors
The gallery "bruxsessionpick" section uses colored photo borders (8px) that reference the brand's signature photo frame colors. These are the ONLY non-palette colors allowed on the site:
- `#8B6914` (warm brown/bronze)
- `#1a3a2a` (dark forest green)
- `#4a5568` (slate gray-blue)
These may ONLY be used as border-color on bruxsessionpick gallery images. Nowhere else.

### NEVER USE
- Pure black `#000000` as background
- Any color outside this palette (no blue, no green, no red) — except bruxsessionpick frame colors above
- Neon glows, rainbow gradients, or saturated shadows
- White backgrounds anywhere
- Opacity below 0.04 for borders (invisible = useless)

---

## 3. TYPOGRAPHY

### Font Stack
| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| **Headings** | Bebas Neue | 400 (only weight) | Impact, sans-serif |
| **Body** | Inter | 300–700 | system-ui, sans-serif |
| **UI / Labels** | DM Sans | 400–700 | sans-serif |

### NEVER USE
- Roboto, Arial, Helvetica, Times New Roman
- Any serif font
- Google Fonts that are not variable fonts (performance)
- Font weights below 300 (too thin on dark backgrounds)

### Type Scale (Desktop)
| Element | Font | Size | Weight | Letter-spacing | Line-height |
|---------|------|------|--------|---------------|-------------|
| Hero title | Bebas Neue | 80–120px | 400 | 8–12px | 1.0 |
| Section title | Bebas Neue | 48–64px | 400 | 4–6px | 1.0 |
| Card title | Bebas Neue | 28–36px | 400 | 2–3px | 1.1 |
| Subtitle / Label | Inter or DM Sans | 12–14px | 600 | 2–4px | 1.4 |
| Body text | Inter | 14–16px | 400 | 0–0.5px | 1.7 |
| Small / Caption | DM Sans | 11–12px | 500 | 1–2px | 1.5 |
| Nav links | Inter | 13px | 500 | 2px | 1.0 |
| Button text | Inter | 12–13px | 600 | 2px | 1.0 |

### Type Scale (Mobile)
- Hero title: 48–60px
- Section title: 32–40px
- Card title: 24–28px
- Body: 14–15px
- Everything else scales down proportionally

### Text Transform Rules
- ALL headings (Bebas Neue): `text-transform: uppercase`
- Labels, badges, nav links, buttons: `text-transform: uppercase`
- Body text, descriptions: normal case
- NEVER use `text-transform: capitalize` — it looks cheap

---

## 4. SPACING SYSTEM

Use a **4px base grid**. All spacing values must be multiples of 4.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tiny gaps, icon padding |
| `--space-sm` | 8px | Between label and input, tight gaps |
| `--space-md` | 16px | Card internal padding, between related elements |
| `--space-lg` | 24px | Between cards in a grid, section internal gaps |
| `--space-xl` | 32px | Card padding, between sections content |
| `--space-2xl` | 48px | Between major page sections |
| `--space-3xl` | 64px | Large section padding (desktop) |
| `--space-4xl` | 80–120px | Hero padding, between major page zones |

### Section Padding
- Desktop: `80px–120px` vertical padding per section
- Mobile: `48px–64px` vertical padding per section
- Max content width: `1280px` centered
- Side padding: `24px` mobile, `40px` tablet, `80px` desktop

---

## 5. COMPONENTS

### Buttons
```
Primary (gold):    bg #C4A35A, text #0A0A0A, padding 14px 32px, uppercase, tracking 2px, font-weight 600
Outline:           bg transparent, border 1px rgba(255,255,255,0.3), text #FFF, same padding
White:             bg #FFFFFF, text #0A0A0A, same padding
Ghost:             bg transparent, text #888, no border, underline on hover
```
- Border radius: `0px` (sharp edges, not rounded — this is BRUUX, not a SaaS)
- Hover: subtle scale(1.02) + brightness shift, NOT color change
- NEVER use rounded buttons (border-radius > 4px)

### Cards
- Background: `--bg-surface` (#141414)
- Border: `1px solid rgba(255,255,255,0.06)`
- Border radius: `12px`
- Padding: `24px–32px`
- Hover: border shifts to `rgba(255,255,255,0.12)`, subtle translateY(-2px)
- Image containers inside cards: `border-radius: 8px`, overflow hidden

### Event Cards
- Image top (aspect-ratio 16/9 or fixed height 160–200px)
- Date in gold accent, uppercase, letterspaced
- Title in Bebas Neue
- Description in secondary text
- CTA link in gold with bottom border

### Navigation
- Fixed top, transparent by default
- On scroll: background fades to `rgba(10,10,10,0.95)` with `backdrop-filter: blur(20px)`
- Logo left (Bebas Neue, 28px, tracking 4px)
- Links center (uppercase, 13px, tracking 2px, secondary color, white on active)
- CTA button right (gold primary button)
- Mobile: hamburger menu, full-screen overlay with stagger animation

### Footer
- Full width, `--bg-surface` background
- Logo centered or left, large
- Social links with hover animations (scale + gold color shift)
- Newsletter input: dark input field, gold submit button
- Copyright in muted text

---

## 6. ANIMATIONS

### Global
- **Smooth scroll:** Lenis library, MANDATORY on all pages
- **Easing:** `power3.out` for reveals, `power2.inOut` for transitions, `elastic.out(1, 0.5)` for bouncy elements
- **Duration:** 0.8–1.2s for scroll reveals, 0.3–0.5s for hover/UI, 1.5–2s for hero animations
- **Stagger:** 0.08–0.15s between elements in a list/grid

### Scroll-Triggered (GSAP ScrollTrigger)
| Animation | Where | Config |
|-----------|-------|--------|
| Fade up + slide | All section content on first appear | `y: 60, opacity: 0 → y: 0, opacity: 1`, duration 1s, stagger 0.1s |
| Parallax multilayer | Hero, about section images | Different scroll speeds per layer (0.5x, 0.8x, 1.2x) |
| Pin section | About, Next Event | Section pins while content inside changes |
| Text split reveal | All Bebas Neue headings | Letter-by-letter or word-by-word, stagger 0.03s per char |
| Horizontal scroll | Gallery quick section | Container scrolls horizontally while user scrolls vertically |
| Counter animation | Stats (events count, members, cities) | Numbers count up from 0 when scrolled into view |
| Image reveal mask | Brux House universe card | clipPath or mask reveals image on scroll |

### UI Animations (Framer Motion)
| Animation | Where | Config |
|-----------|-------|--------|
| Page transitions | Between all pages | Fade + slide, 0.5s, exit before enter |
| Hover scale | Cards, buttons | scale(1.02–1.05), duration 0.3s |
| 3D tilt | Universe cards, gallery hover | Subtle perspective tilt following cursor |
| Cursor follower | Entire site (desktop only) | Magnetic effect on buttons and links |
| Modal open | Event details, lightbox | Scale from 0.95 + fade, spring physics |
| Menu open | Mobile navigation | Full-screen overlay, links stagger in |

### Loading Screen
- Black background with BRUUX. logo centered
- Logo draws in or fades in with subtle gold glow
- Duration: 1.5–2s max, then smooth transition to hero
- Only on first page load, not on navigation

### Kling Frame Sequences (Phase 2)
- Hero: scroll-driven frame animation between 3-4 BRUUX photos
- Section transitions: Kling-generated video frames displayed on scroll
- Replace simple crossfades on mobile for performance

### Performance Rules
- NEVER animate `width`, `height`, `top`, `left` — only `transform` and `opacity`
- Use `will-change: transform` sparingly (only on elements that will animate)
- Disable complex animations on mobile if FPS drops below 30
- Prefer CSS transforms over GSAP for simple hovers
- Lazy load all images below the fold
- Kling frame sequences: preload first 10 frames, lazy load rest

### NEVER DO
- Bounce animations (looks amateur)
- Rotate animations on text (unreadable)
- Rainbow or color-cycling effects
- Animations longer than 2s (except loading screen)
- Auto-playing video with sound
- Animations that block scroll or interaction

---

## 7. RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | 1 column, bottom nav, simplified animations |
| Tablet | 768–1024px | 2 columns, hamburger menu |
| Desktop | 1025–1440px | Full layout, all animations |
| Large | > 1440px | Max-width 1280px centered, larger spacing |

### Mobile-Specific Rules
- 90% of Gabonese users are on mobile — THIS IS PRIORITY
- Replace horizontal scroll with vertical stacked cards
- Replace Kling frame sequences with simple crossfades
- Reduce parallax intensity by 50%
- Disable cursor follower and 3D tilt
- Floating WhatsApp button: bottom-right, always visible, pulse animation
- Touch targets: minimum 44x44px
- Font sizes: see mobile type scale above

---

## 8. IMAGE GUIDELINES

- All images: Cloudinary for optimization and CDN delivery
- Format: WebP with JPEG fallback
- Hero images: 1920x1080 minimum
- Card images: 800x450 (16:9 ratio)
- Gallery images: multiple sizes via Cloudinary transforms
- Profile photos: square, 400x400 minimum
- BRUUX logo: SVG only, never rasterized
- Alt text: descriptive, in French

### Image Treatment
- Default: slight desaturation (filter: saturate(0.9)) for cohesive dark look
- Hover: full saturation + subtle brightness boost
- Never use stock photos — BRUUX real photos only
- Never add colored overlays on photos (let the photos breathe)

---

## 9. ANTI-PATTERNS — WHAT NEVER TO DO

These are the "slop" patterns that make a site look AI-generated and generic:

1. **No symmetric 3-column grids** — Use asymmetric layouts, varied card sizes, overlapping elements
2. **No generic hero with centered text over stock image** — Hero must have Kling animation or dramatic photo treatment
3. **No rounded pill buttons** — Sharp edges only (border-radius 0)
4. **No light mode** — This site is dark mode ONLY, no toggle
5. **No generic card shadows** — Use border + subtle elevation, not box-shadow
6. **No emoji in UI** — Text and icons only (Lucide icons if needed)
7. **No cookie-cutter testimonial carousels** — Use creative quote treatment
8. **No generic loading spinners** — Custom BRUUX logo animation only
9. **No default scrollbar** — Custom thin scrollbar or hide it
10. **No form fields with visible borders on white background** — Dark inputs, subtle borders
11. **No Comic Sans, Papyrus, or any "fun" fonts** — Bebas Neue + Inter + DM Sans ONLY
12. **No gradient text** — Solid white or gold only
13. **No hover effects that just change background color** — Use transform + opacity shifts

---

## 10. DARK THEME RULES

Since the entire site is dark:
- Text contrast ratio: minimum 4.5:1 against background (WCAG AA)
- `#FFFFFF` on `#0A0A0A` = 19.3:1 ✓
- `#888888` on `#0A0A0A` = 5.1:1 ✓
- `#C4A35A` on `#0A0A0A` = 7.2:1 ✓
- `#555555` on `#0A0A0A` = 3.1:1 — use only for decorative/non-essential text
- Images need subtle vignette or gradient overlay at edges to blend with dark background
- Avoid pure white (#FFF) on large surfaces — it's blinding on dark theme. Use for text only.

---

*DESIGN.md — BRUUX. Website Design System*
*Option A: Monochrome + Gold — Approved by Simon (2026-04-21)*
*Reference: Boiler Room · Lusion · Dennis Snellenberg · Montreux Jazz Festival*
