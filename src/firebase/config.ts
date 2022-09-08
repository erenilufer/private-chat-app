// Import the functions you need from the SDKs you need
import "firebase/compat/firestore";
import "firebase/compat/auth";
import dotenv from "../../dotenv-config";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: dotenv.FIREBASE_APIKEY,
  authDomain: "chatpapp-9ce15.firebaseapp.com",
  projectId: "chatpapp-9ce15",
  storageBucket: "chatpapp-9ce15.appspot.com",
  messagingSenderId: "315192011130",
  appId: "1:315192011130:web:f7bb72f4a7dc6a314d0ec3",
  measurementId: "G-2NQE77TVEX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
