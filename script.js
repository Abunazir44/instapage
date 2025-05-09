// script.js

// 🔹 Importações do Firebase
import {
  auth,
  provider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from './firebase-config.js';

import {
  db,
  doc,
  setDoc,
  getDoc
} from './firebase-config.js';

import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from './firebase-config.js';

// 🧠 Variáveis Globais
let profileImageURL = "";
let isLoggedIn = false;

// 📁 Elementos do DOM
const userNameDisplay = document.getElementById("user-name");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

// 🔄 Observa mudanças no estado do usuário
onAuthStateChanged(auth, (user) => {
  if (user) {
    userNameDisplay.innerText = `Olá, ${user.displayName}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    isLoggedIn = true;
  } else {
    userNameDisplay.innerText = "";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    isLoggedIn = false;
  }
});

// 🔐 Login com Google
window.loginWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      userNameDisplay.innerText = `Olá, ${user.displayName}`;
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      isLoggedIn = true;
    })
    .catch((error) => {
      console.error("Erro ao logar:", error);
      alert("Erro ao fazer login.");
    });
};

// 🔚 Logout
window.logout = () => {
  signOut(auth).then(() => {
    userNameDisplay.innerText = "";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    isLoggedIn = false;
    alert("Você saiu.");
  });
};

// ➕ Adicionar mais links
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

// 🖼️ Upload de Imagem (Firebase Storage)
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

// 👁️ Preview em tempo real
window.previewPage = () => {
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
};

// 🔢 Gera ID único
function generateUserId() {
  return Math.random().toString(36).substring(2, 10);
}

// 💾 Salva no Firebase
async function saveToFirebase(userId, data) {
  try {
    await setDoc(doc(db, "pages", userId), data);
    alert(`Página criada! Compartilhe: https://localhost/page.html?id=${userId}`);
  } catch (error) {
    console.error("Erro ao salvar página:", error);
    alert("Erro ao salvar a página.");
  }
}