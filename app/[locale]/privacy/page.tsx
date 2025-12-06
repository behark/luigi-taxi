import { Section, SectionHeader } from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { BUSINESS_INFO } from '@/lib/constants/business';
import Link from 'next/link';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isDE = locale === 'de';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Section variant="default" className="pt-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: isDE ? 'Datenschutz' : 'Privacy Policy' },
            ]}
          />

          <SectionHeader
            title={isDE ? 'Datenschutzerklärung' : 'Privacy Policy'}
            subtitle={isDE
              ? `Zuletzt aktualisiert: Januar 2024 | ${BUSINESS_INFO.legalName}`
              : `Last updated: January 2024 | ${BUSINESS_INFO.legalName}`
            }
          />

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 prose dark:prose-invert max-w-none">
            {isDE ? (
              <>
                <h2>1. Verantwortlicher</h2>
                <p>
                  Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p>
                  {BUSINESS_INFO.legalName}<br />
                  {BUSINESS_INFO.address}<br />
                  {BUSINESS_INFO.postalCode} {BUSINESS_INFO.city}<br />
                  {BUSINESS_INFO.country}<br />
                  Tel: {BUSINESS_INFO.phone}<br />
                  E-Mail: {BUSINESS_INFO.email}
                </p>

                <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
                <h3>2.1 Beim Besuch der Website</h3>
                <p>
                  Beim Aufrufen unserer Website werden durch den auf Ihrem Endgerät zum Einsatz
                  kommenden Browser automatisch Informationen an den Server unserer Website
                  gesendet. Diese Informationen werden temporär in einem sogenannten Logfile
                  gespeichert.
                </p>
                <p>Folgende Informationen werden dabei erfasst:</p>
                <ul>
                  <li>IP-Adresse des anfragenden Rechners</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>Name und URL der abgerufenen Datei</li>
                  <li>Website, von der aus der Zugriff erfolgt</li>
                  <li>Verwendeter Browser und Betriebssystem</li>
                </ul>

                <h3>2.2 Bei der Buchung</h3>
                <p>
                  Bei einer Buchung erheben wir folgende Daten:
                </p>
                <ul>
                  <li>Name</li>
                  <li>E-Mail-Adresse</li>
                  <li>Telefonnummer</li>
                  <li>Abhol- und Zieladresse</li>
                  <li>Datum und Uhrzeit der Fahrt</li>
                  <li>Besondere Anforderungen</li>
                </ul>

                <h2>3. Zweck der Datenverarbeitung</h2>
                <p>Wir verarbeiten Ihre personenbezogenen Daten zu folgenden Zwecken:</p>
                <ul>
                  <li>Durchführung von Beförderungsverträgen</li>
                  <li>Kommunikation bezüglich Ihrer Buchung</li>
                  <li>Verbesserung unseres Service</li>
                  <li>Erfüllung gesetzlicher Aufbewahrungspflichten</li>
                </ul>

                <h2>4. Rechtsgrundlage</h2>
                <p>
                  Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von:
                </p>
                <ul>
                  <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
                  <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</li>
                  <li>Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung)</li>
                </ul>

                <h2>5. Datenweitergabe</h2>
                <p>
                  Eine Übermittlung Ihrer persönlichen Daten an Dritte erfolgt nur, wenn:
                </p>
                <ul>
                  <li>Sie Ihre ausdrückliche Einwilligung gegeben haben</li>
                  <li>Die Weitergabe zur Vertragserfüllung erforderlich ist</li>
                  <li>Eine gesetzliche Verpflichtung besteht</li>
                </ul>

                <h2>6. Cookies</h2>
                <p>
                  Unsere Website verwendet Cookies. Bei Cookies handelt es sich um kleine
                  Textdateien, die auf Ihrem Endgerät gespeichert werden. Wir nutzen
                  technisch notwendige Cookies für den Betrieb der Website.
                </p>

                <h2>7. Ihre Rechte</h2>
                <p>Sie haben das Recht auf:</p>
                <ul>
                  <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                  <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                  <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                  <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                </ul>

                <h2>8. Datensicherheit</h2>
                <p>
                  Wir verwenden SSL-Verschlüsselung zum Schutz Ihrer Daten bei der
                  Übertragung. Unsere Website verwendet HTTPS.
                </p>

                <h2>9. Aufbewahrungsdauer</h2>
                <p>
                  Wir speichern Ihre Daten nur so lange, wie es für die Erfüllung des
                  Vertrags erforderlich ist oder gesetzliche Aufbewahrungsfristen dies
                  vorschreiben (in der Regel 7 Jahre für Geschäftsdaten).
                </p>

                <h2>10. Beschwerderecht</h2>
                <p>
                  Sie haben das Recht, sich bei der österreichischen Datenschutzbehörde
                  zu beschweren:<br />
                  Österreichische Datenschutzbehörde<br />
                  Barichgasse 40-42<br />
                  1030 Wien<br />
                  dsb@dsb.gv.at
                </p>

                <h2>11. Kontakt</h2>
                <p>
                  Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter {BUSINESS_INFO.email}.
                </p>
              </>
            ) : (
              <>
                <h2>1. Data Controller</h2>
                <p>
                  The party responsible for data processing on this website is:
                </p>
                <p>
                  {BUSINESS_INFO.legalName}<br />
                  {BUSINESS_INFO.address}<br />
                  {BUSINESS_INFO.postalCode} {BUSINESS_INFO.city}<br />
                  {BUSINESS_INFO.country}<br />
                  Phone: {BUSINESS_INFO.phone}<br />
                  Email: {BUSINESS_INFO.email}
                </p>

                <h2>2. Collection and Storage of Personal Data</h2>
                <h3>2.1 When Visiting the Website</h3>
                <p>
                  When you access our website, the browser used on your device automatically
                  sends information to our website server. This information is temporarily
                  stored in a log file.
                </p>
                <p>The following information is collected:</p>
                <ul>
                  <li>IP address of the requesting device</li>
                  <li>Date and time of access</li>
                  <li>Name and URL of the retrieved file</li>
                  <li>Website from which access is made</li>
                  <li>Browser and operating system used</li>
                </ul>

                <h3>2.2 When Booking</h3>
                <p>
                  When making a booking, we collect the following data:
                </p>
                <ul>
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Pickup and destination address</li>
                  <li>Date and time of the ride</li>
                  <li>Special requirements</li>
                </ul>

                <h2>3. Purpose of Data Processing</h2>
                <p>We process your personal data for the following purposes:</p>
                <ul>
                  <li>Fulfillment of transportation contracts</li>
                  <li>Communication regarding your booking</li>
                  <li>Improvement of our service</li>
                  <li>Compliance with legal retention requirements</li>
                </ul>

                <h2>4. Legal Basis</h2>
                <p>
                  The processing of your data is based on:
                </p>
                <ul>
                  <li>Art. 6 (1) lit. b GDPR (contract fulfillment)</li>
                  <li>Art. 6 (1) lit. f GDPR (legitimate interest)</li>
                  <li>Art. 6 (1) lit. c GDPR (legal obligation)</li>
                </ul>

                <h2>5. Data Sharing</h2>
                <p>
                  Your personal data will only be shared with third parties if:
                </p>
                <ul>
                  <li>You have given your express consent</li>
                  <li>Sharing is necessary for contract fulfillment</li>
                  <li>There is a legal obligation</li>
                </ul>

                <h2>6. Cookies</h2>
                <p>
                  Our website uses cookies. Cookies are small text files stored on your
                  device. We use technically necessary cookies for the operation of the website.
                </p>

                <h2>7. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Information about your stored data (Art. 15 GDPR)</li>
                  <li>Rectification of incorrect data (Art. 16 GDPR)</li>
                  <li>Deletion of your data (Art. 17 GDPR)</li>
                  <li>Restriction of processing (Art. 18 GDPR)</li>
                  <li>Data portability (Art. 20 GDPR)</li>
                  <li>Object to processing (Art. 21 GDPR)</li>
                </ul>

                <h2>8. Data Security</h2>
                <p>
                  We use SSL encryption to protect your data during transmission.
                  Our website uses HTTPS.
                </p>

                <h2>9. Retention Period</h2>
                <p>
                  We store your data only as long as necessary for contract fulfillment
                  or as required by legal retention periods (typically 7 years for
                  business data).
                </p>

                <h2>10. Right to Complain</h2>
                <p>
                  You have the right to complain to the Austrian Data Protection Authority:<br />
                  Austrian Data Protection Authority<br />
                  Barichgasse 40-42<br />
                  1030 Vienna<br />
                  dsb@dsb.gv.at
                </p>

                <h2>11. Contact</h2>
                <p>
                  For questions about data protection, please contact us at {BUSINESS_INFO.email}.
                </p>
              </>
            )}
          </div>

          {/* Link to Terms */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {isDE ? 'Siehe auch unsere ' : 'See also our '}
              <Link href="/terms" className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300">
                {isDE ? 'Allgemeinen Geschäftsbedingungen' : 'Terms of Service'}
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
