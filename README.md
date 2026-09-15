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
  pages/        Home, Services, Realisations, Contact, Login, Admin
  components/   Header, Footer, ZoneIntervention, ScrollToTop
  context/      AuthContext (Firebase Auth)
  routes/       PrivateRoute (protection de /admin)
  firebase/     initialisation Firebase (db + auth)
  utils/        upload Cloudinary
```

## Espace admin

`/admin` permet d'ajouter et de supprimer des photos de réalisations. L'accès
passe par `/login` avec le compte Firebase. Les images sont envoyées à
Cloudinary (preset `realisation_upload`), et leur URL est stockée dans la
collection Firestore `realisations`.

## Points restants

- La route `/services` existe et la page est rédigée, mais aucun lien du menu
  n'y mène.
- `public/sitemap.xml` et `public/robots.txt` contiennent encore des domaines
  d'exemple (`monsite.com`, `tonsite.com`) à remplacer par le domaine réel.
  Idem pour le champ `image` du JSON-LD dans `index.html`.
- `react-helmet-async` est installé mais inutilisé : toutes les pages partagent
  le même titre et la même meta description.
- Pas de route 404. En hébergement statique, penser à rediriger toutes les URL
  vers `index.html`, sinon un rafraîchissement sur `/realisations` renvoie une
  erreur serveur.
- Les images de `public/assets/images` (1,9 Mo de JPG) sont servies en pleine
  résolution dans des vignettes. À convertir en WebP ou à passer par Cloudinary.
