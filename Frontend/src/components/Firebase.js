// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcNI4ksERTtjxVU1oExby3Zeg3OQovJUw",
  authDomain: "miners-aa35e.firebaseapp.com",
  projectId: "miners-aa35e",
  storageBucket: "miners-aa35e.appspot.com",
  messagingSenderId: "41431397308",
  appId: "1:41431397308:web:efe0c20060b632874cb1b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
