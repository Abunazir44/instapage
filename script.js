import { db, doc, setDoc } from './firebase-config.js';

function previewPage() {
  const name = document.getElementById("nameInput").value.trim();
  const bio = document.getElementById("bioInput").value.trim();
  const link = document.getElementById("link1Input").value.trim();
  const color = document.getElementById("colorInput").value;
  const instagram = document.getElementById("instagramInput").value.trim();
  const whatsapp = document.getElementById("whatsappInput").value.trim();
  const profileImage = document.getElementById("profileImageInput").value.trim();

  // Validação mínima
  if (!name || !bio || !link) {
    alert("Nome, Bio e Link são obrigatórios");
    return;
  }

  // Atualiza preview
  document.getElementById("previewName").innerText = name;
  document.getElementById("previewBio").innerText = bio;
  document.getElementById("previewLink").href = link;
  document.getElementById("previewLink").style.backgroundColor = color;

  // Mostra imagem se tiver
  const profilePic = document.querySelector(".profile-pic");
  if (profileImage) {
    profilePic.style.backgroundImage = `url(${profileImage})`;
  }

  document.getElementById("preview").classList.remove("hidden");

  // Gera ID único
  const userId = generateUserId();

  // Salva no Firebase
  saveToFirebase(userId, {
    name,
    bio,
    link,
    color,
    instagram,
    whatsapp,
    profileImage
  });
}

function generateUserId() {
  return Math.random().toString(36).substring(2, 10);
}

async function saveToFirebase(userId, data) {
  try {
    await setDoc(doc(db, "pages", userId), data);
    alert(`Página criada! Compartilhe: https://localhost:3000/page.html?id=${userId}`);
  } catch (error) {
    console.error("Erro ao salvar página:", error);
    alert("Erro ao salvar a página.");
  }
}

window.previewPage = previewPage;