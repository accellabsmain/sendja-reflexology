import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <nav className="nav-island bg-surface-glass backdrop-blur-md border border-[rgba(244,241,234,0.1)] py-4 px-8 rounded-full flex items-center justify-between w-full max-w-4xl shadow-2xl">
        <Link href="/" className="font-serif text-xl text-text-main tracking-wider">
          SENDJA
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-text-mid font-medium">
          <Link href="#treatments" className="hover:text-primary transition-colors">Treatments</Link>
          <Link href="#philosophy" className="hover:text-primary transition-colors">Philosophy</Link>
        </div>
        <Button className="bg-primary text-on-primary hover:bg-primary-hover rounded-sm font-semibold px-6">
          Reserve
        </Button>
      </nav>
    </div>
  );
}
