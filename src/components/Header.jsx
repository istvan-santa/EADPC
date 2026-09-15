import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          <img
            src="/assets/images/logo2.0.webp"
            alt="EADPC, plombier chauffagiste à Grasse"
            width="400"
            height="269"
            className="h-20 w-auto"
          />
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center space-x-6 font-semibold text-gray-700">
          <Link to="/" className="hover:text-black">Accueil</Link>
          <Link to="/services" className="hover:text-black">Services</Link>
          <Link to="/realisations" className="hover:text-black">Réalisations</Link>
          <Link to="/contact" className="hover:text-black">Contact</Link>

          {/* Icône de connexion */}
          <Link to="/login" className="hover:text-black ml-4" aria-label="Espace administration">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9.953 9.953 0 0112 15c2.485 0 4.735.91 6.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </div>

        {/* Burger menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Ouvrir le menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      <div
        aria-hidden={!isOpen}
        className={`md:hidden bg-white px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 invisible"
        }`}
      >
        <nav className="flex flex-col space-y-4 font-semibold text-gray-700 py-4">
          <Link to="/" onClick={handleLinkClick}>Accueil</Link>
          <Link to="/services" onClick={handleLinkClick}>Services</Link>
          <Link to="/realisations" onClick={handleLinkClick}>Réalisations</Link>
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          <Link to="/login" onClick={handleLinkClick}>Connexion</Link>
        </nav>
      </div>
    </header>
  );
}
