"use client";
import { useSendjaBookings } from "@/hooks/useLocalStorage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DemoAdmin() {
  const { bookings, isLoaded, updateBookingStatus } = useSendjaBookings();

  if (!isLoaded) return <div className="p-8 text-text-main">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-canvas p-8 text-text-main selection:bg-primary/30">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-serif text-display-md text-text-main">Admin Dashboard</h1>
            <p className="text-text-muted">Manage mock reservations (Demo Mode)</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-border text-text-main hover:bg-white/5">Back to Site</Button>
          </Link>
        </div>

        <div className="bg-surface-1 border border-border rounded-md p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-text-mid">Date & Time</TableHead>
                <TableHead className="text-text-mid">Guest</TableHead>
                <TableHead className="text-text-mid">Treatment</TableHead>
                <TableHead className="text-text-mid">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow className="border-b-0 hover:bg-transparent">
                  <TableCell colSpan={4} className="text-center py-8 text-text-muted">
                    No reservations found. Press Ctrl+Shift+D and click Seed Mock Data.
                  </TableCell>
                </TableRow>
              ) : bookings.map((b) => (
                <TableRow key={b.id} className="border-border hover:bg-surface-2 transition-colors">
                  <TableCell>
                    <div className="font-medium text-text-main">{b.date}</div>
                    <div className="text-xs text-text-muted">{b.startTime} - {b.endTime}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-text-main">{b.guest.name}</div>
                    <div className="text-xs text-text-muted">{b.guest.phone}</div>
                    {b.guest.notes && <div className="text-xs text-accent-gold mt-1">Note: {b.guest.notes}</div>}
                  </TableCell>
                  <TableCell className="text-sm">
                    {b.treatmentName}
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={b.status}
                      onValueChange={(val: any) => updateBookingStatus(b.id, val)}
                    >
                      <SelectTrigger className="w-[140px] bg-surface-2 border-border text-text-main h-8 text-xs">
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
    </div>
  );
}
