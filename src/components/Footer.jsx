import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { VILLES, slugVille } from "../data/villes";

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <footer className="bg-black text-white py-10 px-4 mt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h4 className="text-xl font-semibold mb-3">Contact</h4>
          <p>
            Téléphone :{" "}
            <a href="tel:+33630765757" className="hover:underline">
              06 30 76 57 57 - 06 12 59 83 82
            </a>
          </p>
          <p>
            Email :{" "}
            <a href="mailto:ad.pc@outlook.fr" className="hover:underline">
              ad.pc@outlook.fr
            </a>
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-3">Adresse</h4>
          <p>CHEMIN DES PONTETS 06130 GRASSE</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-3">Suivez-nous</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="https://www.instagram.com/sas_eadpc/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/people/SAS-EADPC/100063521022455/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Zone d’intervention */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center gap-2 text-white font-semibold focus:outline-none mx-auto"
        >
          Zone d’intervention
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {open && (
          <ul className="mt-4 space-y-1 text-sm text-gray-300">
            {VILLES.map((ville) => (
              <li key={ville}>
                <Link
                  to={`/plombier-${slugVille(ville)}`}
                  className="hover:text-white hover:underline"
                >
                  {ville}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} EADPC. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
