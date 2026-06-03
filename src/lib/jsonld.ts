const BASE = "https://renarddessurfaces.net";

const SAME_AS = [
  "https://www.instagram.com/renard.d.surfaces/",
  "https://www.tiktok.com/@renard.d.surfaces",
  "https://www.facebook.com/profile.php?id=61565258327456",
];

export function organizationLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Renard des Surfaces",
    legalName: "SAS Grand Jeu",
    url: BASE,
    email: "grandjeu@renarddessurfaces.com",
    sameAs: SAME_AS,
  };
}

export function softwareApplicationLd(locale: string): Record<string, unknown> {
  const fr = locale === "fr";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Renard des Surfaces",
    applicationCategory: "GameApplication",
    operatingSystem: "iOS, Android",
    description: fr
      ? "Jeu de grattage football 100% gratuit : choisis 3 matchs, gratte à chaque but, gagne points et lots."
      : "100% free football scratch game: pick 3 matches, scratch on every goal, win points and prizes.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };
}

export function webSiteLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Renard des Surfaces",
    url: BASE,
    inLanguage: ["fr", "en"],
  };
}
