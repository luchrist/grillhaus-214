"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import BackgroundVideo from "@/components/BackgroundVideo";
import { menuCategories, type MenuCategory } from "@/lib/menu-data";
import { restaurant } from "@/lib/restaurant";

type MenuGroup = {
  id: string;
  label: string;
  intro?: string;
  categoryIds: string[];
};

const menuGroups: MenuGroup[] = [
  {
    id: "drehspiess",
    label: "Vom Drehspieß",
    intro: "Hähnchen und Hackfleisch vom Kalb, frisch vom Drehspieß. Erst beim Bestellen abgeschnitten.",
    categoryIds: ["drehspieb-spezialitaten", "schuler-kebab"],
  },
  {
    id: "sandwich-grill",
    label: "Sandwich & Grill",
    intro: "Vom Lammspieß bis zur Köfte, im hauseigenen Yufka oder Sandwichbrot.",
    categoryIds: ["sandwich-spezialitaten", "grillspezialitaten"],
  },
  {
    id: "pide-pizza",
    label: "Pide & Pizza",
    intro: "30 cm Pizza aus dem Ofen, in vielen Varianten, dazu Mini-Pizza für den kleinen Hunger.",
    categoryIds: ["pizza-30cm-durchmesser", "mini", "sonstiges"],
  },
  {
    id: "vegetarisch",
    label: "Vegetarisch",
    intro: "Gegrilltes Gemüse, Falafel und Lahmacun ohne Fleisch.",
    categoryIds: ["vegetarische-spezialitaten"],
  },
  {
    id: "beilagen",
    label: "Beilagen",
    intro: "Pommes, Salat, Burger und kleine Klassiker für nebenbei.",
    categoryIds: ["beilagen"],
  },
  {
    id: "menues",
    label: "Menüs",
    intro: "Kombinationen mit Softdrink, schnell zum Mitnehmen.",
    categoryIds: ["mini-pizza-softdrink-0-33-l", "drehspie-im-brot-softdrink"],
  },
  {
    id: "extras",
    label: "Extras",
    intro: "Käse, extra Soße, größere Portion und zusätzliche Pizza-Toppings.",
    categoryIds: ["zusatzliche-optionen", "zusatzliche-zutaten-fur-pizza-mini-pizzen"],
  },
  {
    id: "getraenke",
    label: "Getränke",
    intro: "Softdrinks, Ayran und Wasser zu jeder Bestellung.",
    categoryIds: ["getranke"],
  },
];

function getSubcategories(group: MenuGroup): MenuCategory[] {
  return group.categoryIds
    .map((id) => menuCategories.find((c) => c.id === id))
    .filter((c): c is MenuCategory => Boolean(c));
}

export default function SpeisekartePage() {
  const [activeTab, setActiveTab] = useState(menuGroups[0].id);
  const activeGroup = menuGroups.find((g) => g.id === activeTab) ?? menuGroups[0];
  const subCategories = useMemo(() => getSubcategories(activeGroup), [activeGroup]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/featured-1.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/30 via-[#0D0D0D]/55 to-[#0D0D0D]/90" />
        <div className="absolute inset-0 korean-pattern opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-2">Speisekarte</p>
            <h1 className="font-serif-kr text-4xl sm:text-5xl text-[#F8F3EE] font-bold">
              Unsere Speisekarte
            </h1>
            <p className="text-[#E8E0D5]/70 text-sm mt-3 max-w-xl">
              Drehspieß, Yufka, Pide und Pizza aus dem Ofen. Täglich von 11 bis 23 Uhr.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs + Menu */}
      <section className="bg-[#111111] py-12 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {menuGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-200 ${
                  activeTab === group.id ? "tab-active" : "tab-inactive"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {/* Group header */}
              <div className="flex items-baseline gap-4 mb-3">
                <h2 className="font-serif-kr text-2xl sm:text-3xl text-[#F8F3EE]">
                  {activeGroup.label}
                </h2>
              </div>
              {activeGroup.intro && (
                <p className="text-[#E8E0D5]/55 text-xs mb-10 leading-relaxed">{activeGroup.intro}</p>
              )}

              {subCategories.map((category, catIndex) => (
                <div key={category.id} className={catIndex > 0 ? "mt-12" : ""}>
                  {subCategories.length > 1 && (
                    <h3 className="font-serif-kr text-lg sm:text-xl text-[#C9A058] mb-5 pb-2 border-b border-[#C9A058]/15">
                      {category.label}
                    </h3>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.items.map((item, i) => (
                      <motion.div
                        key={`${category.id}-${item.name}-${i}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.4 }}
                        className="bg-[#1A1414] border border-[#C9A058]/10 hover:border-[#C9A058]/25 rounded-sm p-5 flex flex-col gap-2 transition-colors duration-200 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              {item.nr && (
                                <span className="text-[#C9A058]/30 text-[10px] font-mono">{item.nr}</span>
                              )}
                              <span className="font-serif-kr text-[#F8F3EE] font-medium group-hover:text-[#C9A058] transition-colors duration-200">
                                {item.name}
                              </span>
                            </div>
                            <div className="flex gap-1.5 flex-wrap mt-1">
                              {item.spicy && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-[#B91C1C]/15 text-[#B91C1C] rounded-sm border border-[#B91C1C]/20">
                                  scharf
                                </span>
                              )}
                              {item.vegan && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-emerald-900/20 text-emerald-400 rounded-sm border border-emerald-700/20">
                                  vegetarisch
                                </span>
                              )}
                              {item.note && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-[#C9A058]/8 text-[#C9A058]/60 rounded-sm border border-[#C9A058]/15">
                                  {item.note}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-[#E8E0D5]/50 text-xs mt-1.5 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                          {item.price && (
                            <span className="text-[#C9A058] font-semibold text-sm whitespace-nowrap shrink-0 mt-0.5">
                              {item.price} €
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Allergen note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-5 bg-[#1A1414] border border-[#C9A058]/10 rounded-sm flex gap-4"
          >
            <AlertCircle size={18} className="text-[#C9A058] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#C9A058] text-sm font-medium mb-1">Allergene &amp; Unverträglichkeiten</p>
              <p className="text-[#E8E0D5]/55 text-xs leading-relaxed">
                Unsere Gerichte können Allergene enthalten. Bitte sprechen Sie unser Team bei Fragen zu Inhaltsstoffen an, wir helfen Ihnen gerne weiter.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-36 overflow-hidden">
        <BackgroundVideo
          src="/assets/women_cook.webm"
          fallbackImage="/assets/women_cook-poster.webp"
          preload="metadata"
        />
        <div className="absolute inset-0 bg-[#0D0D0D]/75" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-xl mx-auto px-4 text-center"
        >
          <p className="text-[#C9A058] text-xs tracking-[0.4em] uppercase mb-4">Hauptstraße 48, Eppelheim</p>
          <h2 className="font-serif-kr text-4xl sm:text-5xl text-[#F8F3EE] font-bold mb-2">
            Hunger?
          </h2>
          <p className="font-serif-kr text-xl text-[#C9A058] mb-8">Wir grillen täglich von 11 bis 23 Uhr.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={restaurant.phoneLink}
              className="inline-block bg-[#B91C1C] text-white px-10 py-4 text-sm font-medium tracking-wider uppercase hover:bg-[#991b1b] transition-colors rounded-sm"
            >
              Jetzt anrufen
            </a>
            <Link
              href="/kontakt"
              className="inline-block border border-[#C9A058]/40 text-[#C9A058] px-10 py-4 text-sm font-medium tracking-wider uppercase hover:bg-[#C9A058]/10 hover:border-[#C9A058] transition-all rounded-sm"
            >
              Kontakt
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
