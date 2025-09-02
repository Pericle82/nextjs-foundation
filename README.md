# Next.js Foundation Dashboard

A modern, full-stack dashboard application built with Next.js 15, featuring complete dark mode support, internationalization, authentication, and invoice management. This project demonstrates production-ready patterns with TypeScript, Tailwind CSS, and PostgreSQL.

## ✨ Key Features

### 🎨 **Complete Dark Mode Implementation**
- **System-wide dark theme** with `next-themes` integration
- **Comprehensive UI coverage**: Tables, forms, navigation, loading states
- **Smart contrast optimization** for accessibility
- **Floating theme switcher** positioned to avoid content overlap

### 🌍 **Internationalization & UX**
- **Multi-language support** (English & Italian) with `next-intl`
- **Language switcher** with enhanced backgrounds for visibility
- **Optimized routing** with locale-based patterns
- **Static rendering** configuration for performance

### 💼 **Business Features**
- **Invoice Management**: Create, edit, and track invoice statuses
- **Customer Database**: Expanded customer data (16 customers) with search/pagination
- **Revenue Analytics**: Visual charts and financial summaries
- **Real-time Search**: Instant filtering across tables

### 🔧 **Technical Excellence**
- **Database Connection Pooling**: Singleton pattern prevents "too many clients" errors
- **Type-safe Development**: Full TypeScript coverage with Zod validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication**: Secure NextAuth.js implementation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database (Docker recommended)

### Setup
```bash
# Clone and install
git clone <repository-url>
cd nextjs-foundation
pnpm install

# Environment setup
cp .env.example .env.development
# Configure POSTGRES_URL and NEXTAUTH_SECRET

# Database setup
docker run --name nextjs-postgres-dev -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15-alpine
curl -X POST http://localhost:3000/seed

# Start development
pnpm dev
```

**Demo Login**: `user@nextmail.com` / `123456`

## 🏗️ Architecture

### Project Structure
```
app/
├── [locale]/                    # Internationalized routes
│   ├── components/              # Theme & language switchers
│   ├── dashboard/               # Protected dashboard pages
│   └── login/                   # Authentication
├── lib/
│   ├── db.ts                   # ✨ Connection pool singleton
│   ├── actions.ts              # Server actions
│   └── data.ts                 # Data fetching
├── ui/                         # ✨ Dark mode UI components
│   ├── dashboard/              # Cards, charts, navigation
│   ├── invoices/               # Forms, tables, pagination
│   └── customers/              # Customer management
└── seed/                       # Database seeding
```

### Dark Mode Implementation
- **Comprehensive coverage**: Every UI component supports dark/light themes
- **Smart defaults**: Proper contrast ratios and accessibility
- **Loading states**: Dark-themed skeletons with shimmer effects
- **Interactive elements**: Hover states and focus indicators

### Database Architecture
- **Connection Pooling**: Prevents connection exhaustion with singleton pattern
- **Type Safety**: PostgreSQL with typed queries and schema validation
- **Seeding**: Automated setup with 16 customers and sample invoices
- **Performance**: Optimized queries with proper indexing

## � UI Components

### Core Components
- **Tables**: Responsive design with dark mode support
- **Forms**: Validation with error states and accessibility
- **Navigation**: Sidebar with proper dark mode backgrounds
- **Loading States**: Skeleton components with shimmer animations
- **Switchers**: Theme and language controls with enhanced visibility

### Design System
- **Tailwind CSS**: Utility-first with dark mode class strategy
- **Consistent Patterns**: Reusable component library
- **Accessibility**: ARIA-compliant with proper contrast ratios
- **Icons**: Heroicons and Lucide React integration

## 🔧 Technical Highlights

### Performance Optimizations
```typescript
// Connection Pool Singleton (prevents "too many clients")
const sql = postgres(url, {
  max: process.env.NODE_ENV === 'production' ? 10 : 5,
  idle_timeout: 20,
  connect_timeout: 30
});
```

### Dark Mode Implementation
```typescript
// System-wide theme support
<html lang={locale} suppressHydrationWarning>
  <body className="bg-white dark:bg-gray-900">
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </body>
</html>
```

### Type Safety
```typescript
// Comprehensive type definitions
type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
}
```

## � Technologies

**Core**: Next.js 15, TypeScript, React 18  
**Styling**: Tailwind CSS, next-themes, Radix UI  
**Database**: PostgreSQL with connection pooling  
**Auth**: NextAuth.js v5 with credentials  
**i18n**: next-intl with static rendering  
**Validation**: Zod schema validation  
**Development**: Turbopack for fast builds

## � Database Schema

```sql
-- Users, Customers, Invoices with UUID primary keys
-- Optimized for performance with proper indexes
-- Seeded with 16 customers and sample data
```

## 🌍 Internationalization

- **Languages**: English (default), Italian
- **URL Pattern**: `/en/dashboard`, `/it/dashboard`
- **Static Rendering**: Optimized with `generateStaticParams`
- **Translation Management**: JSON-based dictionaries

## � Security & Auth

- **Protected Routes**: Middleware-based route protection
- **Password Hashing**: bcrypt for secure authentication
- **Type Validation**: Zod schemas for all inputs
- **Environment Security**: Proper secret management

---

**Built with ❤️ using Next.js 15 and modern web technologies**