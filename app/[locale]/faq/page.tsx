import { useTranslations } from 'next-intl';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { BUSINESS_INFO } from '@/lib/constants/business';
import { Phone, Mail, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  questionDE: string;
  answer: string;
  answerDE: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How do I book a taxi?',
    questionDE: 'Wie buche ich ein Taxi?',
    answer: 'You can book through our website, call us directly at +43 660 900 2700, or send a WhatsApp message. For immediate pickups, calling is the fastest option.',
    answerDE: 'Sie können über unsere Website buchen, uns direkt unter +43 660 900 2700 anrufen oder eine WhatsApp-Nachricht senden. Für sofortige Abholungen ist ein Anruf am schnellsten.',
  },
  {
    question: 'What are your service hours?',
    questionDE: 'Was sind Ihre Servicezeiten?',
    answer: 'We operate 24 hours a day, 7 days a week, 365 days a year. No matter when you need a ride, we are available.',
    answerDE: 'Wir sind 24 Stunden am Tag, 7 Tage die Woche, 365 Tage im Jahr erreichbar. Egal wann Sie eine Fahrt brauchen, wir sind verfügbar.',
  },
  {
    question: 'What payment methods do you accept?',
    questionDE: 'Welche Zahlungsmethoden akzeptieren Sie?',
    answer: 'We accept cash, credit/debit cards (Visa, Mastercard), and online payment. Payment is made at the end of your journey.',
    answerDE: 'Wir akzeptieren Bargeld, Kredit-/Debitkarten (Visa, Mastercard) und Online-Zahlung. Die Bezahlung erfolgt am Ende Ihrer Fahrt.',
  },
  {
    question: 'How much does a ride cost?',
    questionDE: 'Wie viel kostet eine Fahrt?',
    answer: `Our standard rate is €${BUSINESS_INFO.pricing.baseRates.standard}/km with a minimum fare of €${BUSINESS_INFO.pricing.minimumFare}. Night rides (${BUSINESS_INFO.pricing.nightHoursStart}:00-${BUSINESS_INFO.pricing.nightHoursEnd}:00) have a ${((BUSINESS_INFO.pricing.nightSurchargeMultiplier - 1) * 100).toFixed(0)}% surcharge. Use our price calculator for estimates.`,
    answerDE: `Unser Standardtarif beträgt €${BUSINESS_INFO.pricing.baseRates.standard}/km mit einem Mindestfahrpreis von €${BUSINESS_INFO.pricing.minimumFare}. Nachtfahrten (${BUSINESS_INFO.pricing.nightHoursStart}:00-${BUSINESS_INFO.pricing.nightHoursEnd}:00) haben einen Zuschlag von ${((BUSINESS_INFO.pricing.nightSurchargeMultiplier - 1) * 100).toFixed(0)}%. Nutzen Sie unseren Preisrechner für Schätzungen.`,
  },
  {
    question: 'Do you offer airport transfers?',
    questionDE: 'Bieten Sie Flughafentransfers an?',
    answer: 'Yes! We specialize in airport transfers to Vienna Airport (VIE), Bratislava Airport, and other regional airports. We monitor flight arrivals and adjust pickup times accordingly.',
    answerDE: 'Ja! Wir sind auf Flughafentransfers zum Flughafen Wien (VIE), Flughafen Bratislava und anderen regionalen Flughäfen spezialisiert. Wir überwachen Flugankünfte und passen die Abholzeiten entsprechend an.',
  },
  {
    question: 'How many passengers can you accommodate?',
    questionDE: 'Wie viele Passagiere können Sie befördern?',
    answer: 'Our standard sedans accommodate up to 4 passengers. For larger groups, we have minivans that can carry up to 8 passengers with luggage space.',
    answerDE: 'Unsere Standard-Limousinen bieten Platz für bis zu 4 Passagiere. Für größere Gruppen haben wir Kleinbusse, die bis zu 8 Passagiere mit Gepäckraum befördern können.',
  },
  {
    question: 'Can I book in advance?',
    questionDE: 'Kann ich im Voraus buchen?',
    answer: 'Absolutely! We recommend booking airport transfers and scheduled trips at least 24 hours in advance. However, we also accommodate same-day bookings based on availability.',
    answerDE: 'Absolut! Wir empfehlen, Flughafentransfers und geplante Fahrten mindestens 24 Stunden im Voraus zu buchen. Wir nehmen jedoch auch Buchungen am selben Tag je nach Verfügbarkeit an.',
  },
  {
    question: 'Do you provide child seats?',
    questionDE: 'Stellen Sie Kindersitze zur Verfügung?',
    answer: 'Yes, we can provide child seats upon request. Please let us know when booking so we can ensure the appropriate seat is available for your child\'s age and size.',
    answerDE: 'Ja, wir können auf Anfrage Kindersitze bereitstellen. Bitte teilen Sie uns dies bei der Buchung mit, damit wir den passenden Sitz für das Alter und die Größe Ihres Kindes bereithalten können.',
  },
  {
    question: 'What if my flight is delayed?',
    questionDE: 'Was passiert, wenn mein Flug Verspätung hat?',
    answer: 'We monitor all flights and adjust pickup times automatically. There\'s no extra charge for flight delays - your driver will be there when you land.',
    answerDE: 'Wir überwachen alle Flüge und passen die Abholzeiten automatisch an. Es gibt keine zusätzlichen Kosten für Flugverspätungen - Ihr Fahrer wird da sein, wenn Sie landen.',
  },
  {
    question: 'Is your service LGBTQ+ friendly?',
    questionDE: 'Ist Ihr Service LGBTQ+ freundlich?',
    answer: 'Yes! Luigi Taxi is proudly LGBTQ+ friendly. We welcome all passengers and are committed to providing a safe, respectful, and comfortable experience for everyone.',
    answerDE: 'Ja! Luigi Taxi ist stolz LGBTQ+ freundlich. Wir heißen alle Passagiere willkommen und sind bestrebt, jedem eine sichere, respektvolle und komfortable Erfahrung zu bieten.',
  },
];

function FAQAccordion({ items, locale }: { items: FAQItem[]; locale: string }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <details
          key={index}
          className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
              {locale === 'de' ? item.questionDE : item.question}
            </h3>
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-open:rotate-180 flex-shrink-0" />
          </summary>
          <div className="px-6 pb-6 pt-2">
            <p className="text-gray-600 dark:text-gray-300">
              {locale === 'de' ? item.answerDE : item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}

export default function FAQPage({ params }: { params: { locale: string } }) {
  const t = useTranslations();
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Section variant="default" className="pt-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: locale === 'de' ? 'Häufige Fragen' : 'FAQ' },
            ]}
          />

          <SectionHeader
            title={locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
            subtitle={locale === 'de'
              ? 'Finden Sie Antworten auf die häufigsten Fragen zu unserem Taxi-Service'
              : 'Find answers to the most common questions about our taxi service'
            }
          />

          <FAQAccordion items={FAQ_ITEMS} locale={locale} />

          {/* Still have questions? */}
          <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {locale === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {locale === 'de'
                ? 'Unser Team hilft Ihnen gerne weiter. Kontaktieren Sie uns jederzeit!'
                : 'Our team is happy to help. Contact us anytime!'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as="a" href={`tel:${BUSINESS_INFO.phoneClean}`}>
                <Phone className="w-4 h-4 mr-2" />
                {BUSINESS_INFO.phone}
              </Button>
              <Button variant="outline" as="a" href={`mailto:${BUSINESS_INFO.email}`}>
                <Mail className="w-4 h-4 mr-2" />
                {locale === 'de' ? 'E-Mail senden' : 'Send Email'}
              </Button>
              <Button variant="secondary" as={Link} href="/contact">
                {locale === 'de' ? 'Kontaktformular' : 'Contact Form'}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
