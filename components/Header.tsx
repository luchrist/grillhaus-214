"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { restaurant } from "@/lib/restaurant";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/ueber-uns", label: "Über Uns" },
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D0D0D]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.6)] border-b border-[#C9A058]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-[2px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/assets/logo-mark.png"
                alt={`${restaurant.shortName} Logo`}
                className="h-20 w-20 md:h-28 md:w-28 object-contain transition-transform group-hover:scale-105 duration-300"
              />
              <div className="flex flex-col">
                <span className="font-serif-kr text-2xl md:text-3xl font-semibold text-[#F8F3EE] leading-none tracking-wide">
                  {restaurant.shortName}
                </span>
                <span className="text-[11px] md:text-xs text-[#C9A058] tracking-[0.2em] uppercase leading-none mt-1">
                  Türkischer Grill, Eppelheim
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors duration-200 relative group ${
                    pathname === link.href
                      ? "text-[#C9A058]"
                      : "text-[#E8E0D5] hover:text-[#C9A058]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#C9A058] transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
              <Link
                href="/speisekarte"
                className="bg-[#B91C1C] text-white text-sm px-5 py-2 rounded-sm font-medium tracking-wide hover:bg-[#991b1b] transition-colors duration-200"
              >
                Speisekarte
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menü öffnen"
            >
              <span className="block w-6 h-px bg-[#E8E0D5]" />
              <span className="block w-5 h-px bg-[#E8E0D5]" />
              <span className="block w-6 h-px bg-[#E8E0D5]" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        currentPath={pathname}
      />
    </>
  );
}
