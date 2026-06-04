import { cn } from "@/lib/cn";

const GRADIENTS = {
  orange:
    "linear-gradient(110deg, var(--color-orange-500) 0%, var(--color-orange-400) 40%, #ffd9bd 50%, var(--color-orange-400) 60%, var(--color-orange-500) 100%)",
  white:
    "linear-gradient(110deg, #ffffff 0%, #dbe6ff 42%, #ffffff 50%, #cfe0ff 60%, #ffffff 100%)",
};

/** Texte avec reflet animé qui balaye (style Magic UI AnimatedShinyText). */
export function ShinyText({
  children,
  className,
  tone = "orange",
}: {
  children: string;
  className?: string;
  tone?: keyof typeof GRADIENTS;
}) {
  return (
    <span
      className={cn(
        "inline-block animate-[var(--animate-shine)] bg-clip-text pb-[0.12em] leading-[1.15] text-transparent",
        className,
      )}
      style={{ backgroundImage: GRADIENTS[tone], backgroundSize: "200% 100%" }}
    >
      {children}
    </span>
  );
}
