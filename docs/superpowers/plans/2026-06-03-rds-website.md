# Site RDS — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire la landing de téléchargement bilingue (FR/EN) de l'app « Renard des Surfaces », mobile-first, SEO/GEO, accessible WCAG 2.2 AA, avec une page B2B sponsors.

**Architecture:** Next.js 15 App Router (RSC par défaut), Tailwind v4 (tokens @theme), next-intl pour i18n + hreflang, Framer Motion pour le mouvement (reduced-motion safe), composants atomiques par section. Rendu SSG. Tests ciblés (Vitest) sur la logique pure (i18n, JSON-LD, Zod, scratch), vérif visuelle par build/lint/axe/Lighthouse.

**Tech Stack:** Next.js 15 · TypeScript strict · Tailwind v4 · next-intl · Framer Motion · React Hook Form + Zod · Vitest · Vercel.

> Convention : `pnpm`. Tests `rtk vitest run`. Commits conventionnels. Couleurs/typo/contrainte-marques : voir `docs/superpowers/specs/2026-06-03-rds-website-design.md`.

---

## Phase 0 — Scaffolding & fondations

### Task 0.1 : Projet Next.js + dépendances
**Files:** racine du repo.
- [ ] `pnpm dlx create-next-app@latest . --ts --app --tailwind --eslint --src-dir --import-alias "@/*" --use-pnpm --no-turbopack` (répondre non au reset git).
- [ ] `pnpm add next-intl framer-motion react-hook-form zod @hookform/resolvers`
- [ ] `pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @axe-core/playwright svgo prettier`
- [ ] Vérifier : `pnpm build` passe.
- [ ] Commit : `chore: scaffold next.js 15 + tailwind + deps`

### Task 0.2 : Config TypeScript strict + Prettier + scripts
**Files:** Modify `tsconfig.json`, Create `.prettierrc`, Modify `package.json`.
- [ ] `tsconfig.json` : `"strict": true`, `"noUncheckedIndexedAccess": true`.
- [ ] `package.json` scripts : `"test":"vitest run"`, `"lint":"next lint"`, `"typecheck":"tsc --noEmit"`.
- [ ] `vitest.config.ts` (environnement jsdom, plugin react).
- [ ] Commit : `chore: strict TS, prettier, vitest config`

### Task 0.3 : Design tokens (Tailwind v4 @theme)
**Files:** Modify `src/app/globals.css`.
- [ ] Injecter le bloc `@theme` couleurs + fonts (cf. spec §Design System), classes utilitaires `.bg-radiant` et `.glow-orange`, et l'overlay bruit SVG anti-banding.
- [ ] Définir `font-variant-numeric: tabular-nums` sur une classe `.tnum`.
- [ ] Vérif : créer une page test affichant les tokens, contrôler visuellement, puis retirer.
- [ ] Commit : `feat: design tokens couleurs + dégradé radiant + typo`

### Task 0.4 : Polices self-hosted (Clash Display + Inter)
**Files:** Create `src/lib/fonts.ts`, ajouter fichiers woff2 dans `src/assets/fonts/`.
- [ ] Clash Display (Fontshare) + Inter (variable) en `next/font/local`, variables CSS `--font-display` / `--font-body`, `display:swap`, subset latin.
- [ ] Appliquer les variables sur `<html>` dans le layout.
- [ ] Vérif : titres en Clash Display, corps en Inter (inspecter computed font).
- [ ] Commit : `feat: self-host Clash Display + Inter`

---

## Phase 1 — i18n & layout

### Task 1.1 : next-intl (FR défaut + EN)
**Files:** Create `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/middleware.ts`, `messages/fr.json`, `messages/en.json`. Modify `next.config.ts`.
- [ ] Routing locales `['fr','en']`, defaultLocale `fr`, `localePrefix:'as-needed'`.
- [ ] Middleware next-intl + matcher excluant `/_next`, assets, `sitemap.xml`, `robots.txt`.
- [ ] **Test** `src/i18n/__tests__/routing.test.ts` : la config expose bien `fr`/`en` et default `fr`.
- [ ] Run `rtk vitest run` → PASS.
- [ ] Commit : `feat: i18n next-intl fr/en + middleware`

### Task 1.2 : Layout localisé + structure de routes
**Files:** Create `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx` (placeholder), `src/app/layout.tsx` (html racine).
- [ ] `<html lang={locale}>`, providers NextIntl, classes fonts, `<body class="bg-radiant text-paper font-body">`.
- [ ] `generateStaticParams` pour les locales.
- [ ] Vérif : `/` (fr) et `/en` rendent le placeholder, `<html lang>` correct.
- [ ] Commit : `feat: layout localisé + routes`

### Task 1.3 : Header + Footer (avec disclaimer + sélecteur langue)
**Files:** Create `src/components/layout/Header.tsx`, `Footer.tsx`, `LocaleSwitcher.tsx`.
- [ ] Header : logo SVG, nav (Comment ça marche, Partenaires, FAQ), CTA stores, burger mobile accessible (focus trap, aria-expanded).
- [ ] Footer : liens légaux, disclaimer « ni pari, ni pronostic, ni jeu d'argent », réseaux, LocaleSwitcher, contact.
- [ ] Clés i18n ajoutées à `fr.json`/`en.json`.
- [ ] Vérif : navigation clavier complète, contrastes OK.
- [ ] Commit : `feat: header + footer + locale switcher`

---

## Phase 2 — Assets pipeline

### Task 2.1 : Importer & nettoyer les assets
**Files:** Create `scripts/import-assets.mjs`, dossier `public/brand/`, `public/screens/`.
- [ ] Script : copier depuis `../dev-id - assets/{LOGO,VISUELS}`, ignorer `._*`/`.DS_Store`, renommer kebab-case ASCII, lancer SVGO sur les SVG.
- [ ] Mapping : `Logo.svg→logo.svg`, `Logo + nom.svg→logo-nom.svg`, `AppIcon.svg→app-icon.svg`.
- [ ] **Filtrer** les visuels contenant marques/joueurs réels (contrainte marques) — lister ceux à exclure pour validation manuelle.
- [ ] Vérif : `public/brand/logo.svg` s'affiche.
- [ ] Commit : `chore: import + optimisation assets marque`

### Task 2.2 : Favicon / PWA / OG statique
**Files:** Create `src/app/icon.svg`, `src/app/apple-icon.png`, `public/manifest.webmanifest`, `src/app/opengraph-image.tsx`.
- [ ] Favicon depuis app-icon, manifest (nom, couleurs `#0055A4`/`#03142E`).
- [ ] OG image par défaut via next/og (logo + promesse, sans marque).
- [ ] Vérif : favicon visible, `/opengraph-image` rend une image.
- [ ] Commit : `feat: favicon, manifest, og image`

---

## Phase 3 — Composants UI de base

### Task 3.1 : Primitives (Button, Section, StoreBadges, Reveal)
**Files:** Create `src/components/ui/Button.tsx`, `Section.tsx`, `StoreBadges.tsx`, `Reveal.tsx`.
- [ ] `Button` variants : primary (encre sur orange), ghost ; cibles ≥44px.
- [ ] `StoreBadges` : liens App Store / Play (props `urls` ; fallback `#` + data-attr si non fournis).
- [ ] `Reveal` : wrapper Framer Motion scroll-reveal, **désactivé si prefers-reduced-motion** (`useReducedMotion`).
- [ ] **Test** `Reveal` : rend les enfants même sans animation (jsdom).
- [ ] Commit : `feat: primitives ui (button, section, badges, reveal)`

### Task 3.2 : Carte à gratter (signature)
**Files:** Create `src/components/scratch/ScratchCard.tsx`, `useScratch.ts`, test.
- [ ] Canvas scratch-to-reveal (pointer events doigt/souris), seuil de % gratté → reveal complet.
- [ ] Fallback : si `prefers-reduced-motion` ou pas de canvas → contenu révélé + bouton « Révéler ».
- [ ] aria-label, focusable, activation clavier (Enter révèle).
- [ ] **Test** `useScratch` : calcul du ratio gratté ≥ seuil déclenche `onComplete`.
- [ ] Run `rtk vitest run` → PASS.
- [ ] Commit : `feat: carte à gratter interactive + fallback a11y`

---

## Phase 4 — Landing B2C (sections)

> Chaque section : composant dans `src/components/sections/`, contenu via i18n, vérif build+axe. Pas de marque protégée.

### Task 4.1 : Hero
**Files:** Create `src/components/sections/Hero.tsx`.
- [ ] Promesse H1 « Chaque but peut te faire gagner », ScratchCard, double CTA stores, mention gratuit + disclaimer court, countdown (Task 4.6).
- [ ] LCP maîtrisé : image hero `priority`, pas de CLS.
- [ ] Commit : `feat: section hero`

### Task 4.2 : Le jeu en 30 secondes
**Files:** Create `src/components/sections/HowItWorks.tsx`.
- [ ] 4 étapes (choisis 3 matchs → push au but → gratte → points/lot) avec screenshots app.
- [ ] Commit : `feat: section jeu en 30s`

### Task 4.3 : Pourquoi ça marche
**Files:** Create `src/components/sections/WhyItWorks.tsx`.
- [ ] 6 bénéfices (récompense imprévisible, immédiateté, gratuit, double enjeu, engagement, viralité), orientés joueur.
- [ ] Commit : `feat: section pourquoi ça marche`

### Task 4.4 : Preuve sociale & viralité
**Files:** Create `src/components/sections/SocialProof.tsx`.
- [ ] Partage Insta/WhatsApp, partenaire pilote (placeholder « marque partenaire » tant que droits non confirmés), captures app.
- [ ] Commit : `feat: section preuve sociale`

### Task 4.5 : Le grand rendez-vous de l'été 2026 (sans marque)
**Files:** Create `src/components/sections/SummerEvent.tsx`.
- [ ] Formulation neutre ; mécaniques (classements par salves, tirs au but) ; chiffres génériques.
- [ ] Commit : `feat: section été 2026`

### Task 4.6 : Countdown
**Files:** Create `src/components/sections/Countdown.tsx`, `src/lib/countdown.ts`, test.
- [ ] Compte à rebours vers date cible (env `NEXT_PUBLIC_EVENT_DATE`), chiffres tabulaires, hydratation safe (pas de mismatch SSR).
- [ ] **Test** `countdown.ts` : `diff(target, now)` renvoie j/h/m/s corrects.
- [ ] Commit : `feat: countdown vers l'été 2026`

### Task 4.7 : FAQ (AEO)
**Files:** Create `src/components/sections/Faq.tsx`, `src/content/faq.ts`.
- [ ] Accordéon accessible (`<details>`/aria), réponses autoportantes citables, questions = requêtes réelles.
- [ ] Commit : `feat: section faq`

### Task 4.8 : Assemblage de la home
**Files:** Modify `src/app/[locale]/page.tsx`.
- [ ] Composer les sections dans l'ordre + CTA final.
- [ ] Vérif : `pnpm build`, axe sans violation, Lighthouse mobile ≥95.
- [ ] Commit : `feat: assemblage landing b2c`

---

## Phase 5 — Pages secondaires

### Task 5.1 : /comment-ca-marche (/how-it-works)
**Files:** Create `src/app/[locale]/comment-ca-marche/page.tsx` (slug localisé via routing pathnames).
- [ ] Mécanique détaillée + démo grattage + tirs au but + classements.
- [ ] Commit : `feat: page comment ça marche`

### Task 5.2 : /partenaires (/partners) + formulaire
**Files:** Create page + `src/components/partners/*` + `src/app/api/lead/route.ts` + `src/lib/lead-schema.ts` + test.
- [ ] Sections B2B (cf. spec) : positionnement, modèle éco, comparatif, parcours « visa d'entrée », offre pionnier, formulaire (nom, société, budget, message).
- [ ] **Test** `lead-schema.ts` (Zod) : rejette email invalide, accepte payload valide.
- [ ] API route : valide Zod, honeypot, rate-limit simple, envoi email (placeholder transport).
- [ ] Run `rtk vitest run` → PASS.
- [ ] Commit : `feat: page partenaires + formulaire lead`

### Task 5.3 : Pages légales + contact
**Files:** Create `mentions-legales`, `confidentialite`, `cgu`, `contact`, `faq` routes.
- [ ] Disclaimer « pas un jeu d'argent », RGPD, CGU, contact.
- [ ] Commit : `feat: pages légales + contact + faq`

---

## Phase 6 — SEO / GEO

### Task 6.1 : Metadata + canonical + hreflang
**Files:** Create `src/lib/seo.ts`, Modify chaque `page.tsx` (`generateMetadata`).
- [ ] Helper `buildMetadata({title,description,path,locale})` : canonical + `alternates.languages` (fr/en/x-default).
- [ ] **Test** `seo.ts` : alternates contiennent fr, en, x-default.
- [ ] Commit : `feat: metadata + hreflang`

### Task 6.2 : JSON-LD
**Files:** Create `src/lib/jsonld.ts` + `JsonLd.tsx` + test.
- [ ] Organization, SoftwareApplication (GameApplication, gratuit, liens stores), WebSite+SearchAction, BreadcrumbList, FAQPage (home/faq).
- [ ] **Test** : `softwareApplication()` produit `@type:"SoftwareApplication"`, `applicationCategory:"GameApplication"`, `offers.price:"0"`.
- [ ] Commit : `feat: json-ld structured data`

### Task 6.3 : sitemap + robots + llms.txt
**Files:** Create `src/app/sitemap.ts`, `src/app/robots.ts`, `public/llms.txt`.
- [ ] sitemap multilingue (toutes routes × locales). robots : autoriser GPTBot, ClaudeBot, PerplexityBot, Google-Extended ; pointer sitemap.
- [ ] llms.txt : résumé RDS (sans marque).
- [ ] Vérif : `/sitemap.xml` et `/robots.txt` valides.
- [ ] Commit : `feat: sitemap, robots, llms.txt`

### Task 6.4 : OG images dynamiques par page
**Files:** Create `opengraph-image.tsx` par route clé.
- [ ] next/og, une image par page/locale, sans marque.
- [ ] Commit : `feat: og images dynamiques`

---

## Phase 7 — Qualité & livraison

### Task 7.1 : Audit a11y automatisé
**Files:** Create `tests/a11y.spec.ts` (Playwright + axe).
- [ ] Scanner home + partenaires (fr/en) → 0 violation critique.
- [ ] Commit : `test: audit axe a11y`

### Task 7.2 : Budget perf / Lighthouse
- [ ] `pnpm build && pnpm start`, Lighthouse mobile sur `/` : Perf/SEO/BP/A11y ≥95. Corriger les régressions (images, JS).
- [ ] Commit : `perf: respect budget core web vitals`

### Task 7.3 : Déploiement Vercel
- [ ] Connecter le repo, variables d'env (`NEXT_PUBLIC_EVENT_DATE`, URLs stores, transport email).
- [ ] Vérif : preview FR/EN OK, hreflang/JSON-LD validés (Rich Results Test).
- [ ] Commit : `chore: config déploiement vercel`

---

## Self-review (couverture spec)
- Disclaimer jeu d'argent → 1.3, 5.3 ✓ · Contrainte marques → 2.1, 4.4, 4.5 ✓ · Couleurs/radiant → 0.3 ✓ · Typo → 0.4 ✓ · Scratch signature → 3.2 ✓ · i18n/hreflang → 1.1, 6.1 ✓ · JSON-LD/sitemap/robots → 6.2, 6.3 ✓ · B2B + formulaire → 5.2 ✓ · a11y/perf → 7.1, 7.2 ✓ · Assets → 2.1, 2.2 ✓.
- Point ouvert : URLs stores + droits logo partenaire → placeholders jusqu'à confirmation.
