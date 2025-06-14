// src/pages/Realisations.jsx
import React, { useState, useEffect } from "react";

const staticProjects = [
  {
    image: "/src/images/IMG-20250612-WA0008.jpg",
    title: "Salle de Bain en Marbre",
    location: "Nice",
  },
  {
    image: "/src/images/IMG-20250612-WA0011.jpg",
    title: "Douche à l'italienne",
    location: "Cannes",
  },
  {
    image: "/src/images/IMG-20250612-WA0012.jpg",
    title: "Baignoire Îlot Moderne",
    location: "Monaco",
  },
  {
    image: "/src/images/IMG-20250612-WA0019.jpg",
    title: "Salle de Bain Zen",
    location: "Antibes",
  },
  {
    image: "/src/images/IMG-20250612-WA0021.jpg",
    title: "Style Contemporain",
    location: "Saint-Tropez",
  },
  {
    image: "/src/images/IMG-20250612-WA0047.jpg",
    title: "Espace Bain Classique Chic",
    location: "Grasse",
  },
  {
    image: "/src/images/IMG-20250612-WA0059.jpg",
    title: "Espace Bain Classique Chic",
    location: "Grasse",
  },
];

export default function Realisations() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cloudinaryProjects, setCloudinaryProjects] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("realisations");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCloudinaryProjects(parsed);
        }
      } catch (error) {
        console.error("Erreur parsing localStorage:", error);
      }
    }
  }, []);

  const allProjects = [...cloudinaryProjects, ...staticProjects];

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
            {allProjects.map((project, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow hover:shadow-xl transition duration-300 cursor-pointer"
                onClick={() => setSelectedImage(project.image)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4 bg-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-gray-600">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
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
