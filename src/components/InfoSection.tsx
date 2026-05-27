"use client";

import { useEffect, useRef } from "react";
import { defaultLocation } from "@/config/locations";

export default function InfoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cols = section.querySelectorAll("[data-info-col]");
      cols.forEach((col, i) => {
        gsap.fromTo(
          col,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: col,
              start: "top 85%",
            },
            delay: i * 0.15,
          }
        );
      });
    };

    init();
  }, []);

  const loc = defaultLocation;

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">
            Besuche uns
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight">
            Öffnungszeiten & Kontakt
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Opening hours */}
          <div
            data-info-col
            className="bg-cream rounded-2xl p-7 sm:p-8 border border-sand-light/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-charcoal">
                Öffnungszeiten
              </h3>
            </div>
            <div className="space-y-4">
              {loc.openingHours.map((hours) => (
                <div
                  key={hours.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-muted">{hours.label}</span>
                  <span className={`text-sm font-medium tabular-nums ${hours.times === "Geschlossen" ? "text-accent" : "text-charcoal"}`}>
                    {hours.times}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div
            data-info-col
            className="bg-cream rounded-2xl p-7 sm:p-8 border border-sand-light/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-charcoal">Adresse</h3>
            </div>
            <address className="not-italic space-y-1.5 text-sm text-muted leading-relaxed">
              <p className="text-charcoal font-medium">{loc.name}</p>
              <p>{loc.address.street}</p>
              <p>
                {loc.address.zip} {loc.address.city}
              </p>
            </address>
            <a
              href={loc.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-accent hover:text-stone-dark transition-colors group"
            >
              In Google Maps öffnen
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>

          {/* Contact */}
          <div
            data-info-col
            className="bg-cream rounded-2xl p-7 sm:p-8 border border-sand-light/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-charcoal">Kontakt</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted mb-1">
                  Telefon
                </p>
                <a
                  href={loc.phoneLink}
                  className="text-sm text-charcoal hover:text-accent transition-colors"
                >
                  {loc.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
