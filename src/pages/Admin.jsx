// src/pages/Admin.jsx
import React, { useState, useEffect } from "react";
import { uploadToCloudinary } from "../utils/cloudinaryService";

export default function Admin() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [realisations, setRealisations] = useState([]);

  // Charger les données au démarrage
  useEffect(() => {
    const stored = localStorage.getItem("realisations");
    if (stored) {
      setRealisations(JSON.parse(stored));
    }
  }, []);

  // Sauvegarde automatique dans le localStorage
  useEffect(() => {
    localStorage.setItem("realisations", JSON.stringify(realisations));
  }, [realisations]);

  const handleUpload = async () => {
    if (!image) return alert("Choisis une image");

    const url = await uploadToCloudinary(image);

    const newItem = { image: url, title, location };
    const updated = [newItem, ...realisations];
    setRealisations(updated);
    setImage(null);
    setTitle("");
    setLocation("");
  };

  const handleDelete = (index) => {
    const updated = realisations.filter((_, i) => i !== index);
    setRealisations(updated);
  };

  const handleEdit = (index, field, value) => {
    const updated = [...realisations];
    updated[index][field] = value;
    setRealisations(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 md:px-12 lg:px-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Gestion des Réalisations</h1>

      <div className="bg-white p-6 rounded shadow mb-12">
        <h2 className="text-xl font-semibold mb-4">Ajouter une réalisation</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Titre"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ville"
            className="border p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button
          onClick={handleUpload}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Publier
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {realisations.map((item, index) => (
          <div key={index} className="bg-white shadow rounded overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleEdit(index, "title", e.target.value)}
                className="w-full border p-2 rounded mb-2"
              />
              <input
                type="text"
                value={item.location}
                onChange={(e) => handleEdit(index, "location", e.target.value)}
                className="w-full border p-2 rounded mb-2"
              />
              <button
                onClick={() => handleDelete(index)}
                className="mt-2 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
