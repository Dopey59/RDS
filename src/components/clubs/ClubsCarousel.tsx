"use client";

import { useState } from "react";
import Image from "next/image";

type Locale = "fr" | "en";

type Step = { num: string; title: string; sub: string };
type Lot = { src: string; name: string; sub: string };

type Content = {
  s0: { eye: string; title: React.ReactNode; body: string; callout: React.ReactNode; cta: string };
  s1: { eye: string; title: React.ReactNode; steps: Step[]; back: string; cta: string };
  s2: { eye: string; title: React.ReactNode; condTitle: string; condBody: string; body: string; okTitle: string; okBody: string; back: string; cta: string };
  s3: { eye: string; title: React.ReactNode; lots: Lot[]; lotsMoreTitle: string; lotsMoreSub: string; promiseTitle: string; promiseBody: string; back: string; cta: string };
};

const COPY: Record<Locale, Content> = {
  fr: {
    s0: {
      eye: "Clubs amateurs",
      title: <>Ton club joue.<br /><span className="text-[#fb6624]">Tout le monde</span><br />gagne.</>,
      body: "En jouant à Renard des Surfaces, tu marques des points pour toi. Et en étant nombreux dans le groupe de ton club, vous faites gagner de l'équipement pour toute l'équipe.",
      callout: <><strong className="font-bold text-[#fb6624]">100% gratuit.</strong> Télécharge l'app, rejoins le groupe de ton club, et gratte une carte à chaque but.</>,
      cta: "Comment ça marche",
    },
    s1: {
      eye: "La mécanique",
      title: <>4 étapes,<br /><span className="text-[#fb6624]">c'est tout.</span></>,
      steps: [
        { num: "1", title: "Rejoins le groupe", sub: "Télécharge l'app et rejoins le groupe RDS de ton club via le lien partagé." },
        { num: "2", title: "Joue à chaque but", sub: "Sélectionne tes matchs. À chaque but, une notification tombe — tu grattes ta carte et tu marques des points." },
        { num: "3", title: "Le club atteint 50 membres", sub: "Plus vous êtes nombreux dans le groupe, plus le club se rapproche du lot équipement." },
        { num: "4", title: "Le club gagne", sub: "50 nouveaux membres = équipement pour toute l'équipe avant la saison prochaine." },
      ],
      back: "Retour",
      cta: "La condition",
    },
    s2: {
      eye: "La condition",
      title: <>50 nouveaux<br /><span className="text-[#fb6624]">membres.</span></>,
      condTitle: "Ce qui compte",
      condBody: "Les 50 membres doivent être de nouveaux inscrits sur RDS après l'ouverture du groupe. Les joueurs déjà présents sur l'app ne comptent pas.",
      body: "Avec les joueurs, leurs parents et le staff, un club actif atteint facilement 50 membres si tout le monde joue le jeu.",
      okTitle: "Les 20 premiers clubs",
      okBody: "Les 20 premiers clubs à atteindre 50 membres avant le 19 juillet reçoivent leur lot. Si plus de 20 clubs jouent le jeu, on récompense tout le monde.",
      back: "Retour",
      cta: "Ce que gagne le club",
    },
    s3: {
      eye: "La récompense",
      title: <>De l'équipement<br /><span className="text-[#fb6624]">pour vos joueurs.</span></>,
      lots: [
        { src: "/photos/clubs/lot-chasubles.jpg", name: "Chasubles", sub: "Entraînement" },
        { src: "/photos/clubs/lot-kit.jpg", name: "Kit complet", sub: "Plots, haies, échelles" },
        { src: "/photos/clubs/lot-mannequins.jpg", name: "Mannequins", sub: "Entraînement" },
      ],
      lotsMoreTitle: "Et plus encore",
      lotsMoreSub: "Selon le club",
      promiseTitle: "Et ce n'est qu'un début.",
      promiseBody: "Ces clubs pionniers ouvrent la voie. La saison prochaine, RDS lance un programme dédié avec des lots plus importants et un classement officiel.",
      back: "Retour",
      cta: "Recommencer",
    },
  },
  en: {
    s0: {
      eye: "Amateur clubs",
      title: <>Your club plays.<br /><span className="text-[#fb6624]">Everyone</span><br />wins.</>,
      body: "By playing Renard des Surfaces, you score points for yourself. And when your club's group fills up, you win equipment for the entire team.",
      callout: <><strong className="font-bold text-[#fb6624]">100% free.</strong> Download the app, join your club's group, and scratch a card on every goal.</>,
      cta: "How it works",
    },
    s1: {
      eye: "The mechanic",
      title: <>4 steps,<br /><span className="text-[#fb6624]">that's it.</span></>,
      steps: [
        { num: "1", title: "Join the group", sub: "Download the app and join your club's RDS group via the shared link." },
        { num: "2", title: "Play on every goal", sub: "Pick your matches. On every goal, a notification drops — scratch your card and score points." },
        { num: "3", title: "Club hits 50 members", sub: "The more of you in the group, the closer the club gets to the equipment prize." },
        { num: "4", title: "The club wins", sub: "50 new members = equipment for the whole team before next season." },
      ],
      back: "Back",
      cta: "The condition",
    },
    s2: {
      eye: "The condition",
      title: <>50 new<br /><span className="text-[#fb6624]">members.</span></>,
      condTitle: "What counts",
      condBody: "The 50 members must be new RDS signups after the group opens. Players already on the app do not count.",
      body: "Between players, their parents and the staff, an active club easily reaches 50 members when everyone plays along.",
      okTitle: "First 20 clubs",
      okBody: "The first 20 clubs to reach 50 members before July 19 receive their prize. If more than 20 clubs play along, we reward everyone.",
      back: "Back",
      cta: "What the club wins",
    },
    s3: {
      eye: "The reward",
      title: <>Equipment<br /><span className="text-[#fb6624]">for your players.</span></>,
      lots: [
        { src: "/photos/clubs/lot-chasubles.jpg", name: "Bibs", sub: "Training" },
        { src: "/photos/clubs/lot-kit.jpg", name: "Full kit", sub: "Cones, hurdles, ladders" },
        { src: "/photos/clubs/lot-mannequins.jpg", name: "Mannequins", sub: "Training" },
      ],
      lotsMoreTitle: "And more",
      lotsMoreSub: "Per club",
      promiseTitle: "And this is just the start.",
      promiseBody: "These pioneer clubs lead the way. Next season, RDS launches a dedicated program with bigger prizes and an official ranking.",
      back: "Back",
      cta: "Start over",
    },
  },
};

export function ClubsCarousel({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const t = COPY[locale];
  const total = 4;

  return (
    <section className="bg-[#0a0e5a] py-0 md:py-12">
      <div className="mx-auto w-full md:max-w-[420px]">
        <div className="relative overflow-hidden bg-[#0a0e5a] md:rounded-[42px] md:border-[3px] md:border-[#1a1f6e]">
          {step === 0 && <Screen0 t={t.s0} setStep={setStep} idx={0} total={total} />}
          {step === 1 && <Screen1 t={t.s1} setStep={setStep} idx={1} total={total} />}
          {step === 2 && <Screen2 t={t.s2} setStep={setStep} idx={2} total={total} />}
          {step === 3 && <Screen3 t={t.s3} setStep={setStep} idx={3} total={total} />}
        </div>
      </div>
    </section>
  );
}

function ScreenShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[100svh] flex-col md:min-h-[760px]">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-top"
        style={{ backgroundImage: "url('/photos/clubs/bg.png')" }}
        aria-hidden
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-[#080c4b]/[0.62]" aria-hidden />
      {/* Content */}
      <div className="relative z-[2] flex min-h-[100svh] flex-col md:min-h-[760px]">{children}</div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-2 sm:px-6">
      <Image
        src="/brand/mark.svg"
        alt="RDS"
        width={36}
        height={36}
        priority
        className="h-9 w-auto"
      />
      <Image
        src="/photos/clubs/worldcup-badge.png"
        alt="Coupe du Monde 2026"
        width={172}
        height={100}
        priority
        className="h-[60px] w-auto"
      />
    </div>
  );
}

function Eye({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[12px] uppercase tracking-[0.12em] text-[#fb6624] mb-2.5">
      {children}
    </p>
  );
}

function Title({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={`font-display text-[36px] leading-[1.05] text-white mb-4 ${className}`}>
      {children}
    </h1>
  );
}

function Dots({ idx, total }: { idx: number; total: number }) {
  return (
    <div className="mb-3.5 flex justify-center gap-[7px]">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={
            i === idx
              ? "h-[7px] w-6 rounded bg-[#fb6624]"
              : "h-[7px] w-[7px] rounded-full bg-white/20"
          }
        />
      ))}
    </div>
  );
}

function PrimaryBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-full bg-[#fb6624] py-[15px] font-display text-[18px] uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#e55918] active:bg-[#cf4f15]"
    >
      {children}
    </button>
  );
}

function BackBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-3xl border border-white/20 bg-transparent px-5 py-2.5 text-[13px] text-white/60 transition-colors hover:bg-white/5"
    >
      {children}
    </button>
  );
}

function Nav({ idx, total, onBack, backLabel }: { idx: number; total: number; onBack: () => void; backLabel: string }) {
  return (
    <div className="mb-2.5 flex items-center justify-between">
      <BackBtn onClick={onBack}>{backLabel}</BackBtn>
      <span className="text-[12px] text-white/40">{idx + 1} / {total}</span>
    </div>
  );
}

type ScreenProps<T> = { t: T; setStep: (n: number) => void; idx: number; total: number };

function Screen0({ t, setStep, idx, total }: ScreenProps<Content["s0"]>) {
  return (
    <ScreenShell>
      <TopBar />
      <div className="flex flex-1 flex-col px-5 pt-2 sm:px-6">
        <Eye>{t.eye}</Eye>
        <Title>{t.title}</Title>
        <p className="mb-3.5 text-[14px] leading-[1.65] text-white/80">{t.body}</p>
        <div className="rounded-xl border border-[#fb6624]/40 bg-[#fb6624]/15 px-4 py-3">
          <p className="text-[14px] leading-[1.55] text-white">{t.callout}</p>
        </div>
      </div>
      <div className="px-5 pb-6 pt-3.5 sm:px-6">
        <Dots idx={idx} total={total} />
        <PrimaryBtn onClick={() => setStep(1)}>{t.cta}</PrimaryBtn>
      </div>
    </ScreenShell>
  );
}

function Screen1({ t, setStep, idx, total }: ScreenProps<Content["s1"]>) {
  return (
    <ScreenShell>
      <TopBar />
      <div className="flex flex-1 flex-col px-5 pt-2 sm:px-6">
        <Eye>{t.eye}</Eye>
        <Title className="!text-[28px]">{t.title}</Title>
        <div className="flex flex-col">
          {t.steps.map((s, i) => (
            <div
              key={s.num}
              className={`flex gap-3.5 py-3 ${i < t.steps.length - 1 ? "border-b border-white/10" : ""}`}
            >
              <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-[#fb6624] font-display text-[17px] text-white">
                {s.num}
              </div>
              <div>
                <p className="mb-0.5 text-[14px] font-bold text-white">{s.title}</p>
                <p className="text-[12.5px] leading-[1.5] text-white/70">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-6 pt-3.5 sm:px-6">
        <Nav idx={idx} total={total} onBack={() => setStep(0)} backLabel={t.back} />
        <Dots idx={idx} total={total} />
        <PrimaryBtn onClick={() => setStep(2)}>{t.cta}</PrimaryBtn>
      </div>
    </ScreenShell>
  );
}

function Screen2({ t, setStep, idx, total }: ScreenProps<Content["s2"]>) {
  return (
    <ScreenShell>
      <TopBar />
      <div className="flex flex-1 flex-col px-5 pt-2 sm:px-6">
        <Eye>{t.eye}</Eye>
        <Title className="!text-[30px]">{t.title}</Title>
        <div className="mb-2.5 rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3">
          <p className="mb-1 font-display text-[13px] uppercase tracking-[0.06em] text-[#fb6624]">{t.condTitle}</p>
          <p className="text-[13px] leading-[1.55] text-white/80">{t.condBody}</p>
        </div>
        <p className="mb-2.5 text-[14px] leading-[1.65] text-white/80">{t.body}</p>
        <div className="rounded-xl border border-[#4ade80]/30 bg-[#4ade80]/10 px-4 py-3">
          <p className="mb-1 font-display text-[13px] uppercase tracking-[0.06em] text-[#4ade80]">{t.okTitle}</p>
          <p className="text-[13px] leading-[1.55] text-white/80">{t.okBody}</p>
        </div>
      </div>
      <div className="px-5 pb-6 pt-3.5 sm:px-6">
        <Nav idx={idx} total={total} onBack={() => setStep(1)} backLabel={t.back} />
        <Dots idx={idx} total={total} />
        <PrimaryBtn onClick={() => setStep(3)}>{t.cta}</PrimaryBtn>
      </div>
    </ScreenShell>
  );
}

function Screen3({ t, setStep, idx, total }: ScreenProps<Content["s3"]>) {
  return (
    <ScreenShell>
      <TopBar />
      <div className="flex flex-1 flex-col px-5 pt-2 sm:px-6">
        <Eye>{t.eye}</Eye>
        <Title className="!text-[26px]">{t.title}</Title>
        <div className="mb-3.5 grid grid-cols-2 gap-2.5">
          {t.lots.map((l) => (
            <div key={l.name} className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07]">
              <div className="relative h-[90px] w-full bg-[#111a6e]">
                <Image src={l.src} alt={l.name} fill sizes="(max-width: 420px) 50vw, 200px" className="object-cover" />
              </div>
              <div className="px-2.5 py-2">
                <p className="font-display text-[13px] uppercase tracking-[0.02em] text-white">{l.name}</p>
                <p className="mt-0.5 text-[11px] text-white/60">{l.sub}</p>
              </div>
            </div>
          ))}
          <div className="overflow-hidden rounded-2xl border border-[#fb6624]/30 bg-[#fb6624]/15">
            <div className="flex h-[90px] items-center justify-center">
              <span className="font-display text-[40px] text-[#fb6624]">+</span>
            </div>
            <div className="px-2.5 py-2">
              <p className="font-display text-[13px] uppercase tracking-[0.02em] text-white">{t.lotsMoreTitle}</p>
              <p className="mt-0.5 text-[11px] text-white/60">{t.lotsMoreSub}</p>
            </div>
          </div>
        </div>
        <div className="my-2.5 h-px bg-white/10" />
        <div className="rounded-2xl bg-[#fb6624] px-5 py-4">
          <p className="mb-1.5 font-display text-[20px] uppercase tracking-[0.02em] text-white">{t.promiseTitle}</p>
          <p className="text-[13px] leading-[1.55] text-white/90">{t.promiseBody}</p>
        </div>
      </div>
      <div className="px-5 pb-6 pt-3.5 sm:px-6">
        <Nav idx={idx} total={total} onBack={() => setStep(2)} backLabel={t.back} />
        <Dots idx={idx} total={total} />
        <PrimaryBtn onClick={() => setStep(0)}>{t.cta}</PrimaryBtn>
      </div>
    </ScreenShell>
  );
}
