"use client";

import { useState } from "react";
import { defaultLocation } from "@/config/locations";
import type { MenuCategory } from "@/config/types";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = defaultLocation.menu;

  return (
    <>
      {/* Hero banner */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 bg-cream">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">
            {defaultLocation.name}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal tracking-tight">
            Speisekarte
          </h1>
        </div>
      </section>

      {/* Menu content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Category tabs */}
          <div className="sticky top-18 lg:top-20 z-20 bg-background/90 backdrop-blur-md py-4 -mx-5 px-5 sm:mx-0 sm:px-0 mb-8">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide">
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
          </div>

          {/* Items */}
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-charcoal mb-8">
              {categories[activeCategory].name}
            </h2>

            <div className="space-y-0">
              {categories[activeCategory].items.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="group py-5 sm:py-6 border-b border-sand-light"
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
          </div>
        </div>
      </section>
    </>
  );
}
