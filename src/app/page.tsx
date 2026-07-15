import { Navbar } from "@/components/sanctuary/Navbar";
import { Hero } from "@/components/sanctuary/Hero";
import { TreatmentHighlights } from "@/components/sanctuary/TreatmentHighlights";
import { ExperienceSection } from "@/components/sanctuary/ExperienceSection";
import { OutletSection } from "@/components/sanctuary/OutletSection";
import { Footer } from "@/components/sanctuary/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas selection:bg-primary/30 text-text-main">
      <Navbar />
      <Hero />
      <TreatmentHighlights />
      <ExperienceSection />
      <OutletSection />
      <Footer />
    </main>
  );
}
