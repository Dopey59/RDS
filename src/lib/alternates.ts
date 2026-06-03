import type { Metadata } from "next";

const BASE = "https://renarddessurfaces.net";

/** Canonical + hreflang (fr / en / x-default) pour une page donnée. */
export function buildAlternates(locale: string, path: string): Metadata["alternates"] {
  const p = path === "/" ? "" : path;
  const fr = `${BASE}${p || "/"}`;
  const en = `${BASE}/en${p}`;
  return {
    canonical: locale === "en" ? en : fr,
    languages: { fr, en, "x-default": fr },
  };
}
