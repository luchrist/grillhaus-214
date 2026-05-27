"use client";

import { motion, type Variants } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import BackgroundVideo from "@/components/BackgroundVideo";
import { restaurant } from "@/lib/restaurant";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const hoursLines = restaurant.hours.map((h) => ({
  label: h.day,
  value: h.time,
  muted: h.closed,
}));

const mapsQuery = encodeURIComponent(
  `${restaurant.address.street}, ${restaurant.address.cityLine}`
);

export default function KontaktPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <BackgroundVideo
          src="/assets/antalya-coast.webm"
          fallbackImage="/assets/antalya-coast-poster.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/20 via-[#0D0D0D]/50 to-[#0D0D0D]/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p
              variants={fadeInUp}
              className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-2"
            >
              Kontakt
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif-kr text-4xl sm:text-5xl text-[#F8F3EE] font-bold"
            >
              Schreiben Sie uns
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 md:py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-8">
                <p className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-3">
                  Online
                </p>
                <h2 className="font-serif-kr text-2xl sm:text-3xl text-[#F8F3EE] mb-3">
                  Kontaktformular
                </h2>
                <p className="text-[#E8E0D5]/55 text-sm leading-relaxed">
                  Fragen, Feedback oder Sonderwünsche? Füllen Sie das Formular aus, wir melden uns so schnell wie möglich. Oder rufen Sie uns direkt an.
                </p>
              </div>

              <div className="bg-[#111111] border border-[#C9A058]/10 rounded-sm p-6 sm:p-8">
                <ContactForm />
              </div>
            </motion.div>

            {/* Info side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-5"
            >
              {/* Hours card */}
              <div className="bg-[#111111] border border-[#C9A058]/10 hover:border-[#C9A058]/25 rounded-sm p-6 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#B91C1C]/10 border border-[#B91C1C]/15 flex items-center justify-center">
                    <Clock size={16} className="text-[#C9A058]" />
                  </div>
                  <h3 className="font-serif-kr text-[#F8F3EE] font-medium">Öffnungszeiten</h3>
                </div>
                <div className="space-y-1.5 ml-12">
                  {hoursLines.map((line, i) => (
                    <div key={i} className="flex justify-between gap-4">
                      <span className={`text-sm ${line.muted ? "text-[#E8E0D5]/35 italic" : "text-[#E8E0D5]/65"}`}>
                        {line.label}
                      </span>
                      <span className={`text-sm ${line.muted ? "text-[#E8E0D5]/35 italic" : "text-[#C9A058]"}`}>
                        {line.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address card */}
              <div className="bg-[#111111] border border-[#C9A058]/10 hover:border-[#C9A058]/25 rounded-sm p-6 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#B91C1C]/10 border border-[#B91C1C]/15 flex items-center justify-center">
                    <MapPin size={16} className="text-[#C9A058]" />
                  </div>
                  <h3 className="font-serif-kr text-[#F8F3EE] font-medium">Adresse</h3>
                </div>
                <div className="space-y-1.5 ml-12">
                  <p className="text-sm text-[#E8E0D5]/65">{restaurant.address.street}</p>
                  <p className="text-sm text-[#E8E0D5]/65">{restaurant.address.cityLine}</p>
                  <a
                    href={restaurant.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[#B91C1C] text-xs mt-2 hover:text-[#991b1b] transition-colors border-b border-[#B91C1C]/30 hover:border-[#B91C1C]/60 pb-0.5"
                  >
                    In Maps öffnen →
                  </a>
                </div>
              </div>

              {/* Phone card */}
              <div className="bg-[#111111] border border-[#C9A058]/10 hover:border-[#C9A058]/25 rounded-sm p-6 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#B91C1C]/10 border border-[#B91C1C]/15 flex items-center justify-center">
                    <Phone size={16} className="text-[#C9A058]" />
                  </div>
                  <h3 className="font-serif-kr text-[#F8F3EE] font-medium">Telefon</h3>
                </div>
                <div className="space-y-1.5 ml-12">
                  <div className="flex flex-col gap-2">
                    <a
                      href={restaurant.phoneLink}
                      className="text-sm text-[#E8E0D5]/65 hover:text-[#C9A058] transition-colors"
                    >
                      {restaurant.phone}
                    </a>
                    <a
                      href={restaurant.phoneLink}
                      className="inline-block text-[#B91C1C] text-xs mt-2 hover:text-[#991b1b] transition-colors border-b border-[#B91C1C]/30 hover:border-[#B91C1C]/60 pb-0.5"
                    >
                      Rufen Sie uns direkt an:
                    </a>
                  </div>
                </div>
              </div>

              {/* Map preview */}
              <div className="rounded-sm overflow-hidden border border-[#C9A058]/10 h-52">
                <iframe
                  src={`https://maps.google.com/maps?q=${mapsQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${restaurant.name}, Standort`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="py-8 bg-[#0D0D0D] border-t border-[#C9A058]/8 text-center">
        <Link href="/speisekarte" className="text-[#C9A058]/60 text-sm hover:text-[#C9A058] transition-colors">
          ← Zur Speisekarte
        </Link>
      </div>
    </>
  );
}
