"use client";

import React, { type ElementType, type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface VideoTextProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  children: ReactNode;
  /**
   * Taille de la police en unités viewBox (viewBox = 0 0 1000 280).
   * Valeur par défaut 220 = ~80% de la hauteur → remplit bien le conteneur.
   */
  fontSize?: number;
  fontWeight?: string | number;
  fontFamily?: string;
  /** Couleur de fond visible dans le texte si la vidéo n'est pas encore chargée */
  color?: string;
  as?: ElementType;
}

const VW = 1000;
const VH = 280;

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 220,
  fontWeight = 900,
  fontFamily = "sans-serif",
  color = "white",
  as: Component = "div",
}: VideoTextProps) {
  const content = React.Children.toArray(children).join("");

  // SVG avec viewBox fixe → maskSize:contain le scale parfaitement dans tout conteneur
  const svgMask = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${VW} ${VH}' preserveAspectRatio='xMidYMid meet'><text x='${VW / 2}' y='${VH * 0.82}' fill='white' font-size='${fontSize}' font-weight='${fontWeight}' text-anchor='middle' font-family='${fontFamily}'>${content}</text></svg>`;
  const [mask, setMask] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMask(`url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`);
  }, [svgMask]);

  return (
    <Component className={cn("relative w-full", className)}>
      <div
        className="absolute inset-0"
        style={{
          background: color,
          maskImage: mask,
          WebkitMaskImage: mask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} />
        </video>
      </div>
      <span className="sr-only">{content}</span>
    </Component>
  );
}
