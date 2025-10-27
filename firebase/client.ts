// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUE-yh_F2SKTkDjJ8EJZ3iIlVYkOzybaQ",
  authDomain: "ai-interview-preparation-a5a28.firebaseapp.com",
  projectId: "ai-interview-preparation-a5a28",
  storageBucket: "ai-interview-preparation-a5a28.firebasestorage.app",
  messagingSenderId: "1077006023057",
  appId: "1:1077006023057:web:8bb2d01acd986756758230",
  measurementId: "G-F5R48ZKR27"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);