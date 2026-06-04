// Liens stores officiels RDS. Override possible via env en prod.
export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ??
  "https://apps.apple.com/us/app/rds-renard-des-surfaces/id6503163667";

export const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ??
  "https://play.google.com/store/apps/details?id=com.grandjeu.rds&hl=fr";
