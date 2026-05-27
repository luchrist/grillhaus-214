"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { MapPin, Clock, Phone, ChevronDown } from "lucide-react";
import DishesCarousel from "@/components/DishesCarousel";
import GoogleReviews from "@/components/GoogleReviews";
import BackgroundVideo from "@/components/BackgroundVideo";
import { restaurant } from "@/lib/restaurant";
import { content } from "@/lib/content";

const atmosphereImages = [
  { src: "/assets/about-story.webp", alt: "Grillhaus 214 an der Hauptstraße 48 in Eppelheim" },
  { src: "/assets/gallery-1.webp", alt: "Fassade des Grillhaus 214 mit Werbung" },
  { src: "/assets/featured-1.webp", alt: "Drehspießteller mit Hähnchen, Pommes und Salat" },
  { src: "/assets/about-gallery-1.webp", alt: "Außenansicht des Grillhauses mit Fenster zur Hauptstraße" },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const mapsQuery = encodeURIComponent(
  `${restaurant.address.street}, ${restaurant.address.cityLine}`
);

export default function HomePage() {
  const home = content.home;

  return (
    <>
      {/* ═══ 1. HERO ═══ */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <BackgroundVideo
          src="/assets/istanbul-bridge.webm"
          fallbackImage="/assets/istanbul-bridge-poster.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/55 via-[#0D0D0D]/35 to-[#0D0D0D]/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p
              variants={fadeInUp}
              className="text-[#C9A058] text-sm tracking-[0.4em] uppercase mb-4"
            >
              {home.hero.eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif-kr text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-2"
              style={{ color: "#F8F3EE" }}
            >
              {restaurant.shortName}
            </motion.h1>
            <motion.h2
              variants={fadeInUp}
              className="font-serif-kr text-2xl sm:text-3xl md:text-4xl text-[#C9A058] mb-4"
            >
              {home.hero.headline}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#E8E0D5]/80 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            >
              {home.hero.subtitle}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/speisekarte"
                className="bg-[#B91C1C] text-white px-8 py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-[#991b1b] transition-colors duration-200 rounded-sm"
              >
                Zur Speisekarte
              </Link>
              <a
                href={restaurant.phoneLink}
                className="border border-[#C9A058]/50 text-[#C9A058] px-8 py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-[#C9A058]/10 hover:border-[#C9A058] transition-all duration-200 rounded-sm"
              >
                {restaurant.phone}
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#C9A058]/50"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Entdecken</span>
          <ChevronDown size={18} className="animate-bounce" />
        </motion.div>
      </section>

      {/* ═══ 2. FEATURED DISHES ═══ */}
      <section className="py-20 md:py-28 bg-[#111111] korean-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-3">
              {home.featuredSection.eyebrow}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif-kr text-3xl sm:text-4xl text-[#F8F3EE] red-underline">
              {home.featuredSection.headline}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#E8E0D5]/55 mt-5 max-w-xl mx-auto text-sm leading-relaxed">
              {home.featuredSection.description}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <DishesCarousel />
          </motion.div>

          <div className="text-center mt-10">
            <Link
              href="/speisekarte"
              className="inline-block border border-[#C9A058]/30 text-[#C9A058] text-sm px-7 py-2.5 rounded-sm hover:bg-[#C9A058]/10 hover:border-[#C9A058] transition-all duration-200 tracking-wide"
            >
              Alle Gerichte →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 3. CTA (Video-Hintergrund) ═══ */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        <BackgroundVideo
          src="/assets/women_cook.webm"
          fallbackImage="/assets/women_cook-poster.webp"
          preload="metadata"
        />
        <div className="absolute inset-0 bg-[#0D0D0D]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/30 to-[#0D0D0D]/50" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-2xl mx-auto px-4 text-center"
        >
          <p className="text-[#C9A058] text-xs tracking-[0.4em] uppercase mb-4">
            {restaurant.address.city}
          </p>
          <h2 className="font-serif-kr text-4xl sm:text-5xl text-[#F8F3EE] font-bold mb-2">
            {home.cta.headline}
          </h2>
          <div className="w-12 h-px bg-[#C9A058] mx-auto my-6 opacity-60" />
          <p className="text-[#E8E0D5]/75 text-sm leading-relaxed mb-3">
            {home.cta.description}
          </p>
          <p className="text-[#E8E0D5]/45 text-xs mb-10">
            Heute geöffnet · {restaurant.address.street}, {restaurant.address.city}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/speisekarte"
              className="bg-[#B91C1C] text-white px-8 py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-[#991b1b] transition-colors rounded-sm"
            >
              Zur Speisekarte
            </Link>
            <a
              href={restaurant.phoneLink}
              className="border border-[#C9A058]/40 text-[#C9A058] px-8 py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-[#C9A058]/10 hover:border-[#C9A058] transition-all rounded-sm"
            >
              {restaurant.phone}
            </a>
          </div>
        </motion.div>
      </section>

      {/* ═══ 4. ÖFFNUNGSZEITEN & KONTAKT (Home) ═══ */}
      <section className="py-20 md:py-28 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p variants={fadeInUp} className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-3">
                {home.availabilitySection.eyebrow}
              </motion.p>
              <motion.h2 variants={fadeInUp} className="font-serif-kr text-3xl sm:text-4xl text-[#F8F3EE] red-underline-left mb-6">
                Täglich frisch,<br />sieben Tage geöffnet
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[#E8E0D5]/60 text-sm leading-relaxed mb-10">
                {home.availabilitySection.description}
              </motion.p>

              <motion.div variants={stagger} className="space-y-6">
                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-[#C9A058]" />
                  </div>
                  <div>
                    <p className="text-[#F8F3EE] text-sm font-medium mb-1">Öffnungszeiten</p>
                    <p className="text-[#E8E0D5]/55 text-xs leading-relaxed">
                      {restaurant.hours.map((h, i) => (
                        <span key={h.day}>
                          {h.day}: {h.time}
                          {i < restaurant.hours.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#C9A058]" />
                  </div>
                  <div>
                    <p className="text-[#F8F3EE] text-sm font-medium mb-1">Telefon</p>
                    <a href={restaurant.phoneLink} className="text-[#E8E0D5]/55 text-xs hover:text-[#C9A058] transition-colors block">
                      {restaurant.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-[#C9A058]" />
                  </div>
                  <div>
                    <p className="text-[#F8F3EE] text-sm font-medium mb-1">Adresse</p>
                    <p className="text-[#E8E0D5]/55 text-xs leading-relaxed">
                      {restaurant.address.street}<br />{restaurant.address.cityLine}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="rounded-sm overflow-hidden border border-[#C9A058]/15 h-80 lg:h-auto min-h-[320px]"
            >
              <iframe
                src={`https://maps.google.com/maps?q=${mapsQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${restaurant.name}, Standort`}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 5. UNSERE GESCHICHTE ═══ */}
      <section className="py-20 md:py-28 bg-[#111111] korean-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.p variants={fadeInUp} className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-3">
                {home.storySection.eyebrow}
              </motion.p>
              <motion.h2 variants={fadeInUp} className="font-serif-kr text-3xl sm:text-4xl text-[#F8F3EE] red-underline-left mb-8">
                Drehspieß, Brot,<br />Soße, alles im Haus
              </motion.h2>
              {home.storySection.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeInUp}
                  className={`text-[#E8E0D5]/65 leading-relaxed text-sm ${index === home.storySection.paragraphs.length - 1 ? "mb-8" : "mb-4"}`}
                >
                  {paragraph
                    .replace("{restaurant.address.city}", restaurant.address.city)
                    .replace("{restaurant.name}", restaurant.name)}
                </motion.p>
              ))}
              <motion.div variants={fadeInUp}>
                <Link
                  href="/ueber-uns"
                  className="inline-flex items-center gap-2 text-[#C9A058] text-sm border-b border-[#C9A058]/30 hover:border-[#C9A058] pb-0.5 transition-colors duration-200"
                >
                  Mehr über uns
                  <span className="text-lg">→</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative h-80 sm:h-96 lg:h-[500px] rounded-sm overflow-hidden border border-[#C9A058]/10"
            >
              <Image
                src="/assets/about-story.webp"
                alt="Außenansicht des Grillhaus 214 in der Hauptstraße 48 in Eppelheim"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/50 to-transparent" />
              <div className="absolute bottom-5 right-5">
                <span className="font-serif-kr text-6xl text-[#C9A058]/20 font-bold">{restaurant.logoGlyph}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 6. GOOGLE REVIEWS ═══ */}
      <section className="py-20 md:py-28 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-3">
              Bewertungen
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif-kr text-3xl sm:text-4xl text-[#F8F3EE] red-underline">
              Was unsere Gäste sagen
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <GoogleReviews />
          </motion.div>
        </div>
      </section>

      {/* ═══ 7. ATMOSPHÄRE GALERIE ═══ */}
      <section className="py-20 md:py-28 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-3">
              Galerie
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif-kr text-3xl sm:text-4xl text-[#F8F3EE] red-underline">
              Atmosphäre &amp; Eindrücke
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#E8E0D5]/50 text-sm mt-4 max-w-lg mx-auto">
              {home.gallerySection.description.replace("{restaurant.address.city}", restaurant.address.city)}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {atmosphereImages.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-sm img-zoom border border-[#C9A058]/8 ${
                  i === 0 ? "col-span-2 row-span-2 h-64 lg:h-auto" : "h-40 md:h-48"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover md:transition-transform md:duration-700 md:hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#0D0D0D]/20 md:hover:bg-[#0D0D0D]/5 md:transition-colors md:duration-300" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 8. ÖFFNUNGSZEITEN & ANFAHRT ═══ */}
      <section className="py-20 md:py-28 bg-[#0D0D0D] korean-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-3">
              Besuchen Sie uns
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif-kr text-3xl sm:text-4xl text-[#F8F3EE] red-underline">
              Öffnungszeiten &amp; Anfahrt
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Clock size={18} className="text-[#C9A058]" />
                <h3 className="font-serif-kr text-xl text-[#F8F3EE]">Öffnungszeiten</h3>
              </div>
              <table className="w-full">
                <tbody>
                  {restaurant.hours.map((h) => (
                    <tr key={h.day} className="border-b border-[#C9A058]/8 last:border-0">
                      <td className="py-3 text-[#E8E0D5]/70 text-sm">{h.day}</td>
                      <td
                        className={`py-3 text-sm text-right font-medium ${
                          h.closed ? "text-[#E8E0D5]/50 italic" : "text-[#C9A058]"
                        }`}
                      >
                        {h.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#C9A058] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#E8E0D5]/75 text-sm">
                      {restaurant.address.street}, {restaurant.address.cityLine}
                    </p>
                    <a
                      href={restaurant.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C9A058] text-xs hover:underline mt-0.5 inline-block"
                    >
                      In Google Maps öffnen →
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#C9A058] shrink-0" />
                  <a
                    href={restaurant.phoneLink}
                    className="text-[#E8E0D5]/75 text-sm hover:text-[#C9A058] transition-colors"
                  >
                    {restaurant.phone}
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/speisekarte"
                  className="inline-block bg-[#B91C1C] text-white px-7 py-3 text-sm font-medium tracking-wide hover:bg-[#991b1b] transition-colors rounded-sm"
                >
                  Zur Speisekarte
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="rounded-sm overflow-hidden border border-[#C9A058]/15 h-80 lg:h-auto min-h-[320px]"
            >
              <iframe
                src={`https://maps.google.com/maps?q=${mapsQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${restaurant.name}, Standort`}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
