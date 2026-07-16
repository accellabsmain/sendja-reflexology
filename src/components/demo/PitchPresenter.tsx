"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSendjaBookings } from "@/hooks/useLocalStorage";
import { useDemoSettings } from "@/hooks/useDemoSettings";
import { generateSeedBookings } from "@/lib/seed-data";

export function PitchPresenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { saveBookings, clearBookings } = useSendjaBookings();
  const { simulateBusy, toggleBusyHours } = useDemoSettings();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + D
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSeed = () => {
    saveBookings(generateSeedBookings());
    alert("Mock data seeded successfully.");
    setIsOpen(false);
  };

  const handleReset = () => {
    clearBookings();
    alert("All bookings cleared.");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px] bg-surface-2 border-border text-text-main">
        <DialogHeader>
          <DialogTitle className="text-accent-gold uppercase tracking-widest text-sm">Demo Mode</DialogTitle>
          <DialogDescription className="sr-only">Pitch presenter magic tools</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Button onClick={handleSeed} variant="outline" className="w-full justify-start text-text-main border-border hover:bg-white/5">
            🌱 Seed Mock Data
          </Button>
          <Button onClick={handleReset} variant="outline" className="w-full justify-start text-destructive border-border hover:bg-destructive/10">
            🗑️ Reset State (Clear All)
          </Button>
          <Button onClick={toggleBusyHours} variant="outline" className="w-full justify-start text-text-main border-border hover:bg-white/5">
            🔥 Simulate Busy Hours: {simulateBusy ? "ON" : "OFF"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
