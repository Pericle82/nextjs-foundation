import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  console.log(`requested locale: ${requested}`);
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

    console.log(`switch to ${locale}`);

    const now = Date.now();

  return {
    locale,
    messages: (await import(`../dictionaries/${locale}.json`)).default,
    now: new Date(now)
  };
});
