"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Bascule FR/EN en conservant la page courante (fonctionne sur tout le site). */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label="Langue"
      className="inline-flex items-center rounded-full border border-line bg-paper p-0.5 text-xs font-semibold"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            aria-current={active ? "true" : undefined}
            onClick={() => {
              if (!active) router.replace(pathname, { locale: loc });
            }}
            className={`min-w-9 rounded-full px-2.5 py-1 uppercase transition ${
              active ? "bg-blue-600 text-white" : "text-ink-700 hover:text-blue-600"
            }`}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
