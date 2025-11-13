'use client';

import { useState } from 'react';
import { EmpruntInput } from '@/types';
import { calculerEmprunt } from '@/lib/calculations';

export default function EmpruntCalculator() {
  const [input, setInput] = useState<EmpruntInput>({
    capitalEmprunte: 100000,
    tauxInteret: 5,
    duree: 5,
    type: 'annuites_constantes'
  });

  const [tableau, setTableau] = useState<any[]>([]);

  const handleCalculate = () => {
    const result = calculerEmprunt(input);
    setTableau(result);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Calcul d'Emprunt</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capital Emprunté (DT)
          </label>
          <input
            type="number"
            value={input.capitalEmprunte}
            onChange={(e) => setInput({...input, capitalEmprunte: Number(e.target.value)})}
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
            Durée (années)
          </label>
          <input
            type="number"
            value={input.duree}
            onChange={(e) => setInput({...input, duree: Number(e.target.value)})}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de Remboursement
          </label>
          <select
            value={input.type}
            onChange={(e) => setInput({...input, type: e.target.value as any})}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="annuites_constantes">Annuités Constantes</option>
            <option value="amortissement_constants">Amortissements Constants</option>
            <option value="in_fine">In Fine</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700"
      >
        Calculer le Tableau d'Amortissement
      </button>

      {tableau.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Tableau d'Amortissement</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left">Période</th>
                  <th className="p-3 text-right">Capital Restant</th>
                  <th className="p-3 text-right">Intérêt</th>
                  <th className="p-3 text-right">Amortissement</th>
                  <th className="p-3 text-right">Annuité</th>
                </tr>
              </thead>
              <tbody>
                {tableau.map((ligne, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 text-right">{ligne.capitalRestant.toLocaleString()} DT</td>
                    <td className="p-3 text-right text-red-600">{ligne.interet.toLocaleString()} DT</td>
                    <td className="p-3 text-right text-green-600">{ligne.amortissement.toLocaleString()} DT</td>
                    <td className="p-3 text-right font-bold">{ligne.annuite.toLocaleString()} DT</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
