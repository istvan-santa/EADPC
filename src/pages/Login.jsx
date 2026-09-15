// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

// Messages Firebase traduits : les codes bruts ne sont pas lisibles par le client
const ERREURS = {
  "auth/invalid-credential": "Adresse e-mail ou mot de passe incorrect.",
  "auth/invalid-email": "Adresse e-mail invalide.",
  "auth/user-not-found": "Adresse e-mail ou mot de passe incorrect.",
  "auth/wrong-password": "Adresse e-mail ou mot de passe incorrect.",
  "auth/too-many-requests": "Trop de tentatives. Réessayez dans quelques minutes.",
  "auth/network-request-failed": "Connexion impossible. Vérifiez votre réseau.",
};

const Login = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  if (!loading && isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(ERREURS[err.code] || "Connexion impossible. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Connexion</h1>
        {error && <p className="text-red-600 mb-3">{error}</p>}

        <label htmlFor="email" className="block mb-2 font-medium">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full p-2 border rounded"
          required
        />

        <label htmlFor="password" className="block mb-2 font-medium">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {submitting ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default Login;
