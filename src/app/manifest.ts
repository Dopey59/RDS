import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Renard des Surfaces",
    short_name: "RDS",
    description: "Le jeu de grattage football 100% gratuit.",
    start_url: "/",
    display: "standalone",
    background_color: "#03142e",
    theme_color: "#0055a4",
    icons: [
      { src: "/brand/app-icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
