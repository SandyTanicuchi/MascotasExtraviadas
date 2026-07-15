import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqe_tA28isUtepPCND2HE_0wAAoUhpVDk",
  authDomain: "petsos-app-69847.firebaseapp.com",
  projectId: "petsos-app-69847",
  storageBucket: "petsos-app-69847.appspot.com",
  messagingSenderId: "589161654283",
  appId: "1:589161654283:web:02fb3c7f2b8ccd5ac87f0e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);