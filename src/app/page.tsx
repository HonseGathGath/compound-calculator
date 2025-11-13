"use client";

import { useState } from "react";
import EscompteCalculator from "@/components/EscompteCalculator";
import AnnuiteCalculator from "@/components/AnnuiteCalculator";
import EmpruntCalculator from "@/components/EmpruntCalculator";

type CalculatorType = "escompte" | "annuite" | "emprunt";

export default function FinanceCalculator() {
	const [activeCalculator, setActiveCalculator] =
		useState<CalculatorType>("escompte");

	return (
		<div className="py-8 min-h-screen bg-gray-100">
			<div className="container px-4 mx-auto max-w-6xl">
				<div className="mb-8 text-center">
					<h1 className="mb-2 text-4xl font-bold text-gray-900">
						Calculateur Financier
					</h1>
					<p className="text-gray-600">
						Outils de calcul basés sur les formules des systèmes financiers et
						gestion bancaire
					</p>
				</div>

				<div className="flex flex-wrap gap-2 justify-center mb-8">
					<button
						onClick={() => setActiveCalculator("escompte")}
						className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
							activeCalculator === "escompte"
								? "bg-blue-600 text-white"
								: "bg-white text-gray-700 hover:bg-gray-50"
						}`}
					>
						Escompte
					</button>
					<button
						onClick={() => setActiveCalculator("annuite")}
						className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
							activeCalculator === "annuite"
								? "bg-green-600 text-white"
								: "bg-white text-gray-700 hover:bg-gray-50"
						}`}
					>
						Annuités
					</button>
					<button
						onClick={() => setActiveCalculator("emprunt")}
						className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
							activeCalculator === "emprunt"
								? "bg-purple-600 text-white"
								: "bg-white text-gray-700 hover:bg-gray-50"
						}`}
					>
						Emprunts
					</button>
				</div>

				<div className="bg-white rounded-lg shadow-lg">
					{activeCalculator === "escompte" && <EscompteCalculator />}
					{activeCalculator === "annuite" && <AnnuiteCalculator />}
					{activeCalculator === "emprunt" && <EmpruntCalculator />}
				</div>

				<div className="p-6 mt-8 bg-white rounded-lg shadow-md">
					<h2 className="mb-4 text-xl font-bold">Formules Utilisées</h2>
					<div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
						<div>
							<h3 className="mb-2 font-semibold">Escompte Commercial</h3>
							<p className="text-gray-600">e = (V × t × n) / 36000</p>
							<p className="text-gray-600">a = V - e</p>
						</div>
						<div>
							<h3 className="mb-2 font-semibold">Annuités</h3>
							<p className="text-gray-600">
								V<sub>n</sub> = a × [(1+i)<sup>n</sup> - 1] / i
							</p>
							<p className="text-gray-600">
								V<sub>0</sub> = a × [1 - (1+i)<sup>-n</sup>] / i
							</p>
						</div>
						<div>
							<h3 className="mb-2 font-semibold">Emprunts</h3>
							<p className="text-gray-600">
								a = C<sub>0</sub> × i / [1 - (1+i)<sup>-n</sup>]
							</p>
							<p className="text-gray-600">
								m = C<sub>0</sub> / n (amort. constants)
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
