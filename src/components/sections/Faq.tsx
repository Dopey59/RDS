"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Qa = { q: string; a: string };

function FaqItem({ qa, index }: { qa: Qa; index: number }) {
  const [open, setOpen] = useState(false);
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      className="border-b border-line last:border-b-0"
      initial={{ opacity: 0, x: fromLeft ? -36 : 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-medium text-ink-900 md:text-lg"
      >
        <span>{qa.q}</span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-none text-orange-500 text-xl leading-none"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 text-sm leading-relaxed text-mist md:text-base">{qa.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Qa[];

  return (
    <Section id="faq" tone="cloud">
      <Reveal>
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h2>
      </Reveal>

      <div className="mx-auto mt-10 max-w-3xl rounded-[var(--radius-card)] border border-line bg-paper px-6">
        {items.map((qa, i) => (
          <FaqItem key={i} qa={qa} index={i} />
        ))}
      </div>
    </Section>
  );
}
