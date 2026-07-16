"use client";
import { useState, useMemo } from "react";
import { useSendjaBookings } from "@/hooks/useLocalStorage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { THERAPISTS, ROOMS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, CalendarCheck, Clock } from "lucide-react";

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

function getStatusColor(status: string) {
  if (status === 'CONFIRMED') return 'bg-[#7CB342]/10 text-[#7CB342] border-[#7CB342]/20';
  if (status === 'PENDING') return 'bg-[#FFA000]/10 text-[#FFA000] border-[#FFA000]/20';
  if (status === 'COMPLETED') return 'bg-surface-2 text-text-muted border-border';
  return 'bg-red-500/10 text-red-500 border-red-500/20';
}

export default function AdminDashboard() {
  const { bookings, isLoaded, updateBookingStatus } = useSendjaBookings();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const dateStr = selectedDate.toISOString().split('T')[0];

  // Stats
  const todayBookings = useMemo(() => bookings.filter(b => b.date === dateStr), [bookings, dateStr]);
  const activeBookings = useMemo(() => todayBookings.filter(b => b.status !== 'CANCELLED'), [todayBookings]);
  const completedBookings = useMemo(() => todayBookings.filter(b => b.status === 'COMPLETED'), [todayBookings]);
  const totalRevenue = useMemo(() => completedBookings.reduce((sum, b) => sum + (b.totalPriceIdr || 0), 0), [completedBookings]);

  // Calculate generic empty slots for today (assuming 60 min duration for generic display)
  const emptySlots = useMemo(() => {
    const slots = [];
    const capacity = Math.min(THERAPISTS.length, ROOMS.length); // max concurrent bookings
    
    for (let current = OPENING_MINUTES; current < CLOSING_MINUTES; current += SLOT_INTERVAL) {
      let activeCount = 0;
      
      for (const booking of activeBookings) {
        const start = timeToMinutes(booking.startTime);
        const end = timeToMinutes(booking.endTime);
        if (current >= start && current < end) {
          activeCount++;
        }
      }
      
      if (activeCount < capacity) {
        slots.push({
          time: minutesToTime(current),
          availableCapacity: capacity - activeCount
        });
      }
    }
    return slots;
  }, [activeBookings]);

  if (!isLoaded) return <div className="text-text-main">Loading dashboard...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="font-serif text-3xl text-text-main">Dashboard Overview</h1>
        <p className="text-text-muted mt-1">Manage appointments and monitor availability</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-surface-1 border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-text-mid">Today's Appointments</CardTitle>
            <CalendarCheck className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-main">{activeBookings.length}</div>
            <p className="text-xs text-text-muted mt-1">{completedBookings.length} completed</p>
          </CardContent>
        </Card>
        <Card className="bg-surface-1 border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-text-mid">Total Revenue</CardTitle>
            <CreditCard className="w-4 h-4 text-accent-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-main">
              IDR {(totalRevenue / 1000).toLocaleString('id-ID')}K
            </div>
            <p className="text-xs text-text-muted mt-1">From completed today</p>
          </CardContent>
        </Card>
        <Card className="bg-surface-1 border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-text-mid">Available Slots</CardTitle>
            <Clock className="w-4 h-4 text-[#7CB342]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-main">{emptySlots.length}</div>
            <p className="text-xs text-text-muted mt-1">30-min blocks open today</p>
          </CardContent>
        </Card>
        <Card className="bg-surface-1 border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-text-mid">Staff Active</CardTitle>
            <Users className="w-4 h-4 text-[#42A5F5]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-main">{THERAPISTS.length}</div>
            <p className="text-xs text-text-muted mt-1">Ready for service</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments Table */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-xl text-text-main">Recent Appointments</h2>
          <div className="bg-surface-1 border border-border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-surface-2">
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-text-mid">Time</TableHead>
                  <TableHead className="text-text-mid">Guest Details</TableHead>
                  <TableHead className="text-text-mid">Treatment</TableHead>
                  <TableHead className="text-text-mid">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.length === 0 ? (
                  <TableRow className="border-b-0 hover:bg-transparent">
                    <TableCell colSpan={4} className="text-center py-12 text-text-muted">
                      No reservations found. Use the client portal to make a booking.
                    </TableCell>
                  </TableRow>
                ) : bookings.map((b) => (
                  <TableRow key={b.id} className="border-border hover:bg-surface-2 transition-colors">
                    <TableCell className="align-top">
                      <div className="font-medium text-text-main">{b.date}</div>
                      <div className="text-xs text-accent-gold mt-1 font-medium">{b.startTime} - {b.endTime}</div>
                      <div className="text-xs text-text-muted mt-1">{b.durationMinutes} mins</div>
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="font-medium text-text-main">{b.guest.name}</div>
                      <div className="text-xs text-text-muted mt-0.5">{b.guest.phone}</div>
                      {b.guest.notes && (
                        <div className="text-xs bg-primary/10 text-primary p-2 rounded-sm mt-2 max-w-[200px] border border-primary/20">
                          {b.guest.notes}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="text-sm font-medium text-text-main">{b.treatmentName}</div>
                      <div className="text-xs text-text-muted mt-1">IDR {(b.totalPriceIdr || 0).toLocaleString('id-ID')}</div>
                    </TableCell>
                    <TableCell className="align-top">
                      <Select
                        defaultValue={b.status}
                        onValueChange={(val: any) => updateBookingStatus(b.id, val)}
                      >
                        <SelectTrigger className={`w-[130px] border h-8 text-xs ${getStatusColor(b.status)}`}>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-surface-2 border-border text-text-main">
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Empty Slots Finder */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl text-text-main">Slot Availability</h2>
          <div className="bg-surface-1 border border-border rounded-md p-5 space-y-6">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) => d && setSelectedDate(d)}
                className="rounded-md border border-border bg-surface-2 mx-auto w-full flex justify-center"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                <span className="text-sm font-medium text-text-main">Empty Slots for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span className="text-xs bg-[#7CB342]/20 text-[#7CB342] px-2 py-0.5 rounded-sm">{emptySlots.length} available</span>
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {emptySlots.length > 0 ? (
                  emptySlots.map((slot, i) => (
                    <div key={i} className="text-center bg-surface-2 border border-border rounded-sm p-2">
                      <div className="text-sm text-text-main font-medium">{slot.time}</div>
                      <div className="text-[10px] text-text-muted mt-0.5">{slot.availableCapacity} room{slot.availableCapacity > 1 ? 's' : ''} left</div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-6 text-sm text-text-muted">
                    No available slots for this date.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
