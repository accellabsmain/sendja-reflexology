"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sanctuary/Navbar";
import { Footer } from "@/components/sanctuary/Footer";
import { TREATMENTS, ADD_ONS, THERAPISTS, ROOMS } from "@/lib/mock-data";
import { OUTLETS } from "@/lib/outlets";
import { useSendjaBookings } from "@/hooks/useLocalStorage";
import { useDemoSettings } from "@/hooks/useDemoSettings";
import { calculateAvailableSlots, calculateEndTime } from "@/lib/slot-calculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { CheckCircle2, ChevronRight, MapPin, Calendar as CalendarIcon, Package, User } from "lucide-react";

const STEPS = [
  { id: 1, title: "Location", icon: MapPin },
  { id: 2, title: "Date & Time", icon: CalendarIcon },
  { id: 3, title: "Treatment", icon: Package },
  { id: 4, title: "Details", icon: User },
];

function getStepClass(step: number, sId: number): string {
  if (step === sId) return 'bg-primary border-primary text-on-primary';
  if (step > sId) return 'bg-primary/20 border-primary text-primary';
  return 'bg-surface-1 border-border text-text-muted';
}

function getSlotClass(time: string, slotTime: string): string {
  if (time === slotTime) return 'bg-primary text-on-primary border-primary hover:bg-primary hover:text-on-primary';
  return 'border-border text-text-main hover:bg-surface-2 bg-surface-2';
}

export default function ReservePage() {
  const { bookings, addBooking, isLoaded } = useSendjaBookings();
  const { simulateBusy } = useDemoSettings();
  
  const [step, setStep] = useState(1);
  const [outletId, setOutletId] = useState<string | null>(null);
  const [treatmentId, setTreatmentId] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [guest, setGuest] = useState({ name: "", phone: "", notes: "" });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleNext = () => setStep((p) => Math.min(p + 1, 4));
  const handleBack = () => setStep((p) => Math.max(p - 1, 1));

  const outlet = OUTLETS.find((o) => o.id === outletId);
  const treatment = TREATMENTS.find((t) => t.id === treatmentId);
  const therapistId = THERAPISTS[0].id;
  const roomId = ROOMS[0].id;

  const totalDuration = (treatment?.durationMinutes || 0) + 
    selectedAddOns.reduce((acc, id) => acc + (ADD_ONS.find(a => a.id === id)?.durationMinutes || 0), 0);

  const totalPrice = (treatment?.priceIdr || 0) + 
    selectedAddOns.reduce((acc, id) => acc + (ADD_ONS.find(a => a.id === id)?.priceIdr || 0), 0);

  const durationForSlots = totalDuration > 0 ? totalDuration : 60;
  const availableSlots = date 
    ? calculateAvailableSlots(
        date.toISOString().split('T')[0],
        durationForSlots,
        therapistId,
        roomId,
        bookings,
        simulateBusy
      )
    : [];

  const handleConfirm = () => {
    if (!treatment || !date || !time || !outlet) return;
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
      guest: {
        ...guest,
        notes: `[${outlet.name}] ${guest.notes}`
      }
    });
    
    setIsConfirmed(true);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  if (!isLoaded) return <div className="min-h-screen bg-canvas" />;

  if (isConfirmed) {
    return (
      <main className="min-h-screen bg-canvas flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-6">
          <div className="max-w-md w-full bg-surface-1 border border-border rounded-lg p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-primary">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <p className="text-text-mid tracking-wide uppercase text-sm mb-2">Reservation Received</p>
              <h4 className="font-serif text-3xl text-text-main mt-2">See you soon, {guest.name.split(' ')[0]}</h4>
              <div className="mt-6 p-4 bg-surface-2 rounded-md border border-border text-left space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-text-muted text-sm">Location</span>
                  <span className="text-text-main text-sm font-medium text-right">{outlet?.name}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-text-muted text-sm">Treatment</span>
                  <span className="text-text-main text-sm font-medium text-right">{treatment?.name}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-text-muted text-sm">Date & Time</span>
                  <span className="text-text-main text-sm font-medium text-right text-accent-gold">
                    {date?.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })} at {time}
                  </span>
                </div>
              </div>
            </div>
            <Link href="/" className="block">
              <Button className="w-full mt-4 bg-primary text-on-primary hover:bg-[#E27A53]">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-canvas flex flex-col selection:bg-primary/30">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-border z-0" />
            {STEPS.map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-2 bg-canvas px-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${getStepClass(step, s.id)}`}>
                  {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span className={`text-xs font-medium uppercase tracking-wider ${step >= s.id ? 'text-text-main' : 'text-text-muted'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-1 border border-border rounded-lg p-6 md:p-10 min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl text-text-main">Choose a Sanctuary</h2>
                  <p className="text-text-mid mt-2">Select the Sendja outlet you wish to visit</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {OUTLETS.map(o => (
                    <div 
                      key={o.id}
                      onClick={() => setOutletId(o.id)}
                      className={`cursor-pointer border rounded-md p-5 transition-all ${outletId === o.id ? 'bg-primary/10 border-primary' : 'bg-surface-2 border-border hover:border-primary/50'}`}
                    >
                      <h3 className="font-serif text-xl text-text-main">{o.name}</h3>
                      <p className="text-sm text-text-muted mt-2 line-clamp-2">{o.address}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-6 border-t border-border mt-8">
                  <Button disabled={!outletId} onClick={handleNext} className="bg-primary text-on-primary">
                    Next Step <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl text-text-main">Select Treatment</h2>
                  <p className="text-text-mid mt-2">Available packages at {outlet?.name}</p>
                </div>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  {TREATMENTS.map(t => (
                    <div 
                      key={t.id}
                      onClick={() => setTreatmentId(t.id)}
                      className={`cursor-pointer border rounded-md p-5 transition-all flex justify-between items-center ${treatmentId === t.id ? 'bg-primary/10 border-primary' : 'bg-surface-2 border-border hover:border-primary/50'}`}
                    >
                      <div>
                        <h3 className="font-serif text-lg text-text-main">{t.name}</h3>
                        <p className="text-sm text-text-muted mt-1">{t.durationMinutes} mins</p>
                      </div>
                      <div className="text-accent-gold font-medium">
                        IDR {t.priceIdr.toLocaleString('id-ID')}
                      </div>
                    </div>
                  ))}
                </div>
                
                {treatmentId && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <Label className="text-text-main text-base block mb-3">Enhance your experience (Optional)</Label>
                    <div className="space-y-2">
                      {ADD_ONS.map(addon => (
                        <div 
                          key={addon.id} 
                          className={`flex items-center justify-between p-3 rounded-sm border cursor-pointer transition-colors ${selectedAddOns.includes(addon.id) ? 'border-primary bg-primary/10' : 'border-border bg-surface-2 hover:bg-surface-1'}`}
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
                            </div>
                          </div>
                          <span className="text-sm font-medium text-accent-gold">
                            +IDR {(addon.priceIdr).toLocaleString('id-ID')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t border-border mt-8">
                  <Button variant="ghost" onClick={handleBack} className="text-text-main hover:bg-surface-2">Back</Button>
                  <Button disabled={!treatmentId} onClick={handleNext} className="bg-primary text-on-primary">
                    Next Step <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl text-text-main">Date & Time</h2>
                  <p className="text-text-mid mt-2">When would you like to visit?</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Label className="mb-2 block text-text-mid">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border border-border bg-surface-2"
                      disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-text-mid">Available Times</Label>
                    <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {!date && (
                        <div className="col-span-3 text-sm text-text-muted py-8 text-center">Select a date to view available times.</div>
                      )}
                      {date && availableSlots.length === 0 && (
                        <div className="col-span-3 text-sm text-text-muted py-8 text-center">No slots available for this date.</div>
                      )}
                      {date && availableSlots.length > 0 && availableSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          variant="outline"
                          disabled={!slot.available}
                          onClick={() => setTime(slot.time)}
                          className={`text-sm py-2 px-0 rounded-sm ${getSlotClass(time || '', slot.time)}`}
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-6 border-t border-border mt-8">
                  <Button variant="ghost" onClick={handleBack} className="text-text-main hover:bg-surface-2">Back</Button>
                  <Button disabled={!date || !time} onClick={handleNext} className="bg-primary text-on-primary">
                    Next Step <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl text-text-main">Guest Details</h2>
                  <p className="text-text-mid mt-2">Almost done. Please provide your information.</p>
                </div>
                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <Label className="text-text-mid">Full Name</Label>
                    <Input 
                      value={guest.name} 
                      onChange={e => setGuest({...guest, name: e.target.value})} 
                      placeholder="Your Name"
                      className="bg-surface-2 border-border text-text-main mt-1 rounded-sm focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <Label className="text-text-mid">WhatsApp Number</Label>
                    <Input 
                      value={guest.phone} 
                      onChange={e => setGuest({...guest, phone: e.target.value})} 
                      placeholder="0812..."
                      className="bg-surface-2 border-border text-text-main mt-1 rounded-sm focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <Label className="text-text-mid">Special Notes (Optional)</Label>
                    <Input 
                      value={guest.notes} 
                      onChange={e => setGuest({...guest, notes: e.target.value})} 
                      placeholder="Any health conditions or preferred pressure?"
                      className="bg-surface-2 border-border text-text-main mt-1 rounded-sm focus-visible:ring-primary"
                    />
                  </div>

                  <div className="bg-surface-2 p-5 rounded-md border border-border mt-8">
                    <h4 className="font-medium text-text-main mb-4">Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Total Price</span>
                        <span className="text-accent-gold font-medium">IDR {totalPrice.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Duration</span>
                        <span className="text-text-main">{totalDuration} mins</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-6 border-t border-border mt-8">
                  <Button variant="ghost" onClick={handleBack} className="text-text-main hover:bg-surface-2">Back</Button>
                  <Button disabled={!guest.name || !guest.phone} onClick={handleConfirm} className="bg-primary text-on-primary hover:bg-[#E27A53]">
                    Confirm Booking
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  );
}
