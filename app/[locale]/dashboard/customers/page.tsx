import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  // Enable static rendering
  setRequestLocale(params.locale);

  const customers = await fetchFilteredCustomers(query);

  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}
