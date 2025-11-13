'use client';

import { useState } from 'react';
import { EscompteInput } from '@/types';
import { calculerEscompte } from '@/lib/calculations';

export default function EscompteCalculator() {
  const [input, setInput] = useState<EscompteInput>({
    valeurNominale: 10000,
    tauxEscompte: 7.2,
    jours: 30,
    joursBanque: 0
  });

  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calculs = calculerEscompte(input);
    setResult(calculs);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Calcul d'Escompte</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valeur Nominale (DT)
          </label>
          <input
            type="number"
            value={input.valeurNominale}
            onChange={(e) => setInput({...input, valeurNominale: Number(e.target.value)})}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taux d'Escompte (%)
          </label>
          <input
            type="number"
            value={input.tauxEscompte}
            onChange={(e) => setInput({...input, tauxEscompte: Number(e.target.value)})}
            className="w-full p-3 border border-gray-300 rounded-md"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jours jusqu'à l'échéance
          </label>
          <input
            type="number"
            value={input.jours}
            onChange={(e) => setInput({...input, jours: Number(e.target.value)})}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jours de Banque
          </label>
          <input
            type="number"
            value={input.joursBanque}
            onChange={(e) => setInput({...input, joursBanque: Number(e.target.value)})}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
      >
        Calculer l'Escompte
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Résultats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded">
              <h4 className="font-semibold text-green-800">Escompte Commercial</h4>
              <p className="text-xl font-bold">{result.escompteCommercial.toFixed(2)} DT</p>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-blue-800">Valeur Actuelle Commerciale</h4>
              <p className="text-xl font-bold">{result.valeurActuelleCommerciale.toFixed(2)} DT</p>
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <h4 className="font-semibold text-purple-800">Escompte Rationnel</h4>
              <p className="text-xl font-bold">{result.escompteRationnel.toFixed(2)} DT</p>
            </div>
            <div className="bg-orange-50 p-3 rounded">
              <h4 className="font-semibold text-orange-800">Valeur Actuelle Rationnelle</h4>
              <p className="text-xl font-bold">{result.valeurActuelleRationnelle.toFixed(2)} DT</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Diviseur (D): {result.diviseur.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
