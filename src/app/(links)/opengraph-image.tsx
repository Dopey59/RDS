import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { ImageResponse } from "next/og";

export const alt = "Renard des Surfaces — le jeu de grattage de la Coupe du Monde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = readFileSync(fileURLToPath(new URL("./logo.png", import.meta.url)));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(120% 90% at 50% 35%, #1f1d75 0%, #181666 35%, #11104f 65%, #0a0930 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={760} height={291} style={{ objectFit: "contain" }} alt="" />
        <div
          style={{
            marginTop: 28,
            color: "rgba(255,255,255,0.78)",
            fontSize: 38,
            fontWeight: 600,
          }}
        >
          Le jeu de grattage de la Coupe du Monde
        </div>
      </div>
    ),
    { ...size },
  );
}
