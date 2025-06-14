import React, { useState } from "react";
import Footer from "../components/Footer";

const Admin = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'envoi (remplacer plus tard par un enregistrement réel)
    console.log({ file, title, location });
    alert("Contenu soumis (simulation) !");
    // Réinitialiser le formulaire
    setFile(null);
    setTitle("");
    setLocation("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-grow">
        <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: "url('/images/admin-banner.jpg')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <section className="mt-[120px] px-4 md:px-12 lg:px-24">
              <h2 className="text-3xl font-bold text-center mb-8">Espace d’administration</h2>
            </section>
          </div>
        </section>

        <section className="p-6 max-w-xl mx-auto mt-10">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-xl p-6">
            <div>
              
              <label className="block mb-2 text-sm font-medium">Image ou Vidéo</label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Titre</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Lieu</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Publier
            </button>
          </form>
        </section>
      </main>

      <footer className="mt-20">
      </footer>
    </div>
  );
};

export default Admin;
