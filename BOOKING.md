# Sendja Reflexology — Booking Rules & State Machine (`BOOKING_RULES.md`)

## 1. Domain Overview & Philosophy
The booking engine for **Sendja Reflexology** must reflect the brand's core philosophy: *calm, intentional, and frictionless*. To prevent server-side dependencies during client pitches, the entire reservation logic operates on deterministic client-side algorithms using **LocalStorage**, strictly validated via **Zod schemas**, and fully protected against **SSR Hydration Mismatches** in Next.js 16.

---

## 2. Operational Timings & Scheduling Rules

### A. Business Hours
- **Opening Time:** `10:00 WIB` (03:00 UTC)
- **Closing Time:** `22:00 WIB` (15:00 UTC)
- **Slot Granularity:** All bookings must snap to **30-minute grid intervals** (e.g., 10:00, 10:30, 11:00). Custom minutes (e.g., 10:15) are strictly rejected.

### B. The "Sendja Sanctuary" Buffer Rule (Sanitization & Rest)
To maintain luxury hygiene standards, every treatment requires a mandatory **15-minute sanctuary buffer** immediately following the session.
- **Formula:** `Occupied End Time = Start Time + Treatment Duration + 15 Minutes Buffer`
- **Example:** A 90-minute treatment starting at `14:00` blocks the room and therapist until `15:45` (`14:00 + 90 mins + 15 mins`). The next available booking grid for that specific resource starts at `16:00`.

### C. Last Order Calculation
A booking slot is only valid if the treatment duration plus the mandatory buffer completes on or before closing time (`22:00`).
- **Formula:** `Max Start Time = Closing Time (22:00) - (Duration + 15 Minutes Buffer)`
- **Reference Table:**
  | Treatment Duration | Buffer | Total Block | Last Available Start Time |
  | :--- | :--- | :--- | :--- |
  | 60 Minutes | 15 Mins | 75 Mins | **20:30 WIB** |
  | 90 Minutes | 15 Mins | 105 Mins| **20:00 WIB** |
  | 120 Minutes| 15 Mins | 135 Mins| **19:30 WIB** |

---

## 3. Data Architecture & Zod Schemas

All reservations are stored in `localStorage` under the key: `"sendja_mock_bookings"`. To ensure **Zero-Tolerance for Errors** (`AGENTS.md`), any data read from or written to LocalStorage MUST be parsed through this exact Zod schema.

```typescript
import { z } from 'zod';

export const BookingStatusSchema = z.enum([
  'PENDING',    // Guest submitted wizard; awaiting staff action (Demo Mode)
  'CONFIRMED',  // Locked slot; active reservation
  'COMPLETED',  // Past reservation; successfully serviced
  'CANCELLED'   // Released slot; ignored in availability checks
]);

export const SendjaBookingSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(), // ISO 8601 string
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
  startTime: z.string().regex(/^(1[0-9]|2[0-1]):(00|30)$/, "Must be 30-min grid between 10:00 and 21:30"),
  endTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, "Calculated End Time including buffer"),
  treatmentId: z.string().min(1),
  treatmentName: z.string().min(1),
  durationMinutes: z.union([z.literal(60), z.literal(90), z.literal(120)]),
  therapistId: z.string().min(1), // Use 'ANY' for auto-assign
  roomId: z.string().min(1),      // Assigned room ID
  status: BookingStatusSchema,
  totalPriceIdr: z.number().positive(),
  guest: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().regex(/^(^\+62|62|^08)\d{8,13}$/, "Must be valid Indonesian WhatsApp number"),
    notes: z.string().optional(),
  }),
});

export type BookingStatus = z.infer<typeof BookingStatusSchema>;
export type SendjaBooking = z.infer<typeof SendjaBookingSchema>;
