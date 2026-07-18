"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex items-end pb-24 md:pb-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/hero.webp"
            alt="Sendja Reflexology & Wellness"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/70 to-transparent" />
        <div className="absolute inset-0 bg-canvas/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
              Family Reflexology & Wellness Spa
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-serif text-text-main leading-[1.1] tracking-tight">
            Sendja, suatu kala<br />yang menenangkan.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-mid max-w-lg leading-relaxed font-light">
            Sebuah pertanda bahwa tibalah masa bagi kita untuk berhenti sejenak,
            melepas letih dari karya upaya sepanjang hari.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <Link href="#treatments">
              <Button className="bg-primary text-on-primary hover:bg-[#E27A53] rounded-sm font-semibold px-8 py-6 text-base">
                Lihat Treatments
              </Button>
            </Link>
            <Link href="#outlets">
              <Button variant="outline" className="border-[rgba(244,241,234,0.2)] text-text-main hover:bg-[rgba(244,241,234,0.05)] hover:border-text-main rounded-sm px-8 py-6 text-base">
                Temukan Outlet
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
