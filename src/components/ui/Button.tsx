import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 min-h-[44px] text-sm font-semibold transition-colors focus-visible:outline-none";

const variants: Record<Variant, string> = {
  // CTA : texte encre sur orange (contraste AAA) — jamais blanc sur orange
  primary: "bg-orange-500 text-ink-900 hover:bg-orange-600",
  ghost: "bg-white/5 text-paper ring-1 ring-white/15 hover:bg-white/10",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
