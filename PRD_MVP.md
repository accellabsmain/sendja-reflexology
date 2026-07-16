# Sendja Reflexology — Product Requirements Document (`PRD_MVP.md`)
**Version:** 0.1.0 (Client Pitch Demo / FE-Only Prototype)
**Objective:** To deliver a high-end, fully interactive digital sanctuary prototype to pitch prospective clients. Demonstrates core user flows, brand aesthetics, and booking mechanics without requiring backend infrastructure.

---

## 1. Executive Summary & Pitch Strategy
Sendja Reflexology is positioned as a luxury wellness sanctuary. The primary goal of this MVP is **client acquisition through demonstration**. The application must feel like a finished, polished product. All dynamic data (services, therapists, reservations) will be managed via **Client-Side State (LocalStorage)** to allow seamless live demonstrations during sales pitches.

---

## 2. Target Audience
1. **The Prospective Client (Stakeholders/Owners):** Needs to see operational efficiency, brand elevation, and an intuitive booking system that justifies investing in the software.
2. **The End-User (Simulated Guest):** Seeking a calm, frictionless, and visually soothing reservation experience.

---

## 3. In-Scope Features (Demo MVP)

### A. Sanctuary Landing Experience (Hero & Brand Immersion)
- **Visuals:** Full-bleed dark obsidian canvas (`#0D0C0F`), warm sunset copper accents (`#D96B43`), and classical `Marcellus` typography.
- **Vibe:** Smooth scroll, subtle breathing ambient glow animations, and clear storytelling of the "Sendja" relaxation philosophy.

### B. Sensory Treatment Catalog
- **Interactive Menu:** Filterable list of reflexology and spa services (e.g., *Quantum Obsidian Foot Reflexology*, *Sunset Aroma Therapy*).
- **Service Cards:** Reusing the `card-treatment` design token with pricing (`IDR`), duration (`minutes`), and sensory benefits.

### C. Step-by-Step Reservation Wizard (The Core Demo Flow)
A multi-step form simulating the real reservation process:
1. **Step 1: Treatment Selection:** Choose single or multiple therapies.
2. **Step 2: Therapist & Room Preference:** Select preferred specialist or auto-assign.
3. **Step 3: Date & Slot Selection:** Interactive date picker with dynamically generated available time slots (simulating real-time booking).
4. **Step 4: Guest Details:** Name, WhatsApp phone number, and special health notes.
5. **Step 5: Instant Confirmation:** Visual summary card with a simulated "Booking Reference ID" and an option to "Download Booking Receipt" (simulated PDF/Image or clean UI summary).

### D. The "Pitch Presenter" Magic Tools (Demo-Only Feature)
To make live pitching seamless, include a discreet **"Demo Mode Drawer"** (accessible via a keyboard shortcut like `Ctrl + Shift + D` or a triple-click on the footer logo):
- **Seed Mock Data:** Instantly populate LocalStorage with realistic past and upcoming bookings.
- **Reset State:** Clear all LocalStorage bookings instantly to restart the demo cleanly.
- **Simulate Busy Hours:** Toggle a switch to make 80% of time slots appear "Booked" to show the client how the UI handles scarcity and high demand.

### E. Mini Admin Dashboard (Simulation)
A simple, gated route (`/demo-admin`) where the client can see how staff would manage incoming bookings:
- View data fetched from LocalStorage in a clean Shadcn Data Table.
- Change status toggles: `PENDING` ➔ `CONFIRMED` ➔ `COMPLETED` ➔ `CANCELLED`.

---

## 4. Out-of-Scope (Do NOT Build for Demo)
- ❌ Real-time backend database or Supabase/PostgreSQL integration.
- ❌ Redis caching or TanStack Query server-state management.
- ❌ Payment gateway integration (Midtrans/Stripe/Xendit).
- ❌ SMS / WhatsApp automated API notifications (replace with a simulated "WhatsApp Redirect link" using `wa.me` for demo realism).