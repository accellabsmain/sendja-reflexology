"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TREATMENTS, THERAPISTS, ROOMS } from "@/lib/mock-data";
import { useSendjaBookings } from "@/hooks/useLocalStorage";
import { useDemoSettings } from "@/hooks/useDemoSettings";
import { calculateAvailableSlots, calculateEndTime } from "@/lib/slot-calculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatmentId?: string | null;
}

export function BookingWizard({ isOpen, onClose, initialTreatmentId }: BookingWizardProps) {
  const { bookings, addBooking, isLoaded } = useSendjaBookings();
  const { simulateBusy } = useDemoSettings();
  const [step, setStep] = useState(1);
  const [treatmentId, setTreatmentId] = useState<string | null>(initialTreatmentId || null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  
  const [guest, setGuest] = useState({ name: "", phone: "", notes: "" });

  if (!isLoaded) return null; // Hydration safety

  const handleNext = () => setStep((p) => p + 1);
  const handleBack = () => setStep((p) => p - 1);

  const treatment = TREATMENTS.find((t) => t.id === treatmentId);
  const therapistId = THERAPISTS[0].id; // Auto assign for demo
  const roomId = ROOMS[0].id; // Auto assign for demo

  // Get available slots if date is selected
  const availableSlots = date && treatment 
    ? calculateAvailableSlots(
        date.toISOString().split('T')[0],
        treatment.durationMinutes,
        therapistId,
        roomId,
        bookings,
        simulateBusy // Using the demo setting flag
      )
    : [];

  const handleConfirm = () => {
    if (!treatment || !date || !time) return;
    const dateStr = date.toISOString().split('T')[0];
    const endTime = calculateEndTime(time, treatment.durationMinutes);
    
    addBooking({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      date: dateStr,
      startTime: time,
      endTime,
      treatmentId: treatment.id,
      treatmentName: treatment.name,
      durationMinutes: treatment.durationMinutes as any,
      therapistId,
      roomId,
      status: "PENDING",
      totalPriceIdr: treatment.priceIdr,
      guest
    });
    
    setStep(4); // Confirmation step
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-surface-2 border-border text-text-main rounded-lg shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-center mb-4">
            {step === 1 && "Select Treatment"}
            {step === 2 && "Choose Date & Time"}
            {step === 3 && "Guest Details"}
            {step === 4 && "Reservation Confirmed"}
          </DialogTitle>
          <DialogDescription className="sr-only">Booking wizard steps</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && (
            <div className="space-y-4">
              {TREATMENTS.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => setTreatmentId(t.id)}
                  className={`p-4 rounded-md border cursor-pointer transition-all ${treatmentId === t.id ? 'border-primary bg-primary/5' : 'border-border hover:border-text-mid'}`}
                >
                  <div className="flex justify-between font-medium">
                    <span>{t.name}</span>
                    <span>IDR {(t.priceIdr).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="text-sm text-text-muted mt-1">{t.durationMinutes} mins</div>
                </div>
              ))}
              <div className="mt-6 flex justify-end">
                <Button disabled={!treatmentId} onClick={handleNext} className="bg-primary text-on-primary">Next</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label className="mb-2 block text-text-mid">Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-border"
                />
              </div>
              <div>
                <Label className="mb-2 block text-text-mid">Time</Label>
                <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {date ? (
                    availableSlots.map((slot, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        disabled={!slot.available}
                        onClick={() => setTime(slot.time)}
                        className={`text-sm py-2 px-0 rounded-sm ${time === slot.time ? 'bg-primary text-on-primary border-primary hover:bg-primary hover:text-on-primary' : 'border-border text-text-main hover:bg-white/5'}`}
                      >
                        {slot.time}
                      </Button>
                    ))
                  ) : (
                    <div className="col-span-3 text-sm text-text-muted">Select a date first.</div>
                  )}
                </div>
              </div>
              <div className="col-span-full flex justify-between mt-4">
                <Button variant="ghost" onClick={handleBack} className="text-text-main">Back</Button>
                <Button disabled={!date || !time} onClick={handleNext} className="bg-primary text-on-primary">Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label className="text-text-mid">Full Name</Label>
                <Input 
                  value={guest.name} 
                  onChange={e => setGuest({...guest, name: e.target.value})} 
                  placeholder="Your Name"
                  className="bg-surface-1 border-border text-text-main mt-1 rounded-sm"
                />
              </div>
              <div>
                <Label className="text-text-mid">WhatsApp Number</Label>
                <Input 
                  value={guest.phone} 
                  onChange={e => setGuest({...guest, phone: e.target.value})} 
                  placeholder="0812..."
                  className="bg-surface-1 border-border text-text-main mt-1 rounded-sm"
                />
              </div>
              <div>
                <Label className="text-text-mid">Special Notes (Optional)</Label>
                <Input 
                  value={guest.notes} 
                  onChange={e => setGuest({...guest, notes: e.target.value})} 
                  placeholder="Any health conditions?"
                  className="bg-surface-1 border-border text-text-main mt-1 rounded-sm"
                />
              </div>
              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={handleBack} className="text-text-main">Back</Button>
                <Button disabled={!guest.name || !guest.phone} onClick={handleConfirm} className="bg-primary text-on-primary hover:bg-primary-hover">Confirm Booking</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-primary text-2xl">
                ✓
              </div>
              <div>
                <p className="text-text-mid">Your sanctuary awaits.</p>
                <h4 className="font-serif text-2xl text-text-main mt-2">{treatment?.name}</h4>
                <p className="text-text-muted mt-2">{date?.toLocaleDateString()} at {time}</p>
              </div>
              <Button onClick={onClose} variant="outline" className="mt-8 border-border text-text-main w-full hover:bg-white/5 text-center flex justify-center">
                Return to Home
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
