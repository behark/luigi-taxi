# 🚕 Luigi Taxi - Wiener Neustadt

Modern, professional taxi booking website for Luigi Taxi service in Wiener Neustadt, Austria. Built with Next.js 15, featuring internationalization, real-time booking, and secure payment processing.

## 🌟 Features

- **🌍 Multilingual Support**: Full German and English translations with locale-based routing
- **📱 Responsive Design**: Mobile-first design optimized for all devices
- **🔒 Secure Booking**: Rate limiting, CORS protection, and input validation
- **💳 Payment Integration**: Stripe integration for secure online payments
- **📧 Email Notifications**: Automated booking confirmations via Resend
- **🗺️ Google Maps Integration**: Accurate distance and price calculations
- **💾 Database Storage**: Persistent booking and contact form data with Prisma + PostgreSQL
- **♿ Accessibility**: WCAG compliant with semantic HTML and ARIA attributes
- **🎨 Modern UI**: Framer Motion animations and Tailwind CSS styling
- **⚡ Performance**: Turbopack for fast builds, optimized images, and code splitting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Resend API key (for emails)
- Google Maps API key (optional, for accurate pricing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luigi-taxi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and configure:
   - `DATABASE_URL`: PostgreSQL connection string
   - `RESEND_API_KEY`: Resend API key for emails
   - `GOOGLE_MAPS_API_KEY`: Google Maps API key (optional)
   - Other variables as needed (see `.env.example`)

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
luigi-taxi/
├── app/                      # Next.js 15 App Router
│   ├── [locale]/            # Internationalized pages
│   │   ├── page.tsx         # Homepage
│   │   ├── booking/         # Booking page
│   │   ├── contact/         # Contact page
│   │   └── layout.tsx       # Locale-specific layout
│   ├── api/                 # API routes
│   │   ├── booking/         # Booking API
│   │   └── contact/         # Contact API
│   ├── components/          # App-specific components
│   └── providers.tsx        # Client-side providers
├── components/              # Shared components
│   ├── layout/             # Layout components
│   ├── seo/                # SEO components
│   └── ui/                 # Reusable UI components
├── lib/                     # Utilities and helpers
│   ├── constants/          # App constants
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── validations/        # Zod validation schemas
├── prisma/                  # Prisma schema and migrations
├── services/                # External service integrations
│   ├── email.ts            # Email service (Resend)
│   └── maps.ts             # Google Maps service
├── messages/                # i18n translations
│   ├── en.json             # English translations
│   └── de.json             # German translations
└── types/                   # TypeScript type definitions
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check

# Database
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema changes to database
npx prisma migrate dev  # Create and apply migrations
```

### Environment Variables

See `.env.example` for all available configuration options:

- **Required for Production**:
  - `NEXT_PUBLIC_SITE_URL`: Your domain URL
  - `DATABASE_URL`: PostgreSQL connection string
  - `RESEND_API_KEY`: Email service API key

- **Optional**:
  - `GOOGLE_MAPS_API_KEY`: For accurate distance/price calculations
  - `STRIPE_SECRET_KEY`: For payment processing
  - `TWILIO_*`: For SMS notifications
  - `SENTRY_DSN`: For error tracking

## 🗄️ Database

The application uses Prisma ORM with PostgreSQL to store:

- **Bookings**: Customer taxi booking requests
- **Contacts**: Contact form submissions

### Database Schema

```prisma
model Booking {
  id              String        @id @default(cuid())
  pickupLocation  String
  dropoffLocation String
  date            DateTime
  time            String
  passengers      Int
  luggage         Int
  name            String
  email           String
  phone           String
  notes           String?
  estimatedPrice  Float?
  status          BookingStatus @default(PENDING)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model Contact {
  id        String        @id @default(cuid())
  name      String
  email     String
  phone     String?
  subject   String
  message   String
  status    ContactStatus @default(NEW)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
}
```

## 🔐 Security Features

- ✅ **Rate Limiting**: 5 requests/minute for bookings, 3 requests/minute for contact forms
- ✅ **CORS Protection**: Only allows requests from configured origins
- ✅ **Request Body Limits**: 1MB maximum payload size
- ✅ **Input Validation**: Comprehensive Zod schemas for all user input
- ✅ **Security Headers**: X-Frame-Options, CSP, X-Content-Type-Options
- ✅ **Environment Variable Protection**: Server-side only sensitive data
- ✅ **SQL Injection Prevention**: Prisma ORM with parameterized queries

## 🌐 Internationalization

The app supports German (default) and English with:

- Locale-based routing (`/de/*`, `/en/*`)
- Translation files in `messages/`
- Automatic locale detection
- SEO-friendly alternate links

### Adding Translations

1. Add keys to `messages/en.json` and `messages/de.json`
2. Use in components:
   ```tsx
   import { useTranslations } from 'next-intl';

   const t = useTranslations('namespace');
   t('key');
   ```

## 📧 Email Service

Automated emails powered by Resend:

- **Booking Confirmation**: Sent to customers with booking details
- **Admin Notification**: Alert admin of new bookings
- **Contact Form**: Auto-reply and admin notification

Templates are defined in `services/email.ts`.

## 💳 Payment Integration

Stripe integration for secure payments:

- Checkout session creation
- Webhook handling for payment confirmation
- Configurable in `.env` with API keys

## 🎨 Styling

- **Tailwind CSS 4**: Utility-first styling
- **Custom Theme**: Yellow (#eab308) brand colors
- **Dark Mode**: System preference detection
- **Framer Motion**: Smooth animations and transitions
- **Responsive**: Mobile-first breakpoints

## 📊 SEO & Analytics

- **Metadata**: Dynamic title, description, Open Graph tags
- **JSON-LD**: Structured data for search engines
- **Sitemap**: Auto-generated with locale support
- **Robots.txt**: Search engine crawling configuration
- **Analytics**: Google Analytics and Vercel Analytics ready

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy

### Docker

```bash
# Build
docker build -t luigi-taxi .

# Run
docker run -p 3000:3000 luigi-taxi
```

### Manual Deployment

```bash
npm run build
npm start
```

Ensure you have:
- PostgreSQL database accessible
- All environment variables configured
- Node.js 18+ on the server

## 🧪 Testing

Testing infrastructure is set up for:

- Unit tests for utilities and validation
- Integration tests for API routes
- Component tests with React Testing Library

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 📝 API Documentation

### POST `/api/booking`

Create a new taxi booking.

**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+4366012345678",
  "pickupLocation": "Wiener Neustadt Hauptbahnhof",
  "dropoffLocation": "Vienna Airport",
  "pickupDate": "2025-01-15",
  "pickupTime": "10:00",
  "passengers": 2,
  "luggage": 2,
  "vehicleType": "standard",
  "serviceType": "oneway",
  "paymentMethod": "cash",
  "specialRequests": "Child seat needed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking request received successfully!",
  "bookingReference": "LT12345ABC",
  "estimatedPrice": 85.50,
  "distance": "45.2 km",
  "duration": "35 min"
}
```

### POST `/api/contact`

Submit a contact form message.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+4366098765432",
  "subject": "Question about services",
  "message": "I would like to know about airport transfers."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! We'll get back to you soon."
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for Luigi Taxi, Wiener Neustadt.

## 🆘 Support

For issues or questions:
- Phone: +43 660 900 2700
- Email: info@luigitaxi.at
- Website: https://luigitaxi.at

---

**Built with ❤️ using Next.js 15, React 19, TypeScript, and Tailwind CSS**
