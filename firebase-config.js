// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js ";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js ";

const firebaseConfig = {
  apiKey: "AIzaSyBKf6qUHaXQOHvgLn6FvIAUgJ1pTzKr6jk",
  authDomain: "instapage-mini-saas.firebaseapp.com",
  projectId: "instapage-mini-saas",
  storageBucket: "instapage-mini-saas.firebasestorage.app",
  messagingSenderId: "989017928173",
  appId: "1:989017928173:web:2b018bbfea5869e64f77e4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
};