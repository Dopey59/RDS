import type { MetadataRoute } from "next";

const BASE = "https://renarddessurfaces.net";
const PATHS = ["", "/partenaires", "/contact", "/mentions-legales"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({
    url: `${BASE}${p || "/"}`,
    alternates: {
      languages: {
        fr: `${BASE}${p || "/"}`,
        en: `${BASE}/en${p}`,
      },
    },
  }));
}
