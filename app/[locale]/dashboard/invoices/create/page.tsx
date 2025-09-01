import { fetchCustomers } from '@/app/lib/data';
import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const customers = await fetchCustomers();
  const t = await getTranslations('invoices.breadcrumbs');

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t('invoices'), href: '/dashboard/invoices' },
          {
            label: t('createInvoice'),
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
