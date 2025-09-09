# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Next.js 15 taxi service application for Luigi Taxi in Wiener Neustadt, Austria. The project features internationalization (German/English), form handling, and a modern component-based architecture.

## Common Commands

### Development
```bash
npm run dev              # Start development server with Turbopack
npm run build           # Build production app with Turbopack
npm start               # Start production server
npm run lint            # Run ESLint
```

### Installation
```bash
npm install             # Install dependencies
```

## Architecture

### Core Technologies
- **Next.js 15**: App Router with Turbopack for fast builds
- **React 19**: Latest React with concurrent features
- **TypeScript**: Strict type checking enabled
- **Tailwind CSS 4**: Utility-first styling with PostCSS
- **next-intl**: Internationalization with locale-based routing
- **React Hook Form + Zod**: Form validation and management
- **Framer Motion**: Animations and interactions
- **Stripe**: Payment processing integration

### Project Structure

```
app/
├── [locale]/           # Locale-specific pages (en, de)
├── api/               # API routes
├── components/        # App-specific components
├── globals.css        # Global styles
├── layout.tsx         # Root layout with metadata
└── providers.tsx      # Client-side providers

components/
├── forms/             # Form components
├── layout/            # Layout components
└── ui/                # Reusable UI components

lib/
├── constants/         # Application constants
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── validations/       # Zod validation schemas

i18n/
└── routing.ts         # Internationalization routing config

messages/
├── en.json            # English translations
└── de.json            # German translations

types/                 # TypeScript type definitions
services/              # External service integrations
```

### Internationalization Setup

The app supports German (default) and English locales:

- **Routing**: Locale-based URLs (`/de/`, `/en/`)
- **Messages**: JSON files in `messages/` directory
- **Middleware**: Automatic locale detection and routing
- **Configuration**: `i18n.ts` handles locale validation and message loading

### Form Architecture

Forms use React Hook Form with Zod validation:
- Form components in `components/forms/`
- Validation schemas in `lib/validations/`
- Type-safe form handling with TypeScript

### Next.js Configuration

Key configuration features:
- **Image Optimization**: WebP/AVIF formats, security headers for SVG
- **Performance**: Package import optimization for Lucide React and Framer Motion
- **Security**: Security headers (X-Frame-Options, CSP, etc.)
- **Turbopack**: Enabled for faster builds and development

### Path Aliases

- `@/*`: Root directory alias for clean imports

## Development Notes

### TypeScript Configuration
- Strict mode enabled
- Path mapping configured for `@/*` imports
- ES2017 target with modern module resolution

### Styling
- Tailwind CSS 4 with PostCSS
- Component-based styling patterns
- Global styles in `app/globals.css`

### State Management
- Form state via React Hook Form
- Theme management with next-themes
- Toast notifications with react-hot-toast

### Performance Optimizations
- Turbopack for fast builds
- Image optimization with multiple formats
- Package import optimization for large libraries
- Incremental TypeScript compilation