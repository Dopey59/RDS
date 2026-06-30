import Image from "next/image";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";
import { CopyCode } from "./CopyCode";

type Variant = "join" | "club" | "group";

const COPY: Record<
  Variant,
  { title: string; subtitle: string; codeLabel: string; showHint: boolean }
> = {
  join: {
    title: "Tu as été parrainé !",
    subtitle:
      "Rejoins Renard des Surfaces, le jeu de grattage de la Coupe du Monde, et profite de ton parrainage.",
    codeLabel: "Code parrain",
    showHint: true,
  },
  club: {
    title: "Rejoins RDS avec ton club",
    subtitle:
      "Ton club t’invite sur Renard des Surfaces, le jeu de grattage de la Coupe du Monde.",
    codeLabel: "Code club",
    showHint: true,
  },
  group: {
    title: "Tu as été invité !",
    subtitle:
      "Rejoins le groupe dans l’appli Renard des Surfaces et affronte tes amis sur la Coupe du Monde.",
    codeLabel: "Code groupe",
    showHint: false,
  },
};

/** Page d'arrivée d'un deep-link (parrainage / club / groupe) — langage visuel de l'app. */
export function InvitePage({ variant, code }: { variant: Variant; code: string }) {
  const copy = COPY[variant];
  const cleanCode = code.trim().toUpperCase();
  const deepLink = `rds://${variant}/${encodeURIComponent(cleanCode)}`;

  return (
    <main
      className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-12 text-center text-white"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 35%, #1f1d75 0%, #181666 35%, #11104f 65%, #0a0930 100%)",
      }}
    >
      {/* Confettis décoratifs (coins) */}
      <Streamers />

      {/* Lueur centrale */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(99,98,255,.30), transparent)" }}
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Wordmark */}
        <Image
          src="/v2/wordmark-logo.svg"
          alt="Renard des Surfaces"
          width={520}
          height={150}
          priority
          className="mb-8 h-auto w-56 animate-[var(--animate-float)] sm:w-64"
        />

        <h1 className="font-display text-3xl uppercase leading-[0.95] tracking-tight text-white sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-white/75 sm:text-base">
          {copy.subtitle}
        </p>

        {/* Chip code — cliquable, copie dans le presse-papier */}
        <CopyCode code={cleanCode} label={copy.codeLabel} />

        {/* CTA app */}
        <a
          href={deepLink}
          className="mt-6 flex min-h-13 w-full items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-600"
        >
          Ouvrir dans l’app
        </a>

        {copy.showHint && (
          <p className="mt-4 text-xs leading-relaxed text-white/45">
            Déjà inscrit&nbsp;? Entre ce code dans «&nbsp;Code parrain ou club&nbsp;» à l’inscription.
          </p>
        )}

        {/* Stores */}
        <p className="mt-9 text-sm text-white/40">Pas encore l’app&nbsp;?</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <a href={APP_STORE_URL} aria-label="App Store" className="transition hover:opacity-90">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/v2/appstore.svg" alt="Télécharger sur l’App Store" className="h-11 w-auto" />
          </a>
          <a href={PLAY_STORE_URL} aria-label="Google Play" className="transition hover:opacity-90">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/v2/googleplay.svg" alt="Disponible sur Google Play" className="h-11 w-auto" />
          </a>
        </div>
      </div>
    </main>
  );
}

/* Confettis statiques (purement décoratifs). */
function Streamers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="absolute -right-4 top-3 h-20 w-44 sm:h-28 sm:w-72" viewBox="0 0 320 130">
        <polygon points="320,0 60,55 320,40" fill="#ee2a6e" />
        <polygon points="320,60 110,90 320,80" fill="#e93b78" opacity=".8" />
      </svg>
      <svg className="absolute -left-4 top-[24%] h-16 w-36 sm:h-24 sm:w-56" viewBox="0 0 240 110">
        <polygon points="0,40 200,55 0,70" fill="#e2364a" />
      </svg>
      <svg className="absolute -left-5 bottom-[16%] h-12 w-32 sm:h-16 sm:w-52" viewBox="0 0 224 84">
        <polygon points="0,30 200,40 0,50" fill="#2aa7d6" />
        <polygon points="0,52 180,62 0,70" fill="#33b6e2" opacity=".75" />
      </svg>
      <svg className="absolute -right-3 top-[46%] h-16 w-40 sm:h-24 sm:w-56" viewBox="0 0 224 96">
        <polygon points="224,30 30,50 224,60" fill="#f5cf2e" />
      </svg>
    </div>
  );
}
