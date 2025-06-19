// src/components/ZoneIntervention.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ZoneIntervention() {
  const villes = [
    "Grasse",
    "Cannes",
    "Antibes",
    "Nice",
    "Cagnes-sur-Mer",
    "Mougins",
    "Mouans-Sartoux",
    "Valbonne",
    "Opio",
    "Le Rouret"
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Zone d’intervention</h2>
        <p className="mb-8 text-gray-600">
          Nous intervenons rapidement dans tout l’ouest des Alpes-Maritimes pour vos projets de plomberie, chauffage, assainissement ou climatisation.
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-blue-600 text-lg font-medium">
          {villes.map((ville) => (
            <li key={ville}>
              <Link
                to={`/plombier-${ville.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:underline hover:text-blue-800 transition"
              >
                {ville}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
