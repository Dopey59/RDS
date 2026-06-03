import localFont from "next/font/local";
import { Inter } from "next/font/google";

// Titres — Clash Display (self-hosted, remplace Cunia)
export const clashDisplay = localFont({
  src: [
    { path: "../assets/fonts/ClashDisplay-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

// Corps — Inter (équivalent web légal de SF Pro utilisé dans l'app)
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
