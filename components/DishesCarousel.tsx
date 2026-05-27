"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { featuredDishes } from "@/lib/featured-dishes";

export default function DishesCarousel() {
  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [autoplayPlugin]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container gap-4 md:gap-6">
          {featuredDishes.map((dish) => (
            <div
              key={dish.name}
              className="embla__slide embla__slide--third px-1"
            >
              <div className="bg-[#1A1414] rounded-sm overflow-hidden border border-[#C9A058]/10 hover:border-[#C9A058]/30 transition-all duration-300 h-full flex flex-col group">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1414] via-transparent to-transparent" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-2">
                    <h3 className="font-serif-kr text-[#C9A058] text-xl font-semibold leading-tight">
                      {dish.name}
                    </h3>
                  </div>
                  <p className="text-[#E8E0D5]/65 text-sm leading-relaxed flex-1">
                    {dish.description}
                  </p>
                  {dish.price && (
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[#B91C1C] text-sm font-medium">{dish.price}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-[#0D0D0D] border border-[#C9A058]/20 rounded-full flex items-center justify-center text-[#C9A058] hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all duration-200 hidden md:flex shadow-lg"
        aria-label="Vorheriges Gericht"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-[#0D0D0D] border border-[#C9A058]/20 rounded-full flex items-center justify-center text-[#C9A058] hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all duration-200 hidden md:flex shadow-lg"
        aria-label="Nächstes Gericht"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center gap-3 mt-6 md:hidden">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 bg-[#111111] border border-[#C9A058]/20 rounded-full flex items-center justify-center text-[#C9A058]"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          className="w-10 h-10 bg-[#111111] border border-[#C9A058]/20 rounded-full flex items-center justify-center text-[#C9A058]"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
