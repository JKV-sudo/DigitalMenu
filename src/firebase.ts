import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore"; // Falls du Firestore nutzt

// Firebase-Konfiguration (aus der Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAU3Ub6ULX4z02LuHUleswmv7IdutzPauI",
  authDomain: "masterdoenerneu.firebaseapp.com",
  projectId: "masterdoenerneu",
  storageBucket: "masterdoenerneu.firebasestorage.app",
  messagingSenderId: "312602010005",
  appId: "1:312602010005:web:a939dbc14c4ac66bf3169c"
};



// Firebase initialisieren
const app = initializeApp(firebaseConfig);

// Auth-Instanz holen
const auth: Auth = getAuth(app);

// Firestore-Instanz holen
const db: Firestore = getFirestore(app);

export { auth, db };