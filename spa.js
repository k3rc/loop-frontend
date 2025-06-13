const BACKEND = "https://your-railway-url.up.railway.app"; // ← замените

function navigate(path) {
  history.pushState({}, "", path);
  route();
}

async function route() {
  const path = location.hash || "#home";
  let page = "home";

  if (path.includes("upload")) page = "upload";
  if (path.includes("playlist")) page = "playlist";

  const html = await fetch(`${page}.html`).then(res => res.text());
  document.getElementById("app").innerHTML = html;

  if (page === "upload") import("./upload.js").then(m => m.initUpload(BACKEND));
  if (page === "playlist") loadPlaylist();
}

async function loadPlaylist() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND}/tracks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const tracks = await res.json();
  const container = document.getElementById("playlist");
  container.innerHTML = tracks.map(t => `
    <div class="track">
      <img src="${BACKEND}${t.cover}" alt="cover" />
      <div>
        <h3>${t.title}</h3>
        <p>${t.artist} — ${t.album} [${t.genre}]</p>
        <audio controls src="${BACKEND}${t.file}"></audio>
      </div>
    </div>
  `).join("");
}

window.addEventListener("popstate", route);
window.addEventListener("DOMContentLoaded", route);
