// src/auth/authService.js
export const loginUser = async (email, password) => {
  // Simuler une API avec un setTimeout ou connecter plus tard à un vrai back
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@plombier.com" && password === "1234") {
        resolve({ token: "fake-jwt-token", user: { name: "Admin" } });
      } else {
        reject("Identifiants invalides");
      }
    }, 1000);
  });
};
