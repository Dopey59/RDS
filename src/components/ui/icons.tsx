// Icônes SVG maison (remplacent les emojis). Couleur via `currentColor`.

type IconProps = { className?: string };

/** Ballon de foot (contour, hérite de la couleur du texte). */
export function BallIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 6.6l3.7 2.7-1.42 4.35H9.72L8.3 9.3 12 6.6z" />
      <path d="M12 6.6V3.1M15.7 9.3l3.1-1.4M14.28 13.65l1.9 2.85M9.72 13.65l-1.9 2.85M8.3 9.3l-3.1-1.4" />
    </svg>
  );
}

/** Flèche vers le haut. */
export function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 19V6M6 12l6-6 6 6" />
    </svg>
  );
}

/** Flèche vers le bas. */
export function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v13M6 12l6 6 6-6" />
    </svg>
  );
}

/** Drapeaux nationaux (désignations géographiques génériques — pas de club/compétition). */
export function Flag({ code, className = "" }: { code: string; className?: string }) {
  const cls = `inline-block overflow-hidden rounded-[2px] align-middle ${className}`;
  switch (code) {
    case "fr":
      return (
        <svg viewBox="0 0 20 14" className={cls} aria-hidden>
          <rect width="20" height="14" fill="#fff" />
          <rect width="6.67" height="14" fill="#0055A4" />
          <rect x="13.33" width="6.67" height="14" fill="#EF4135" />
        </svg>
      );
    case "it":
      return (
        <svg viewBox="0 0 20 14" className={cls} aria-hidden>
          <rect width="20" height="14" fill="#fff" />
          <rect width="6.67" height="14" fill="#009246" />
          <rect x="13.33" width="6.67" height="14" fill="#CE2B37" />
        </svg>
      );
    case "es":
      return (
        <svg viewBox="0 0 20 14" className={cls} aria-hidden>
          <rect width="20" height="14" fill="#AA151B" />
          <rect y="3.5" width="20" height="7" fill="#F1BF00" />
        </svg>
      );
    case "en":
    default:
      return (
        <svg viewBox="0 0 20 14" className={cls} aria-hidden>
          <rect width="20" height="14" fill="#fff" />
          <rect x="8" width="4" height="14" fill="#CF142B" />
          <rect y="5" width="20" height="4" fill="#CF142B" />
        </svg>
      );
  }
}
