"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TREATMENTS, ADD_ONS, THERAPISTS, ROOMS } from "@/lib/mock-data";
import { useSendjaBookings } from "@/hooks/useLocalStorage";
import { useDemoSettings } from "@/hooks/useDemoSettings";
import { calculateAvailableSlots, calculateEndTime } from "@/lib/slot-calculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatmentId?: string | null;
}

export function BookingWizard({ isOpen, onClose, initialTreatmentId }: BookingWizardProps) {
  const { bookings, addBooking, isLoaded } = useSendjaBookings();
  const { simulateBusy } = useDemoSettings();
  const [step, setStep] = useState(1);
  
  const [treatmentId, setTreatmentId] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  
  const [guest, setGuest] = useState({ name: "", phone: "", notes: "" });

  // Sync initial treatment when opened
  useEffect(() => {
    if (isOpen && initialTreatmentId) {
      setTreatmentId(initialTreatmentId);
      setStep(1); // Start at step 1
      setSelectedAddOns([]);
      setDate(undefined);
      setTime(null);
      setGuest({ name: "", phone: "", notes: "" });
    }
  }, [isOpen, initialTreatmentId]);

  if (!isLoaded) return null; // Hydration safety

  const handleNext = () => setStep((p) => p + 1);
  const handleBack = () => setStep((p) => p - 1);

  const treatment = TREATMENTS.find((t) => t.id === treatmentId);
  const therapistId = THERAPISTS[0].id; // Auto assign for demo
  const roomId = ROOMS[0].id; // Auto assign for demo

  const totalDuration = (treatment?.durationMinutes || 0) + 
    selectedAddOns.reduce((acc, id) => acc + (ADD_ONS.find(a => a.id === id)?.durationMinutes || 0), 0);

  const totalPrice = (treatment?.priceIdr || 0) + 
    selectedAddOns.reduce((acc, id) => acc + (ADD_ONS.find(a => a.id === id)?.priceIdr || 0), 0);

  // Get available slots if date is selected
  const availableSlots = date && treatment 
    ? calculateAvailableSlots(
        date.toISOString().split('T')[0],
        totalDuration,
        therapistId,
        roomId,
        bookings,
        simulateBusy // Using the demo setting flag
      )
    : [];

  const handleConfirm = () => {
    if (!treatment || !date || !time) return;
    const dateStr = date.toISOString().split('T')[0];
    const endTime = calculateEndTime(time, totalDuration);
    
    addBooking({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      date: dateStr,
      startTime: time,
      endTime,
      treatmentId: treatment.id,
      treatmentName: treatment.name,
      durationMinutes: totalDuration as any,
      therapistId,
      roomId,
      status: "PENDING",
      totalPriceIdr: totalPrice,
      guest
    });
    
    setStep(4); // Confirmation step
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-surface-2 border-border text-text-main rounded-lg shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-center mb-4">
            {step === 1 && "Confirm Treatment & Add-Ons"}
            {step === 2 && "Choose Date & Time"}
            {step === 3 && "Guest Details"}
            {step === 4 && "Reservation Confirmed"}
          </DialogTitle>
          <DialogDescription className="sr-only">Booking wizard steps</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && (
            <div className="space-y-6">
              {!treatment ? (
                <div className="text-center py-8">
                  <p className="text-text-mid mb-4">Please select a treatment from the menu first.</p>
                  <Button onClick={onClose} variant="outline" className="text-text-main border-border">Close</Button>
                </div>
              ) : (
                <>
                  {/* Selected Treatment Summary */}
                  <div className="p-5 rounded-md border border-primary/40 bg-primary/5">
                    <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase mb-1 block">Selected Treatment</span>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-xl text-text-main">{treatment.name}</h3>
                        <p className="text-sm text-text-mid mt-1">{treatment.durationMinutes} mins</p>
                      </div>
                      <span className="font-semibold text-text-main">
                        IDR {(treatment.priceIdr).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Add-Ons Selection */}
                  <div className="space-y-3">
                    <Label className="text-text-main text-base block mb-3">Enhance your experience (Optional)</Label>
                    <div className="max-h-[240px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                      {ADD_ONS.map(addon => (
                        <div 
                          key={addon.id} 
                          className={`flex items-center justify-between p-4 rounded-sm border cursor-pointer transition-colors ${selectedAddOns.includes(addon.id) ? 'border-primary bg-primary/10' : 'border-border bg-surface-1 hover:bg-surface-2'}`}
                          onClick={() => toggleAddOn(addon.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              checked={selectedAddOns.includes(addon.id)} 
                              onCheckedChange={() => toggleAddOn(addon.id)}
                              className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <div>
                              <div className="text-sm font-medium text-text-main">{addon.name}</div>
                              {addon.durationMinutes > 0 && <div className="text-xs text-text-muted mt-0.5">+{addon.durationMinutes} mins</div>}
                            </div>
                          </div>
                          <span className="text-sm font-medium text-accent-gold">
                            +IDR {(addon.priceIdr).toLocaleString('id-ID')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total Summary */}
                  <div className="flex justify-between items-center border-t border-border pt-4 mt-6">
                    <div className="text-sm text-text-muted">Total ({totalDuration} mins)</div>
                    <div className="font-serif text-xl text-primary">IDR {totalPrice.toLocaleString('id-ID')}</div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button onClick={handleNext} className="bg-primary text-on-primary w-full md:w-auto">Continue to Date & Time</Button>
                  </div>
                </>
              )}
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
              <div className="col-span-full flex justify-between mt-4 border-t border-border pt-4">
                <Button variant="ghost" onClick={handleBack} className="text-text-main hover:bg-surface-1">Back</Button>
                <Button disabled={!date || !time} onClick={handleNext} className="bg-primary text-on-primary">Next: Guest Details</Button>
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
                  className="bg-surface-1 border-border text-text-main mt-1 rounded-sm focus-visible:ring-primary"
                />
              </div>
              <div>
                <Label className="text-text-mid">WhatsApp Number</Label>
                <Input 
                  value={guest.phone} 
                  onChange={e => setGuest({...guest, phone: e.target.value})} 
                  placeholder="0812..."
                  className="bg-surface-1 border-border text-text-main mt-1 rounded-sm focus-visible:ring-primary"
                />
              </div>
              <div>
                <Label className="text-text-mid">Special Notes (Optional)</Label>
                <Input 
                  value={guest.notes} 
                  onChange={e => setGuest({...guest, notes: e.target.value})} 
                  placeholder="Any health conditions or preferred pressure?"
                  className="bg-surface-1 border-border text-text-main mt-1 rounded-sm focus-visible:ring-primary"
                />
              </div>
              <div className="flex justify-between mt-8 border-t border-border pt-6">
                <Button variant="ghost" onClick={handleBack} className="text-text-main hover:bg-surface-1">Back</Button>
                <Button disabled={!guest.name || !guest.phone} onClick={handleConfirm} className="bg-primary text-on-primary hover:bg-[#E27A53]">Confirm Booking</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 py-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-primary text-3xl">
                ✓
              </div>
              <div>
                <p className="text-text-mid tracking-wide uppercase text-sm mb-2">Your sanctuary awaits</p>
                <h4 className="font-serif text-3xl text-text-main mt-2">{treatment?.name}</h4>
                {selectedAddOns.length > 0 && (
                  <p className="text-text-mid mt-2 text-sm">With {selectedAddOns.length} Add-On(s)</p>
                )}
                <p className="text-accent-gold mt-4 font-medium text-lg">{date?.toLocaleDateString()} at {time}</p>
              </div>
              <Button onClick={onClose} variant="outline" className="mt-8 border-border text-text-main w-full hover:bg-surface-1 text-center flex justify-center">
                Return to Menu
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
