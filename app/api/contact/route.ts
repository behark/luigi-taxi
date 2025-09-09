import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = contactSchema.parse(body);

    // Here you would typically:
    // 1. Send email using a service like Resend, SendGrid, or Nodemailer
    // 2. Store in database
    // 3. Send to CRM system
    
    // For now, we'll just log the contact form submission
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending (replace with actual email service)
    /* const emailContent = `
      New contact form submission from Luigi Taxi website:
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      
      Message:
      ${message}
      
      Submitted at: ${new Date().toLocaleString('de-AT', { 
        timeZone: 'Europe/Vienna' 
      })}
    `; */

    // TODO: Replace with actual email service
    // await sendEmail({
    //   to: 'info@luigitaxi.at',
    //   subject: `Contact Form: ${subject}`,
    //   text: emailContent,
    // });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! We\'ll get back to you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data', errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}