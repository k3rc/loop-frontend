// loop-frontend/upload.js
const API_URL = "https://loop-backend-b9ct.onrender.com"; // ← обновлённый URL

/* ---------- Tabs ---------- */
const tabs = {
  home: document.getElementById("tab-home"),
  playlist: document.getElementById("tab-playlist"),
  upload: document.getElementById("tab-upload"),
};

const sections = {
  home: document.getElementById("home"),
  playlist: document.getElementById("playlist"),
  upload: document.getElementById("upload"),
};

function setActiveTab(tabName) {
  Object.keys(tabs).forEach((key) => {
    tabs[key].classList.toggle("active", key === tabName);
    sections[key].classList.toggle("active", key === tabName);
  });

  if (tabName === "playlist") loadPlaylist();
}

Object.entries(tabs).forEach(([key, btn]) => {
  btn.addEventListener("click", () => setActiveTab(key));
});

/* ---------- Playlist ---------- */
async function loadPlaylist() {
  const listEl = document.getElementById("tracks-list");
  listEl.innerHTML = "Загрузка…";

  try {
    const res = await fetch(`${API_URL}/tracks`);
    if (!res.ok) throw new Error("Не удалось получить список треков");

    const tracks = await res.json();

    if (!tracks.length) {
      listEl.innerHTML = "<p>Плейлист пуст.</p>";
      return;
    }

    listEl.innerHTML = "";
    tracks.forEach((track) => {
      const div = document.createElement("div");
      div.className = "track";
      div.innerHTML = `
        <p><strong>${track.title || track.name || "Без названия"}</strong> — ${track.artist || "Неизвестный исполнитель"}</p>
        <audio controls preload="none" src="${track.url}"></audio>
        <hr/>
      `;
      listEl.appendChild(div);
    });
  } catch (err) {
    listEl.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

document
  .getElementById("refresh-tracks")
  .addEventListener("click", loadPlaylist);

/* ---------- Upload ---------- */
const uploadForm = document.getElementById("upload-form");
const fileInput  = document.getElementById("audio-file");
const uploadStatus = document.getElementById("upload-status");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!fileInput.files.length) {
    uploadStatus.textContent = "Выберите файл для загрузки.";
    return;
  }

  uploadStatus.textContent = "Загрузка…";

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Ошибка загрузки файла");

    const data = await res.json();
    uploadStatus.textContent = `Успешно: ${data.filename || "файл загружен"}`;
    fileInput.value = "";

    if (sections.playlist.classList.contains("active")) loadPlaylist();
  } catch (err) {
    console.error(err);
    uploadStatus.textContent = `Ошибка: ${err.message}`;
  }
});

/* ---------- Init ---------- */
setActiveTab("home");
