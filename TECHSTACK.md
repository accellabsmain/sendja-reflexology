# Sendja Reflexology — Tech Stack & Architecture (`TECH_STACK.md`)

## 1. Core Environment (From `package.json`)
- **Framework:** Next.js 16.2.10 (App Router, strictly Client Components `use client` for stateful LocalStorage pages, Server Components for static layouts).
- **Library:** React 19.2.4 & React DOM 19.2.4.
- **Language:** TypeScript 5+ (Strict mode enabled, zero `any` tolerance).
- **Styling Engine:** Tailwind CSS v4 (`@tailwindcss/postcss`).
  - *Note on Tailwind v4:* Utilize the new `@theme` block or CSS variables in `globals.css` to map Sendja's design tokens (`--color-canvas: #0D0C0F;`, `--color-primary: #D96B43;`).

## 2. UI Component Architecture (Shadcn UI + Radix)
- **Component Library:** Shadcn UI (installed via CLI, customized to match `DESIGN.md`).
- **Required Shadcn Primitives for Demo:**
  - `Button` (Re-styled to standard 6px radius, copper primary fill).
  - `Card` (Re-styled with `bg-surface-1` and 6% opacity borders).
  - `Dialog` / `Sheet` (For the "Demo Mode Drawer" and treatment details).
  - `Calendar` & `Popover` (For selecting booking dates).
  - `Select` & `Form` (For the reservation wizard).
  - `Table` (For the `/demo-admin` dashboard).
- **Icons:** `lucide-react` (Use minimalist line icons, stroke-width 1.5px).

## 3. Client-Side Data & State Management
- **Persistence Layer:** Browser `localStorage`.
- **State Management:** Custom React Hooks wrapped in React Context (`useSendjaBooking()`).
- **Validation Engine:** `zod` v3.
  - All form inputs and LocalStorage JSON parsing MUST be validated through Zod schemas to prevent runtime hydration errors or corrupted local data.

## 4. Quality Control & Testing (Per `AGENTS.md`)
- **Unit & Logic Testing:** `vitest` + `@testing-library/react`.
  - Focus testing efforts on the time-slot generation algorithm and LocalStorage state reducers.
- **Linter:** ESLint v9 with `eslint.config.mjs` (Roasting Linter enabled).

## 5. Folder Structure
```text
src/
├── app/
│   ├── (public)/          # Hero, Catalog, Booking Wizard
│   ├── demo-admin/        # Simulated Staff Dashboard
│   ├── layout.tsx         # Marcellus + Manrope font injection
│   └── globals.css        # Tailwind v4 @theme design tokens
├── components/
│   ├── ui/                # Shadcn customized primitives
│   ├── sanctuary/         # Hero, Atmosphere, Brand components
│   ├── booking/           # Step-by-step wizard forms
│   └── demo/              # Pitch Presenter Drawer & tools
├── hooks/
│   └── useLocalStorage.ts # Safe SSR-friendly local storage hook
├── lib/
│   ├── mock-data.ts       # Default treatments, rooms, and therapists
│   ├── slot-calculator.ts # Algorithm for available times + buffers
│   └── validations.ts     # Zod schemas for booking flow
└── types/
    └── index.ts           # Strictly typed TypeScript interfaces