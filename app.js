const API_URL = "https://loop-backend-b9ct.onrender.com"; // <- поменяй, если нужно

// Элементы для переключения вкладок
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
  // Кнопки
  Object.keys(tabs).forEach((key) => {
    tabs[key].classList.toggle("active", key === tabName);
  });
  // Секции
  Object.keys(sections).forEach((key) => {
    sections[key].classList.toggle("active", key === tabName);
  });
}

// Навешиваем события на кнопки
Object.entries(tabs).forEach(([key, button]) => {
  button.addEventListener("click", () => {
    setActiveTab(key);
    if (key === "playlist") {
      loadTracks();
    }
  });
});

// Загрузка списка треков с backend
async function loadTracks() {
  const listEl = document.getElementById("tracks-list");
  listEl.innerHTML = "Загрузка...";
  try {
    const res = await fetch(`${API_URL}/tracks`); // Предполагается, что этот endpoint возвращает JSON список треков
    if (!res.ok) throw new Error("Ошибка загрузки треков");
    const data = await res.json();
    if (data.length === 0) {
      listEl.innerHTML = "<p>Плейлист пуст.</p>";
      return;
    }
    listEl.innerHTML = "";
    data.forEach((track) => {
      const div = document.createElement("div");
      div.className = "track";
      div.textContent = `${track.title || track.name || "Без названия"} — ${track.artist || "Неизвестный исполнитель"}`;
      listEl.appendChild(div);
    });
  } catch (e) {
    listEl.innerHTML = `<p style="color: red;">Ошибка: ${e.message}</p>`;
  }
}

// Обработка формы загрузки трека
const uploadForm = document.getElementById("upload-form");
const uploadStatus = document.getElementById("upload-status");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  uploadStatus.textContent = "";

  const fileInput = uploadForm.file;
  if (!fileInput.files.length) {
    uploadStatus.textContent = "Пожалуйста, выберите файл.";
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  uploadStatus.textContent = "Загрузка...";

  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Ошибка загрузки файла");
    const data = await res.json();
    uploadStatus.textContent = "Файл успешно загружен!";
    fileInput.value = "";
  } catch (e) {
    uploadStatus.textContent = `Ошибка: ${e.message}`;
  }
});

// Кнопка обновления плейлиста
document.getElementById("refresh-tracks").addEventListener("click", loadTracks);

// При первой загрузке ставим активную вкладку Home
setActiveTab("home");
