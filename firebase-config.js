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
  apiKey: "SUA_API_KEY",
  authDomain: "seuprojeto.firebaseapp.com",
  projectId: "seuprojeto",
  storageBucket: "seuprojeto.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
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