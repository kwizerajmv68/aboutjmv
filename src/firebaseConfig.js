import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0YUB9Z-l66UCi5HyryMjUKywbBp2Pcos",
  authDomain: "aboutjmv.firebaseapp.com",
  projectId: "aboutjmv",
  storageBucket: "aboutjmv.firebasestorage.app",
  messagingSenderId: "849884978031",
  appId: "1:849884978031:web:9c8b40db5bec13416a269a",
  measurementId: "G-K7CECZ3887"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
