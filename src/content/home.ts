// Données d'EXEMPLE pour la home (à brancher plus tard sur l'app / le back-office).
// Conforme contrainte marques : aucun nom de club/joueur/compétition réel,
// championnats désignés par pays, pseudos fictifs.

type Locale = "fr" | "en";

export type IconKind = "ball" | "coin" | "card" | "ranked";

export type MatchRow = { flag: string; league: string; when: string };
export type PrizeRow = { icon: IconKind; name: string };
export type NewsRow = { tag: string; title: string };
export type WinnerRow = { rank: number; pseudo: string; points: number };

export const matches: Record<Locale, MatchRow[]> = {
  fr: [
    { flag: "en", league: "Championnat anglais", when: "J34 · Sam. 16:00" },
    { flag: "it", league: "Championnat italien", when: "J33 · Sam. 18:00" },
    { flag: "es", league: "Championnat espagnol", when: "J32 · Dim. 21:00" },
    { flag: "fr", league: "Championnat français", when: "J31 · Dim. 17:00" },
  ],
  en: [
    { flag: "en", league: "English league", when: "MD34 · Sat. 4:00 PM" },
    { flag: "it", league: "Italian league", when: "MD33 · Sat. 6:00 PM" },
    { flag: "es", league: "Spanish league", when: "MD32 · Sun. 9:00 PM" },
    { flag: "fr", league: "French league", when: "MD31 · Sun. 5:00 PM" },
  ],
};

export const prizes: Record<Locale, PrizeRow[]> = {
  fr: [
    { icon: "card", name: "Cartes cadeaux" },
    { icon: "ball", name: "Places de match" },
    { icon: "coin", name: "Bons d'achat" },
    { icon: "ranked", name: "Lots exclusifs partenaires" },
  ],
  en: [
    { icon: "card", name: "Gift cards" },
    { icon: "ball", name: "Match tickets" },
    { icon: "coin", name: "Shopping vouchers" },
    { icon: "ranked", name: "Exclusive partner prizes" },
  ],
};

// Pseudos fictifs — remplacés par le classement live de l'app.
export const winners: WinnerRow[] = [
  { rank: 1, pseudo: "PandaParis", points: 1265 },
  { rank: 2, pseudo: "RenardMalin", points: 1180 },
  { rank: 3, pseudo: "Goleador59", points: 1042 },
  { rank: 4, pseudo: "TifosiLou", points: 980 },
  { rank: 5, pseudo: "ZoneMixte", points: 921 },
];

export const news: Record<Locale, NewsRow[]> = {
  fr: [
    { tag: "Le jeu", title: "Comment maximiser tes points pendant une grosse journée" },
    { tag: "Communauté", title: "Wall of fame : les renards du mois" },
    { tag: "Partenaires", title: "De nouveaux lots arrivent dans l'appli" },
    { tag: "Astuce", title: "Bien choisir ses 3 matchs avant le coup d'envoi" },
  ],
  en: [
    { tag: "The game", title: "How to maximise your points on a big matchday" },
    { tag: "Community", title: "Wall of fame: the foxes of the month" },
    { tag: "Partners", title: "New prizes are landing in the app" },
    { tag: "Tip", title: "How to pick your 3 matches before kick-off" },
  ],
};

export type ShowcasePrize = { id: string; image: string; name: string; ctaLabel: string };

// Lots vedettes (visuels dans public/photos/prizes/). CTA distinct par lot.
export const showcasePrizes: Record<Locale, ShowcasePrize[]> = {
  fr: [
    { id: "ps5", image: "/photos/prizes/ps5.png", name: "PS5", ctaLabel: "Je tente la PS5" },
    { id: "iphone", image: "/photos/prizes/iphone.png", name: "iPhone 15 Pro", ctaLabel: "Je veux l'iPhone" },
    { id: "ipad", image: "/photos/prizes/ipad.png", name: "iPad mini", ctaLabel: "Décrocher l'iPad" },
    { id: "airpods", image: "/photos/prizes/airpods.png", name: "AirPods Max", ctaLabel: "Gagner les AirPods" },
    { id: "giftcard", image: "/photos/prizes/giftcard.png", name: "Carte cadeau 50 €", ctaLabel: "Empocher 50 €" },
    { id: "jersey", image: "/photos/prizes/jersey.png", name: "Maillot de foot", ctaLabel: "Porter le maillot" },
  ],
  en: [
    { id: "ps5", image: "/photos/prizes/ps5.png", name: "PS5", ctaLabel: "Go for the PS5" },
    { id: "iphone", image: "/photos/prizes/iphone.png", name: "iPhone 15 Pro", ctaLabel: "I want the iPhone" },
    { id: "ipad", image: "/photos/prizes/ipad.png", name: "iPad mini", ctaLabel: "Grab the iPad" },
    { id: "airpods", image: "/photos/prizes/airpods.png", name: "AirPods Max", ctaLabel: "Win the AirPods" },
    { id: "giftcard", image: "/photos/prizes/giftcard.png", name: "€50 gift card", ctaLabel: "Pocket €50" },
    { id: "jersey", image: "/photos/prizes/jersey.png", name: "Football jersey", ctaLabel: "Get the jersey" },
  ],
};

export type Partner = { id: string; name: string; logo: string };

// Partenaires confirmés — logos dans public/brand/partners/ (noms kebab ASCII)
export const partners: Partner[] = [
  { id: "boulanger", name: "Boulanger", logo: "/brand/partners/boulanger.png" },
  { id: "cristaline", name: "Cristaline", logo: "/brand/partners/cristaline.png" },
  { id: "micromania", name: "Micromania", logo: "/brand/partners/micromania.svg" },
  { id: "decathlon", name: "Decathlon", logo: "/brand/partners/decathlon.svg" },
  { id: "forumjobs", name: "Forum Jobs", logo: "/brand/partners/forumjobs.png" },
];

export function localeKey(locale: string): Locale {
  return locale === "en" ? "en" : "fr";
}
