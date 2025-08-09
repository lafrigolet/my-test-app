import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "my-test-app-123321",
  "appId": "1:64327112713:web:6d7c7e0ed9bca4460f00d8",
  "storageBucket": "my-test-app-123321.firebasestorage.app",
  "apiKey": "AIzaSyAUPDXlE2Tsq1key-H0cxAlZFTA0ALsjI0",
  "authDomain": "my-test-app-123321.firebaseapp.com",
  "messagingSenderId": "64327112713"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const functions = getFunctions(app, "us-central1");
export const db = getFirestore(app);

// Connect to emulators
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(db, "localhost", 8080);
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in: ", user.email);
  } else {
    console.log("No user signed in");
  }
});

// Ensure the login persists between sessions
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export const logout = () => signOut(auth);
