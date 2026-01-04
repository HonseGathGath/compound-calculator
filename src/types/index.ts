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

export interface EquivalenceInput {
	valeur1: number;
	jours1: number;
	valeur2: number;
	jours2: number;
	taux: number;
}

// RESULT TYPES
export interface AnnuiteResult {
	valeurAcquise: number;
	valeurActuelle: number;
	annuiteConstante: number;
}

export interface EscompteResult {
	escompteCommercial: number;
	valeurActuelleCommerciale: number;
	escompteRationnel: number;
	valeurActuelleRationnelle: number;
	diviseur: number;
}

export interface EmpruntResult {
	annuite: number;
	amortissement: number;
	interet: number;
	capitalRestant: number;
}

export interface EquivalenceResult {
	dateEquivalence: number;
	valeurActuelle: number;
}
