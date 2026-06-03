// Contenu légal repris du site officiel (renarddessurfaces.net).
// FR = source faisant foi. EN = traduction de courtoisie.
// À faire valider juridiquement avant mise en production.

export type LegalBlock = { h: string; paras?: string[]; bullets?: string[] };
export type LegalDoc = { title: string; updated?: string; intro?: string; blocks: LegalBlock[] };
type Locale = "fr" | "en";

export const privacy: Record<Locale, LegalDoc> = {
  fr: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 03/04/2025",
    intro:
      "Bienvenue sur l'application RDS – Renard des Surfaces (« RDS »). Nous attachons une grande importance à la protection de votre vie privée et de vos données personnelles. Cette politique de confidentialité vise à vous informer sur la manière dont nous collectons, utilisons et protégeons vos informations.",
    blocks: [
      {
        h: "1. Informations collectées",
        paras: ["Nous collectons les types de données suivants :"],
        bullets: [
          "Données d'identification : nom, prénom, adresse e-mail, pseudonyme, tranche d'âge, club de cœur.",
          "Données de connexion : adresse IP, identifiants de connexion, type d'appareil, système d'exploitation.",
          "Données d'utilisation : historique de jeu, interactions avec l'application, performances et scores.",
          "Données transactionnelles : informations nécessaires pour les gains et récompenses, y compris l'adresse postale réclamée aux gagnants pour l'envoi du lot.",
        ],
      },
      {
        h: "2. Utilisation des données",
        paras: ["Nous utilisons vos données pour :"],
        bullets: [
          "Assurer le bon fonctionnement de l'application et améliorer l'expérience utilisateur.",
          "Permettre votre participation aux jeux et concours.",
          "Gérer l'attribution et l'envoi des récompenses.",
          "Communiquer avec vous concernant les mises à jour, offres et événements.",
          "Garantir la sécurité de l'application et prévenir toute fraude.",
        ],
      },
      {
        h: "3. Partage des données",
        paras: ["Vos données peuvent être partagées avec :"],
        bullets: [
          "Nos prestataires de services techniques (hébergement, maintenance, analyse de données).",
          "Nos partenaires pour l'organisation de concours et l'attribution des lots.",
          "Les autorités si requis par la loi.",
        ],
      },
      {
        h: "",
        paras: ["Nous ne vendons ni ne louons vos données personnelles à des tiers."],
      },
      {
        h: "4. Conservation des données",
        paras: [
          "Vos données sont conservées aussi longtemps que nécessaire pour atteindre les finalités mentionnées ci-dessus, dans le respect des obligations légales.",
        ],
      },
      {
        h: "5. Sécurité des données",
        paras: [
          "Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations contre tout accès non autorisé, altération ou divulgation.",
        ],
      },
      {
        h: "6. Vos droits",
        paras: ["Vous disposez des droits suivants sur vos données personnelles :"],
        bullets: [
          "Droit d'accès : valider ou non l'utilisation des données via l'application.",
          "Droit de rectification : corriger des informations inexactes.",
          "Droit à l'effacement : demander la suppression de vos données sous certaines conditions.",
          "Droit d'opposition : vous opposer à l'utilisation de vos données pour certaines finalités.",
          "Droit à la portabilité : récupérer vos données dans un format lisible.",
        ],
      },
      {
        h: "7. Modifications de la politique",
        paras: [
          "Nous pouvons mettre à jour cette politique de confidentialité. Toute modification sera communiquée via l'application ou par e-mail.",
        ],
      },
      {
        h: "8. Contact",
        paras: [
          "Pour toute question relative à cette politique de confidentialité, vous pouvez nous contacter à grandjeu@renarddessurfaces.com.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 03/04/2025",
    intro:
      "Welcome to the RDS – Renard des Surfaces app (“RDS”). We place great importance on protecting your privacy and personal data. This privacy policy explains how we collect, use and protect your information.",
    blocks: [
      {
        h: "1. Data we collect",
        paras: ["We collect the following types of data:"],
        bullets: [
          "Identification data: first and last name, email address, username, age range, favourite club.",
          "Connection data: IP address, login identifiers, device type, operating system.",
          "Usage data: game history, interactions with the app, performance and scores.",
          "Transactional data: information needed for wins and rewards, including the postal address requested from winners to ship the prize.",
        ],
      },
      {
        h: "2. How we use your data",
        paras: ["We use your data to:"],
        bullets: [
          "Operate the app and improve the user experience.",
          "Enable your participation in games and contests.",
          "Manage the allocation and shipping of rewards.",
          "Communicate with you about updates, offers and events.",
          "Keep the app secure and prevent fraud.",
        ],
      },
      {
        h: "3. Data sharing",
        paras: ["Your data may be shared with:"],
        bullets: [
          "Our technical service providers (hosting, maintenance, data analytics).",
          "Our partners for running contests and awarding prizes.",
          "Authorities where required by law.",
        ],
      },
      {
        h: "",
        paras: ["We never sell or rent your personal data to third parties."],
      },
      {
        h: "4. Data retention",
        paras: [
          "Your data is kept for as long as necessary to fulfil the purposes above, in compliance with legal obligations.",
        ],
      },
      {
        h: "5. Data security",
        paras: [
          "We implement appropriate security measures to protect your information against unauthorised access, alteration or disclosure.",
        ],
      },
      {
        h: "6. Your rights",
        paras: ["You have the following rights over your personal data:"],
        bullets: [
          "Right of access: confirm or decline the use of your data via the app.",
          "Right to rectification: correct inaccurate information.",
          "Right to erasure: request deletion of your data under certain conditions.",
          "Right to object: object to the use of your data for certain purposes.",
          "Right to portability: retrieve your data in a readable format.",
        ],
      },
      {
        h: "7. Changes to this policy",
        paras: [
          "We may update this privacy policy. Any change will be communicated via the app or by email.",
        ],
      },
      {
        h: "8. Contact",
        paras: [
          "For any question regarding this privacy policy, you can contact us at grandjeu@renarddessurfaces.com.",
        ],
      },
    ],
  },
};

export const terms: Record<Locale, LegalDoc> = {
  fr: {
    title: "Conditions générales d'utilisation",
    blocks: [
      {
        h: "Article 1 — Mentions légales",
        paras: [
          "L'éditeur est la société SAS Grand Jeu, au capital de 6 250 €, immatriculée au RCS de Lille Métropole sous le numéro 921 110 938, dont le siège social est situé 46, avenue de l'amiral Courbet, 59150 Lambersart.",
          "Directeur de la publication : Julien Devos. Contact : grandjeu@renarddessurfaces.com — 06 37 94 77 53.",
          "Hébergement : OVH SAS, 2 rue Kellermann, 59100 Roubaix, France — 09 72 10 10 07.",
        ],
      },
      {
        h: "Article 2 — Accès au service",
        paras: [
          "Renard des Surfaces est un jeu gratuit et interactif, lié aux événements sportifs, permettant de gagner des lots. L'inscription requiert des informations exactes.",
          "Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du service ne saurait engager la responsabilité de l'éditeur.",
        ],
      },
      {
        h: "Article 3 — Collecte des données",
        paras: [
          "Les données personnelles sont traitées conformément à la loi Informatique et Libertés du 6 janvier 1978 et au RGPD. Les utilisateurs disposent de droits d'accès, de rectification, de suppression et d'opposition, exerçables via leur espace personnel ou à grandjeu@renarddessurfaces.com.",
        ],
      },
      {
        h: "Article 4 — Propriété intellectuelle",
        paras: [
          "La marque Renard des Surfaces est une marque déposée par Grand Jeu. Toute représentation et/ou reproduction, partielle ou totale, de cette marque est totalement prohibée. Toute utilisation commerciale est interdite sans autorisation préalable.",
        ],
      },
      {
        h: "Article 5 — Responsabilité",
        paras: [
          "L'éditeur décline toute responsabilité en cas de défauts techniques, de virus, ou de mauvaise utilisation des identifiants. Les utilisateurs s'engagent à garder leurs identifiants et mots de passe confidentiels.",
        ],
      },
      {
        h: "Article 6 — Liens hypertextes",
        paras: [
          "L'éditeur n'est pas responsable du contenu des sites externes accessibles via des liens hypertextes depuis le service.",
        ],
      },
      {
        h: "Article 7 — Cookies",
        paras: [
          "Des cookies facilitent la navigation. Leur acceptation peut être désactivée à tout moment dans les paramètres de votre navigateur.",
        ],
      },
      {
        h: "Article 8 — Droit applicable",
        paras: [
          "Les présentes conditions sont soumises au droit français. Tout litige relève de la compétence des juridictions françaises.",
        ],
      },
    ],
  },
  en: {
    title: "Terms of Use",
    blocks: [
      {
        h: "Article 1 — Legal notice",
        paras: [
          "The publisher is SAS Grand Jeu, with share capital of €6,250, registered with the Lille Métropole Trade and Companies Register under number 921 110 938, with its registered office at 46, avenue de l'amiral Courbet, 59150 Lambersart, France.",
          "Publication director: Julien Devos. Contact: grandjeu@renarddessurfaces.com — +33 6 37 94 77 53.",
          "Hosting: OVH SAS, 2 rue Kellermann, 59100 Roubaix, France — +33 9 72 10 10 07.",
        ],
      },
      {
        h: "Article 2 — Access to the service",
        paras: [
          "Renard des Surfaces is a free, interactive game tied to sporting events that lets you win prizes. Registration requires accurate information.",
          "Any event caused by force majeure resulting in a malfunction of the service shall not engage the publisher's liability.",
        ],
      },
      {
        h: "Article 3 — Data collection",
        paras: [
          "Personal data is processed in accordance with the French Data Protection Act of 6 January 1978 and the GDPR. Users have rights of access, rectification, erasure and objection, which can be exercised via their account or at grandjeu@renarddessurfaces.com.",
        ],
      },
      {
        h: "Article 4 — Intellectual property",
        paras: [
          "The Renard des Surfaces brand is a trademark registered by Grand Jeu. Any representation and/or reproduction, partial or total, of this trademark is strictly prohibited. Any commercial use is forbidden without prior authorisation.",
        ],
      },
      {
        h: "Article 5 — Liability",
        paras: [
          "The publisher declines all liability for technical faults, viruses, or misuse of credentials. Users undertake to keep their login details and passwords confidential.",
        ],
      },
      {
        h: "Article 6 — Hyperlinks",
        paras: [
          "The publisher is not responsible for the content of external sites accessible via hyperlinks from the service.",
        ],
      },
      {
        h: "Article 7 — Cookies",
        paras: [
          "Cookies help with navigation. They can be disabled at any time in your browser settings.",
        ],
      },
      {
        h: "Article 8 — Governing law",
        paras: [
          "These terms are governed by French law. Any dispute falls under the jurisdiction of the French courts.",
        ],
      },
    ],
  },
};
