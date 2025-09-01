'use client';

import Link from "next/link";
import { Locale, useLocale, useTranslations } from "next-intl";
import { ChangeEvent, ComponentProps, useTransition } from "react";
import { cn } from "@/app/lib/utils";
import { Button, buttonVariants } from "@/app/ui/button";
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from "next/navigation";


type LangSwitcherProps = {
  className?: ComponentProps<typeof Link>["className"];
};

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('ui');
  const pathname = usePathname().replace(/^\/(en|it)/, '');
  const params = useParams();

  const [isPending, startTransition] = useTransition();

  const nextLocale = locale === "en" ? "it" : "en";

  function onSelectChange(event: React.MouseEvent<HTMLButtonElement>) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }


  return (
    <Button
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        className,
      )}
      onClick={onSelectChange}
      title={t('switchLanguage', { locale: nextLocale })}
    >
      {locale.toUpperCase()}
    </Button>
  );
};
