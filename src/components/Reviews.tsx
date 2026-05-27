"use client";

import { useEffect, useRef, useState } from "react";
import { defaultLocation } from "@/config/locations";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className={
            star <= rating ? "text-gold" : "text-stone-light"
          }
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const REVIEW_CHAR_LIMIT = 150;

function ReviewCard({ review }: { review: { name: string; rating: number; text: string; date: string } }) {
  const isLong = review.text.length > REVIEW_CHAR_LIMIT;
  const [expanded, setExpanded] = useState(false);
  const displayText = isLong && !expanded ? review.text.slice(0, REVIEW_CHAR_LIMIT).trimEnd() + "..." : review.text;

  return (
    <div data-review-card className="bg-warm-white rounded-2xl p-6 sm:p-7 border border-sand-light/50">
      <StarRating rating={review.rating} />
      <p className="text-sm sm:text-base text-charcoal leading-relaxed mt-4 mb-1">
        &ldquo;{displayText}&rdquo;
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-medium text-accent hover:text-stone-dark transition-colors mb-4"
        >
          {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
        </button>
      )}
      {!isLong && <div className="mb-4" />}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-medium text-accent">
            {review.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <span className="text-sm font-medium text-charcoal">{review.name}</span>
        </div>
        <span className="text-xs text-muted">{review.date}</span>
      </div>
    </div>
  );
}

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = section.querySelectorAll("[data-review-card]");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
            delay: i * 0.1,
          }
        );
      });
    };

    init();
  }, []);

  const reviews = defaultLocation.reviews;

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">
              Bewertungen
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight">
              Was unsere Gäste sagen
            </h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-stone">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm text-muted">Google Reviews</span>
            </div>
            <span className="text-stone-light">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-semibold text-charcoal">4,6</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gold"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-sm text-muted">(26)</span>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
