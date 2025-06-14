// src/pages/Admin.jsx
import React, { useState, useEffect } from "react";
import { uploadToCloudinary } from "../utils/cloudinaryService";
import { getRealisations, deleteRealisation } from "../utils/localStorageService";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { logout } = useAuth();
  const [realisations, setRealisations] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const stored = getRealisations();
    setRealisations(stored);
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    const imageUrl = await uploadToCloudinary(selectedFile);

    if (imageUrl) {
      const updated = [...realisations, { image: imageUrl }];
      localStorage.setItem("realisations", JSON.stringify(updated));
      setRealisations(updated);
      setSelectedFile(null);
      setShowForm(false);
    }
    setUploading(false);
  };

  const handleDelete = (index) => {
    const updated = realisations.filter((_, i) => i !== index);
    localStorage.setItem("realisations", JSON.stringify(updated));
    setRealisations(updated);
  };

  return (
    <section className="pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto mt-32 relative">
        <h2 className="text-3xl font-bold text-center mb-8">
          Espace d'administration
        </h2>

        {/* Déconnexion */}
        <button
          onClick={logout}
          className="absolute top-0 right-0 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Déconnexion
        </button>

        {/* Affichage des réalisations */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-6">
          {realisations.map((realisation, index) => (
            <div key={index} className="relative">
              <img
                src={realisation.image}
                alt="Réalisation"
                className="w-full h-48 object-cover rounded"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Bouton Ajouter */}
          <div
            className="flex items-center justify-center h-48 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            onClick={() => setShowForm(true)}
          >
            <span className="text-3xl">+</span>
          </div>
        </div>

        {/* Formulaire Upload */}
        {showForm && (
          <div className="bg-gray-100 p-4 rounded shadow mb-4">
            <input type="file" onChange={handleFileChange} />
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {uploading ? "Chargement..." : "Publier"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
