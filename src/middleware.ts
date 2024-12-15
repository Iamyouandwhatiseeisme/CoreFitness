import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { updateSession } from "./app/utils/supabase/middleware";
import {
  isStripeSubscriptionActive,
  SubscriptionStatus,
} from "./app/utils/stripe/isStripeSubscriptionActive";
import { User } from "@supabase/supabase-js";

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
  let user: User | null = null;
  const { pathname } = request.nextUrl;
  const locale = getLocale(request);

  const sessionResponse = await updateSession(request);
  if (sessionResponse instanceof NextResponse) {
    const data = await sessionResponse.json();
    user = data.user;
    if (pathname === `/${locale}/pricing`) {
      console.log("120");
      const status: SubscriptionStatus = await isStripeSubscriptionActive(
        user?.email!
      );
      if (status === SubscriptionStatus.Active) {
        console.log("active");
      }
      if (status === SubscriptionStatus.Inactive) {
        console.log("inactive");
      }
    }
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  request.nextUrl.pathname = `/${locale}${pathname}`;

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
