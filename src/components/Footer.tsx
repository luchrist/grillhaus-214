import Image from "next/image";
import Link from "next/link";
import { defaultLocation } from "@/config/locations";

export default function Footer() {
  const loc = defaultLocation;

  return (
    <footer className="bg-charcoal text-stone-light">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Top section */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/assets/logo-mark.png"
                alt="Grillhaus 214"
                width={64}
                height={64}
                className="w-14 h-14 lg:w-16 lg:h-16 brightness-0 invert"
              />
              <span className="font-display font-medium text-lg text-warm-white">Grillhaus 214</span>
            </div>
            <p className="text-sm text-stone leading-relaxed max-w-xs">
              {loc.philosophy.slogan}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-stone-light hover:text-warm-white transition-colors"
                >
                  Startseite
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-sm text-stone-light hover:text-warm-white transition-colors"
                >
                  Speisekarte
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-stone-light hover:text-warm-white transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-5">
              Kontakt
            </h4>
            <address className="not-italic space-y-3 text-sm text-stone-light">
              <p>{loc.address.street}</p>
              <p>
                {loc.address.zip} {loc.address.city}
              </p>
              <p className="pt-1">
                <a
                  href={loc.phoneLink}
                  className="hover:text-warm-white transition-colors"
                >
                  {loc.phone}
                </a>
              </p>
            </address>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-5">
              Rechtliches
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-stone-light hover:text-warm-white transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-stone-light hover:text-warm-white transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone">
          <p>&copy; {new Date().getFullYear()} Grillhaus 214. Alle Rechte vorbehalten.</p>
          <p>
            Website erstellt von{" "}
            <a
              href="mailto:luca@creatare.de"
              className="text-stone-light hover:text-warm-white transition-colors underline underline-offset-2"
            >
              Luca Christ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
