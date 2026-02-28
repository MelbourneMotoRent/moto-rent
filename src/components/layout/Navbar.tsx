"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Car, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Our Fleet",    href: "#fleet" },
  { label: "How It Works", href: "#features" },
  { label: "Locations",    href: "#locations" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center shadow-md group-hover:bg-amber-600 transition-colors">
            <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span
            className={cn(
              "font-display font-bold text-xl transition-colors",
              scrolled ? "text-slate-900" : "text-white"
            )}
          >
            Mel<span className={scrolled ? "text-amber-500" : "text-amber-400"}>Drive</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-amber-500",
                  scrolled ? "text-slate-600" : "text-white/90"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+61396001234"
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-amber-500",
              scrolled ? "text-slate-500" : "text-white/70"
            )}
          >
            <Phone className="w-3.5 h-3.5" />
            (03) 9600 1234
          </a>
          <a
            href="#fleet"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "md:hidden p-2 rounded-xl transition-colors",
            scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
          )}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-6 py-3.5 text-slate-700 font-semibold hover:bg-amber-50 hover:text-amber-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="px-6 pt-3 pb-2">
              <a
                href="#fleet"
                onClick={() => setOpen(false)}
                className="block w-full text-center py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
