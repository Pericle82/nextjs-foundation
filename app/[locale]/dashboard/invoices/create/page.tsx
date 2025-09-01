import { fetchCustomers } from '@/app/lib/data';
import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
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
