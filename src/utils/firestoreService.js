// src/utils/firestoreService.js
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchRealisations = async () => {
  const q = query(collection(db, "realisations"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};
