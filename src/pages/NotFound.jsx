// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16 bg-white">
      <Helmet>
        <title>Page introuvable | EADPC</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="text-center max-w-md">
        <p className="text-6xl font-bold mb-4">404</p>
        <h1 className="text-2xl font-semibold mb-4">Cette page n'existe pas</h1>
        <p className="text-gray-600 mb-8">
          Le lien est peut-être erroné ou la page a été déplacée. Pour une
          urgence, appelez-nous directement au 06 30 76 57 57.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
