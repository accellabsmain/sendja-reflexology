"use client";
import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { OUTLETS } from "@/lib/outlets";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function OutletSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section id="outlets" className="py-24 md:py-32 bg-canvas overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">
                Our Sanctuaries
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-text-main leading-tight">
              Temukan Sendja<br className="hidden md:block" /> Terdekat
            </h2>
          </div>
          <Link href="/outlets">
            <span className="inline-flex items-center gap-3 text-primary hover:text-[#E27A53] transition-colors font-semibold text-sm md:text-base tracking-wide cursor-pointer pb-2">
              Lihat Semua Outlet
              <span className="text-xl" aria-hidden="true">→</span>
            </span>
          </Link>
        </motion.div>

        {/* Carousel Slider */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {OUTLETS.map((outlet) => (
                <CarouselItem key={outlet.id} className="pl-4 md:pl-6 basis-[85%] md:basis-1/2 lg:basis-1/3">
                  <div className="group h-full flex flex-col bg-surface-1 border border-border rounded-md p-6 md:p-8 hover:border-primary/40 hover:bg-surface-2 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-serif text-xl md:text-2xl text-text-main group-hover:text-primary transition-colors">
                          {outlet.name}
                        </h3>
                        {outlet.tagline && (
                          <span className="inline-block mt-2 text-xs text-accent-gold tracking-wider uppercase bg-accent-gold/10 px-2 py-0.5 rounded-sm">
                            {outlet.tagline}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-text-muted tracking-wider uppercase bg-surface-2 px-2 py-1 rounded-sm border border-border/50">
                        {outlet.city}
                      </span>
                    </div>

                    <p className="text-sm md:text-base text-text-mid mt-4 mb-8 flex-1">{outlet.address}</p>

                    <div className="flex items-center gap-6 text-sm font-medium border-t border-border pt-6 mt-auto">
                      <Link
                        href={outlet.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-[#E27A53] transition-colors"
                      >
                        RSVP →
                      </Link>
                      <Link
                        href={outlet.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-main transition-colors"
                      >
                        Lokasi →
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Arrows */}
            <div className="hidden lg:block">
              <CarouselPrevious className="left-[-4rem] h-12 w-12 bg-transparent border border-border text-text-main hover:bg-surface-2 hover:border-primary hover:text-primary transition-all rounded-full" variant="ghost" />
              <CarouselNext className="right-[-4rem] h-12 w-12 bg-transparent border border-border text-text-main hover:bg-surface-2 hover:border-primary hover:text-primary transition-all rounded-full" variant="ghost" />
            </div>
          </Carousel>

          {/* Dot Pagination */}
          <div className="flex justify-center items-center gap-3 mt-10">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current - 1 
                    ? "bg-primary w-8" 
                    : "bg-border hover:bg-text-muted w-2"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
