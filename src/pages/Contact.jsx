// src/pages/Contact.jsx
import React, { useState } from "react";

// Web3Forms : envoi direct vers la boîte mail, sans serveur à maintenir.
// La clé est publique par conception (elle ne sert qu'à router vers l'adresse
// validée côté Web3Forms), mais on la garde en variable d'env pour pouvoir
// la changer sans toucher au code.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const CHAMP_CLASSES =
  "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "Nouvelle demande depuis le site EADPC");
    formData.append("from_name", "Site EADPC");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      setStatus("error");
    }
  };

  return (
    <section className="min-h-screen bg-white pt-36 pb-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-8">Contactez-nous</h1>
        <p className="text-gray-600">
          Une question ? Un projet en tête ? Remplissez le formulaire ci-dessous
          et nous reviendrons vers vous rapidement.
        </p>
      </div>

      {status === "success" ? (
        <div className="max-w-3xl mx-auto bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <p className="font-semibold text-green-800 mb-2">Message envoyé</p>
          <p className="text-green-700">
            Merci, nous avons bien reçu votre demande et vous recontactons au
            plus vite. Pour une urgence, appelez le 06 30 76 57 57.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
          {/* Piège à robots : invisible pour un humain, rempli par les bots */}
          <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />

          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Nom complet
            </label>
            <input type="text" id="name" name="name" autoComplete="name" className={CHAMP_CLASSES} required />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input type="email" id="email" name="email" autoComplete="email" className={CHAMP_CLASSES} required />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2 font-medium">
              Numéro de téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              pattern="[0-9\s+().-]{6,20}"
              title="Saisissez un numéro de téléphone valide"
              className={CHAMP_CLASSES}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-medium">
              Message
            </label>
            <textarea id="message" name="message" rows="5" className={CHAMP_CLASSES} required></textarea>
          </div>

          {status === "error" && (
            <p className="text-red-600">
              L'envoi a échoué. Réessayez, ou contactez-nous directement au
              06 30 76 57 57.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 disabled:opacity-50"
          >
            {status === "sending" ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      )}
    </section>
  );
}
