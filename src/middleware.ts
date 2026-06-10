import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
