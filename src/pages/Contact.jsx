// src/pages/Contact.jsx
import React from "react";

export default function Contact() {
  return (
    <section className="min-h-screen bg-white pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <section className="mt-[120px] px-4 md:px-12 lg:px-24">
  <h2 className="text-3xl font-bold text-center mb-8">Contactez-nous</h2>
</section>

        <p className="text-gray-600">
          Une question ? Un projet en tête ? Remplissez le formulaire ci-dessous
          et nous reviendrons vers vous rapidement.
        </p>
      </div>

      <form className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label htmlFor="phone number" className="block mb-2 font-medium">
            Numéro de Téléphone
          </label>
          <input
            type="phone number"
            id="phone number"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
