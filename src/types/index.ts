export interface AnnuiteInput {
  capitalInitial: number;
  tauxInteret: number;
  periode: number;
  type: "debut" | "fin";
}

export interface EscompteInput {
  valeurNominale: number;
  tauxEscompte: number;
  jours: number;
  joursBanque: number;
}

export interface EmpruntInput {
  capitalEmprunte: number;
  tauxInteret: number;
  duree: number;
  type: "annuites_constantes" | "amortissement_constants" | "in_fine";
}

export interface AmortizationRow {
  capitalRestant: number;
  interet: number;
  amortissement: number;
  annuite: number;
}
