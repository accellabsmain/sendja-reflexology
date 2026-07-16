"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 50;
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <nav
        className={`nav-island backdrop-blur-md border py-4 px-8 rounded-full flex items-center justify-between w-full max-w-4xl transition-all duration-500 ${scrolled
            ? "bg-surface-glass border-[rgba(244,241,234,0.1)] shadow-2xl"
            : "bg-transparent border-transparent shadow-none"
          }`}
      >
        <Link href="/" className="font-serif text-xl text-text-main tracking-wider">
          SENDJA
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-text-mid font-medium">
          <Link href="/experience" className="hover:text-primary transition-colors">
            Experience
          </Link>
          <Link href="/treatments" className="hover:text-primary transition-colors">
            Treatments
          </Link>
          <Link href="/outlets" className="hover:text-primary transition-colors">
            Outlets
          </Link>
        </div>
        <Link href="/reserve">
          <Button className="bg-primary text-on-primary hover:bg-[#E27A53] rounded-sm font-semibold px-6">
            Reserve
          </Button>
        </Link>
      </nav>
    </div>
  );
}
