// src/pages/PlombierVille.jsx
// Page locale générée pour chaque ville de la zone d'intervention.
// Elle évite d'avoir dix fichiers quasi identiques à maintenir.
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { slugVille } from "../data/villes";
import ZoneIntervention from "../components/ZoneIntervention";

const prestations = [
  "Dépannage d'urgence 24h/7j",
  "Rénovation de salle de bain",
  "Climatisation",
  "Chauffage et pompes à chaleur",
  "Assainissement",
  "Installations haut de gamme",
];

export default function PlombierVille({ ville }) {
  const slug = slugVille(ville);

  return (
    <>
      <Helmet>
        <title>{`Plombier à ${ville} | EADPC`}</title>
        <meta
          name="description"
          content={`EADPC, plombier chauffagiste à ${ville} : dépannage d'urgence, rénovation de salle de bain, climatisation et chauffage. Devis gratuit.`}
        />
        <link rel="canonical" href={`https://www.eadpc.fr/plombier-${slug}`} />
      </Helmet>

      <section className="pt-36 pb-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Plombier à {ville}
          </h1>
          <p className="text-gray-700 mb-4">
            EADPC intervient à {ville} et dans les communes voisines pour vos
            travaux de plomberie, de chauffage, de climatisation et
            d'assainissement. Basée à Grasse, notre équipe se déplace sur
            l'ensemble de l'ouest des Alpes-Maritimes.
          </p>
          <p className="text-gray-700 mb-10">
            Du dépannage urgent à la rénovation complète d'une salle de bain,
            nous prenons en charge le chantier de l'étude à la finition.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Nos prestations à {ville}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 mb-10">
            {prestations.map((prestation) => (
              <li key={prestation} className="bg-gray-100 rounded-lg px-4 py-3">
                {prestation}
              </li>
            ))}
          </ul>

          <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-3">
              Un projet ou une urgence à {ville} ?
            </h2>
            <p className="mb-6 text-gray-300">
              Appelez-nous au 06 30 76 57 57 ou demandez un devis gratuit.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      <ZoneIntervention />
    </>
  );
}
