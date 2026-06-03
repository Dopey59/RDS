import { cn } from "@/lib/cn";

/** Texte avec reflet animé qui balaye (style Magic UI AnimatedShinyText). */
export function ShinyText({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn("animate-[var(--animate-shine)] bg-clip-text text-transparent", className)}
      style={{
        backgroundImage:
          "linear-gradient(110deg, var(--color-orange-500) 0%, var(--color-orange-400) 40%, #ffd9bd 50%, var(--color-orange-400) 60%, var(--color-orange-500) 100%)",
        backgroundSize: "200% 100%",
      }}
    >
      {children}
    </span>
  );
}
