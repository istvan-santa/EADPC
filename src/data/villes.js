// Source unique pour la zone d'intervention : le Footer, la section d'accueil,
// les pages locales et le sitemap doivent rester cohérents.
export const VILLES = [
  "Grasse",
  "Cannes",
  "Antibes",
  "Nice",
  "Cagnes-sur-Mer",
  "Mougins",
  "Mouans-Sartoux",
  "Valbonne",
  "Opio",
  "Le Rouret",
];

export const slugVille = (ville) =>
  ville
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // retire les accents
    .replace(/\s+/g, "-");

export const villeDepuisSlug = (slug) =>
  VILLES.find((ville) => slugVille(ville) === slug);
