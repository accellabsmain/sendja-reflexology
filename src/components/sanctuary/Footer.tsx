import Link from "next/link";
import { OUTLETS, SOCIAL_LINKS } from "@/lib/outlets";

export function Footer() {
  return (
    <footer className="bg-surface-1 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl tracking-widest text-text-main">SENDJA</h3>
            <p className="text-sm text-text-mid leading-relaxed">
              Family Reflexology & Wellness Spa. Hadir sejak 2022 untuk menjadi tempat 
              peristirahatan Anda dari hiruk pikuk keseharian.
            </p>
            <div className="flex gap-4">
              <Link href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors text-sm">
                TikTok
              </Link>
              <Link href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors text-sm">
                Instagram
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-accent-gold">
              Menu
            </h4>
            <div className="space-y-3">
              <Link href="/treatments" className="block text-sm text-text-mid hover:text-primary transition-colors">
                Semua Treatments
              </Link>
              <Link href="#outlets" className="block text-sm text-text-mid hover:text-primary transition-colors">
                Lokasi Outlet
              </Link>
              <Link href={SOCIAL_LINKS.partnershipForm} target="_blank" rel="noopener noreferrer" className="block text-sm text-text-mid hover:text-primary transition-colors">
                Partnership & Franchise
              </Link>
              <Link href={SOCIAL_LINKS.feedbackForm} target="_blank" rel="noopener noreferrer" className="block text-sm text-text-mid hover:text-primary transition-colors">
                Feedback Form
              </Link>
            </div>
          </div>

          {/* Outlets Summary */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-accent-gold">
              Outlet Kami
            </h4>
            <div className="space-y-3">
              {OUTLETS.map((o) => (
                <Link
                  key={o.id}
                  href={o.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-text-mid hover:text-primary transition-colors"
                >
                  {o.name} {o.tagline ? `(${o.tagline})` : ""}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © 2026 Sendja Reflexology & Wellness. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Open Daily · 10:00 — 22:00 WIB
          </p>
        </div>
      </div>
    </footer>
  );
}
