// src/components/ZoneIntervention.jsx
import React from "react";
import { Link } from "react-router-dom";
import { VILLES, slugVille } from "../data/villes";

export default function ZoneIntervention() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Zone d’intervention</h2>
        <p className="mb-8 text-gray-600">
          Nous intervenons rapidement dans tout l’ouest des Alpes-Maritimes pour vos projets de plomberie, chauffage, assainissement ou climatisation.
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-blue-600 text-lg font-medium">
          {VILLES.map((ville) => (
            <li key={ville}>
              <Link
                to={`/plombier-${slugVille(ville)}`}
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
