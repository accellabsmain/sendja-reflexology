# Sendja Spa — Design System

## Overview

Sendja Spa is a premium, high-end wellness and sensory relaxation sanctuary — and the digital surface must immediately evoke the feeling of stepping from a chaotic, sunlit city into a cool, dim, aromatic treatment room. The brand pairs a deep volcanic-obsidian canvas `{colors.canvas}` (`#0D0C0F`) with warm ivory text `{colors.text-main}` (`#F4F1EA`) and a single, sophisticated sunset-copper primary accent `{colors.primary}` (`#D96B43`). The warmth in the dark tones — slightly charcoal-brown rather than pure, cold `#000000` — is the brand's defining architectural signature.

Typography carries the brand's dual personality: modern efficiency meets timeless elegance. The display face, `Marcellus`, brings an editorial, Roman-serif sophistication to hero headlines at weight 400. For everything else — sub-headings, UI labels, descriptions, and buttons — the brand relies on `Manrope`, a geometric yet warm sans-serif. This pairing creates a "luxury editorial magazine meets modern digital product" aesthetic.

Cards and surfaces utilize subtle border highlights (`1px solid rgba(244, 241, 234, 0.08)`) and gentle elevation tints rather than heavy drop shadows. Border radiuses sit at `{rounded.md}` 12px for standard cards and `{rounded.sm}` 6px for buttons and interactive elements — structured, intentional, and architectural, avoiding overly playful pill shapes.

**Key Characteristics:**
- A single primary CTA color `{colors.primary}` (`#D96B43`) — sunset copper. Sophisticated, warm, and highly intentional.
- Deep obsidian canvas `{colors.canvas}` (`#0D0C0F`) — never pure black. The undertone carries a subtle warmth to mimic twilight (*senja*).
- Warm ivory text `{colors.text-main}` (`#F4F1EA`) — avoids the harsh eye-strain of pure white `#FFFFFF` on dark backgrounds.
- Editorial Two-Face Typography: `Marcellus` for luxury display moments, `Manrope` for modern UI precision and readability.
- Subtle glass and border-light elevation: Dark mode depth is achieved through lightness stepping and 8% opacity borders, not heavy shadows.
- Muted bronze and taupe neutral ladder — every supporting grey carries a warm earthy undertone (`#26242C`, `#5A5762`, `#9E9A8E`).

---

## Colors

### Brand & Accent
- **Sendja Copper** (`{colors.primary}` — `#D96B43`): The primary conversion and focal color. Used for primary booking CTAs, active states, and key architectural highlights.
- **Muted Gold** (`{colors.accent-gold}` — `#C5A059`): Secondary luxury accent. Used sparingly for VIP badges, member tier highlights, and decorative borders.

### Surface (Dark Mode Layering)
- **Canvas** (`{colors.canvas}` — `#0D0C0F`): Deep obsidian. The default full-bleed page background.
- **Surface Level 1** (`{colors.surface-1}` — `#16141A`): Elevated dark surface for standard content cards and section containers.
- **Surface Level 2** (`{colors.surface-2}` — `#201D26`): High-elevation surface for modals, floating navigation, and interactive dropdowns.
- **Surface Glass** (`{colors.surface-glass}` — `rgba(22, 20, 26, 0.75)`): Translucent surface paired with background blur for floating elements.

### Text & Icons
- **Ivory Main** (`{colors.text-main}` — `#F4F1EA`): High-contrast warm off-white for headings and primary copy.
- **Taupe Mid** (`{colors.text-mid}` — `#B8B4AA`): Medium-emphasis text for body copy, treatment descriptions, and sub-titles.
- **Muted Earth** (`{colors.text-muted}` — `#76726A`): Low-emphasis text for timestamps, fine print, and inactive states.
- **On-Primary** (`{colors.on-primary}` — `#0D0C0F`): High-contrast dark text used inside the bright `{colors.primary}` buttons.

---

## Typography

### Font Family
Two typefaces structure the system:
1. **Marcellus** — A flared serif display typeface with classical elegance. Used exclusively for hero headlines and section titles at weight 400.
2. **Manrope** — A modern, geometric sans-serif with excellent legibility. Used for all UI controls, body copy, pricing, and navigation.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 56px | 400 | 64px | -0.02em | Hero headline (`Marcellus`). |
| `{typography.display-lg}` | 44px | 400 | 52px | -0.01em | Section titles (`Marcellus`). |
| `{typography.display-md}` | 32px | 400 | 40px | 0 | Card titles / Modal headers (`Marcellus`). |
| `{typography.sub-display}` | 24px | 500 | 32px | 0 | Room / Treatment category headers (`Manrope`). |
| `{typography.body-lg}` | 18px | 400 | 28px | 0 | Lead editorial paragraphs (`Manrope`). |
| `{typography.body-md}` | 16px | 400 | 26px | 0 | Default body / Treatment descriptions (`Manrope`). |
| `{typography.body-md-strong}`| 16px | 600 | 26px | 0 | Highlighted features / Price tags (`Manrope`). |
| `{typography.body-sm}` | 14px | 400 | 22px | 0 | Secondary body / Form inputs (`Manrope`). |
| `{typography.caption}` | 12px | 500 | 18px | +0.02em | Fine print / Metadata (`Manrope`). |
| `{typography.eyebrow}` | 12px | 600 | 16px | +0.15em | UPPERCASE section tracking labels (`Manrope`). |
| `{typography.button-md}` | 15px | 600 | 20px | +0.03em | Primary CTA labels (`Manrope`). |

### Principles
- **Marcellus is never bolded.** Classical serifs lose their elegance when forced into heavy weights; rely on size for hierarchy, keeping weight at 400.
- **Generous line heights for relaxation.** Body copy uses `1.6x` line height to give the text "room to breathe," mirroring the spa experience.
- **Wide tracking on eyebrows.** All uppercase eyebrow labels use `+0.15em` letter spacing for a premium, editorial look.

---

## Layout

### Spacing System
- **Base unit**: 4 px.
- **Tokens**: `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.2xl}` 32px · `{spacing.3xl}` 48px · `{spacing.4xl}` 64px · `{spacing.5xl}` 96px.
- **Section padding**: Luxury requires whitespace. Major layout bands use `{spacing.5xl}` 96px (desktop) and 64px (mobile) top/bottom.
- **Card interior**: Standard treatment cards use `{spacing.xl}` 24px padding.

### Grid & Container
- Maximum content width: `1200px` (centered with 24px mobile / 48px desktop gutters).
- Asymmetrical luxury grids: Hero sections often pair a 7-column imagery block with a 5-column typography block to create editorial tension.

### Responsive Strategy

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Single column; typography scales down by 20%; bottom floating CTA bar appears. |
| Tablet | 768–1023px | 2-up treatment grids; side-by-side booking summary. |
| Desktop | ≥ 1024px | Full 12-column grid; floating navigation island; expansive hover states. |

---

## Elevation & Depth (Dark Mode Strategy)

In dark mode, traditional drop shadows create muddy, dirty visuals. Depth is achieved through **Surface Lightness Stepping** and **Border Luminances**.

| Level | Token / Treatment | Use |
|---|---|---|
| Level 0 | `bg: {colors.canvas}` / No border | Base page background. |
| Level 1 | `bg: {colors.surface-1}` / Border: `1px solid rgba(244, 241, 234, 0.06)` | Standard cards (treatments, therapists, blog). |
| Level 2 | `bg: {colors.surface-2}` / Border: `1px solid rgba(244, 241, 234, 0.12)` + Subtle glow `box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5)` | Modals, booking overlays, floating navbar. |
| Level 3 (Active)| Border changes to `1px solid {colors.primary}` + `box-shadow: 0 0 20px -5px rgba(217, 107, 67, 0.3)` | Selected treatment card, active input focus. |

---

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed imagery, architectural section dividers. |
| `{rounded.sm}` | 6px | Buttons, input fields, small badges. Structured & modern. |
| `{rounded.md}` | 12px | Content cards, treatment selection boxes, pricing containers. |
| `{rounded.lg}` | 20px | Large modal dialogs, hero image containers. |
| `{rounded.full}` | 9999px | Avatar thumbnails, icon-only buttons. |

---

## Components

### Buttons

**`button-primary`** — The Sunset Copper booking CTA.
- Background: `{colors.primary}`, Text: `{colors.on-primary}` (dark obsidian for max contrast), Label: `{typography.button-md}`, Padding: `16px 28px`, Radius: `{rounded.sm}` 6px.
- Hover: Background lightens slightly (`#E27A53`), subtle copper ambient glow appears.

**`button-secondary`** — The sophisticated outline CTA.
- Background: `transparent`, Border: `1px solid rgba(244, 241, 234, 0.2)`, Text: `{colors.text-main}`, same padding and radius.
- Hover: Background fills with `rgba(244, 241, 234, 0.05)`, border changes to `{colors.text-main}`.

**`button-ghost`** — Text-only action for secondary links.
- Background: `transparent`, Text: `{colors.primary}`, Typography: `{typography.button-md}`, Padding: `8px 16px`.

### Cards & Containers

**`card-treatment`** — The core service display unit.
- Background: `{colors.surface-1}`, Border: `1px solid rgba(244, 241, 234, 0.06)`, Padding: `{spacing.xl}` 24px, Radius: `{rounded.md}` 12px.
- Behavior: On hover, border transitions to `rgba(217, 107, 67, 0.4)` (copper accent) and surface lifts to `{colors.surface-2}`.

**`card-therapist`** — Staff and expert profiles.
- Identical to `card-treatment` but includes a `{rounded.none}` or `{rounded.sm}` portrait image at the top with a subtle bottom gradient overlay.

### Navigation

**`nav-island`** — Floating desktop navbar.
- Background: `{colors.surface-glass}`, Filter: `backdrop-filter: blur(16px)`, Border: `1px solid rgba(244, 241, 234, 0.1)`, Padding: `16px 32px`, Radius: `9999px` (Pill shape to differentiate from content cards). Positioned fixed `24px` from the top viewport.

### Signature Components

**`eyebrow-label`** — The editorial section tracker.
- Set in `{typography.eyebrow}`, color `{colors.accent-gold}`. Always preceded by a 24px horizontal copper line (`24px x 1px bg-primary`) to anchor the text.

**`price-tag`** — Treatment pricing display.
- Typography: `{typography.body-md-strong}`, Color: `{colors.text-main}`. Always aligned right of the treatment title, accompanied by duration in `{typography.caption}` (`{colors.text-muted}`).

---

## Do's and Don'ts

### Do
- **Do** maintain high contrast for body copy using `{colors.text-main}` (`#F4F1EA`). Elegance never justifies unreadable grey text.
- **Do** use `{colors.primary}` (Sunset Copper) exclusively for interactive conversion points (Booking, Selecting, Confirming).
- **Do** leverage generous whitespace (`96px` section gaps). In luxury design, empty space is a feature that signals exclusivity and calm.
- **Do** use subtle border opacity (`6%` to `12%`) to separate dark elements instead of drop shadows.
- **Do** keep `Marcellus` (serif) at normal weight (`400`). Let its natural architectural contrast speak for itself.

### Don't
- **Don't** use pure black (`#000000`) or pure white (`#FFFFFF`). They strip away the warm, sensory "twilight" atmosphere of the Sendja brand.
- **Don't** use neon or cyber colors (no bright cyan, magenta, or electric lime). Keep all secondary hues grounded in earth, copper, bronze, and stone.
- **Don't** use overly rounded pill-shapes for standard content cards; it makes the brand look like a casual tech startup rather than a premium wellness sanctuary.
- **Don't** clutter treatment cards with too many badges or icons. Restraint is the ultimate sign of luxury.
