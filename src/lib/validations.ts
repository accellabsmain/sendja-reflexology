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
