"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export function ExperienceSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="experience" className="py-32 px-6 bg-surface-1 border-t border-border overflow-hidden">
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
              The Sanctuary
            </span>
            <div className="h-[1px] w-12 bg-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-text-main">
            Pengalaman Sendja
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Large Feature */}
          <motion.div variants={itemVariants} className="relative aspect-[3/4] md:aspect-auto md:row-span-2 rounded-lg overflow-hidden group">
            <Image
              src="/room-interior.jpg"
              alt="Sendja treatment room interior with teak furniture"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-canvas/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
                Private Treatment Rooms
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-text-main mt-3 leading-tight">
                Ruangan eksklusif dengan suasana twilight yang menenangkan
              </h3>
              <p className="text-text-mid text-sm mt-3 max-w-sm">
                Setiap ruangan dirancang untuk memberikan privasi dan kenyamanan 
                maksimal dengan furniture kayu jati dan aroma terapi pilihan.
              </p>
            </div>
          </motion.div>

          {/* Top right */}
          <motion.div variants={itemVariants} className="relative aspect-[16/10] rounded-lg overflow-hidden group">
            <Image
              src="/spa-amenities.jpg"
              alt="Sendja spa amenities and natural products"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
                Natural Products
              </span>
              <h3 className="font-serif text-xl text-text-main mt-2">
                Produk alami dan ramuan tradisional
              </h3>
            </div>
          </motion.div>

          {/* Bottom right */}
          <motion.div variants={itemVariants} className="relative aspect-[16/10] rounded-lg overflow-hidden group">
            <Image
              src="/room-detail.jpg"
              alt="Sendja spa rattan furniture detail"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
                Artisan Craftsmanship
              </span>
              <h3 className="font-serif text-xl text-text-main mt-2">
                Detail interior yang terinspirasi budaya Nusantara
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
