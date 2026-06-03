"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Contenu de repli si l'image est absente (par défaut : le texte alt). */
  fallback?: React.ReactNode;
  fallbackClassName?: string;
};

/** <img> avec repli propre quand le fichier n'existe pas encore. */
export function ImgFallback({ src, alt, className, fallback, fallbackClassName }: Props) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <span className={fallbackClassName}>{fallback ?? alt}</span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setOk(false)} />;
}
