import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDPhdRkzrl8zVVCg1OIxpoCF-5vj7FHd4",
  authDomain: "smooth-rides-9bd80.firebaseapp.com",
  projectId: "smooth-rides-9bd80",
  storageBucket: "smooth-rides-9bd80.appspot.com",
  messagingSenderId: "406180065258",
  appId: "1:406180065258:web:c37d79782747bcdf234c93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
