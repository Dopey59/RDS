export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/** Décompose l'écart (target - now) en jours/heures/minutes/secondes, borné à 0. */
export function diff(target: number, now: number): CountdownParts {
  const s = Math.max(0, Math.floor((target - now) / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}
