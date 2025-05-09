// script.js

// Importações do Firebase
import { auth, provider, signInWithPopup, onAuthStateChanged, signOut } from './firebase-config.js';

let isLoggedIn = false;

// Observa mudança de estado do usuário
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("user-name").innerText = `Olá, ${user.displayName}`;
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline-block";
    isLoggedIn = true;

    // Mostra o editor se o usuário já estiver logado
    const editorSection = document.querySelector(".editor");
    if (editorSection) {
      editorSection.classList.remove("hidden");
    }
  } else {
    document.getElementById("user-name").innerText = "";
    document.getElementById("login-btn").style.display = "inline-block";
    document.getElementById("logout-btn").style.display = "none";
    isLoggedIn = false;

    // Esconde o editor se o usuário não estiver logado
    const editorSection = document.querySelector(".editor");
    if (editorSection) {
      editorSection.classList.add("hidden");
    }
  }
});

// Função chamada pelo botão "Entrar com Google"
window.loginWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      document.getElementById("user-name").innerText = `Olá, ${user.displayName}`;
      document.getElementById("login-btn").style.display = "none";
      document.getElementById("logout-btn").style.display = "inline-block";
      isLoggedIn = true;

      // Mostra o editor após login bem-sucedido
      const editorSection = document.querySelector(".editor");
      if (editorSection) {
        editorSection.classList.remove("hidden");
      }
    })
    .catch((error) => {
      alert("Erro ao fazer login.");
      console.error("Erro no login:", error.message);
    });
};

// Função chamada pelo botão "Sair"
window.logout = () => {
  signOut(auth).then(() => {
    alert("Logout realizado.");
  }).catch(() => {
    alert("Erro ao sair.");
  });
};

// Função chamada pelo botão "Criar minha página agora"
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

// Função para mostrar exemplo de catálogo
window.showProductCatalog = () => {
  alert("Exibindo exemplo de catálogo...");
};

// Upload de Imagem Local (FileReader)
let profileImageURL = "";

document.getElementById("imageUpload").addEventListener("change", function (e) {
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

// Adicionar mais campos de link
window.addLink = () => {
  const container = document.getElementById("links-container");
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
  const name = document.getElementById("nameInput").value.trim();
  const bio = document.getElementById("bioInput").value.trim();
  const color = document.getElementById("colorInput").value;

  // Validação mínima
  if (!name || !bio) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  // Atualiza preview
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