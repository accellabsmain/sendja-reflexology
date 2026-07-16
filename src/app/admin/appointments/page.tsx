"use client";
import { useState } from "react";
import { useSendjaBookings } from "@/hooks/useLocalStorage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function getStatusColor(status: string) {
  if (status === 'CONFIRMED') return 'bg-[#7CB342]/10 text-[#7CB342] border-[#7CB342]/20';
  if (status === 'PENDING') return 'bg-[#FFA000]/10 text-[#FFA000] border-[#FFA000]/20';
  if (status === 'COMPLETED') return 'bg-surface-2 text-text-muted border-border';
  return 'bg-red-500/10 text-red-500 border-red-500/20';
}

export default function AppointmentsPage() {
  const { bookings, isLoaded, updateBookingStatus } = useSendjaBookings();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter(b => 
    b.guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.guest.phone.includes(searchQuery) ||
    b.treatmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoaded) return <div className="text-text-main">Loading appointments...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-text-main">Appointments</h1>
          <p className="text-text-muted mt-1">Manage all past and upcoming appointments.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Search name, phone, or treatment..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-surface-1 border-border text-text-main focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="bg-surface-1 border border-border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-surface-2">
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-text-mid">Date & Time</TableHead>
              <TableHead className="text-text-mid">Guest Details</TableHead>
              <TableHead className="text-text-mid">Treatment</TableHead>
              <TableHead className="text-text-mid">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow className="border-b-0 hover:bg-transparent">
                <TableCell colSpan={4} className="text-center py-12 text-text-muted">
                  No appointments found matching your search.
                </TableCell>
              </TableRow>
            ) : filteredBookings.map((b) => (
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
  );
}
