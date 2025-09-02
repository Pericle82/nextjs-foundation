import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { getTranslations, getLocale } from 'next-intl/server';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);
  const t = await getTranslations('invoices.tableHeaders');
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
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 dark:bg-gray-800 md:pt-0">
            <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white dark:bg-gray-700 p-4"
              >
                <div className="flex items-center justify-between border-b dark:border-gray-600 pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p className="dark:text-white">{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium dark:text-white">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p className="dark:text-gray-300">{formatDate(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full rounded-md text-gray-900 dark:text-gray-100 md:table">
            <thead className="rounded-md bg-gray-50 dark:bg-gray-700 text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 dark:text-gray-200">
                  {t('customer')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium dark:text-gray-200">
                  {t('email')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium dark:text-gray-200">
                  {t('amount')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium dark:text-gray-200">
                  {t('date')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium dark:text-gray-200">
                  {t('status')}
                </th>
                <th scope="col" className="px-4 py-5 font-medium dark:text-gray-200">
                  <span className="sr-only">{t('edit')}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600 text-gray-900 dark:text-gray-100">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="group"
                >
                  <td className="whitespace-nowrap bg-white dark:bg-gray-800 py-5 pl-4 pr-3 text-sm text-black dark:text-white group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap bg-white dark:bg-gray-800 px-4 py-5 text-sm">
                    {invoice.email}
                  </td>
                  <td className="whitespace-nowrap bg-white dark:bg-gray-800 px-4 py-5 text-sm">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap bg-white dark:bg-gray-800 px-4 py-5 text-sm">
                    {formatDate(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap bg-white dark:bg-gray-800 px-4 py-5 text-sm">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap bg-white dark:bg-gray-800 px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}
