// src/pages/Services.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const services = [
  {
    title: "Dépannage d'urgence 24h/7j",
    description:
      "Intervention rapide et efficace pour tous vos problèmes de plomberie, à tout moment.",
  },
  {
    title: "Rénovation de salle de bain",
    description:
      "Transformez votre salle de bain en un espace de bien-être moderne et élégant.",
  },
  {
    title: "Climatisation",
    description:
      "Installation et entretien de systèmes de climatisation performants pour un confort optimal.",
  },
  {
    title: "Chauffage & Pompes à chaleur",
    description:
      "Solutions de chauffage économiques et écologiques, adaptées à votre habitat.",
  },
  {
    title: "Assainissement",
    description:
      "Traitement, nettoyage et maintenance des réseaux d’évacuation d’eaux usées.",
  },
  {
    title: "Installations haut de gamme",
    description:
      "Des matériaux nobles et un savoir-faire d’exception pour des résultats sur mesure.",
  },
];

export default function Services() {
  return (
    <section className="bg-white pt-36 pb-16 px-4 md:px-8">
      <Helmet>
        <title>Nos services de plomberie et chauffage | EADPC</title>
        <meta
          name="description"
          content="Dépannage d'urgence, rénovation de salle de bain, climatisation, chauffage, pompes à chaleur et assainissement par EADPC, artisan à Grasse."
        />
        <link rel="canonical" href="https://www.eadpc.fr/services" />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-12">
          Nos Services
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-lg transition duration-300"
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
  );
}
