import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

    const now = Date.now();

  return {
    locale,
    messages: (await import(`../dictionaries/${locale}.json`)).default,
    now: new Date(now)
  };
});
