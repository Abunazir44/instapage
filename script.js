// script.js

// Simulação de login/logout
let isLoggedIn = false;

function login() {
  const confirmLogin = confirm("Você deseja fazer login?");
  if (confirmLogin) {
    isLoggedIn = true;
    alert("Login realizado com sucesso!");
  }
}

function logout() {
  if (confirm("Deseja sair?")) {
    isLoggedIn = false;
    alert("Logout realizado.");
  }
}

function checkLogin() {
  if (isLoggedIn) {
    window.location.href = "editor.html";
  } else {
    alert("Por favor, faça login primeiro.");
  }
}

// Adicionar mais campos de link
function addLink() {
  const container = document.getElementById("links-container");
  const group = document.createElement("div");
  group.className = "link-group";
  group.innerHTML = `
    <input type="url" placeholder="https://seusite.com " class="link-input"/>
    <input type="text" placeholder="Nome do link" class="link-title"/>
  `;
  container.appendChild(group);
}

// Upload de imagem local para Firebase Storage
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from './firebase-config.js';

let profileImageURL = "";

document.getElementById("imageUpload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const storageRef = ref(storage, 'profile-images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Progresso do upload: ${progress.toFixed(2)}%`);
    },
    (error) => {
      alert("Erro ao fazer upload da imagem.");
      console.error("Erro no upload:", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        profileImageURL = downloadURL;
        document.querySelector(".profile-pic").style.backgroundImage = `url(${downloadURL})`;
        alert("Imagem carregada com sucesso!");
      });
    }
  );
});

// Preview da página
function previewPage() {
  const name = document.getElementById("nameInput").value.trim();
  const bio = document.getElementById("bioInput").value.trim();
  const color = document.getElementById("colorInput").value;
  const template = document.getElementById("templateSelect").value;

  const links = [];
  document.querySelectorAll(".link-group").forEach(group => {
    const url = group.querySelector(".link-input").value.trim();
    const title = group.querySelector(".link-title").value.trim();
    if (url && title) links.push({ url, title });
  });

  // Validação mínima
  if (!name || !bio || links.length === 0) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  // Atualiza preview
  document.getElementById("previewName").innerText = name;
  document.getElementById("previewBio").innerText = bio;
  document.getElementById("preview").className = `card-preview ${template} hidden`;

  const linksContainer = document.getElementById("previewLinks");
  linksContainer.innerHTML = "";
  links.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.title;
    a.className = "btn-link";
    a.style.backgroundColor = color;
    a.target = "_blank";
    linksContainer.appendChild(a);
  });

  document.getElementById("preview").classList.remove("hidden");

  // Gera ID único
  const userId = generateUserId();

  // Salva no Firebase
  saveToFirebase(userId, {
    name,
    bio,
    links,
    color,
    template,
    profileImage: profileImageURL
  });
}

function generateUserId() {
  return Math.random().toString(36).substring(2, 10);
}

// Salvar no Firebase
import { db, doc, setDoc } from './firebase-config.js';

async function saveToFirebase(userId, data) {
  try {
    await setDoc(doc(db, "pages", userId), data);
    alert(`Página criada! Compartilhe: https://localhost/page.html?id=${userId}`);
  } catch (error) {
    console.error("Erro ao salvar página:", error);
    alert("Erro ao salvar a página.");
  }
}