# Next.js Foundation Dashboard

A modern, full-stack dashboard application built with Next.js 15, featuring internationalization, authentication, and a complete invoice management system. This project demonstrates best practices for building production-ready applications with TypeScript, Tailwind CSS, and PostgreSQL.

## ✨ Features

### Core Functionality
- **Invoice Management**: Create, edit, and manage invoices with status tracking
- **Customer Management**: Comprehensive customer database with invoice history
- **Revenue Analytics**: Visual revenue charts and financial summaries
- **Search & Pagination**: Real-time search with paginated results

### Modern Architecture
- **Next.js 15**: Latest features with App Router and Server Components
- **TypeScript**: Full type safety throughout the application
- **Internationalization**: Multi-language support (English & Italian)
- **Authentication**: Secure NextAuth.js implementation with credentials
- **Dark/Light Mode**: Built-in theme switching with `next-themes`
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Developer Experience
- **Turbopack**: Lightning-fast development with `--turbopack`
- **Type Definitions**: Comprehensive TypeScript interfaces
- **Form Validation**: Zod schema validation
- **Component Library**: Reusable UI components with Radix UI
- **Icons**: Heroicons and Lucide React for consistent iconography

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: latest LTS)
- pnpm (package manager)
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-foundation
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.development
```

Configure your `.env.development` file with:
```env
# Database
POSTGRES_URL="postgresql://username:password@localhost:5432/database_name"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Development
NODE_ENV="development"
```

4. Initialize the database:
```bash
# Seed the database with sample data
curl -X POST http://localhost:3000/seed
```

5. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server

## 🏗️ Project Structure

```
├── app/
│   ├── [locale]/                 # Internationalized routes
│   │   ├── components/           # Locale-specific components
│   │   ├── dashboard/            # Dashboard pages
│   │   │   ├── (overview)/       # Dashboard overview
│   │   │   ├── customers/        # Customer management
│   │   │   └── invoices/         # Invoice management
│   │   ├── login/                # Authentication page
│   │   └── page.tsx              # Home page
│   ├── lib/                      # Utility functions & data
│   │   ├── actions.ts            # Server actions
│   │   ├── data.ts               # Data fetching functions
│   │   └── definitions.ts        # TypeScript definitions
│   ├── ui/                       # UI components
│   │   ├── dashboard/            # Dashboard-specific components
│   │   ├── invoices/             # Invoice components
│   │   └── customers/            # Customer components
│   ├── query/route.ts            # API routes
│   └── seed/route.ts             # Database seeding
├── auth.ts                       # NextAuth configuration
├── auth.config.ts                # Auth configuration
├── middleware.ts                 # Next.js middleware
├── i18n/                         # Internationalization setup
├── dictionaries/                 # Translation files
│   ├── en.json                   # English translations
│   └── it.json                   # Italian translations
└── public/                       # Static assets
```

## 🔒 Authentication

The application uses NextAuth.js with credentials provider:

- **Login endpoint**: `/[locale]/login`
- **Protected routes**: All dashboard routes require authentication
- **Middleware protection**: Routes are protected via middleware

### Demo Credentials
```
Email: user@nextmail.com
Password: 123456
```

## 🌍 Internationalization

Multi-language support with `next-intl`:

- **Supported languages**: English (`en`), Italian (`it`)
- **Default locale**: English
- **URL structure**: `/en/dashboard`, `/it/dashboard`
- **Translation files**: Located in `dictionaries/`

## 🎨 UI Components

Built with modern component patterns:

- **Design System**: Custom components with Tailwind CSS
- **Accessibility**: ARIA-compliant components
- **Icons**: Heroicons for consistent iconography
- **Forms**: Tailwind Forms plugin for beautiful form styling
- **Animations**: Shimmer loading effects and smooth transitions

## 📊 Database Schema

The application manages three main entities:

```typescript
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}

type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
}

type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
}
```

## 🛠️ Technologies

### Framework & Language
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library with latest features

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **@tailwindcss/forms** - Beautiful form styling
- **next-themes** - Theme switching support
- **Radix UI** - Headless UI components
- **Heroicons** - SVG icon library
- **Lucide React** - Additional icons

### Authentication & Security
- **NextAuth.js v5** - Authentication solution
- **bcrypt** - Password hashing
- **Zod** - Schema validation

### Database & Data
- **PostgreSQL** - Primary database
- **postgres** - PostgreSQL client for Node.js

### Internationalization
- **next-intl** - Internationalization for Next.js

### Development Tools
- **Turbopack** - Fast bundler for development
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Deployment

### Production Build
```bash
pnpm build
pnpm start
```

### Environment Variables
Ensure these are set in production:
- `POSTGRES_URL` - Production database URL
- `NEXTAUTH_SECRET` - Secure secret for NextAuth
- `NEXTAUTH_URL` - Production URL

### Database Setup
Consider using [Neon](https://neon.com) for PostgreSQL hosting or [Drizzle ORM](https://orm.drizzle.team) for enhanced database management.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is based on the Next.js Learn Course by Vercel and is intended for educational purposes.

## 🙏 Acknowledgments

- [Next.js Learn Course](https://nextjs.org/learn/) by Vercel
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Heroicons](https://heroicons.com/) for the beautiful icon set
- The Next.js and React communities for continuous innovation

---

**Built with ❤️ using Next.js 15 and modern web technologies**