"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Leaf, BookOpen, Heart, ArrowRight } from "lucide-react";
import BackgroundVideo from "@/components/BackgroundVideo";
import { restaurant } from "@/lib/restaurant";
import { content } from "@/lib/content";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const valueIcons = [Leaf, BookOpen, Heart];

const galleryImages = [
  { src: "/assets/about-gallery-1.webp", alt: "Außenansicht des Grillhaus 214 in der Hauptstraße in Eppelheim" },
  { src: "/assets/gallery-3.webp",       alt: "Drehspießteller mit Hähnchen, Pommes und Salat" },
  { src: "/assets/gallery-1.webp",       alt: "Fassade des Grillhaus 214 mit Werbung an der Hauptstraße" },
];

export default function UeberUnsPage() {
  const page = content.ueberUns;

  return (
    <>
      {/* ═══ HERO BANNER ═══ */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <BackgroundVideo
          src="/assets/istanbul-city.webm"
          fallbackImage="/assets/istanbul-city-poster.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/30 via-[#0D0D0D]/50 to-[#0D0D0D]/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p variants={fadeInUp} className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-2">
              Über Uns
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-serif-kr text-4xl sm:text-5xl text-[#F8F3EE] font-bold">
              Wer wir sind
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section className="py-20 md:py-28 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="relative h-80 sm:h-[450px] rounded-sm overflow-hidden img-zoom border border-[#C9A058]/10 order-2 lg:order-1"
            >
              <Image
                src="/assets/about-story.webp"
                alt={`Außenansicht des ${restaurant.name} an der Hauptstraße in Eppelheim`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/40 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="font-serif-kr text-7xl text-[#C9A058]/15 font-bold">{restaurant.logoGlyph}</span>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="order-1 lg:order-2"
            >
              <motion.p variants={fadeInUp} className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-3">
                {page.story.eyebrow}
              </motion.p>
              <motion.h2 variants={fadeInUp} className="font-serif-kr text-3xl sm:text-4xl text-[#F8F3EE] red-underline-left mb-8">
                {page.story.headline.replace("{restaurant.name}", restaurant.name)}
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-4 text-[#E8E0D5]/65 text-sm leading-relaxed">
                {page.story.paragraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph
                      .replace("{restaurant.address.city}", restaurant.address.city)
                      .replace("{restaurant.name}", restaurant.name)}
                  </p>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT MAKES US SPECIAL ═══ */}
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
              Qualität
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif-kr text-3xl sm:text-4xl text-[#F8F3EE] red-underline">
              Was uns besonders macht
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {page.values.cards.map((card, index) => {
              const Icon = valueIcons[index % valueIcons.length];

              return (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                className="bg-[#1A1414] border border-[#C9A058]/10 hover:border-[#C9A058]/30 rounded-sm p-8 text-center transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#B91C1C]/20 transition-colors">
                  <Icon size={22} className="text-[#C9A058]" />
                </div>
                <h3 className="font-serif-kr text-xl text-[#F8F3EE] mb-4">{card.title}</h3>
                <p className="text-[#E8E0D5]/60 text-sm leading-relaxed">{card.text}</p>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ TÜRKISCHE KÜCHE ═══ */}
      <section className="py-20 md:py-28 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p variants={fadeInUp} className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-3">
                {page.culture.eyebrow}
              </motion.p>
              <motion.h2 variants={fadeInUp} className="font-serif-kr text-3xl sm:text-4xl text-[#F8F3EE] red-underline-left mb-8">
                {page.culture.headline.replace("{restaurant.cuisine}", restaurant.cuisine)}
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-4 text-[#E8E0D5]/65 text-sm leading-relaxed">
                {page.culture.paragraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph
                      .replace("{restaurant.name}", restaurant.name)
                      .replace("{restaurant.address.city}", restaurant.address.city)}
                  </p>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="relative h-72 sm:h-96 rounded-sm overflow-hidden border border-[#C9A058]/10"
            >
              <Image
                src="/assets/featured-5.webp"
                alt="Drehspießteller mit Hähnchen, Pommes und Salat aus dem Grillhaus 214"
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

      {/* ═══ GALLERY ═══ */}
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
              Einblicke
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {galleryImages.map((img, i) => (
              <div key={i} className="relative h-60 sm:h-72 rounded-sm overflow-hidden img-zoom border border-[#C9A058]/8">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover md:transition-transform md:duration-700 md:hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#0D0D0D]/20 md:hover:bg-transparent md:transition-colors md:duration-300" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 bg-[#0D0D0D] border-t border-[#C9A058]/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <h3 className="font-serif-kr text-2xl sm:text-3xl text-[#F8F3EE] mb-4">
            Überzeugen Sie sich selbst
          </h3>
          <p className="text-[#E8E0D5]/55 text-sm leading-relaxed mb-8">
            {page.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/speisekarte"
              className="inline-flex items-center justify-center gap-2 bg-[#B91C1C] text-white px-7 py-3 text-sm font-medium tracking-wide hover:bg-[#991b1b] transition-colors rounded-sm"
            >
              Zur Speisekarte
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 border border-[#C9A058]/30 text-[#C9A058] px-7 py-3 text-sm font-medium tracking-wide hover:bg-[#C9A058]/10 hover:border-[#C9A058] transition-all rounded-sm"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
