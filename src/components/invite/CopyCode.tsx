"use client";

import { useState } from "react";

/** Chip code cliquable : copie dans le presse-papier avec retour visuel. */
export function CopyCode({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Fallback navigateurs sans Clipboard API
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* rien de plus à faire */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copier le code ${code}`}
      className="group mt-8 flex w-full flex-col items-center rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-4 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.1]"
    >
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white/45">
        {label}
      </span>
      <span className="mt-1 flex items-center gap-2.5">
        <span className="font-display text-3xl tracking-[0.18em] text-orange-400 sm:text-4xl">
          {code}
        </span>
        {copied ? (
          <CheckIcon className="h-5 w-5 text-emerald-400" />
        ) : (
          <CopyIcon className="h-5 w-5 text-white/45 transition-colors group-hover:text-white/80" />
        )}
      </span>
      <span
        aria-live="polite"
        className={`mt-1.5 text-xs font-semibold transition-colors ${
          copied ? "text-emerald-400" : "text-white/40"
        }`}
      >
        {copied ? "Code copié !" : "Appuie pour copier"}
      </span>
    </button>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
