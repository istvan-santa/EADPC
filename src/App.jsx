import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Realisations from "./pages/Realisations";
import Contact from "./pages/Contact";
import PlombierVille from "./pages/PlombierVille";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import { VILLES, slugVille } from "./data/villes";

// L'espace admin n'est utile qu'à une personne : on le sort du bundle
// principal pour ne pas le faire télécharger à tous les visiteurs.
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));

const Chargement = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-500">Chargement...</p>
  </div>
);

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Suspense fallback={<Chargement />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/contact" element={<Contact />} />
          {/* react-router n'accepte un paramètre qu'en début de segment :
              on génère donc une route statique par ville pour conserver
              des URL du type /plombier-cannes */}
          {VILLES.map((ville) => (
            <Route
              key={ville}
              path={`/plombier-${slugVille(ville)}`}
              element={<PlombierVille ville={ville} />}
            />
          ))}
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
