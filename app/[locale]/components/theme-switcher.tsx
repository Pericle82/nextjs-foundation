"use client";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/ui/button";
import { Icons } from "@/app/ui/icons";
import { useTheme } from "next-themes";
import { ComponentProps } from "react";

type ThemeSwitcherProps = {
  className?: ComponentProps<"button">["className"];
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn("cursor-pointer", className)}
      size="icon"
      aria-label="Toggle theme"
    >
      <Icons.sun className="dark:hidden" />
      <Icons.moon className="hidden dark:block" />
    </Button>
  );
};
