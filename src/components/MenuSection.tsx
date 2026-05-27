"use client";

import { useState, useEffect, useRef } from "react";
import { defaultLocation } from "@/config/locations";
import type { MenuCategory } from "@/config/types";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const categories = defaultLocation.menu;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        section.querySelector("[data-menu-header]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    };

    init();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 sm:mb-16" data-menu-header>
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">
            Speisekarte
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight">
            Unser Angebot
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 sm:gap-3 mb-10 sm:mb-14 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-hide">
          {categories.map((cat: MenuCategory, i: number) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === i
                  ? "bg-accent text-warm-white"
                  : "bg-sand-light text-stone-dark hover:bg-sand"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-0">
          {categories[activeCategory].items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className={`group py-5 sm:py-6 ${
                i >= 6 ? "hidden sm:block" : ""
              } ${
                i < categories[activeCategory].items.length
                  ? "border-b border-sand-light"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base sm:text-lg font-medium text-charcoal group-hover:text-accent transition-colors duration-300">
                      {item.name}
                    </h3>
                    {item.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          tag === "Beliebt"
                            ? "bg-accent/10 text-accent"
                            : tag === "Vegan"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-sand-light text-stone-dark"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.description && (
                    <p className="text-sm text-muted mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.price && (
                  <span className="text-base sm:text-lg font-medium text-charcoal shrink-0 tabular-nums">
                    {item.price}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View full menu link */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-stone-dark transition-colors group"
          >
            Vollständige Karte ansehen
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
