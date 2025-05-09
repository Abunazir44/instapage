// auth.js

import { auth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from './firebase-config.js';

const provider = new GoogleAuthProvider();

window.loginWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      document.getElementById("user-name").innerText = `Olá, ${user.displayName}`;
      document.getElementById("login-btn").style.display = "none";
      document.getElementById("logout-btn").style.display = "inline-block";
    })
    .catch((error) => {
      console.error("Erro ao logar:", error);
    });
};

window.logout = () => {
  signOut(auth).then(() => {
    document.getElementById("user-name").innerText = "";
    document.getElementById("login-btn").style.display = "inline-block";
    document.getElementById("logout-btn").style.display = "none";
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("user-name").innerText = `Olá, ${user.displayName}`;
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline-block";
  }
});