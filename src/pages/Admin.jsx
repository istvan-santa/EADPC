// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import { uploadToCloudinary } from "../utils/cloudinaryService";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [realisations, setRealisations] = useState([]);
  const [showUploader, setShowUploader] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "realisations"), (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRealisations(docs);
    });
    return () => unsub();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const imageUrl = await uploadToCloudinary(file);
      await addDoc(collection(db, "realisations"), {
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setFile(null);
      setShowUploader(false);
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "realisations", id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <section className="pt-24 pb-12 px-4 md:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Espace Administration</h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-8">
          {realisations.map((realisation) => (
            <div key={realisation.id} className="relative group">
              <img
                src={realisation.imageUrl}
                alt="Réalisation"
                className="w-full h-48 object-cover rounded shadow"
              />
              <button
                onClick={() => handleDelete(realisation.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          ))}

          <div
            onClick={() => setShowUploader(true)}
            className="cursor-pointer flex items-center justify-center bg-gray-200 rounded shadow h-48 hover:bg-gray-300 transition"
          >
            <span className="text-4xl text-gray-500">+</span>
          </div>
        </div>

        {showUploader && (
          <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpload}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Publier
              </button>
              <button
                onClick={() => setShowUploader(false)}
                className="text-gray-500 hover:underline"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
