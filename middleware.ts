import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const i18nRoutingMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Run i18n middleware first
  const i18nResult = i18nRoutingMiddleware(request);

  // If i18n middleware returns a redirect or rewrite, return it
  if (
    i18nResult && i18nResult instanceof Response && i18nResult.status !== 200
  ) {
    return i18nResult;
  }

  // Run NextAuth middleware
  return NextAuth(authConfig).auth(request as any)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|seed|.*\\..*).*)'
};