import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { getLocale, getTranslations } from 'next-intl/server';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  
  const t = await getTranslations('dashboard.cards');
      const locale = await getLocale();

  const formatCurrency = (amount: number) => {
    const currency = locale.startsWith('it') ? 'EUR' : 'USD';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount / 100);
  };

  return (
    <>
      <Card title={t('collected')} value={formatCurrency(totalPaidInvoices)} type="collected" />
      <Card title={t('pending')} value={formatCurrency(totalPendingInvoices)} type="pending" />
      <Card title={t('totalInvoices')} value={numberOfInvoices} type="invoices" />
      <Card title={t('totalCustomers')} value={numberOfCustomers} type="customers" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" /> : null}
        <h3 className="ml-2 text-sm font-medium dark:text-gray-200">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white dark:bg-gray-700 px-4 py-8 text-center text-2xl dark:text-white`}
      >
        {value}
      </p>
    </div>
  );
}
