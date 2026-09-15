// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import { uploadToCloudinary } from "../utils/cloudinaryService";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [realisations, setRealisations] = useState([]);
  const [showUploader, setShowUploader] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    // Plus récentes en premier, comme sur la page publique
    const q = query(collection(db, "realisations"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRealisations(docs);
    });
    return () => unsub();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const imageUrl = await uploadToCloudinary(file);
      await addDoc(collection(db, "realisations"), {
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setFile(null);
      setShowUploader(false);
    } catch (err) {
      console.error("Erreur lors de l'upload :", err);
      setError("L'envoi de l'image a échoué. Réessayez.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "realisations", id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setError("La suppression a échoué. Réessayez.");
    }
  };

  return (
    <section className="pt-36 pb-12 px-4 md:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Espace Administration</h1>
          <button
            onClick={logout}
            className="text-sm text-gray-600 hover:text-black hover:underline"
          >
            Se déconnecter
          </button>
        </div>

        {error && <p className="mb-4 text-center text-red-600">{error}</p>}

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
                disabled={!file || uploading}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
              >
                {uploading ? "Envoi..." : "Publier"}
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
