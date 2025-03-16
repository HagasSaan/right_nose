import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const BASE_URL = "localhost:8000";

const firebaseConfig = {
  apiKey: "AIzaSyAezr4HQ7Tmt5DQkij5ohV2yg_XYxUgeqc",
  authDomain: "rightnose-89f1e.firebaseapp.com",
  projectId: "rightnose-89f1e",
  storageBucket: "rightnose-89f1e.firebasestorage.app",
  messagingSenderId: "25020818301",
  appId: "1:25020818301:web:74886a68fb358114196214",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
