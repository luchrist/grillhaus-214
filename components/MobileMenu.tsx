"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { restaurant } from "@/lib/restaurant";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  currentPath: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
  currentPath,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#111111] border-l border-[#C9A058]/15 transform transition-transform duration-400 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#C9A058]/10">
          <div className="flex items-center gap-2">
            <img
              src="/assets/logo-mark.png"
              alt={`${restaurant.shortName} Logo`}
              className="h-14 w-14 object-contain"
            />
            <span className="font-serif-kr text-base text-[#F8F3EE]">{restaurant.shortName}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#E8E0D5] hover:text-[#C9A058] transition-colors"
            aria-label="Menü schließen"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-6 py-8 flex flex-col gap-1">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{ transitionDelay: isOpen ? `${i * 60}ms` : "0ms" }}
              className={`py-3 px-4 rounded-sm text-base font-medium transition-all duration-200 ${
                currentPath === link.href
                  ? "text-[#C9A058] bg-[#C9A058]/10"
                  : "text-[#E8E0D5] hover:text-[#C9A058] hover:bg-[#C9A058]/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="px-6 mt-2">
          <a
            href={restaurant.phoneLink}
            onClick={onClose}
            className="block bg-[#B91C1C] text-white text-center py-3 px-5 rounded-sm font-medium tracking-wide hover:bg-[#991b1b] transition-colors"
          >
            Jetzt anrufen
          </a>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-8 left-6 right-6">
          <div className="border-t border-[#C9A058]/10 pt-6">
            <p className="text-[#E8E0D5]/50 text-xs leading-relaxed">
              {restaurant.address.street}<br />
              {restaurant.address.cityLine}<br />
              <a href={restaurant.phoneLink} className="hover:text-[#C9A058] transition-colors">
                {restaurant.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
