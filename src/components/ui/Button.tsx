import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 min-h-[44px] text-sm font-semibold transition-colors focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary: "bg-orange-500 text-white hover:bg-orange-600",
  secondary: "bg-blue-600 text-white hover:bg-blue-700",
  ghost: "bg-white/8 text-ink-900 ring-1 ring-white/15 backdrop-blur hover:bg-white/15",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant };

export function Button({ variant = "primary", className = "", href, ...props }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const hrefStr = href?.toString() ?? "";

  // Ancre pure (#id) : laisser le navigateur gérer nativement le scroll
  if (hrefStr.startsWith("#")) {
    return <a href={hrefStr} className={cls} {...(props as object)} />;
  }

  return <Link href={href!} className={cls} {...props} />;
}
