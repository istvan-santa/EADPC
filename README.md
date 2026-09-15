# EADPC — site vitrine

Site vitrine et galerie de réalisations pour EADPC (plomberie, Grasse).

## Stack

React 18 + Vite + Tailwind CSS. Firebase (Firestore pour la galerie,
Authentication pour l'espace admin) et Cloudinary pour l'hébergement des images.

## Installation

```bash
npm install
cp .env.example .env   # puis remplir les valeurs
npm run dev            # http://localhost:5173
```

Build de production : `npm run build`, résultat dans `dist/`.

## Configuration requise

Le fichier `.env` n'est pas versionné. Il faut renseigner :

1. **Firebase** : les six variables `VITE_FIREBASE_*`, disponibles dans
   la console Firebase, Paramètres du projet, section « Vos applications ».
2. **Web3Forms** : `VITE_WEB3FORMS_KEY`, clé gratuite à générer sur
   [web3forms.com](https://web3forms.com) avec l'adresse de réception des
   demandes de contact. C'est ce qui achemine le formulaire vers la boîte mail.

Côté Firebase, deux étapes supplémentaires :

- Activer **Authentication > Sign-in method > E-mail/Mot de passe**, puis créer
  le compte administrateur dans l'onglet Users. C'est ce compte qui ouvre `/admin`.
- Copier le contenu de `firestore.rules` dans **Firestore Database > Règles**.

## Structure

```
src/
  pages/        Home, Services, Realisations, Contact, PlombierVille,
                NotFound, Login, Admin
  components/   Header, Footer, ZoneIntervention, ScrollToTop
  context/      AuthContext (Firebase Auth)
  routes/       PrivateRoute (protection de /admin)
  firebase/     initialisation Firebase (db + auth)
  data/         villes.js, source unique de la zone d'intervention
  utils/        upload Cloudinary
```

## Espace admin

`/admin` permet d'ajouter et de supprimer des photos de réalisations. L'accès
passe par `/login` avec le compte Firebase. Les images sont envoyées à
Cloudinary (preset `realisation_upload`), et leur URL est stockée dans la
collection Firestore `realisations`.

## Pages locales

Chaque commune de la zone d'intervention a sa propre page, du type
`/plombier-cannes`. Elles sont générées à partir de la liste unique
`src/data/villes.js`, qui alimente aussi le footer et la section « Zone
d'intervention » de l'accueil. Ajouter une commune à cette liste crée la page,
la route et les liens correspondants. Il reste à l'ajouter manuellement à
`public/sitemap.xml`.

## Déploiement

Le site est une application monopage : le serveur doit renvoyer `index.html`
pour toutes les URL, sinon un rafraîchissement sur `/realisations` provoque une
erreur 404. La configuration est déjà fournie pour les deux hébergeurs les plus
courants, `vercel.json` pour Vercel et `public/_redirects` pour Netlify. Sur un
serveur Apache, l'équivalent est une règle `mod_rewrite` vers `index.html`.

Après mise en ligne, penser à déclarer `https://www.eadpc.fr/sitemap.xml` dans
la Google Search Console.

## Points restants

- Deux vulnérabilités npm subsistent, sur `esbuild` (serveur de développement
  uniquement, sans effet sur le site en ligne) et `react-router`. Les corriger
  suppose de passer à Vite 6 et React Router 7, deux montées de version
  majeures qui demandent des tests.
- Les photos de `public/assets/images` ont été converties en WebP, mais sept
  d'entre elles ne sont utilisées nulle part dans le code. Elles sont
  conservées comme réserve visuelle et peuvent être supprimées.
- Le formulaire de contact n'enregistre rien côté site : les demandes partent
  uniquement par e-mail via Web3Forms.
