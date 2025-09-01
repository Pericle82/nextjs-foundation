import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from './components/theme-provider';
import { LangSwitcher } from './components/lang-switcher';
import { ThemeSwitcher } from './components/theme-switcher';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { metadata } from './_site_metadata';
import { setRequestLocale } from 'next-intl/server';

export { metadata };

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>

        <NextIntlClientProvider locale={locale}>
          <ThemeProvider attribute="class">
            {children}
            <LangSwitcher className="absolute right-5 bottom-16 z-10" />
            <ThemeSwitcher className="absolute right-5 bottom-5 z-10" />
          </ThemeProvider>
        </NextIntlClientProvider>

      </body>
    </html>
  );
}

export default RootLayout;
