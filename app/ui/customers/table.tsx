import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { FormattedCustomersTable } from '@/app/lib/definitions';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  const t = await getTranslations('customers');
    const locale = await getLocale();

  const formatCurrency = (amount: number) => {
    const currency = locale.startsWith('it') ? 'EUR' : 'USD';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount / 100);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(locale).format(date);
  };
  
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl dark:text-white`}>
        {t('title')}
      </h1>
      <Search placeholder={t('searchPlaceholder')} />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 dark:bg-gray-800 md:pt-0">
              <div className="md:hidden">
                {customers?.map((customer) => (
                  <div
                    key={customer.id}
                    className="mb-2 w-full rounded-md bg-white dark:bg-gray-700 p-4"
                  >
                    <div className="flex items-center justify-between border-b dark:border-gray-600 pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={customer.image_url}
                              className="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p className="dark:text-white">{customer.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b dark:border-gray-600 py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs dark:text-gray-300">{t('pending')}</p>
                        <p className="font-medium dark:text-white">{formatCurrency(customer.total_pending)}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs dark:text-gray-300">{t('paid')}</p>
                        <p className="font-medium dark:text-white">{formatCurrency(customer.total_paid)}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm dark:text-gray-300">
                      <p>{customer.total_invoices} {t('invoicesCount')}</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 dark:text-gray-100 md:table">
                <thead className="rounded-md bg-gray-50 dark:bg-gray-700 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6 dark:text-gray-200">
                      {t('tableHeaders.name')}
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium dark:text-gray-200">
                      {t('tableHeaders.email')}
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium dark:text-gray-200">
                      {t('tableHeaders.totalInvoices')}
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium dark:text-gray-200">
                      {t('tableHeaders.totalPending')}
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium dark:text-gray-200">
                      {t('tableHeaders.totalPaid')}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-600 text-gray-900 dark:text-gray-100">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group">
                      <td className="whitespace-nowrap bg-white dark:bg-gray-800 py-5 pl-4 pr-3 text-sm text-black dark:text-white group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white dark:bg-gray-800 px-4 py-5 text-sm">
                        {customer.email}
                      </td>
                      <td className="whitespace-nowrap bg-white dark:bg-gray-800 px-4 py-5 text-sm">
                        {customer.total_invoices}
                      </td>
                      <td className="whitespace-nowrap bg-white dark:bg-gray-800 px-4 py-5 text-sm">
                        {formatCurrency(customer.total_pending)}
                      </td>
                      <td className="whitespace-nowrap bg-white dark:bg-gray-800 px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {formatCurrency(customer.total_paid)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
