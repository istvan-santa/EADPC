// src/pages/Realisations.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function Realisations() {
  const [realisations, setRealisations] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    const fetchRealisations = async () => {
      try {
        // Même tri que l'espace admin : les plus récentes en premier
        const q = query(collection(db, "realisations"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRealisations(data);
        setStatus("ready");
      } catch (error) {
        console.error("Erreur lors de la récupération des réalisations :", error);
        setStatus("error");
      }
    };

    fetchRealisations();
  }, []);

  return (
    <section className="pt-36 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <Helmet>
        <title>Nos réalisations de salles de bain | EADPC</title>
        <meta
          name="description"
          content="Découvrez les chantiers réalisés par EADPC sur la Côte d'Azur : salles de bain sur mesure, installations sanitaires et rénovations haut de gamme."
        />
        <link rel="canonical" href="https://www.eadpc.fr/realisations" />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Nos Réalisations</h1>

        {status === "loading" && (
          <p className="text-center text-gray-500">Chargement des réalisations...</p>
        )}

        {status === "error" && (
          <p className="text-center text-red-600">
            Les réalisations n'ont pas pu être chargées. Réessayez plus tard.
          </p>
        )}

        {status === "ready" && realisations.length === 0 && (
          <p className="text-center text-gray-500">
            Aucune réalisation publiée pour le moment.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {realisations.map((realisation) => (
            <div key={realisation.id} className="rounded shadow">
              <img
                src={realisation.imageUrl}
                alt="Réalisation EADPC"
                loading="lazy"
                className="w-full h-48 object-cover rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
