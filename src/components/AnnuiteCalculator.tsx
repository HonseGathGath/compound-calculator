'use client';

import { useState } from 'react';
import { AnnuiteInput } from '@/types';
import { calculerAnnuites } from '@/lib/calculations';

export default function AnnuiteCalculator() {
  const [input, setInput] = useState<AnnuiteInput>({
    capitalInitial: 100000,
    tauxInteret: 5,
    periode: 10,
    type: 'fin'
  });

  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calculs = calculerAnnuites(input);
    setResult(calculs);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Calcul des Annuités</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capital Initial (DT)
          </label>
          <input
            type="number"
            value={input.capitalInitial}
            onChange={(e) => setInput({...input, capitalInitial: Number(e.target.value)})}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taux d'Intérêt (%)
          </label>
          <input
            type="number"
            value={input.tauxInteret}
            onChange={(e) => setInput({...input, tauxInteret: Number(e.target.value)})}
            className="w-full p-3 border border-gray-300 rounded-md"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Période (années)
          </label>
          <input
            type="number"
            value={input.periode}
            onChange={(e) => setInput({...input, periode: Number(e.target.value)})}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type d'Annuité
          </label>
          <select
            value={input.type}
            onChange={(e) => setInput({...input, type: e.target.value as 'debut' | 'fin'})}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="fin">Fin de période</option>
            <option value="debut">Début de période</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700"
      >
        Calculer les Annuités
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Résultats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold text-blue-800">Valeur Acquise</h4>
              <p className="text-2xl font-bold">{result.valeurAcquise.toLocaleString()} DT</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold text-green-800">Valeur Actuelle</h4>
              <p className="text-2xl font-bold">{result.valeurActuelle.toLocaleString()} DT</p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-semibold text-purple-800">Annuité Constante</h4>
              <p className="text-2xl font-bold">{result.annuiteConstante.toLocaleString()} DT</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
