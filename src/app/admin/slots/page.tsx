"use client";
import { useState, useMemo } from "react";
import { useSendjaBookings } from "@/hooks/useLocalStorage";
import { Calendar } from "@/components/ui/calendar";
import { THERAPISTS, ROOMS } from "@/lib/mock-data";

const MINUTES_IN_HOUR = 60;
const OPENING_MINUTES = 600; // 10:00
const CLOSING_MINUTES = 1320; // 22:00
const SLOT_INTERVAL = 30;

function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * MINUTES_IN_HOUR + minutes;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / MINUTES_IN_HOUR);
  const m = minutes % MINUTES_IN_HOUR;
  const PAD_LENGTH = 2;
  const PAD_CHAR = '0';
  return `${h.toString().padStart(PAD_LENGTH, PAD_CHAR)}:${m.toString().padStart(PAD_LENGTH, PAD_CHAR)}`;
}

export default function SlotsPage() {
  const { bookings, isLoaded } = useSendjaBookings();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const dateStr = selectedDate.toISOString().split('T')[0];
  const activeBookings = useMemo(() => bookings.filter(b => b.date === dateStr && b.status !== 'CANCELLED'), [bookings, dateStr]);

  const slots = useMemo(() => {
    const computed = [];
    const capacity = Math.min(THERAPISTS.length, ROOMS.length);
    
    for (let current = OPENING_MINUTES; current < CLOSING_MINUTES; current += SLOT_INTERVAL) {
      let activeCount = 0;
      
      for (const booking of activeBookings) {
        const start = timeToMinutes(booking.startTime);
        const end = timeToMinutes(booking.endTime);
        if (current >= start && current < end) {
          activeCount++;
        }
      }
      
      computed.push({
        time: minutesToTime(current),
        availableCapacity: capacity - activeCount,
        maxCapacity: capacity,
        isAvailable: activeCount < capacity
      });
    }
    return computed;
  }, [activeBookings]);

  if (!isLoaded) return <div className="text-text-main">Loading slots...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="font-serif text-3xl text-text-main">Slot Availability</h1>
        <p className="text-text-muted mt-1">Manage and view open slots across all outlets.</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-surface-1 border border-border rounded-md p-6 h-fit">
          <h2 className="text-lg text-text-main mb-4 font-medium">Select Date</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(d) => d && setSelectedDate(d)}
            className="rounded-md border border-border bg-surface-2 mx-auto w-full flex justify-center"
          />
        </div>
        
        <div className="lg:col-span-2 bg-surface-1 border border-border rounded-md p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <h2 className="text-lg text-text-main font-medium">
              Time Grid for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#7CB342]/20 border border-[#7CB342]/40" /> Available</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#FFA000]/20 border border-[#FFA000]/40" /> Limited</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-surface-2 border border-border" /> Full</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {slots.map((slot, i) => {
              const isEmpty = slot.availableCapacity === 0;
              const isLimited = slot.availableCapacity > 0 && slot.availableCapacity < slot.maxCapacity;
              let colorClass = "bg-[#7CB342]/10 border-[#7CB342]/30 text-[#7CB342]";
              if (isEmpty) {
                colorClass = "bg-surface-2 border-border text-text-muted opacity-50";
              } else if (isLimited) {
                colorClass = "bg-[#FFA000]/10 border-[#FFA000]/30 text-[#FFA000]";
              }

              return (
                <div key={i} className={`text-center border rounded-md p-3 transition-colors ${colorClass}`}>
                  <div className="text-sm font-semibold">{slot.time}</div>
                  <div className="text-[10px] mt-1 opacity-80 uppercase tracking-wide">
                    {slot.availableCapacity} / {slot.maxCapacity} Left
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
