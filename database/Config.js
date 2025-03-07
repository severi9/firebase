// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Load environment variables (for Expo users)
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig.extra.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig.extra.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig.extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig.extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig.extra.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const MESSAGES = 'messages'
const auth = getAuth(app);

export { app, firestore, collection, auth, addDoc, getDocs, deleteDoc, doc, MESSAGES };