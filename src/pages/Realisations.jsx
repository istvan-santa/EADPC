// src/pages/Realisations.jsx
import React, { useState, useEffect } from "react";

export default function Realisations() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cloudinaryImages, setCloudinaryImages] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("realisations");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCloudinaryImages(parsed);
        }
      } catch (error) {
        console.error("Erreur parsing localStorage:", error);
      }
    }
  }, []);

  return (
    <>
      <section className="bg-white pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <section className="mt-[120px] px-4 md:px-12 lg:px-24">
            <h2 className="text-3xl font-bold text-center mb-8">
              Nos Réalisations
            </h2>
          </section>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cloudinaryImages.map((item, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow hover:shadow-xl transition duration-300 cursor-pointer"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                <img
                  src={item.imageUrl}
                  alt="Réalisation"
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Zoom"
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        </div>
      )}
    </>
  );
}
