import type { Metadata } from "next";
import { display, inter } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Rejoins Renard des Surfaces",
  description: "Le jeu de grattage de la Coupe du Monde.",
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
