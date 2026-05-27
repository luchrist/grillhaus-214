"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";
import { restaurant } from "@/lib/restaurant";

interface Review {
  author: string;
  rating: number;
  text: string;
  time: string;
}

interface Props {
  reviews: Review[];
  overallRating: number;
  totalRatings: number;
}

const REVIEW_TRUNCATE_AT = 220;

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > REVIEW_TRUNCATE_AT;
  const showClamp = isLong && !expanded;
  return (
    <div className="bg-[#1A1414] border border-[#C9A058]/10 rounded-sm p-6 h-full flex flex-col gap-4 hover:border-[#C9A058]/25 transition-colors duration-300">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-[#C9A058] font-medium text-sm">{review.author}</div>
          <div className="text-[#E8E0D5]/40 text-xs mt-0.5">{review.time}</div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className={`text-[#E8E0D5]/75 text-sm leading-relaxed italic ${showClamp ? "line-clamp-5" : ""}`}>
        &ldquo;{review.text}&rdquo;
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="self-start text-[#C9A058] hover:opacity-80 text-xs font-medium tracking-wider uppercase transition-colors"
        >
          {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
        </button>
      )}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rating ? "text-[#C9A058] fill-[#C9A058]" : "text-[#C9A058]/25"}
        />
      ))}
    </div>
  );
}

export default function GoogleReviewsCarousel({ reviews, overallRating, totalRatings }: Props) {
  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
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
    <div>
      {/* Overall rating display */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <div className="text-center">
          <div className="font-serif-kr text-6xl text-[#C9A058] font-bold leading-none">
            {overallRating.toFixed(1)}
          </div>
          <div className="flex justify-center mt-2">
            <StarRating rating={Math.round(overallRating)} />
          </div>
          <div className="text-[#E8E0D5]/50 text-xs mt-1">{totalRatings} Bewertungen</div>
        </div>
        <div className="hidden sm:block w-px h-16 bg-[#C9A058]/20" />
        <div className="flex items-center gap-2">
          {/* Google G icon */}
          <svg viewBox="0 0 24 24" className="w-7 h-7" aria-label="Google">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
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
          <span className="text-[#E8E0D5]/50 text-sm">Google Bewertungen</span>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container gap-4">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="embla__slide embla__slide--third px-2"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 bg-[#111111] border border-[#C9A058]/20 rounded-full flex items-center justify-center text-[#C9A058] hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all duration-200 hidden md:flex"
          aria-label="Vorherige Bewertung"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 bg-[#111111] border border-[#C9A058]/20 rounded-full flex items-center justify-center text-[#C9A058] hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all duration-200 hidden md:flex"
          aria-label="Nächste Bewertung"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Mobile nav buttons */}
      <div className="flex justify-center gap-3 mt-6 md:hidden">
        <button
          onClick={scrollPrev}
          className="w-9 h-9 bg-[#111111] border border-[#C9A058]/20 rounded-full flex items-center justify-center text-[#C9A058]"
          aria-label="Vorherige Bewertung"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={scrollNext}
          className="w-9 h-9 bg-[#111111] border border-[#C9A058]/20 rounded-full flex items-center justify-center text-[#C9A058]"
          aria-label="Nächste Bewertung"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Link to Google Business Profile */}
      <div className="text-center mt-8">
        <a
          href={restaurant.googleBusinessProfileUrl || restaurant.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#C9A058] text-sm hover:text-[#F0D080] transition-colors duration-200 border-b border-[#C9A058]/30 hover:border-[#C9A058]/60 pb-0.5"
        >
          Alle Bewertungen auf Google ansehen
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
