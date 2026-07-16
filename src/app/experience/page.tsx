"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Navbar } from "@/components/sanctuary/Navbar";
import { Footer } from "@/components/sanctuary/Footer";

export default function ExperiencePage() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const imageVariant: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-canvas selection:bg-primary/30 text-text-main overflow-hidden">
      <Navbar />

      <section className="pt-40 pb-20 px-6 bg-canvas text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
              The Experience
            </span>
            <div className="h-[1px] w-12 bg-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-text-main">
            Filosofi Sendja
          </h1>
          <p className="text-text-mid text-lg max-w-2xl mx-auto">
            Sebuah apresiasi teruntuk kamu yang telah memberikan yang terbaik dan berjuang tanpa kenal lelah.
          </p>
        </motion.div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
          
          {/* Feature 1 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
          >
            <motion.div variants={imageVariant} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src="/room-interior.jpg"
                alt="Private Treatment Rooms"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <motion.div variants={fadeUpVariant} className="space-y-4 md:space-y-6 md:pr-12">
              <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
                Privacy & Comfort
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-text-main leading-tight">
                Ruangan Eksklusif
              </h2>
              <p className="text-text-mid text-base md:text-lg leading-relaxed">
                Setiap ruangan dirancang untuk memberikan privasi dan kenyamanan maksimal. Dengan pencahayaan remang bergaya twilight, arsitektur kayu jati, dan alunan nada yang menenangkan, pikiran Anda akan dibawa jauh dari hiruk pikuk kota.
              </p>
            </motion.div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
          >
            <motion.div variants={imageVariant} className="relative aspect-[4/3] rounded-lg overflow-hidden group md:order-2">
              <Image
                src="/spa-amenities.jpg"
                alt="Natural Products"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <motion.div variants={fadeUpVariant} className="space-y-4 md:space-y-6 md:pl-12 md:order-1">
              <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
                Natural Ingredients
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-text-main leading-tight">
                Ramuan Nusantara
              </h2>
              <p className="text-text-mid text-base md:text-lg leading-relaxed">
                Kami menggunakan lulur, boreh, dan essential oil berbahan dasar alami yang terinspirasi dari kearifan lokal. Bahan-bahan ini secara aktif membantu meremajakan kulit, mengangkat racun, dan memberikan kehangatan alami pada tubuh.
              </p>
            </motion.div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
          >
            <motion.div variants={imageVariant} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src="/room-detail.jpg"
                alt="Artisan Craftsmanship"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <motion.div variants={fadeUpVariant} className="space-y-4 md:space-y-6 md:pr-12">
              <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
                Attention to Detail
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-text-main leading-tight">
                Sentuhan Khas
              </h2>
              <p className="text-text-mid text-base md:text-lg leading-relaxed">
                Dari rotan rajutan tangan hingga pilihan batu alam di area basah, kami memastikan setiap tekstur yang Anda sentuh membawa pesan ketenangan. Terapis kami dilatih khusus untuk memberikan tekanan yang pas sesuai dengan kebutuhan raga Anda.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
