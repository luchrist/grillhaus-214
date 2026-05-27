import type { Metadata } from "next";
import Link from "next/link";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: `Impressum | ${restaurant.name}`,
  description: `Impressum und rechtliche Informationen für ${restaurant.name} in ${restaurant.address.city}.`,
};

export default function ImpressumPage() {
  return (
    <div className="pt-28 pb-20 bg-[#0D0D0D] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-3">Legal</p>
          <h1 className="font-serif-kr text-4xl text-[#F8F3EE] font-bold mb-4">Impressum</h1>
          <div className="h-px bg-gradient-to-r from-[#C9A058]/30 to-transparent" />
        </div>

        <div className="space-y-10 text-[#E8E0D5]/70 text-sm leading-relaxed">
          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-1">
              <p className="text-[#F8F3EE] font-medium">{restaurant.name}</p>
              <p>{restaurant.address.street}</p>
              <p>{restaurant.address.cityLine}</p>
              <p>Deutschland</p>
            </div>
          </section>

          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">Kontakt</h2>
            <div className="space-y-1">
              <p>
                Telefon:{" "}
                <a href={restaurant.phoneLink} className="text-[#C9A058] hover:underline">
                  {restaurant.phone}
                </a>
              </p>
              {restaurant.email && (
                <p>
                  E-Mail:{" "}
                  <a href={`mailto:${restaurant.email}`} className="text-[#C9A058] hover:underline">
                    {restaurant.email}
                  </a>
                </p>
              )}
            </div>
          </section>

          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{" "}
              {restaurant.legal.vatId || "wird nachgetragen"}
            </p>
          </section>

          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <div className="space-y-1">
              <p className="text-[#F8F3EE]">{restaurant.legal.responsiblePerson}</p>
              <p>{restaurant.address.street}</p>
              <p>{restaurant.address.cityLine}</p>
            </div>
          </section>

          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A058] hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-2">
              Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-3">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[#C9A058]/10">
          <Link href="/" className="text-[#C9A058]/60 text-sm hover:text-[#C9A058] transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
