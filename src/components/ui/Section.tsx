import type { ReactNode } from "react";

type Tone = "paper" | "cloud" | "blue";

const tones: Record<Tone, string> = {
  paper: "",
  cloud: "bg-cloud",
  blue: "band-blue text-white",
};

type Props = {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

export function Section({ id, tone = "paper", className = "", children }: Props) {
  return (
    <section id={id} className={`py-16 md:py-24 ${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}
