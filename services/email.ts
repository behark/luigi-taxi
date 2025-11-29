import { Resend } from 'resend';
import { BUSINESS_INFO } from '@/lib/constants/business';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || `${BUSINESS_INFO.name} <booking@luigitaxi.at>`,
  adminEmail: process.env.EMAIL_TO_ADMIN || BUSINESS_INFO.infoEmail,
  replyTo: BUSINESS_INFO.email,
};

// Types
interface BookingEmailData {
  bookingReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  vehicleType: string;
  serviceType: string;
  paymentMethod: string;
  estimatedPrice: number;
  specialRequests?: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Helper to format vehicle type
function formatVehicleType(type: string): string {
  const types: Record<string, string> = {
    standard: 'Standard Limousine',
    executive: 'Executive Fahrzeug',
    minivan: 'Kleinbus (7-Sitzer)',
  };
  return types[type] || type;
}

// Helper to format service type
function formatServiceType(type: string): string {
  const types: Record<string, string> = {
    oneway: 'Einfache Fahrt',
    roundtrip: 'Hin- und Rückfahrt',
    hourly: 'Stundentarif',
    airport: 'Flughafentransfer',
  };
  return types[type] || type;
}

// Helper to format payment method
function formatPaymentMethod(method: string): string {
  const methods: Record<string, string> = {
    cash: 'Bargeld',
    card: 'Kredit-/Debitkarte',
    online: 'Online-Zahlung',
  };
  return methods[method] || method;
}

// Send booking confirmation to customer
export async function sendBookingConfirmationEmail(
  data: BookingEmailData
): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: data.customerEmail,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: `Buchungsbestätigung - ${data.bookingReference} | ${BUSINESS_INFO.name}`,
      html: `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #000; margin: 0; font-size: 28px;">${BUSINESS_INFO.name}</h1>
    <p style="color: #000; margin: 10px 0 0 0; font-size: 14px;">Ihr zuverlässiger Taxiservice</p>
  </div>

  <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
    <h2 style="color: #059669; margin-top: 0;">Buchung eingegangen!</h2>

    <p>Guten Tag ${data.customerName},</p>

    <p>Vielen Dank für Ihre Buchung bei ${BUSINESS_INFO.name}! Ihre Anfrage wurde erfolgreich übermittelt.</p>

    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
      <strong>Buchungsnummer: ${data.bookingReference}</strong>
    </div>

    <h3 style="border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Ihre Buchungsdetails</h3>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Abholort:</strong></td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.pickupLocation}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Zielort:</strong></td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.dropoffLocation}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Datum:</strong></td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.pickupDate}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Uhrzeit:</strong></td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.pickupTime}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Fahrgäste:</strong></td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.passengers} Person${data.passengers > 1 ? 'en' : ''}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Fahrzeug:</strong></td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${formatVehicleType(data.vehicleType)}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Serviceart:</strong></td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${formatServiceType(data.serviceType)}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Zahlung:</strong></td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${formatPaymentMethod(data.paymentMethod)}</td>
      </tr>
      ${data.specialRequests ? `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Besondere Wünsche:</strong></td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.specialRequests}</td>
      </tr>
      ` : ''}
    </table>

    <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
      <p style="margin: 0; font-size: 14px; color: #065f46;">Geschätzter Preis</p>
      <p style="margin: 5px 0 0 0; font-size: 32px; font-weight: bold; color: #059669;">${BUSINESS_INFO.currencySymbol}${data.estimatedPrice}</p>
    </div>

    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>Was passiert als nächstes?</strong></p>
      <p style="margin: 10px 0 0 0;">Wir werden Sie innerhalb von 15 Minuten kontaktieren, um Ihre Buchung zu bestätigen und Ihnen die Fahrerdetails mitzuteilen.</p>
    </div>

    <p>Bei Fragen erreichen Sie uns jederzeit:</p>
    <p>
      📞 <a href="tel:${BUSINESS_INFO.phoneClean}" style="color: #f59e0b;">${BUSINESS_INFO.phone}</a><br>
      📧 <a href="mailto:${BUSINESS_INFO.email}" style="color: #f59e0b;">${BUSINESS_INFO.email}</a><br>
      💬 <a href="${BUSINESS_INFO.social.whatsapp}" style="color: #f59e0b;">WhatsApp</a>
    </p>

    <p>Mit freundlichen Grüßen,<br><strong>Ihr ${BUSINESS_INFO.name} Team</strong></p>
  </div>

  <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
    <p style="margin: 0;">${BUSINESS_INFO.name}</p>
    <p style="margin: 5px 0;">${BUSINESS_INFO.address}, ${BUSINESS_INFO.postalCode} ${BUSINESS_INFO.city}</p>
    <p style="margin: 5px 0;">${BUSINESS_INFO.phone} | ${BUSINESS_INFO.email}</p>
  </div>
</body>
</html>
      `,
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Failed to send booking confirmation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Send booking notification to admin
export async function sendBookingNotificationToAdmin(
  data: BookingEmailData
): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping admin notification');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.adminEmail,
      replyTo: data.customerEmail,
      subject: `🚕 Neue Buchung: ${data.bookingReference} - ${data.customerName}`,
      html: `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #dc2626; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #fff; margin: 0;">Neue Buchungsanfrage!</h1>
  </div>

  <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
    <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin-bottom: 20px;">
      <strong>Buchungsnummer: ${data.bookingReference}</strong><br>
      <strong>Eingegangen: ${new Date().toLocaleString('de-AT', { timeZone: BUSINESS_INFO.timezone })}</strong>
    </div>

    <h3>Kundeninformationen</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Name:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.customerName}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Telefon:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;"><a href="tel:${data.customerPhone}">${data.customerPhone}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>E-Mail:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;"><a href="mailto:${data.customerEmail}">${data.customerEmail}</a></td>
      </tr>
    </table>

    <h3>Fahrtdetails</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Von:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.pickupLocation}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Nach:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.dropoffLocation}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Datum/Zeit:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.pickupDate} um ${data.pickupTime}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Fahrgäste:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.passengers}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Fahrzeug:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${formatVehicleType(data.vehicleType)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Service:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${formatServiceType(data.serviceType)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Zahlung:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${formatPaymentMethod(data.paymentMethod)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Geschätzter Preis:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; color: #059669;">${BUSINESS_INFO.currencySymbol}${data.estimatedPrice}</td>
      </tr>
      ${data.specialRequests ? `
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #fef3c7;"><strong>Besondere Wünsche:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #fef3c7;">${data.specialRequests}</td>
      </tr>
      ` : ''}
    </table>

    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center;">
      <p style="margin: 0;"><strong>⚠️ Bitte bestätigen Sie diese Buchung innerhalb von 15 Minuten!</strong></p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Send contact form notification to admin
export async function sendContactFormEmail(
  data: ContactEmailData
): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.adminEmail,
      replyTo: data.email,
      subject: `📬 Kontaktformular: ${data.subject}`,
      html: `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #3b82f6; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #fff; margin: 0;">Neue Kontaktanfrage</h1>
  </div>

  <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <p><strong>Eingegangen:</strong> ${new Date().toLocaleString('de-AT', { timeZone: BUSINESS_INFO.timezone })}</p>

    <h3>Absender</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Name:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>E-Mail:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Telefon:</strong></td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;"><a href="tel:${data.phone}">${data.phone}</a></td>
      </tr>
    </table>

    <h3>Betreff</h3>
    <p style="background: #f3f4f6; padding: 15px; border-radius: 8px;">${data.subject}</p>

    <h3>Nachricht</h3>
    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${data.message}</div>

    <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px; text-align: center;">
      <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}"
         style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Antworten
      </a>
    </div>
  </div>
</body>
</html>
      `,
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Failed to send contact form email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Send auto-reply to contact form submitter
export async function sendContactAutoReply(
  data: ContactEmailData
): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: data.email,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: `Ihre Anfrage bei ${BUSINESS_INFO.name}`,
      html: `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #000; margin: 0;">${BUSINESS_INFO.name}</h1>
  </div>

  <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <p>Guten Tag ${data.name},</p>

    <p>Vielen Dank für Ihre Nachricht! Wir haben Ihre Anfrage erhalten und werden uns so schnell wie möglich bei Ihnen melden.</p>

    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>Ihre Nachricht:</strong></p>
      <p style="margin: 10px 0 0 0; font-style: italic;">"${data.message.substring(0, 200)}${data.message.length > 200 ? '...' : ''}"</p>
    </div>

    <p>Für dringende Anfragen erreichen Sie uns unter:</p>
    <p>
      📞 <a href="tel:${BUSINESS_INFO.phoneClean}" style="color: #f59e0b;">${BUSINESS_INFO.phone}</a> (24/7)<br>
      💬 <a href="${BUSINESS_INFO.social.whatsapp}" style="color: #f59e0b;">WhatsApp</a>
    </p>

    <p>Mit freundlichen Grüßen,<br><strong>Ihr ${BUSINESS_INFO.name} Team</strong></p>
  </div>
</body>
</html>
      `,
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Failed to send auto-reply email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
