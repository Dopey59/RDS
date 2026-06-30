import type { Metadata } from "next";
import { display, inter } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.renard-des-surfaces.com"),
  title: "Rejoins Renard des Surfaces",
  description: "Le jeu de grattage de la Coupe du Monde.",
  openGraph: {
    title: "Rejoins Renard des Surfaces",
    description: "Le jeu de grattage de la Coupe du Monde.",
    siteName: "Renard des Surfaces",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rejoins Renard des Surfaces",
    description: "Le jeu de grattage de la Coupe du Monde.",
  },
  // Pages d'attribution paramétrées : on ne les indexe pas.
  robots: { index: false, follow: false },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
