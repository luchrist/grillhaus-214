import Link from "next/link";
import { MapPin, Phone, Clock, Globe, Map } from "lucide-react";
import { restaurant } from "@/lib/restaurant";

const quickLinks = [
  { href: "/", label: "Startseite" },
  { href: "/ueber-uns", label: "Über Uns" },
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#C9A058]/10">
      <div className="h-px bg-gradient-to-r from-transparent via-[#B91C1C] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/logo-mark.png"
                alt={`${restaurant.shortName} Logo`}
                className="h-20 w-20 object-contain"
              />
              <div>
                <div className="font-serif-kr text-xl text-[#F8F3EE]">{restaurant.shortName}</div>
                <div className="text-[10px] text-[#C9A058] tracking-[0.2em] uppercase">
                  Türkischer Grill, Eppelheim
                </div>
              </div>
            </div>
            <p className="text-[#E8E0D5]/60 text-xs leading-relaxed mt-3">
              Drehspieß, Yufka und Pide aus eigener Herstellung. Hauptstraße 48, täglich 11 bis 23 Uhr.
            </p>
            <div className="flex gap-3 mt-6">
              {restaurant.socialMedia.instagram && !restaurant.socialMedia.hidden.instagram && (
                <a
                  href={restaurant.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm bg-[#1A1414] border border-[#C9A058]/15 flex items-center justify-center text-[#E8E0D5]/60 hover:text-[#C9A058] hover:border-[#C9A058]/40 transition-all duration-200"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}
              {restaurant.socialMedia.facebook && !restaurant.socialMedia.hidden.facebook && (
                <a
                  href={restaurant.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm bg-[#1A1414] border border-[#C9A058]/15 flex items-center justify-center text-[#E8E0D5]/60 hover:text-[#C9A058] hover:border-[#C9A058]/40 transition-all duration-200"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
              {restaurant.socialMedia.tiktok && !restaurant.socialMedia.hidden.tiktok && (
                <a
                  href={restaurant.socialMedia.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm bg-[#1A1414] border border-[#C9A058]/15 flex items-center justify-center text-[#E8E0D5]/60 hover:text-[#C9A058] hover:border-[#C9A058]/40 transition-all duration-200"
                  aria-label="TikTok"
                  title="TikTok"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 0 1-2.4 2.4 2.4 2.4 0 0 1-2.4-2.4 2.4 2.4 0 0 1 2.4-2.4c.34 0 .67.03.98.1V9.9a5.64 5.64 0 0 0-.98-.08c-3.14 0-5.67 2.46-5.67 5.59 0 3.14 2.53 5.67 5.67 5.67 3.14 0 5.67-2.53 5.67-5.67V10.87a7.7 7.7 0 0 0 4.77 1.55V9.9a4.83 4.83 0 0 1-3.77-1.86z" />
                  </svg>
                </a>
              )}
              {restaurant.googleBusinessProfileUrl && (
                <a
                  href={restaurant.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm bg-[#1A1414] border border-[#C9A058]/15 flex items-center justify-center text-[#E8E0D5]/60 hover:text-[#C9A058] hover:border-[#C9A058]/40 transition-all duration-200"
                  aria-label="Google Profil"
                  title="Google Profil"
                >
                  <Globe size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif-kr text-[#C9A058] text-sm tracking-wider uppercase mb-5">
              Schnelle Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#E8E0D5]/60 text-sm hover:text-[#C9A058] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-serif-kr text-[#C9A058] text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <Clock size={14} />
              Öffnungszeiten
            </h3>
            <ul className="space-y-3">
              {restaurant.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 text-sm">
                  <span className="text-[#E8E0D5]/60">{h.day}</span>
                  <span className={h.closed ? "text-[#E8E0D5]/50 italic" : "text-[#C9A058]"}>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif-kr text-[#C9A058] text-sm tracking-wider uppercase mb-5">
              Kontakt & Adresse
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="text-[#C9A058] mt-0.5 shrink-0" />
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8E0D5]/60 text-sm leading-relaxed hover:text-[#C9A058] transition-colors"
                >
                  {restaurant.address.street}<br />
                  {restaurant.address.cityLine}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="text-[#C9A058] mt-0.5 shrink-0" />
                <a
                  href={restaurant.phoneLink}
                  className="text-[#E8E0D5]/60 text-sm hover:text-[#C9A058] transition-colors"
                >
                  {restaurant.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#C9A058]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-[#E8E0D5]/50 text-xs">
              © {new Date().getFullYear()} {restaurant.name}. Alle Rechte vorbehalten.
            </p>
            <p className="text-[#E8E0D5]/50 text-xs">
              {restaurant.address.street}, {restaurant.address.cityLine}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
