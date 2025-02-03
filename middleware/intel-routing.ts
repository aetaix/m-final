import { defaultLocale } from "@/constants/locale";
import { fetchLanguages } from "@/lib/directus/fetchers";
import { NextRequest, NextResponse } from "next/server";

function getLocaleFromHeader(request: NextRequest, locales: string[]): string {
  const acceptLanguage = request.headers.get("accept-language");
  const refererPath = request.headers.get("Referer");

  if (refererPath) {
    const [, prevLang] = new URL(refererPath).pathname.split("/");
    if (prevLang) return locales.includes(prevLang) ? prevLang : defaultLocale;
  }

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(",")[0].split("-")[0];
    return locales.includes(preferredLocale) ? preferredLocale : defaultLocale;
  }

  return defaultLocale;
}

export async function intelRouting(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let locales: string[];
  try {
    locales = (await fetchLanguages()).map((item) => item.code);
  } catch (error) {
    console.error("Error fetching supported locales:", error);
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  /** Temporarily support only English */
  // const locale = getLocaleFromHeader(request, locales);
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}
