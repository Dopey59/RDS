import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 min-h-[44px] text-sm font-semibold transition-colors focus-visible:outline-none";

const variants: Record<Variant, string> = {
  // CTA énergie : texte encre sur orange (contraste AAA)
  primary: "bg-orange-500 text-ink-900 hover:bg-orange-600",
  // CTA brand : blanc sur bleu (contraste élevé)
  secondary: "bg-blue-600 text-white hover:bg-blue-700",
  ghost: "bg-white text-ink-900 ring-1 ring-line hover:bg-cloud",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
