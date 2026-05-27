import type { Metadata } from "next";
import Link from "next/link";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: `Datenschutz | ${restaurant.name}`,
  description: `Datenschutzerklärung gemäß DSGVO für ${restaurant.name} in ${restaurant.address.city}.`,
};

export default function DatenschutzPage() {
  return (
    <div className="pt-28 pb-20 bg-[#0D0D0D] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#B91C1C] text-xs tracking-[0.35em] uppercase mb-3">Privacy</p>
          <h1 className="font-serif-kr text-4xl text-[#F8F3EE] font-bold mb-4">
            Datenschutzerklärung
          </h1>
          <div className="h-px bg-gradient-to-r from-[#C9A058]/30 to-transparent" />
        </div>

        <div className="space-y-10 text-[#E8E0D5]/70 text-sm leading-relaxed">
          {/* Einleitung */}
          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-[#F8F3EE] font-medium mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          {/* Verantwortlicher */}
          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">2. Verantwortliche Stelle</h2>
            <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
            <div className="mt-3 p-4 bg-[#111111] border border-[#C9A058]/10 rounded-sm space-y-1">
              <p className="text-[#F8F3EE]">{restaurant.name}</p>
              <p>{restaurant.address.street}, {restaurant.address.cityLine}</p>
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

          {/* Datenerfassung */}
          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">3. Datenerfassung auf dieser Website</h2>
            <h3 className="text-[#F8F3EE] font-medium mb-2">Cookies</h3>
            <p>
              Unsere Website verwendet keine Tracking-Cookies. Es werden ausschließlich technisch notwendige Daten verarbeitet, die für den Betrieb der Website erforderlich sind.
            </p>

            <h3 className="text-[#F8F3EE] font-medium mb-2 mt-5">Server-Logfiles</h3>
            <p>
              Der Hosting-Anbieter dieser Website erhebt und speichert automatisch Informationen in Server-Logfiles, die Ihr Browser automatisch übermittelt. Dies umfasst: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage sowie IP-Adresse. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
            </p>

            <h3 className="text-[#F8F3EE] font-medium mb-2 mt-5">Kontaktformular</h3>
            <p>
              Wenn Sie uns über unser Kontaktformular eine Nachricht senden, werden Ihre Angaben (Name, E-Mail-Adresse, ggf. Telefonnummer und Ihre Nachricht) zur Bearbeitung der Anfrage und für eventuelle Rückfragen gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter und löschen sie nach Erledigung der Anfrage.
            </p>
            <p className="mt-2">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bearbeitung von Anfragen).
            </p>
          </section>

          {/* Google Maps */}
          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">4. Google Maps</h2>
            <p>
              Diese Website verwendet Google Maps zur Darstellung von Kartenmaterial. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Zur Nutzung der Google Maps-Funktionen wird Ihre IP-Adresse gespeichert. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
            </p>
            <p className="mt-3">
              Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG.
            </p>
            <p className="mt-3">
              Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A058] hover:underline"
              >
                https://policies.google.com/privacy
              </a>
            </p>
          </section>

          {/* Ihre Rechte */}
          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">5. Ihre Rechte</h2>
            <p className="mb-3">Sie haben folgende Rechte hinsichtlich Ihrer bei uns gespeicherten Daten:</p>
            <ul className="space-y-2 list-disc list-inside text-[#E8E0D5]/65">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-4">
              Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Zuständig ist die Datenschutzbehörde des Bundeslandes Baden-Württemberg:{" "}
              <a
                href="https://www.bfdi.bund.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A058] hover:underline"
              >
                www.bfdi.bund.de
              </a>
            </p>
          </section>

          {/* Aktualität */}
          <section>
            <h2 className="font-serif-kr text-[#C9A058] text-lg mb-4">6. Aktualität dieser Datenschutzerklärung</h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und wurde zuletzt aktualisiert im April 2026. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann eine Anpassung dieser Datenschutzerklärung notwendig werden.
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-[#C9A058]/10 flex gap-6">
          <Link href="/" className="text-[#C9A058]/60 text-sm hover:text-[#C9A058] transition-colors">
            ← Startseite
          </Link>
          <Link href="/impressum" className="text-[#C9A058]/60 text-sm hover:text-[#C9A058] transition-colors">
            Impressum
          </Link>
        </div>
      </div>
    </div>
  );
}
