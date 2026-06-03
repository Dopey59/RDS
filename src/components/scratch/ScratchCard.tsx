"use client";

import { useState } from "react";

type Props = {
  hint: string;
  prizeLabel: string;
  prize: string;
};

/**
 * Carte à gratter signature (version squelette : révélation au clic/clavier).
 * TODO: remplacer le voile par un vrai canvas scratch-to-reveal (Task 3.2),
 * en conservant ce fallback accessible si prefers-reduced-motion.
 */
export function ScratchCard({ hint, prizeLabel, prize }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative">
      <div className="glow-orange absolute -inset-8 -z-10 blur-2xl" aria-hidden />
      <button
        type="button"
        onClick={() => setRevealed(true)}
        aria-pressed={revealed}
        aria-label={revealed ? prize : hint}
        className="relative flex aspect-[3/4] w-64 flex-col items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-ink-800 ring-1 ring-white/10"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs uppercase tracking-widest text-mist">{prizeLabel}</span>
          <span className="font-display text-4xl font-bold text-orange-400">{prize}</span>
        </div>

        <span
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 text-sm font-semibold text-paper transition-opacity duration-500 ${
            revealed ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          {hint}
        </span>
      </button>
    </div>
  );
}
