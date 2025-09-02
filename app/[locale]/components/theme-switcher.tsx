"use client";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/ui/button";
import { Icons } from "@/app/ui/icons";
import { useTheme } from "next-themes";
import { ComponentProps, useEffect, useState } from "react";

type ThemeSwitcherProps = {
  className?: ComponentProps<"button">["className"];
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Renderizza un placeholder durante l'hydration
    return (
      <Button
        className={cn(
          "cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg text-gray-900 dark:text-gray-100",
          className
        )}
        size="icon"
        aria-label="Toggle theme"
        disabled
      >
        <Icons.sun />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100",
        className
      )}
      size="icon"
      aria-label="Toggle theme"
    >
      <Icons.sun className={cn("transition-all", isDark ? "hidden" : "block")} />
      <Icons.moon className={cn("transition-all", isDark ? "block" : "hidden")} />
    </Button>
  );
};
