import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Couleur des fondus latéraux selon le fond (clair par défaut). */
  fade?: "paper" | "ink" | "none";
};

const FADE: Record<NonNullable<Props["fade"]>, string> = {
  paper: "from-paper",
  ink: "from-ink-900",
  none: "",
};

/** Défilement horizontal continu (style Magic UI Marquee), pause au survol. */
export function Marquee({ children, className, fade = "paper" }: Props) {
  return (
    <div className={cn("pause-marquee group relative overflow-hidden", className)}>
      <div data-marquee className="flex w-max animate-[var(--animate-marquee)] gap-6">
        {children}
        {children}
      </div>
      {fade !== "none" && (
        <>
          <div className={cn("pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent", FADE[fade])} />
          <div className={cn("pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent", FADE[fade])} />
        </>
      )}
    </div>
  );
}
