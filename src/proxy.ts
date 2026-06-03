import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tout sauf /api, les internes Next, et les fichiers (avec extension)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
