import { defaultLocation } from "@/config/locations";

export default function ContactPage() {
  const loc = defaultLocation;

  return (
    <>
      {/* Hero banner */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 bg-cream">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">
            {loc.name}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal tracking-tight">
            Kontakt
          </h1>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Info */}
            <div className="space-y-10">
              {/* Address */}
              <div>
                <h2 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                  Adresse
                </h2>
                <address className="not-italic space-y-1 text-base text-charcoal leading-relaxed">
                  <p className="font-medium">{loc.name}</p>
                  <p>{loc.address.street}</p>
                  <p>
                    {loc.address.zip} {loc.address.city}
                  </p>
                </address>
                <a
                  href={loc.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-accent hover:text-stone-dark transition-colors group"
                >
                  In Google Maps öffnen
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              {/* Contact details */}
              <div>
                <h2 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                  Kontaktdaten
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-stone shrink-0"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <a
                      href={loc.phoneLink}
                      className="text-base text-charcoal hover:text-accent transition-colors"
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening hours */}
              <div>
                <h2 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                  Öffnungszeiten
                </h2>
                <div className="space-y-3">
                  {loc.openingHours.map((hours) => (
                    <div
                      key={hours.label}
                      className="flex items-center justify-between max-w-sm"
                    >
                      <span className="text-sm text-muted">
                        {hours.label}
                      </span>
                      <span className={`text-sm font-medium tabular-nums ${hours.times === "Geschlossen" ? "text-accent" : "text-charcoal"}`}>
                        {hours.times}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Map */}
            <div className="space-y-8">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(loc.address.street + ", " + loc.address.zip + " " + loc.address.city)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${loc.name} auf Google Maps`}
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* CTA */}
              <div className="bg-accent rounded-2xl p-8 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-warm-white/60 mb-3">
                  Jetzt bestellen
                </p>
                <h3 className="font-display text-2xl font-light text-warm-white mb-4">
                  Ruf uns an!
                </h3>
                <p className="text-sm text-warm-white/70 mb-6 max-w-sm mx-auto">
                  Bestelle telefonisch oder komm vorbei — wir freuen uns auf dich.
                </p>
                <a
                  href={loc.phoneLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-warm-white text-accent text-sm font-medium hover:bg-cream transition-colors"
                >
                  {loc.phone}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
