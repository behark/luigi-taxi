import { Section, SectionHeader } from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { BUSINESS_INFO } from '@/lib/constants/business';
import Link from 'next/link';

export default function TermsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const isDE = locale === 'de';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Section variant="default" className="pt-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: isDE ? 'AGB' : 'Terms of Service' },
            ]}
          />

          <SectionHeader
            title={isDE ? 'Allgemeine Geschäftsbedingungen' : 'Terms of Service'}
            subtitle={isDE
              ? `Gültig ab: Januar 2024 | ${BUSINESS_INFO.legalName}`
              : `Effective: January 2024 | ${BUSINESS_INFO.legalName}`
            }
          />

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 prose dark:prose-invert max-w-none">
            {isDE ? (
              <>
                <h2>1. Geltungsbereich</h2>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Beförderungsverträge zwischen
                  {BUSINESS_INFO.legalName} (nachfolgend &quot;Unternehmen&quot;) und dem Fahrgast (nachfolgend &quot;Kunde&quot;).
                </p>

                <h2>2. Vertragsabschluss</h2>
                <p>
                  Ein Beförderungsvertrag kommt zustande durch:
                </p>
                <ul>
                  <li>Telefonische Buchung unter {BUSINESS_INFO.phone}</li>
                  <li>Online-Buchung über unsere Website</li>
                  <li>Buchung per WhatsApp oder E-Mail</li>
                  <li>Direktes Einsteigen in ein freies Taxi</li>
                </ul>

                <h2>3. Preise und Zahlung</h2>
                <p>
                  Die Beförderungspreise richten sich nach dem aktuellen Tarifverzeichnis:
                </p>
                <ul>
                  <li>Standardtarif: {BUSINESS_INFO.currencySymbol}{BUSINESS_INFO.pricing.baseRates.standard}/km</li>
                  <li>Mindestfahrpreis: {BUSINESS_INFO.currencySymbol}{BUSINESS_INFO.pricing.minimumFare}</li>
                  <li>Nachtzuschlag ({BUSINESS_INFO.pricing.nightHoursStart}:00-{BUSINESS_INFO.pricing.nightHoursEnd}:00): {((BUSINESS_INFO.pricing.nightSurchargeMultiplier - 1) * 100).toFixed(0)}%</li>
                </ul>
                <p>
                  Die Zahlung erfolgt am Ende der Fahrt in bar, per Karte oder Online-Zahlung.
                </p>

                <h2>4. Stornierung</h2>
                <p>
                  Stornierungen sind kostenlos möglich bis 2 Stunden vor dem geplanten Abholtermin.
                  Bei späteren Stornierungen oder Nichterscheinen kann eine Gebühr von bis zu 50%
                  des geschätzten Fahrpreises erhoben werden.
                </p>

                <h2>5. Pflichten des Kunden</h2>
                <p>Der Kunde verpflichtet sich:</p>
                <ul>
                  <li>Pünktlich am vereinbarten Abholort zu erscheinen</li>
                  <li>Das Fahrzeug pfleglich zu behandeln</li>
                  <li>Die Sicherheitsgurte zu verwenden</li>
                  <li>Die Anweisungen des Fahrers zu befolgen</li>
                  <li>Für durch ihn verursachte Schäden oder Verschmutzungen aufzukommen</li>
                </ul>

                <h2>6. Haftung</h2>
                <p>
                  Das Unternehmen haftet für Schäden an Person und Sachen des Kunden während der
                  Beförderung im Rahmen der gesetzlichen Bestimmungen und der bestehenden
                  Haftpflichtversicherung.
                </p>

                <h2>7. Gepäck</h2>
                <p>
                  Normales Reisegepäck wird kostenlos befördert. Für Sondergepäck (Sportgeräte,
                  Musikinstrumente etc.) kann ein Aufschlag erhoben werden. Bitte informieren
                  Sie uns bei der Buchung über größeres Gepäck.
                </p>

                <h2>8. Tiere</h2>
                <p>
                  Die Mitnahme von Haustieren ist nach vorheriger Absprache möglich.
                  Blindenhunde werden selbstverständlich immer mitgenommen.
                </p>

                <h2>9. Datenschutz</h2>
                <p>
                  Informationen zur Verarbeitung Ihrer personenbezogenen Daten finden Sie
                  in unserer <Link href="/privacy" className="text-yellow-600 hover:text-yellow-700">Datenschutzerklärung</Link>.
                </p>

                <h2>10. Schlussbestimmungen</h2>
                <p>
                  Es gilt österreichisches Recht. Gerichtsstand ist Wiener Neustadt.
                  Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die
                  Wirksamkeit der übrigen Bestimmungen unberührt.
                </p>

                <h2>Kontakt</h2>
                <p>
                  {BUSINESS_INFO.legalName}<br />
                  {BUSINESS_INFO.address}<br />
                  {BUSINESS_INFO.postalCode} {BUSINESS_INFO.city}<br />
                  {BUSINESS_INFO.country}<br />
                  Tel: {BUSINESS_INFO.phone}<br />
                  E-Mail: {BUSINESS_INFO.email}
                </p>
              </>
            ) : (
              <>
                <h2>1. Scope</h2>
                <p>
                  These Terms of Service apply to all transportation contracts between
                  {BUSINESS_INFO.legalName} (hereinafter &quot;Company&quot;) and the passenger (hereinafter &quot;Customer&quot;).
                </p>

                <h2>2. Contract Formation</h2>
                <p>
                  A transportation contract is formed through:
                </p>
                <ul>
                  <li>Phone booking at {BUSINESS_INFO.phone}</li>
                  <li>Online booking through our website</li>
                  <li>Booking via WhatsApp or email</li>
                  <li>Direct entry into an available taxi</li>
                </ul>

                <h2>3. Prices and Payment</h2>
                <p>
                  Transportation prices are based on the current tariff schedule:
                </p>
                <ul>
                  <li>Standard rate: {BUSINESS_INFO.currencySymbol}{BUSINESS_INFO.pricing.baseRates.standard}/km</li>
                  <li>Minimum fare: {BUSINESS_INFO.currencySymbol}{BUSINESS_INFO.pricing.minimumFare}</li>
                  <li>Night surcharge ({BUSINESS_INFO.pricing.nightHoursStart}:00-{BUSINESS_INFO.pricing.nightHoursEnd}:00): {((BUSINESS_INFO.pricing.nightSurchargeMultiplier - 1) * 100).toFixed(0)}%</li>
                </ul>
                <p>
                  Payment is due at the end of the journey by cash, card, or online payment.
                </p>

                <h2>4. Cancellation</h2>
                <p>
                  Cancellations are free of charge up to 2 hours before the scheduled pickup time.
                  For later cancellations or no-shows, a fee of up to 50% of the estimated fare
                  may be charged.
                </p>

                <h2>5. Customer Obligations</h2>
                <p>The customer agrees to:</p>
                <ul>
                  <li>Arrive punctually at the agreed pickup location</li>
                  <li>Treat the vehicle with care</li>
                  <li>Use seat belts</li>
                  <li>Follow the driver&apos;s instructions</li>
                  <li>Pay for any damage or soiling caused by them</li>
                </ul>

                <h2>6. Liability</h2>
                <p>
                  The Company is liable for damage to the customer&apos;s person and property during
                  transportation within the scope of statutory regulations and existing liability
                  insurance.
                </p>

                <h2>7. Luggage</h2>
                <p>
                  Normal travel luggage is transported free of charge. Additional charges may apply
                  for special luggage (sports equipment, musical instruments, etc.). Please inform
                  us about larger luggage when booking.
                </p>

                <h2>8. Animals</h2>
                <p>
                  Pets may be transported by prior arrangement. Guide dogs are always welcome.
                </p>

                <h2>9. Privacy</h2>
                <p>
                  Information about the processing of your personal data can be found in
                  our <Link href="/privacy" className="text-yellow-600 hover:text-yellow-700">Privacy Policy</Link>.
                </p>

                <h2>10. Final Provisions</h2>
                <p>
                  Austrian law applies. The place of jurisdiction is Wiener Neustadt.
                  Should individual provisions of these terms be invalid, the validity
                  of the remaining provisions remains unaffected.
                </p>

                <h2>Contact</h2>
                <p>
                  {BUSINESS_INFO.legalName}<br />
                  {BUSINESS_INFO.address}<br />
                  {BUSINESS_INFO.postalCode} {BUSINESS_INFO.city}<br />
                  {BUSINESS_INFO.country}<br />
                  Phone: {BUSINESS_INFO.phone}<br />
                  Email: {BUSINESS_INFO.email}
                </p>
              </>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
