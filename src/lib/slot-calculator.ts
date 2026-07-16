import { SendjaBooking } from "./validations";

export interface TimeSlot {
  time: string;
  available: boolean;
  reason?: "BOOKED" | "HIGH_DEMAND" | "PAST_CLOSING";
}

const OPENING_MINUTES = 600; // 10:00 WIB (10 * 60)
const CLOSING_MINUTES = 1320; // 22:00 WIB (22 * 60)
const BUFFER_MINUTES = 15;
const MINUTES_IN_HOUR = 60;
const PAD_LENGTH = 2;
const PAD_CHAR = '0';
const SLOT_INTERVAL = 30;
const HASH_MODULO = 10;
const HIGH_DEMAND_THRESHOLD = 2;

function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * MINUTES_IN_HOUR + minutes;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / MINUTES_IN_HOUR);
  const m = minutes % MINUTES_IN_HOUR;
  return `${h.toString().padStart(PAD_LENGTH, PAD_CHAR)}:${m.toString().padStart(PAD_LENGTH, PAD_CHAR)}`;
}

/**
 * Calculates available 30-min time slots for a given date, duration, and resources.
 */
export function calculateAvailableSlots(
  selectedDate: string,
  durationMinutes: number,
  therapistId: string,
  roomId: string,
  existingBookings: SendjaBooking[],
  simulateBusyHours: boolean = false
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  
  // Filter active bookings for the selected date
  const activeBookings = existingBookings.filter(
    b => b.date === selectedDate && b.status !== 'CANCELLED'
  );

  // Generate Base Grid
  for (let current = OPENING_MINUTES; current < CLOSING_MINUTES; current += SLOT_INTERVAL) {
    const candidateStart = current;
    const candidateEnd = candidateStart + durationMinutes + BUFFER_MINUTES;
    const timeStr = minutesToTime(candidateStart);

    // Rule C: Last Order Enforcement
    if (candidateEnd > CLOSING_MINUTES) {
      slots.push({ time: timeStr, available: false, reason: "PAST_CLOSING" });
      continue;
    }

    let isConflict = false;

    // Rule B: Intersections
    for (const booking of activeBookings) {
      if (booking.therapistId === therapistId || booking.roomId === roomId) {
        const activeStart = timeToMinutes(booking.startTime);
        const activeEnd = timeToMinutes(booking.endTime); // endTime already includes buffer in storage

        if (candidateStart < activeEnd && candidateEnd > activeStart) {
          isConflict = true;
          break;
        }
      }
    }

    if (isConflict) {
      slots.push({ time: timeStr, available: false, reason: "BOOKED" });
      continue;
    }

    // Rule D: Demo Pitch Modifier
    if (simulateBusyHours) {
      // Deterministically mark slots as HIGH_DEMAND based on some hash of date+time
      const hash = (timeToMinutes(timeStr) * selectedDate.charCodeAt(selectedDate.length - 1)) % HASH_MODULO;
      if (hash > HIGH_DEMAND_THRESHOLD) { // roughly 70% chance to be booked
        slots.push({ time: timeStr, available: false, reason: "HIGH_DEMAND" });
        continue;
      }
    }

    slots.push({ time: timeStr, available: true });
  }

  return slots;
}

export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const startMins = timeToMinutes(startTime);
  const endMins = startMins + durationMinutes + BUFFER_MINUTES;
  return minutesToTime(endMins);
}
