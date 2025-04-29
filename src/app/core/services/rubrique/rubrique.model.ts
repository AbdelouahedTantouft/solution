// core/services/rubrique/rubrique.model.ts
export type RubriqueType = "FIXE" | "VARIABLE" | "CALCUL";

export interface Base {
  code: string;
  libelle: string;
}

export interface ModeleBulletin {
  id: number;
  code: string;
  libelle: string;
}

export interface Rubrique {
  code: string;
  nom: string;
  plafond?: number | null;

  modeAffichage?: string;
  editionLivrePaie?: boolean;

  type: string;

  modeCalcul?: string;
  rubriqueTaux?: string;

  nature?: string;
  cumul?: string;

  part?: string;
  arrondi?: boolean;
  notes?: string;
  rubriqueBase?: Base[];
  modeleBulletin?: ModeleBulletin[];
}

export const rubriques: Rubrique[] = [
  {
    code: "R001",
    nom: "Salaire de base",
    plafond: 20000,
    modeAffichage: "ecranEtBulletin",
    editionLivrePaie: true,
    type: "FIXE",
    modeCalcul: "formule",
    rubriqueTaux: "TX001",
    nature: "gain",
    cumul: "oui",
    part: "salariale",
    arrondi: false,
    notes: "Salaire mensuel fixe",
    rubriqueBase: [
      { code: "201", libelle: "BASE" },
      { code: "203", libelle: "MULTIULLE" },
    ],
    modeleBulletin: [
      { id: 1, code: "101", libelle: "Modèle mensuel" },
      { id: 2, code: "102", libelle: "Modèle anapec" },
    ],
  },
  {
    code: "R002",
    nom: "Prime de performance",
    plafond: 15000,
    modeAffichage: "ecranEtBulletin",
    editionLivrePaie: false,
    type: "VARIABLE",
    modeCalcul: "formule",

    rubriqueTaux: "TX002",
    nature: "prime",
    cumul: "non",
    part: "salariale",
    arrondi: true,
    notes: "Prime mensuelle basée sur la performance",
    rubriqueBase: [
      { code: "201", libelle: "BASE" },
      { code: "202", libelle: "CNSS" },
    ],

    modeleBulletin: [
      { id: 1, code: "101", libelle: "Modèle mensuel" },
      { id: 2, code: "102", libelle: "Modèle anapec" },
    ],
  },
  {
    code: "R003",
    nom: "Heures supplémentaires",
    plafond: 10000,
    modeAffichage: "bulletin",
    editionLivrePaie: true,
    type: "VARIABLE",
    modeCalcul: "formule",

    rubriqueTaux: "TX003",
    nature: "gain",
    cumul: "oui",
    part: "salariale",
    arrondi: false,
    notes: "Heures supplémentaires payées",
    rubriqueBase: [
      { code: "204", libelle: "AMO" },
      { code: "205", libelle: "BRUT" },
    ],

    modeleBulletin: [
      { id: 1, code: "101", libelle: "Modèle mensuel" },
      { id: 2, code: "102", libelle: "Modèle anapec" },
    ],
  },
  {
    code: "R004",
    nom: "Prime de Noël",
    plafond: 5000,
    modeAffichage: "ecranEtBulletin",
    editionLivrePaie: false,
    type: "FIXE",
    modeCalcul: "montant",

    rubriqueTaux: "TX004",
    nature: "prime",
    cumul: "non",
    part: "salariale",
    arrondi: true,
    notes: "Prime annuelle de Noël",
    rubriqueBase: [
      { code: "206", libelle: "ANCIENNETE" },
      { code: "207", libelle: "IR" },
    ],

    modeleBulletin: [
      { id: 1, code: "101", libelle: "Modèle mensuel" },
      { id: 2, code: "102", libelle: "Modèle anapec" },
    ],
  },
  {
    code: "R005",
    nom: "Indemnité de transport",
    plafond: 3000,
    modeAffichage: "ecran",
    editionLivrePaie: true,
    type: "FIXE",
    modeCalcul: "montant",

    rubriqueTaux: "TX005",
    nature: "indemnité",
    cumul: "oui",
    part: "patronale",
    arrondi: false,
    notes: "Indemnité mensuelle de transport",
    rubriqueBase: [
      { code: "202", libelle: "CNSS" },
      { code: "208", libelle: "NET" },
    ],

    modeleBulletin: [
      { id: 1, code: "101", libelle: "Modèle mensuel" },
      { id: 2, code: "102", libelle: "Modèle anapec" },
    ],
  },
  {
    code: "R006",
    nom: "Indemnité de logement",
    plafond: 8000,
    modeAffichage: "ecranEtBulletin",
    editionLivrePaie: true,
    type: "FIXE",
    modeCalcul: "montant",

    rubriqueTaux: "TX006",
    nature: "indemnité",
    cumul: "non",
    part: "salariale",
    arrondi: true,
    notes: "Indemnité mensuelle de logement",
    rubriqueBase: [
      { code: "205", libelle: "BRUT" },
      { code: "207", libelle: "IR" },
    ],
    modeleBulletin: [
      { id: 1, code: "101", libelle: "Modèle mensuel" },
      { id: 2, code: "102", libelle: "Modèle anapec" },
    ],
  },
  {
    code: "R007",
    nom: "Prime d’ancienneté",
    plafond: 4000,
    modeAffichage: "bulletin",
    editionLivrePaie: false,
    type: "VARIABLE",
    modeCalcul: "formule",

    rubriqueTaux: "TX007",
    nature: "prime",
    cumul: "oui",
    part: "salariale",
    arrondi: false,
    notes: "Prime d’ancienneté annuelle",
    rubriqueBase: [{ code: "206", libelle: "ANCIENNETE" }],
  },
  {
    code: "R008",
    nom: "Retenue pour absence",
    plafond: 0,
    modeAffichage: "ecran",
    editionLivrePaie: true,
    type: "FIXE",
    modeCalcul: "montant",

    rubriqueTaux: "TX008",
    nature: "retenue",
    cumul: "non",
    part: "patronale",
    arrondi: true,
    notes: "Retenue pour absence injustifiée",
    rubriqueBase: [
      { code: "203", libelle: "MULTIULLE" },
      { code: "208", libelle: "NET" },
    ],
    modeleBulletin: [
      { id: 3, code: "103", libelle: "Modèle mensuel avec cimr" },
      { id: 4, code: "104", libelle: "Modèle horaire" },
    ],
  },
  {
    code: "R009",
    nom: "Remboursement frais médicaux",
    plafond: 2000,
    modeAffichage: "ecran",
    editionLivrePaie: true,
    type: "FIXE",
    modeCalcul: "montant",

    rubriqueTaux: "TX009",
    nature: "indemnité",
    cumul: "oui",
    part: "salariale",
    arrondi: false,
    notes: "Remboursement mensuel des frais médicaux",
    rubriqueBase: [
      { code: "202", libelle: "CNSS" },
      { code: "204", libelle: "AMO" },
    ],

    modeleBulletin: [
      { id: 3, code: "103", libelle: "Modèle mensuel avec cimr" },
      { id: 4, code: "104", libelle: "Modèle horaire" },
    ],
  },
  {
    code: "R010",
    nom: "Prime de fin d'année",
    plafond: 15000,
    modeAffichage: "ecranEtBulletin",
    editionLivrePaie: false,
    type: "FIXE",
    modeCalcul: "montant",

    rubriqueTaux: "TX010",
    nature: "prime",
    cumul: "non",
    part: "patronale",
    arrondi: true,
    notes: "Prime annuelle de fin d'année",
    rubriqueBase: [
      { code: "201", libelle: "BASE" },
      { code: "207", libelle: "IR" },
    ],

    modeleBulletin: [
      { id: 3, code: "103", libelle: "Modèle mensuel avec cimr" },
      { id: 4, code: "104", libelle: "Modèle horaire" },
    ],
  },
  {
    code: "R011",
    nom: "Contribution à la retraite",
    plafond: 5000,
    modeAffichage: "bulletin",
    editionLivrePaie: true,
    type: "FIXE",
    modeCalcul: "formule",

    rubriqueTaux: "TX011",
    nature: "contribution",
    cumul: "oui",
    part: "patronale",
    arrondi: false,
    notes: "Contribution mensuelle à la retraite",
    rubriqueBase: [{ code: "203", libelle: "MULTIULLE" }],
  },
  {
    code: "R012",
    nom: "Assurance santé",
    plafond: 4000,
    modeAffichage: "ecranEtBulletin",
    editionLivrePaie: true,
    type: "FIXE",
    modeCalcul: "montant",

    rubriqueTaux: "TX012",
    nature: "indemnité",
    cumul: "non",
    part: "salariale",
    arrondi: true,
    notes: "Assurance santé mensuelle",
    rubriqueBase: [
      { code: "204", libelle: "AMO" },
      { code: "206", libelle: "ANCIENNETE" },
    ],
  },
  {
    code: "R013",
    nom: "Indemnité de transport exceptionnel",
    plafond: 6000,
    modeAffichage: "ecran",
    editionLivrePaie: true,
    type: "VARIABLE",
    modeCalcul: "formule",

    rubriqueTaux: "TX013",
    nature: "indemnité",
    cumul: "oui",
    part: "patronale",
    arrondi: false,
    notes: "Indemnité exceptionnelle pour transport",
    rubriqueBase: [{ code: "205", libelle: "BRUT" }],
  },
  {
    code: "R014",
    nom: "Bonus de performance",
    plafond: 10000,
    modeAffichage: "bulletin",
    editionLivrePaie: false,
    type: "VARIABLE",
    modeCalcul: "formule",
    rubriqueTaux: "TX014",
    nature: "prime",
    cumul: "oui",
    part: "salariale",
    arrondi: true,
    notes: "Bonus basé sur la performance mensuelle",
    rubriqueBase: [{ code: "201", libelle: "BASE" }],
  },
  {
    code: "R015",
    nom: "Prime exceptionnelle",
    plafond: 12000,
    modeAffichage: "ecranEtBulletin",
    editionLivrePaie: false,
    type: "FIXE",
    modeCalcul: "montant",
    rubriqueTaux: "TX015",
    nature: "prime",
    cumul: "non",
    part: "patronale",
    arrondi: true,
    notes: "Prime exceptionnelle annuelle",
    rubriqueBase: [{ code: "206", libelle: "ANCIENNETE" }],
  },
  {
    code: "R016",
    nom: "Commissions sur ventes",
    plafond: 20000,
    modeAffichage: "ecranEtBulletin",
    editionLivrePaie: true,
    type: "VARIABLE",
    modeCalcul: "formule",
    rubriqueTaux: "TX016",
    nature: "gain",
    cumul: "oui",
    part: "salariale",
    arrondi: false,
    notes: "Commissions sur ventes réalisées",
    rubriqueBase: [{ code: "203", libelle: "MULTIULLE" }],
  },
  {
    code: "R017",
    nom: "Prime de fidélité",
    plafond: 5000,
    modeAffichage: "ecran",
    editionLivrePaie: false,
    type: "FIXE",
    modeCalcul: "montant",
    rubriqueTaux: "TX017",
    nature: "prime",
    cumul: "non",
    part: "salariale",
    arrondi: true,
    notes: "Prime de fidélité après 5 ans d'ancienneté",
    rubriqueBase: [{ code: "206", libelle: "ANCIENNETE" }],
  },
  {
    code: "R018",
    nom: "Avantage en nature",
    plafond: 7000,
    modeAffichage: "ecranEtBulletin",
    editionLivrePaie: true,
    type: "FIXE",
    modeCalcul: "montant",
    rubriqueTaux: "TX018",
    nature: "indemnité",
    cumul: "non",
    part: "patronale",
    arrondi: false,
    notes: "Avantage en nature mensuel",
    rubriqueBase: [{ code: "202", libelle: "CNSS" }],
  },
  {
    code: "R019",
    nom: "Indemnité de chômage",
    plafond: 5000,
    modeAffichage: "bulletin",
    editionLivrePaie: false,
    type: "FIXE",
    modeCalcul: "formule",
    rubriqueTaux: "TX019",
    nature: "indemnité",
    cumul: "oui",
    part: "patronale",
    arrondi: true,
    notes: "Indemnité de chômage mensuelle",
    rubriqueBase: [{ code: "207", libelle: "IR" }],
  },
  {
    code: "R020",
    nom: "Prime d'insertion",
    plafond: 5000,
    modeAffichage: "ecranEtBulletin",
    editionLivrePaie: true,
    type: "FIXE",
    modeCalcul: "montant",
    rubriqueTaux: "TX020",
    nature: "prime",
    cumul: "non",
    part: "salariale",
    arrondi: false,
    notes: "Prime d'insertion pour nouveau salarié",
    rubriqueBase: [{ code: "208", libelle: "NET" }],
  },
];
