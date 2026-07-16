"use client";
import { useState } from "react";
import { Navbar } from "@/components/sanctuary/Navbar";
import { Hero } from "@/components/sanctuary/Hero";
import { TreatmentCard } from "@/components/sanctuary/TreatmentCard";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { TREATMENTS } from "@/lib/mock-data";

export default function Home() {
  const [isWizardOpen, setWizardOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);

  const handleBook = (treatmentId: string) => {
    setSelectedTreatment(treatmentId);
    setWizardOpen(true);
  };

  return (
    <main className="min-h-screen bg-canvas selection:bg-primary/30 text-text-main pb-12">
      <Navbar />
      
      <Hero />
      
      <section id="treatments" className="py-24 px-6 bg-surface-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">Sensory Catalog</span>
            <div className="h-[1px] w-24 bg-border"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TREATMENTS.map(t => (
              <TreatmentCard 
                key={t.id}
                id={t.id}
                name={t.name}
                description={t.description}
                durationMinutes={t.durationMinutes}
                priceIdr={t.priceIdr}
                onBook={handleBook}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border text-center text-text-muted mt-24">
        <p className="font-serif text-xl text-text-main mb-4">SENDJA</p>
        <p className="text-sm">© 2026 Sendja Reflexology. All rights reserved.</p>
      </footer>

      {isWizardOpen && (
        <BookingWizard 
          isOpen={isWizardOpen} 
          onClose={() => { setWizardOpen(false); setSelectedTreatment(null); }} 
          initialTreatmentId={selectedTreatment} 
        />
      )}
    </main>
  );
}
