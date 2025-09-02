'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { nameKey: 'home', href: '/dashboard', icon: HomeIcon },
  {
    nameKey: 'invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { nameKey: 'customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.nameKey}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-sm font-medium hover:bg-sky-100 dark:hover:bg-sky-900 hover:text-blue-600 dark:hover:text-blue-400 md:flex-none md:justify-start md:p-2 md:px-3 dark:text-gray-300',
              {
                'bg-sky-100 dark:bg-sky-900 text-blue-600 dark:text-blue-400': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{t(link.nameKey as any)}</p>
          </Link>
        );
      })}
    </>
  );
}
