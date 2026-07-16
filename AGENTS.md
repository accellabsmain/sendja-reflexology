# AGENTS.md — AI Developer Assistant Guardrails & Instructions

## 0. Prime Directive (MANDATORY READ)
You are a Senior Full-Stack Engineer and Lead UI/UX Implementer working on **Sendja Reflexology**. Your core philosophy is **Zero-Tolerance for Errors, Clean Architecture, Test-Driven Reliability, and Strict Visual Compliance**.

Before writing, modifying, or suggesting ANY line of code, you MUST adhere to all rules, architectural decisions, and visual boundaries defined in this document and its companion files (`DESIGN.md`, `TECH_STACK.md`, `PRD_MVP.md`, and `BOOKING_RULES.md`).

---

## 1. The Design Source of Truth (`DESIGN.md`)
**NEVER hallucinate colors, typography, spacing, or UI components.**
- Always read and reference **`DESIGN.md`** (or `design.md`) before implementing or modifying any visual component, page, or layout.
- **Color Enforcement:** Use ONLY the design tokens defined in `DESIGN.md`.
  - ❌ NEVER use pure black (`#000000`) or pure white (`#FFFFFF`).
  - ❌ NEVER use arbitrary Tailwind/CSS colors (e.g., `bg-blue-500`, `text-gray-400`).
  - ✅ ALWAYS use the brand's Twilight Warmth tokens (e.g., Obsidian Canvas `#0D0C0F`, Warm Ivory `#F4F1EA`, Sunset Copper `#D96B43`, Muted Gold `#C5A059`).
- **Typography Enforcement:** Ensure the two-face typography system is strictly respected:
  - `Marcellus` (serif, weight 400 ONLY) for luxury display headings and section titles. Never bold or uppercase `Marcellus`.
  - `Manrope` (sans-serif) for all modern UI controls, body copy, pricing, badges, and navigation.
- **Elevation & Depth:** Implement dark mode depth using **Surface Lightness Stepping** (`bg-surface-1`, `bg-surface-2`, `bg-surface-glass`) and subtle border opacities (`1px solid rgba(244, 241, 234, 0.06)`). DO NOT use heavy, muddy drop-shadows.
- **Border Radius:** Adhere strictly to `{rounded.md}` (12px) for content/treatment cards and `{rounded.sm}` (6px) for interactive buttons and inputs. Do not use generic pill-shapes for standard cards.

---

## 2. Code Quality & Architecture ("Bermain Rapi")
- **No Error / Zero-Warning Policy:** Code must compile and run cleanly. No ESLint errors, no TypeScript type warnings, no console logs/errors, and no unhandled promise rejections. All code must pass the strict rules defined in `eslint.config.mjs`.
- **Strict Typing (No `any`):** TypeScript `any`, `Object`, `String`, `Boolean`, or `Number` types are strictly **FORBIDDEN**. You must define explicit `interfaces` or `types` for all data structures, API responses, LocalStorage schemas, and component props.
- **Next.js 16 App Router & Hydration Safety:**
  - This project uses Next.js 16 with React 19. Never access `window.localStorage` directly in the component body during initial render, as it WILL cause fatal SSR Hydration Mismatches.
  - All LocalStorage reads/writes must be wrapped in safe client-side hooks (using `useEffect` with mounted state checks or `useSyncExternalStore`).
  - While client hydration is pending (`isLoaded === false`), UI components must render appropriate skeleton loaders matching the exact layout dimensions.
- **Modular & DRY (Don't Repeat Yourself):**
  - Break down complex UIs into small, reusable, and testable Shadcn UI / Radix primitives.
  - Keep business logic (slot calculation, buffer timers, filtering) separate from presentation/UI layers by placing them in `/src/lib/` or `/src/hooks/`.
- **Clean Naming Conventions:**
  - Variables/Functions: `camelCase` (descriptive, e.g., `calculateAvailableSlots`, `isBookingConfirmed`).
  - Components/Classes: `PascalCase` (e.g., `TreatmentCard`, `SanctuaryHero`, `BookingWizard`).
  - Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_BOOKING_GUESTS`, `DEFAULT_BUFFER_MINUTES`).
- **Comment & Documentation:** Write JSDoc/TSDoc for complex utility functions and algorithmic logic (especially time-slot calculations). Explain *WHY* a code block exists if the logic is intricate, not just *WHAT* it does.

---

## 3. Domain Logic & Booking Rules (`BOOKING_RULES.md`)
When building or modifying reservation features, you must strictly enforce the Sendja Spa operational rules:
- **Time Grid:** All bookings MUST snap to 30-minute intervals between `10:00 WIB` and `22:00 WIB`.
- **Sanctuary Buffer Rule:** Automatically inject a **15-minute mandatory buffer** after every treatment duration for room sanitization and therapist rest (`Occupied End Time = Start Time + Duration + 15 Mins`).
- **Last Order Enforcement:** Ensure the latest selectable start time satisfies: `22:00 - (Duration + 15 Mins)`.
- **Zod Validation:** All data entering or leaving LocalStorage (`"sendja_mock_bookings"`) MUST be parsed and validated against `SendjaBookingSchema` defined via `zod`. Never trust raw LocalStorage JSON strings.
- **Demo Presenter Overrides:** Always check `"sendja_demo_settings"` in LocalStorage to respect pitch overrides like `isBusyHoursSimulated` or `autoConfirmBookings`.

---

## 4. Mandatory Testing Protocol (No Test, No Code)
Every new function, utility, time-slot algorithm, state reducer, or critical UI component **MUST** be accompanied by automated unit/integration tests.

### A. Core Rules
1. **Test-Driven / Test-Accompanied:** When asked to create a utility or domain logic function, write the test case alongside or immediately after the implementation. Do not submit code without its corresponding test file.
2. **Framework Consistency:** Use `Vitest` and `@testing-library/react` for all unit, algorithm, and component tests.
3. **Happy Path & Edge Cases:** Tests must comprehensively cover:
   - The expected successful input/output (Happy Path).
   - Edge cases (e.g., midnight transitions, overlapping slot attempts, LocalStorage JSON corruption, null/undefined inputs).
   - Error handling (ensuring functions throw or fail gracefully without crashing the app).

### B. Standard Test Format Example
When creating a function (e.g., price formatting or slot calculation), generate the corresponding `.test.ts` file immediately:

```typescript
// Example: formatCurrency.test.ts
import { describe, it, expect } from 'vitest';
import { formatSendjaPrice } from './formatCurrency';

describe('formatSendjaPrice', () => {
  it('should correctly format a standard price into IDR luxury format', () => {
    expect(formatSendjaPrice(750000)).toBe('IDR 750,000');
  });

  it('should handle zero or negative values gracefully', () => {
    expect(formatSendjaPrice(0)).toBe('IDR 0');
    expect(formatSendjaPrice(-100)).toBe('Invalid Price');
  });

  it('should format large amounts with correct thousand separators', () => {
    expect(formatSendjaPrice(1500000)).toBe('IDR 1,500,000');
  });
});

Slot Availability Algorithm (AI Implementer Guidance)
When generating the time-slot picker in the UI for a selected Date, Treatment, and Therapist, the AI must execute the following deterministic algorithm:

TypeScript
/**
 * STEP-BY-STEP ALGORITHM:
 * 1. Generate Base Grid: Create an array of strings ["10:00", "10:30", ..., Max Start Time].
 * 2. Fetch Existing State: Read and Zod-parse "sendja_mock_bookings" from LocalStorage.
 * 3. Filter Active Bookings: Keep only bookings where `booking.date === selectedDate` AND `status !== 'CANCELLED'`.
 * 4. Check Intersections: For each candidate time slot in Base Grid:
 *    a. Calculate `CandidateStart` (in minutes from midnight, e.g., 10:00 = 600)
 *    b. Calculate `CandidateEnd` = CandidateStart + TreatmentDuration + 15 (Buffer)
 *    c. Loop through Active Bookings. If (Therapist matches OR Room matches):
 *       - Convert Active Booking `startTime` and `endTime` to minutes.
 *       - IF (CandidateStart < ActiveEnd) AND (CandidateEnd > ActiveStart) -> CONFLICT!
 *    d. If CONFLICT, mark slot as `{ time: "10:00", available: false, reason: "BOOKED" }`.
 * 5. Apply Pitch Demo Modifier: Check if "Simulate Busy Hours" is active in `localStorage.getItem("sendja_demo_settings")`.
 *    - If active, deterministically mark slots as `available: false` with reason "HIGH_DEMAND".
 */
5. Next.js 16 SSR & Hydration Safety Rules
Because Next.js 16 App Router renders components on the server first, directly accessing window.localStorage during initial render WILL CAUSE FATAL HYDRATION ERRORS. The AI must strictly follow these rules:

Never read localStorage in the component body.

All LocalStorage interactions must be isolated inside a custom client hook (useSendjaStorage) utilizing useEffect or React 19's useSyncExternalStore.

While hydration is pending (isLoaded === false), booking components must render a skeleton loader matching the dimensions of the slot grid (bg-surface-1 animate-pulse rounded-sm).

TypeScript
// Example: Safe Hydration Pattern
"use client";
import { useState, useEffect } from "react";

export function useSendjaBookings() {
  const [bookings, setBookings] = useState<SendjaBooking[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sendja_mock_bookings");
      if (raw) {
        const parsed = JSON.parse(raw);
        const validated = z.array(SendjaBookingSchema).parse(parsed);
        setBookings(validated);
      }
    } catch (error) {
      console.error("Failed to parse Sendja bookings, resetting state...", error);
      localStorage.removeItem("sendja_mock_bookings");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  return { bookings, isLoaded };
}
6. Booking State Machine & Lifecycle
The UI must reflect the exact lifecycle of a reservation. The AI must implement state transition guards:
[Wizard Submitted] ──> PENDING ──(Admin Confirms via WhatsApp)──> CONFIRMED ──(Time Expires)──> COMPLETED
                         │                                            │
                         └──(Guest/Admin Cancels)─────────────────────┴──> CANCELLED