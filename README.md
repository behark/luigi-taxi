# Luigi Taxi

Production website for Luigi Taxi, a taxi company in Wiener Neustadt, Austria. Live at https://taxiluigi.at.

## What it does

- Bilingual site (German / English) with locale routing via `next-intl`
- Booking and contact forms with validation (react-hook-form + zod), delivered by email
- Distance-based fare estimate using the Google Maps Distance Matrix API
- Stripe integration prepared for online prepayment
- QR codes for printed material, sitemap, structured data and Open Graph metadata

## Stack

Next.js 15 (App Router), TypeScript, Tailwind CSS, next-intl, framer-motion, Vercel.

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in the keys you have
npm run dev
```

Environment variables are documented in `.env.example`.
