"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const HIGHLIGHTS = [
  {
    category: "Signature Massage",
    title: "Sendja Massage",
    description: "Pijatan badan full dari kepala hingga kaki khas Sendja untuk meregangkan otot-otot, memperlancar peredaran darah, dan melepas stress.",
    price: "180K",
    duration: "60/90 min",
    image: "/hot-stone.jpg",
  },
  {
    category: "Reflexology",
    title: "Sendja Reflexology",
    description: "Pijatan refleksi khas Sendja dengan penekanan pada titik-titik acupressure, memberikan relaksasi dan melepas lelah.",
    price: "110K",
    duration: "60 min",
    image: "/spa-oils.png",
  },
  {
    category: "Spa Package",
    title: "Kala Sendja",
    description: "Kombinasi Aroma Sendja Massage dilengkapi dengan mandi rendam dalam private room dengan bath tub.",
    price: "385K",
    duration: "120 min",
    image: "/spa-bathtub.png",
  },
];

export function TreatmentHighlights() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="treatments" className="py-32 px-6 bg-surface-1 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6 mb-20 text-center"
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
              Sensory Catalog
            </span>
            <div className="h-[1px] w-12 bg-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-text-main">
            Pilihan Perawatan
          </h2>
          <p className="text-text-mid text-lg max-w-xl">
            Dari pijatan khas Sendja hingga paket spa mewah dengan mandi rendam, 
            setiap perawatan dirancang untuk memulihkan tubuh dan pikiran.
          </p>
        </motion.div>

        {/* Highlight Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {HIGHLIGHTS.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group bg-surface-2 border border-border rounded-md overflow-hidden hover:border-primary/40 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent-gold bg-canvas/60 backdrop-blur-sm px-3 py-1 rounded-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-2xl text-text-main group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-base font-semibold text-text-main">
                      IDR {item.price}
                    </div>
                    <div className="text-xs text-text-muted">{item.duration}</div>
                  </div>
                </div>
                <p className="text-sm text-text-mid leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA to full menu */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <Link href="/treatments">
            <span className="inline-flex items-center gap-3 text-primary hover:text-[#E27A53] transition-colors font-semibold text-base tracking-wide cursor-pointer">
              Lihat Seluruh Menu & Harga
              <span className="text-xl" aria-hidden="true">→</span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
