import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { updateSession } from "./app/utils/supabase/middleware";
import { isStripeSubscriptionActive } from "./app/utils/stripe/isStripeSubscriptionActive";

const locales = ["en-US", "ka"];

function getLocale(request: NextRequest): string {
  const requestHeaders = new Headers(request.headers);
  const accepted = requestHeaders.get("accept-language") || "";

  const headers = { "accept-language": `${accepted};q=0.5` };
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = "en-US";

  return match(languages, locales, defaultLocale);
}

export async function middleware(request: NextRequest) {
  const sessionResponse = await updateSession(request);
  if (sessionResponse instanceof NextResponse) {
    return sessionResponse;
  }
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  isStripeSubscriptionActive();

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/",
    "/about",
    "/404",
    "/posts",
    "/posts/:id*",
    "/products",
    "/products/:id*",
    "/profile",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
