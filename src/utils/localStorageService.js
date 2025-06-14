// src/utils/localStorageService.js
const STORAGE_KEY = "realisations";

export const saveRealisation = (realisation) => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const updated = [realisation, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getRealisations = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const deleteRealisation = (url) => {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const filtered = all.filter((item) => item.image !== url);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
