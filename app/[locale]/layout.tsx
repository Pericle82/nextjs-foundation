import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from './components/theme-provider';
import  LangSwitcher from './components/lang-switcher';
import { ThemeSwitcher } from './components/theme-switcher';
import ClientOnly from './components/client-only';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { metadata } from './_site_metadata';
import { setRequestLocale } from 'next-intl/server';

export { metadata };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900`} suppressHydrationWarning>

        <NextIntlClientProvider locale={locale}>
          <ThemeProvider>
            <ClientOnly>
              <div className="fixed top-4 right-4 z-50 flex flex-row gap-2">
                <LangSwitcher />
                <ThemeSwitcher />
              </div>
            </ClientOnly>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>

      </body>
    </html>
  );
}

