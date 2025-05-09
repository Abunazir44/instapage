// script.js

import { auth, provider, signInWithPopup, onAuthStateChanged, signOut } from './firebase-config.js';

let isLoggedIn = false;

window.loginWithGoogle = () => {
  if (!auth || !signInWithPopup) {
    console.error("Firebase Auth ou signInWithPopup não carregado.");
    alert("Erro ao iniciar login: Firebase não está pronto.");
    return;
  }

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      document.getElementById("user-name").innerText = `Olá, ${user.displayName}`;
      document.getElementById("login-btn").style.display = "none";
      document.getElementById("logout-btn").style.display = "inline-block";
      isLoggedIn = true;

      // Mostra editor e oculta conteúdo inicial
      document.querySelector(".editor").classList.remove("hidden");
      document.getElementById("hero-section").classList.add("hidden");
      document.getElementById("features-section").classList.add("hidden");
    })
    .catch((error) => {
      console.error("Erro no login:", error.message);
      alert(`Erro ao fazer login: ${error.message}`);
    });
};

window.logout = () => {
  if (!auth || !signOut) {
    console.error("Firebase Auth ou signOut não disponível.");
    alert("Erro ao sair.");
    return;
  }

  signOut(auth).then(() => {
    alert("Logout realizado.");
    window.location.reload();
  }).catch((error) => {
    console.error("Erro ao sair:", error.message);
    alert("Erro ao sair: " + error.message);
  });
};

window.checkLogin = () => {
  if (!isLoggedIn) {
    alert("Por favor, faça login primeiro.");
    return;
  }

  const editorSection = document.getElementById("editor-section");
  if (editorSection) {
    editorSection.classList.remove("hidden");
    editorSection.scrollIntoView({ behavior: 'smooth' });
  }
};

window.showProductCatalog = () => {
  alert("Exibindo exemplo de catálogo...");
};

document.addEventListener("DOMContentLoaded", () => {
  const imageUpload = document.getElementById("imageUpload");
  let profileImageURL = "";

  if (imageUpload) {
    imageUpload.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        profileImageURL = event.target.result;
        const profilePic = document.querySelector(".profile-pic");
        if (profilePic) {
          profilePic.style.backgroundImage = `url(${profileImageURL})`;
        }
      };
      reader.readAsDataURL(file);
    });
  }
});

window.addLink = () => {
  const container = document.getElementById("links-container");
  if (!container) return;

  const group = document.createElement("div");
  group.className = "link-group";
  group.innerHTML = `
    <input type="url" placeholder="https://seusite.com " class="link-input"/>
    <input type="text" placeholder="Nome do link" class="link-title"/>
  `;
  container.appendChild(group);
};

window.previewPage = () => {
  const name = document.getElementById("nameInput")?.value.trim();
  const bio = document.getElementById("bioInput")?.value.trim();
  const color = document.getElementById("colorInput")?.value;

  if (!name || !bio) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  document.getElementById("previewName").innerText = name;
  document.getElementById("previewBio").innerText = bio;

  const linksContainer = document.getElementById("previewLinks");
  linksContainer.innerHTML = "";

  document.querySelectorAll(".link-group").forEach(group => {
    const url = group.querySelector(".link-input").value.trim();
    const title = group.querySelector(".link-title").value.trim();
    if (url && title) {
      const a = document.createElement("a");
      a.href = url;
      a.textContent = title;
      a.className = "btn-link";
      a.style.backgroundColor = color;
      a.target = "_blank";
      linksContainer.appendChild(a);
    }
  });

  document.getElementById("preview").classList.remove("hidden");
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("user-name").innerText = `Olá, ${user.displayName}`;
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline-block";
    isLoggedIn = true;

    // Mostra o editor
    const editorSection = document.querySelector(".editor");
    if (editorSection) editorSection.classList.remove("hidden");

    // Esconde seções iniciais
    document.getElementById("hero-section").classList.add("hidden");
    document.getElementById("features-section").classList.add("hidden");
  } else {
    document.getElementById("user-name").innerText = "";
    document.getElementById("login-btn").style.display = "inline-block";
    document.getElementById("logout-btn").style.display = "none";
    isLoggedIn = false;

    // Mostra novamente as seções iniciais
    document.getElementById("hero-section").classList.remove("hidden");
    document.getElementById("features-section").classList.remove("hidden");

    // Esconde o editor
    const editorSection = document.querySelector(".editor");
    if (editorSection) editorSection.classList.add("hidden");
  }
});