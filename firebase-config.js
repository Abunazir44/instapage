// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js ";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js ";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js ";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js ";

// 🔧 Substitua pelas suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBKf6qUHaXQOHvgLn6FvIAUgJ1pTzKr6jk",
  authDomain: "instapage-mini-saas.firebaseapp.com",
  projectId: "instapage-mini-saas",
  storageBucket: "instapage-mini-saas.firebasestorage.app",
  messagingSenderId: "989017928173",
  appId: "1:989017928173:web:2b018bbfea5869e64f77e4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  db,
  auth,
  doc,
  setDoc,
  getDoc,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL
};