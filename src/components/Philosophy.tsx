"use client";

import { useEffect, useRef } from "react";
import { defaultLocation } from "@/config/locations";

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const elements = section.querySelectorAll("[data-reveal]");
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          }
        );
      });
    };

    init();
  }, []);

  const { philosophy } = defaultLocation;

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-40 bg-cream"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12 text-center">
        {/* Oriental decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-10" data-reveal>
          <span className="block w-12 h-px bg-gold" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold">
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              fill="currentColor"
              opacity="0.7"
            />
          </svg>
          <span className="block w-12 h-px bg-gold" />
        </div>

        <h2
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight mb-8"
          data-reveal
        >
          {philosophy.headline}
        </h2>

        <p
          className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-12"
          data-reveal
        >
          {philosophy.text}
        </p>

        <p
          className="font-display text-xl sm:text-2xl lg:text-3xl font-light text-accent italic"
          data-reveal
        >
          &ldquo;{philosophy.slogan}&rdquo;
        </p>
      </div>
    </section>
  );
}
