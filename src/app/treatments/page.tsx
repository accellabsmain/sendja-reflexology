"use client";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Navbar } from "@/components/sanctuary/Navbar";
import { Footer } from "@/components/sanctuary/Footer";
import { TreatmentCard } from "@/components/sanctuary/TreatmentCard";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { TREATMENTS, ADD_ONS } from "@/lib/mock-data";

const CATEGORIES = ["SIGNATURE MASSAGE", "REFLEXOLOGY", "SIGNATURE TREATMENT", "SIGNATURE SPA PACKAGE"];

export default function TreatmentsPage() {
  const [isWizardOpen, setWizardOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);

  const handleBook = (treatmentId: string) => {
    setSelectedTreatment(treatmentId);
    setWizardOpen(true);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-canvas selection:bg-primary/30 text-text-main overflow-hidden">
      <Navbar />

      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 bg-canvas text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
              Menu & Pricelist
            </span>
            <div className="h-[1px] w-12 bg-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-text-main">
            Pilihan Perawatan
          </h1>
          <p className="text-text-mid text-lg max-w-2xl mx-auto">
            Seluruh perawatan dirancang khusus untuk memulihkan tubuh dan pikiran Anda.
            Harga dalam ribuan Rupiah.
          </p>
        </motion.div>
      </section>

      {/* Treatment Categories */}
      <section className="pb-32 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto space-y-24">
          {CATEGORIES.map((category) => {
            const items = TREATMENTS.filter((t) => t.category === category);
            if (items.length === 0) return null;
            return (
              <motion.div 
                key={category} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="space-y-12"
              >
                <div className="flex items-center gap-4">
                  <span className="text-accent-gold text-sm font-serif tracking-[0.2em] uppercase whitespace-nowrap">
                    {category}
                  </span>
                  <div className="h-[1px] flex-1 bg-border" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((t) => (
                    <motion.div key={t.id} variants={itemVariants}>
                      <TreatmentCard
                        id={t.id}
                        name={t.name}
                        description={t.description}
                        durationMinutes={t.durationMinutes}
                        priceIdr={t.priceIdr}
                        onBook={handleBook}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Add-Ons Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="flex items-center gap-4">
              <span className="text-accent-gold text-sm font-serif tracking-[0.2em] uppercase whitespace-nowrap">
                Add-On
              </span>
              <div className="h-[1px] flex-1 bg-border" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ADD_ONS.map((addon, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-surface-1 border border-border rounded-md p-5 flex justify-between items-center hover:border-primary/40 hover:bg-surface-2 transition-all duration-300"
                >
                  <div>
                    <h3 className="text-base text-text-main font-medium">{addon.name}</h3>
                    <span className="text-xs text-text-muted">{addon.durationMinutes > 0 ? `${addon.durationMinutes} min` : '—'}</span>
                  </div>
                  <span className="text-base font-semibold text-accent-gold shrink-0 ml-4">
                    +{(addon.priceIdr / 1000)}K
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {isWizardOpen && (
        <BookingWizard
          isOpen={isWizardOpen}
          onClose={() => {
            setWizardOpen(false);
            setSelectedTreatment(null);
          }}
          initialTreatmentId={selectedTreatment}
        />
      )}
    </main>
  );
}
