import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";
import { updateSession } from "./app/utils/supabase/middleware";
import { isStripeSubscriptionActive } from "./app/utils/stripe/isStripeSubscriptionActive";
import { SubscriptionStatus } from "./app/components/types";

const locales = ["en-US", "ka"];

function getLocale(request: NextRequest): string {
  const requestHeaders = new Headers(request.headers);
  let accepted = requestHeaders.get("accept-language") || "";

  if (request.nextUrl.pathname.startsWith("ka")) {
    accepted = "ka";
  }

  const headers = { "accept-language": `${accepted};q=0.5` };
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = "en-US";

  return match(languages, locales, defaultLocale);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  const pathnameSegments = pathname.split("/");
  const pathnameLocale = pathnameSegments[1];
  const locale = locales.includes(pathnameLocale) ? pathnameLocale : "en-US";

  const sessionResponse = await updateSession(request);
  const userHeader = sessionResponse.headers.get("user");
  const user = userHeader ? JSON.parse(userHeader) : null;
  const publicPaths = [
    `/${locale}/login`,
    `/${locale}/login/passwordRecovery`,
    `/${locale}/api/passwordRecovery`,
    `/login`,
    `/login/passwordRecovery`,
    `/api/passwordRecovery`,
  ];

  if (
    pathname.startsWith(`/auth/callback`) ||
    pathname.startsWith("/auth/auth-code-error")
  ) {
    return NextResponse.next();
  }
  if (!user && !publicPaths.includes(pathname)) {
    console.log(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }
  if (user && pathname === `/${locale}/login`) {
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl);
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
      request.nextUrl.pathname = `/${locale}/pricing`;
      return NextResponse.redirect(request.nextUrl);
    }
  }
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    if (pathnameSegments[2]) {
      if (pathnameSegments[2] === pathnameLocale) {
        const response = NextResponse.next();
        response.headers.set("accept-Language", locale);

        request.nextUrl.pathname = `/${locale}/${pathnameSegments[3]}/${pathnameSegments[4]}`;

        return NextResponse.redirect(request.nextUrl);
      }
    }
    const response = NextResponse.next();
    response.headers.set("accept-Language", locale);
    return response;
  }
  if (!pathnameHasLocale) {
    const loc = getLocale(request);
    request.nextUrl.pathname = `/${loc}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
  }
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
