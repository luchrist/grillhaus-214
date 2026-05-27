"use client";

import Image from "next/image";
import { defaultLocation } from "@/config/locations";

export default function DishCarousel() {
  const dishes = defaultLocation.dishes;

  if (dishes.length === 0) return null;

  const duplicated = [...dishes, ...dishes];

  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">
          Unsere Favoriten
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight">
          Was unsere Gäste lieben
        </h2>
      </div>

      {/* Infinite scroll carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="carousel-track flex gap-5 w-max">
          {duplicated.map((dish, i) => (
            <div
              key={`${dish.name}-${i}`}
              className="shrink-0 w-56 sm:w-64 group"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone/20">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 224px, 256px"
                />

                {/* Name overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-warm-white text-sm font-medium">
                    {dish.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
