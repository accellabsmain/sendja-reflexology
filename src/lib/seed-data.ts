import { SendjaBooking } from "./validations";
import { TREATMENTS, THERAPISTS, ROOMS } from "./mock-data";

export function generateSeedBookings(): SendjaBooking[] {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  return [
    {
      id: crypto.randomUUID(),
      createdAt: today.toISOString(),
      date: dateStr,
      startTime: "12:00",
      endTime: "13:15", // 60 min + 15 min buffer
      treatmentId: TREATMENTS[0].id,
      treatmentName: TREATMENTS[0].name,
      durationMinutes: 60,
      therapistId: THERAPISTS[0].id,
      roomId: ROOMS[0].id,
      status: "COMPLETED",
      totalPriceIdr: TREATMENTS[0].priceIdr,
      guest: { name: "Bapak Budi", phone: "081234567890", notes: "No hard pressure" }
    },
    {
      id: crypto.randomUUID(),
      createdAt: today.toISOString(),
      date: dateStr,
      startTime: "15:00",
      endTime: "16:45", // 90 min + 15 min buffer
      treatmentId: TREATMENTS[1].id,
      treatmentName: TREATMENTS[1].name,
      durationMinutes: 90,
      therapistId: THERAPISTS[1].id,
      roomId: ROOMS[1].id,
      status: "CONFIRMED",
      totalPriceIdr: TREATMENTS[1].priceIdr,
      guest: { name: "Ibu Siti", phone: "081987654321", notes: "" }
    }
  ];
}
