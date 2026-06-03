"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { leadSchema, type Lead } from "@/lib/lead-schema";

type Status = "idle" | "sending" | "success" | "error";

export function LeadForm() {
  const t = useTranslations("partners.form");
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Lead>({ resolver: zodResolver(leadSchema) });

  const onSubmit = async (data: Lead) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-xl bg-white/5 px-4 py-3 text-paper placeholder:text-mist/60 ring-1 ring-white/10 focus:ring-blue-300";

  if (status === "success") {
    return (
      <p className="rounded-[var(--radius-card)] bg-white/5 p-6 text-center ring-1 ring-white/10">
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      <h3 className="font-display text-2xl font-bold">{t("title")}</h3>

      {/* honeypot — caché aux humains */}
      <input
        {...register("website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px]"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          {t("name")}
          <input {...register("name")} className={field} autoComplete="name" />
          {errors.name && <span className="text-xs text-orange-400">•</span>}
        </label>
        <label className="grid gap-1 text-sm">
          {t("company")}
          <input {...register("company")} className={field} autoComplete="organization" />
          {errors.company && <span className="text-xs text-orange-400">•</span>}
        </label>
      </div>

      <label className="grid gap-1 text-sm">
        {t("email")}
        <input {...register("email")} type="email" className={field} autoComplete="email" />
        {errors.email && <span className="text-xs text-orange-400">•</span>}
      </label>

      <label className="grid gap-1 text-sm">
        {t("budget")}
        <input {...register("budget")} className={field} />
      </label>

      <label className="grid gap-1 text-sm">
        {t("message")}
        <textarea {...register("message")} rows={4} className={field} />
        {errors.message && <span className="text-xs text-orange-400">•</span>}
      </label>

      {status === "error" && <p className="text-sm text-orange-400">{t("error")}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-ink-900 hover:bg-orange-600 disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
