import {
	AnnuiteInput,
	AnnuiteResult,
	EmpruntInput,
	EmpruntResult,
	EquivalenceInput,
	EquivalenceResult,
	EscompteInput,
	EscompteResult,
} from "@/types";

export function calculerEscompte(input: EscompteInput): EscompteResult {
	const { valeurNominale, tauxEscompte, jours, joursBanque = 0 } = input;
	const joursTotaux = jours + joursBanque;
	const diviseur = 36000 / tauxEscompte;

	const escompteCommercial =
		(valeurNominale * tauxEscompte * joursTotaux) / 36000;
	const valeurActuelleCommerciale = valeurNominale - escompteCommercial;

	const valeurActuelleRationnelle =
		(36000 * valeurNominale) / (36000 + tauxEscompte * joursTotaux);
	const escompteRationnel = valeurNominale - valeurActuelleRationnelle;

	return {
		escompteCommercial,
		valeurActuelleCommerciale,
		escompteRationnel,
		valeurActuelleRationnelle,
		diviseur,
	};
}

export function calculerDateEquivalence(
	input: EquivalenceInput,
): EquivalenceResult {
	const { valeur1, jours1, valeur2, jours2, taux } = input;
	const diviseur = 36000 / taux;

	const m = Math.abs(jours2 - jours1);
	const x = diviseur - (m * valeur2) / (valeur2 - valeur1);

	const valeurActuelle = (valeur1 * (diviseur - x)) / diviseur;

	return {
		dateEquivalence: Math.round(x),
		valeurActuelle: Math.round(valeurActuelle),
	};
}

export function calculerAnnuites(input: AnnuiteInput): AnnuiteResult {
	const { capitalInitial, tauxInteret, periode, type } = input;
	const i = tauxInteret / 100;

	let valeurAcquise: number;
	if (type === "debut") {
		valeurAcquise =
			(capitalInitial * (1 + i) * (Math.pow(1 + i, periode) - 1)) / i;
	} else {
		valeurAcquise = (capitalInitial * (Math.pow(1 + i, periode) - 1)) / i;
	}

	let valeurActuelle: number;
	if (type === "debut") {
		valeurActuelle =
			(capitalInitial * (1 + i) * (1 - Math.pow(1 + i, -periode))) / i;
	} else {
		valeurActuelle = (capitalInitial * (1 - Math.pow(1 + i, -periode))) / i;
	}

	const annuiteConstante =
		(capitalInitial * i) / (1 - Math.pow(1 + i, -periode));

	return {
		valeurAcquise: Math.round(valeurAcquise * 100) / 100,
		valeurActuelle: Math.round(valeurActuelle * 100) / 100,
		annuiteConstante: Math.round(annuiteConstante * 100) / 100,
	};
}

export function calculerEmprunt(input: EmpruntInput): EmpruntResult[] {
	const { capitalEmprunte, tauxInteret, duree, type } = input;
	const i = tauxInteret / 100;
	const tableau: EmpruntResult[] = [];

	let capitalRestant = capitalEmprunte;

	if (type === "annuites_constantes") {
		const annuite = (capitalEmprunte * i) / (1 - Math.pow(1 + i, -duree));
		let amortissement = (capitalEmprunte * i) / (Math.pow(1 + i, duree) - 1);

		for (let periode = 1; periode <= duree; periode++) {
			const interet = capitalRestant * i;
			amortissement = periode === 1 ? amortissement : amortissement * (1 + i);

			tableau.push({
				annuite: Math.round(annuite * 100) / 100,
				amortissement: Math.round(amortissement * 100) / 100,
				interet: Math.round(interet * 100) / 100,
				capitalRestant: Math.round(capitalRestant * 100) / 100,
			});

			capitalRestant -= amortissement;
		}
	} else if (type === "amortissement_constants") {
		const amortissementConstant = capitalEmprunte / duree;

		for (let periode = 1; periode <= duree; periode++) {
			const interet = capitalRestant * i;
			const annuite = interet + amortissementConstant;

			tableau.push({
				annuite: Math.round(annuite * 100) / 100,
				amortissement: Math.round(amortissementConstant * 100) / 100,
				interet: Math.round(interet * 100) / 100,
				capitalRestant: Math.round(capitalRestant * 100) / 100,
			});

			capitalRestant -= amortissementConstant;
		}
	} else {
		for (let periode = 1; periode <= duree; periode++) {
			const interet = capitalRestant * i;
			const amortissement = periode === duree ? capitalRestant : 0;
			const annuite = interet + amortissement;

			tableau.push({
				annuite: Math.round(annuite * 100) / 100,
				amortissement: Math.round(amortissement * 100) / 100,
				interet: Math.round(interet * 100) / 100,
				capitalRestant: Math.round(capitalRestant * 100) / 100,
			});

			capitalRestant -= amortissement;
		}
	}

	return tableau;
}

export function calculerEcheanceMoyenne(
	effets: Array<{ valeur: number; jours: number }>,
): number {
	const sommeValeurs = effets.reduce((sum, effet) => sum + effet.valeur, 0);
	const sommeProduits = effets.reduce(
		(sum, effet) => sum + effet.valeur * effet.jours,
		0,
	);

	return Math.round(sommeProduits / sommeValeurs);
}
