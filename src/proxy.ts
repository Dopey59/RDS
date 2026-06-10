import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // Apex → www, sauf /.well-known/ (requis pour Universal Links iOS + App Links Android)
  if (
    host === "renard-des-surfaces.com" &&
    !pathname.startsWith("/.well-known/")
  ) {
    const url = request.nextUrl.clone();
    url.host = "www.renard-des-surfaces.com";
    return NextResponse.redirect(url, { status: 308 });
  }

  // /group/[code] est hors [locale], ne pas laisser next-intl l'intercepter
  if (pathname.startsWith("/group/")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Tout sauf /api, /group, les internes Next, et les fichiers (avec extension)
  matcher: ["/((?!api|group|_next|_vercel|.*\\..*).*)"],
};
