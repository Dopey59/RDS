import { Inter, Barlow_Condensed } from "next/font/google";

// Titres — Barlow Condensed (charte 2026 : condensed ultra-bold, majuscules)
export const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

// Corps — Inter (équivalent web légal de SF Pro utilisé dans l'app)
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
