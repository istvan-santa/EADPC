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
        <Link to="/" className="text-xl font-bold">
          <img src="/src/images/logo2.0.png" alt="Logo" className="h-20" />
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-6 font-semibold text-gray-700">
          <Link to="/" className="hover:text-black">Accueil</Link>
          <Link to="/realisations" className="hover:text-black">Réalisations</Link>
          <Link to="/contact" className="hover:text-black">Contact</Link>
        </nav>

        {/* Burger menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
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

      {/* Animated mobile menu */}
      <div
        className={`md:hidden bg-white px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <nav className="flex flex-col space-y-4 font-semibold text-gray-700 py-4">
          <Link to="/" onClick={handleLinkClick}>Accueil</Link>
          <Link to="/realisations" onClick={handleLinkClick}>Réalisations</Link>
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
