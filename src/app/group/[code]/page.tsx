import Image from "next/image";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";

export const dynamic = "force-static";

type Props = { params: Promise<{ code: string }> };

export default async function GroupPage({ params }: Props) {
  const { code } = await params;
  const deepLink = `rds://group/${code}`;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 30%, #1f1d75 0%, #181666 35%, #11104f 65%, #0a0930 100%)",
      }}
    >
      <Image
        src="/brand/icons/Logo + nom.png"
        alt="Renard des Surfaces"
        width={200}
        height={44}
        className="mb-10 w-44 h-auto"
        priority
      />

      <h1 className="text-white font-black uppercase text-3xl md:text-4xl tracking-tight mb-3"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}>
        Tu as été invité !
      </h1>
      <p className="text-white/70 mb-10 max-w-sm text-base">
        Rejoins le groupe dans l'appli Renard des Surfaces et affronte tes amis.
      </p>

      <a
        href={deepLink}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-white font-bold text-base uppercase tracking-wide hover:bg-orange-600 transition-colors mb-4 w-full max-w-xs"
      >
        Ouvrir dans l'app
      </a>

      <p className="text-white/40 text-sm mb-6">Pas encore l'app ?</p>

      <div className="flex flex-wrap justify-center gap-3">
        <a href={APP_STORE_URL} aria-label="App Store" className="transition hover:opacity-90">
          <img src="/v2/appstore.svg" alt="Télécharger sur l'App Store" className="h-11 w-auto" />
        </a>
        <a href={PLAY_STORE_URL} aria-label="Google Play" className="transition hover:opacity-90">
          <img src="/v2/googleplay.svg" alt="Disponible sur Google Play" className="h-11 w-auto" />
        </a>
      </div>
    </main>
  );
}
