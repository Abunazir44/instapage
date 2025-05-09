// script.js

// Importações do Firebase
import { auth, provider, signInWithPopup, onAuthStateChanged, signOut } from './firebase-config.js';

let isLoggedIn = false;

// Torna as funções globais para uso no HTML
window.loginWithGoogle = () => {
  if (!auth || !signInWithPopup) {
    console.error("Firebase Auth ou signInWithPopup não carregado.");
    alert("Erro ao iniciar login: Firebase não está pronto.");
    return;
  }

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Usuário logado:", user);

      // Atualiza interface
      const loginBtn = document.getElementById("login-btn");
      const logoutBtn = document.getElementById("logout-btn");
      const userNameDisplay = document.getElementById("user-name");

      if (userNameDisplay) userNameDisplay.innerText = `Olá, ${user.displayName}`;
      if (loginBtn) loginBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";

      isLoggedIn = true;

      // Mostra o editor
      const editorSection = document.querySelector(".editor");
      if (editorSection) editorSection.classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Erro no login com Google:", error.message);
      alert("Erro ao fazer login. Confira o console para mais detalhes.");
    });
};

window.logout = () => {
  if (!auth || !signOut) {
    console.error("Firebase Auth ou signOut não carregado.");
    alert("Erro ao sair.");
    return;
  }

  signOut(auth).then(() => {
    alert("Logout realizado.");
    window.location.reload();
  }).catch(() => {
    alert("Erro ao sair.");
  });
};

window.checkLogin = () => {
  if (!isLoggedIn) {
    alert("Por favor, faça login primeiro.");
    return;
  }

  // Rola até a seção do editor
  const editorSection = document.querySelector("#editor-section");
  if (editorSection) {
    editorSection.scrollIntoView({ behavior: 'smooth' });
  }
};

window.showProductCatalog = () => {
  alert("Exibindo exemplo de catálogo...");
};

// Upload de Imagem Local
let profileImageURL = "";

const imageUpload = document.getElementById("imageUpload");
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

// Adicionar múltiplos links
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

// Preview da Página
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
    const url = group.querySelector(".link-input")?.value.trim();
    const title = group.querySelector(".link-title")?.value.trim();
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