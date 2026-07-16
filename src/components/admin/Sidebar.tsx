"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar as CalendarIcon, Users, Settings, Clock, Coffee } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/appointments", label: "Appointments", icon: CalendarIcon },
    { href: "/admin/slots", label: "Slot Availability", icon: Clock },
    { href: "/admin/staff", label: "Staff & Rooms", icon: Users },
  ];

  return (
    <aside className="w-64 bg-surface-1 border-r border-border h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-border">
        <Link href="/" className="font-serif text-2xl text-text-main tracking-wider block">
          SENDJA
        </Link>
        <p className="text-xs text-accent-gold mt-1 uppercase tracking-widest font-medium">Workspace</p>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2">
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
          <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center text-text-main">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-main">Admin User</p>
            <p className="text-xs text-text-muted">Headquarters</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
