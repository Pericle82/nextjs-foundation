'use client';

import { cn } from "@/app/lib/utils";
import { Button, buttonVariants } from "@/app/ui/button";
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ComponentProps, useTransition, useEffect, useState } from "react";


type LangSwitcherProps = {
  className?: ComponentProps<typeof Link>["className"];
};

export default function LangSwitcher({ className }: LangSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('ui');
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [pathname, setPathname] = useState('');
  const [mounted, setMounted] = useState(false);

  // Hook per evitare l'hydration mismatch
  const pathnameFull = usePathname();
  
  useEffect(() => {
    setPathname(pathnameFull.replace(/^\/(en|it)/, ''));
    setMounted(true);
  }, [pathnameFull]);

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

  // Non renderizzare fino a quando non siamo sul client
  if (!mounted) {
    return (
      <Button
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          className,
        )}
        disabled
      >
        {locale.toUpperCase()}
      </Button>
    );
  }

  return (
    <Button
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        className,
      )}
      onClick={onSelectChange}
      title={t('switchLanguage', { locale: nextLocale })}
      disabled={isPending}
    >
      {locale.toUpperCase()}
    </Button>
  );
};
