"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { defaultLocation } from "@/config/locations";

export default function PhotoCollage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const items = section.querySelectorAll("[data-collage-item]");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
            delay: i * 0.08,
          }
        );
      });
    };

    init();
  }, []);

  const images = defaultLocation.galleryImages;

  if (images.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">
            Einblicke
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight">
            Unser Restaurant
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div
              data-collage-item
              className="flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-[520px] rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <Image
                src={images[0]}
                alt="Außenansicht des Grillhaus 214 in Eppelheim"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div
              data-collage-item
              className="h-[280px] sm:h-[360px] lg:h-[440px] rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <Image
                src={images[5]}
                alt="Eingang und Bestelltresen des Grillhaus 214"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div
                data-collage-item
                className="h-[195px] sm:h-[254px] lg:h-[300px] rounded-2xl overflow-hidden relative group cursor-pointer"
              >
                <Image
                  src={images[1]}
                  alt="Türkische Grillspezialitäten vom Drehspieß"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div
                data-collage-item
                className="h-[195px] sm:h-[254px] lg:h-[300px] rounded-2xl overflow-hidden relative group cursor-pointer"
              >
                <Image
                  src={images[2]}
                  alt="Fassade des Grillhaus 214 mit Speisenangebot"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>

            <div
              data-collage-item
              className="h-[260px] sm:h-[360px] lg:h-[460px] rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <Image
                src={images[3]}
                alt="Frisch zubereitete türkische Grillgerichte"
                fill
                style={{ objectPosition: "center 20%" }}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div
              data-collage-item
              className="h-[220px] sm:h-[280px] lg:h-[340px] rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <Image
                src={images[4]}
                alt="Drehspieß mit Hähnchen- und Kalbfleisch"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
