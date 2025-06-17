// src/pages/Realisations.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function Realisations() {
  const [realisations, setRealisations] = useState([]);

  useEffect(() => {
    const fetchRealisations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "realisations"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRealisations(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des réalisations :", error);
      }
    };

    fetchRealisations();
  }, []);

  return (
    <section className="pt-36 pb-12 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Nos Réalisations</h1>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {realisations.map((realisation) => (
            <div key={realisation.id} className="rounded shadow">
              <img
                src={realisation.imageUrl}
                alt="Réalisation"
                className="w-full h-48 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
