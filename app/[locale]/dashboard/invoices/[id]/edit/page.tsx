import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page(props: { params: Promise<{ locale: string; id: string }> }) {
  const params = await props.params;
  const { locale, id } = params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  const t = await getTranslations('invoices.breadcrumbs');

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t('invoices'), href: '/dashboard/invoices' },
          {
            label: t('editInvoice'),
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
