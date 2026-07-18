"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar as CalendarIcon, Users, Settings, Clock, Coffee, Menu, X } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/appointments", label: "Appointments", icon: CalendarIcon },
    { href: "/admin/slots", label: "Slot Availability", icon: Clock },
    { href: "/admin/staff", label: "Staff & Rooms", icon: Users },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface-1 border-b border-border z-40 flex items-center justify-between px-4">
        <div className="flex flex-col">
          <Link href="/admin" className="font-serif text-xl text-text-main tracking-wider">
            SENDJA
          </Link>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-text-main hover:bg-surface-2 rounded-md transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-surface-1 border-r border-border h-screen flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <Link href="/admin" className="font-serif text-2xl text-text-main tracking-wider block">
              SENDJA
            </Link>
            <p className="text-xs text-accent-gold mt-1 uppercase tracking-widest font-medium">Workspace</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 text-text-muted hover:text-text-main hover:bg-surface-2 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-text-mid hover:text-text-main hover:bg-surface-2"
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-text-muted"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border mt-auto flex flex-col gap-2">
          <Link 
            href="/admin/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              pathname === "/admin/settings"
                ? "bg-primary/10 text-primary font-medium" 
                : "text-text-mid hover:text-text-main hover:bg-surface-2"
            }`}
          >
            <Settings className={`w-5 h-5 ${pathname === "/admin/settings" ? "text-primary" : "text-text-muted"}`} />
            System Settings
          </Link>
          <div className="flex items-center gap-3 px-4 py-2 mt-2">
            <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center text-text-main shrink-0">
              <Coffee className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-text-main truncate">Admin User</p>
              <p className="text-xs text-text-muted truncate">Headquarters</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
