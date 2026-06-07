const DURATION = 620;

/**
 * Scroll vers le haut de la page en durée fixe (bypass CSS scroll-behavior).
 * Utilisé par le logo navbar pour éviter le blocage visuel sur les sections sticky.
 */
export function smoothScrollTop() {
  const start = window.scrollY;
  if (start < 2) return;

  // Désactive temporairement le scroll-behavior CSS pour ne pas cumuler les animations
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";

  const startTime = performance.now();
  let rafId: number;

  function step(now: number) {
    const p = Math.min((now - startTime) / DURATION, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    window.scrollTo(0, Math.round(start * (1 - ease)));
    if (p < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, 0);
      html.style.scrollBehavior = prev;
    }
  }

  rafId = requestAnimationFrame(step);
  // Filet de sécurité
  setTimeout(() => {
    cancelAnimationFrame(rafId);
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, DURATION + 100);
}
