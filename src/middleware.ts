import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";
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
  // let user: User | null = null;
  const { pathname } = request.nextUrl;
  const locale = getLocale(request);

  const sessionResponse = await updateSession(request);
  // if (sessionResponse instanceof NextResponse) {

  //   return sessionResponse;
  //   // if (sessionResponse.body) {
  //   //   const data = await sessionResponse.json();
  //   //   user = data.user;
  //   //   if (user) {
  //   //     return sessionResponse
  //   //   pathname === `/${locale}/pricing` ||
  //   //   pathname === `/${locale}/pricing/active`
  //   // ) {
  //   //   const status: SubscriptionStatus = await isStripeSubscriptionActive(
  //   //     user?.email!
  //   //   );
  //   //   if (
  //   //     status === SubscriptionStatus.Active &&
  //   //     pathname === `/${locale}/pricing`
  //   //   ) {
  //   //     request.nextUrl.pathname = `/${locale}/pricing/active`;
  //   //     return NextResponse.redirect(request.nextUrl);
  //   //   }
  //   //   if (
  //   //     status === SubscriptionStatus.Inactive &&
  //   //     pathname === `/${locale}/pricing/active`
  //   //   ) {
  //   //     request.nextUrl.pathname = `/pricing  `;
  //   //     console.log("inactive2");
  //   //     return NextResponse.redirect(request.nextUrl);
  //   //   }
  //   //   return NextResponse.next({ request });
  //   // } else {
  //   //   return NextResponse.next({ request });
  //   // }
  //   //   }
  //   //   return sessionResponse;
  //   // }
  // }
  const userHeader = sessionResponse.headers.get("user");
  const user = userHeader ? JSON.parse(userHeader) : null;
  if (!user && pathname !== `/${locale}/login`) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }
  if (
    user &&
    (pathname === `/${locale}/pricing` ||
      pathname === `/${locale}/pricing/active`)
  ) {
    const status: SubscriptionStatus = await isStripeSubscriptionActive(
      user?.email!
    );
    if (
      status === SubscriptionStatus.Active &&
      pathname === `/${locale}/pricing`
    ) {
      request.nextUrl.pathname = `/${locale}/pricing/active`;
      return NextResponse.redirect(request.nextUrl);
    } else if (
      status === SubscriptionStatus.Inactive &&
      pathname === `/${locale}/pricing/active`
    ) {
      console.log("inactive status");
      request.nextUrl.pathname = `/${locale}/pricing`;
      return NextResponse.redirect(request.nextUrl);
    }
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  request.nextUrl.pathname = `/${locale}${pathname}`;
  console.log(request.nextUrl.pathname);

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
    "/pricing",
    "/pricing/active",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
