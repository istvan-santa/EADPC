// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ZoneIntervention from "../components/ZoneIntervention";

const services = [
  {
    title: "Dépannage d'urgence 24h/7j",
    description:
      "Intervention rapide et efficace pour tous vos problèmes de plomberie.",
  },
  {
    title: "Rénovation de salle de bain",
    description:
      "Transformez votre salle de bain en un espace de bien-être élégant.",
  },
  {
    title: "Climatisation",
    description:
      "Installation et entretien de systèmes de climatisation performants.",
  },
  {
    title: "Chauffage & Pompes à chaleur",
    description:
      "Solutions de chauffage économiques et adaptées à votre logement.",
  },
  {
    title: "Assainissement",
    description:
      "Traitement, nettoyage et maintenance des réseaux d’eaux usées.",
  },
  {
    title: "Installations haut de gamme",
    description:
      "Des matériaux nobles pour un résultat sur mesure et prestigieux.",
  },
];

const previewProjects = [
  {
    image: "/assets/images/Image-1.webp",
    title: "Installation sanitaire",
    location: "Mougins",
  },
  {
    image: "/assets/images/Image-2.webp",
    title: "Installation sanitaire",
    location: "Antibes",
  },
  {
    image: "/assets/images/Image-3.webp",
    title: "Installation sanitaire",
    location: "Cannes",
  },
];



export default function Home() {
  return (
    <>
      <Helmet>
        <title>EADPC | Plombier chauffagiste à Grasse et sur la Côte d'Azur</title>
        <meta
          name="description"
          content="EADPC, artisan plombier à Grasse : rénovation de salle de bain haut de gamme, dépannage d'urgence 24h/7j, climatisation et chauffage sur toute la Côte d'Azur."
        />
        <link rel="canonical" href="https://www.eadpc.fr/" />
      </Helmet>

      {/* Hero */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/assets/images/IMG-20250612-WA0011.webp')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-10 rounded text-center max-w-2xl">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
            EADPC, expert en installations
          </h1>
          <p className="text-white text-lg mb-6">
            Design. Confort. Excellence artisanale.
          </p>
          <Link
            to="/contact"
            className="bg-white text-black px-6 py-3 font-semibold rounded hover:bg-gray-300 transition"
          >
            Demander un devis
          </Link>
        </div>
      </section>

      {/* Nos Services */}
      <section className="bg-gray-100 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Nos Services
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow hover:shadow-xl transition transform hover:scale-105 duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aperçu des réalisations */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Aperçu de nos Réalisations
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {previewProjects.map((project, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
              >
                <img
                  src={project.image}
                  alt={`${project.title} à ${project.location}`}
                  width="1000"
                  height="1333"
                  loading="lazy"
                  className="w-full h-64 object-cover"
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

          <div className="text-center mt-10">
            <Link
              to="/realisations"
              className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              Afficher plus
            </Link>
          </div>
        </div>
      </section>

      <ZoneIntervention />
    </>
  );
}
