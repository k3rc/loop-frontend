// Пример: если Telegram WebApp передаёт UID в URL, мы его вставляем
const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token) {
  document.getElementById("tokenInput").value = token;
  localStorage.setItem("telegram_token", token);
} else {
  const saved = localStorage.getItem("telegram_token");
  if (saved) document.getElementById("tokenInput").value = saved;
}

// Навигация по вкладкам
function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "playlist") loadPlaylist();
}

// Загрузка плейлиста (можно доработать)
async function loadPlaylist() {
  const token = document.getElementById("tokenInput").value;
  const list = document.getElementById("trackList");
  list.innerHTML = "⏳ Загрузка...";

  try {
    const res = await fetch(`${BASE_API}/tracks/${token}`);
    const tracks = await res.json();

    list.innerHTML = tracks.length
      ? tracks.map(t => `
        <div>
          <strong>${t.title}</strong> — ${t.artist}<br/>
          <audio controls src="${BASE_API}/${t.file}"></audio>
        </div>
      `).join("")
      : "Нет загруженных треков.";
  } catch (err) {
    list.innerHTML = "Ошибка загрузки плейлиста.";
  }
}
