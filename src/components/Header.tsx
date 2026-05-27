"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [pastHeroStart, setPastHeroStart] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrolled = !isHome || pastHeroStart;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isHome) {
      return;
    }
    const onScroll = () => setPastHeroStart(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        mounted && (scrolled || mobileOpen)
          ? "bg-warm-white shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="relative z-[70] mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex h-18 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="relative z-10 shrink-0 flex items-center gap-3"
          >
            <Image
              src="/assets/logo-mark.png"
              alt="Grillhaus 214"
              width={82}
              height={82}
              className={`transition-all duration-500 ${
                scrolled ? "w-16 h-16 lg:w-18 lg:h-18" : "w-18 h-18 lg:w-20 lg:h-20 sm:brightness-0 sm:invert"
              }`}
              priority
            />
            <span
              className={`font-display font-medium text-lg tracking-tight transition-colors duration-500 ${
                scrolled ? "text-charcoal" : "text-charcoal sm:text-warm-white"
              }`}
            >
              Grillhaus 214
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/menu"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-charcoal hover:bg-sand-light"
                  : "text-warm-white hover:bg-white/10"
              }`}
            >
              Speisekarte
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-charcoal hover:bg-sand-light"
                  : "text-warm-white hover:bg-white/10"
              }`}
            >
              Kontakt
            </Link>
            <a
              href="tel:+4915209290915"
              className={`ml-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "bg-accent text-warm-white hover:bg-accent-light"
                  : "bg-warm-white/15 text-warm-white backdrop-blur-sm hover:bg-warm-white/25 border border-white/20"
              }`}
            >
              Jetzt anrufen
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 lg:hidden p-2 rounded-full text-charcoal"
            aria-label={mobileOpen ? "Menu schliessen" : "Menu oeffnen"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] bg-current transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-18 bottom-0 z-[60] bg-warm-white transition-transform duration-500 ease-out ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 font-display text-2xl font-light text-charcoal"
            >
              Startseite
            </Link>
            <Link
              href="/menu"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 font-display text-2xl font-light text-charcoal"
            >
              Speisekarte
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 font-display text-2xl font-light text-charcoal"
            >
              Kontakt
            </Link>
          </div>

          <a
            href="tel:+4915209290915"
            className="mt-6 inline-flex w-fit px-8 py-3 rounded-full bg-accent text-warm-white text-sm font-medium"
          >
            Jetzt anrufen
          </a>
        </div>
      </div>
    </header>
  );
}
