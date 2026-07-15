"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Navbar } from "@/components/sanctuary/Navbar";
import { Footer } from "@/components/sanctuary/Footer";
import { OUTLETS } from "@/lib/outlets";

export default function OutletsPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-canvas selection:bg-primary/30 text-text-main overflow-hidden">
      <Navbar />

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
              Locations
            </span>
            <div className="h-[1px] w-12 bg-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-text-main">
            Our Sanctuaries
          </h1>
          <p className="text-text-mid text-lg max-w-2xl mx-auto">
            Hadir di berbagai lokasi strategis di Bandung dan Jakarta untuk menjadi tempat peristirahatan Anda dari hiruk pikuk keseharian.
          </p>
        </motion.div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Featured Location */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden"
          >
            <Image
              src="/spa-exterior.png"
              alt="Sendja Wellness Sanctuary exterior at twilight"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12">
              <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase bg-canvas/80 backdrop-blur-sm px-3 py-1 rounded-sm inline-block">
                Headquarters
              </span>
              <h2 className="text-text-main text-3xl md:text-5xl font-serif mt-4">
                Sendja Dago, Bandung
              </h2>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {OUTLETS.map((outlet) => (
              <motion.div
                key={outlet.id}
                variants={itemVariants}
                className="group bg-surface-1 border border-border rounded-md p-6 md:p-8 hover:border-primary/40 hover:bg-surface-2 transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif text-2xl text-text-main group-hover:text-primary transition-colors">
                      {outlet.name}
                    </h3>
                    {outlet.tagline && (
                      <span className="inline-block mt-2 text-xs text-accent-gold tracking-wider uppercase bg-accent-gold/10 px-2 py-0.5 rounded-sm">
                        {outlet.tagline}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-base text-text-mid mb-8 flex-1">{outlet.address}</p>

                <div className="space-y-4 mt-auto">
                  <div className="flex items-center justify-between text-sm text-text-muted border-b border-border pb-4">
                    <span>Phone</span>
                    <span className="text-text-main font-medium">{outlet.phone}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-sm font-medium pt-2">
                    <Link
                      href={outlet.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-primary text-on-primary hover:bg-[#E27A53] py-2.5 rounded-sm transition-colors"
                    >
                      RSVP
                    </Link>
                    <Link
                      href={outlet.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center border border-border text-text-main hover:bg-white/5 py-2.5 rounded-sm transition-colors"
                    >
                      Maps
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
