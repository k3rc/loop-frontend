const routes = {
  "#home": "home.html",
  "#playlist": "playlist.html",
  "#upload": "upload.html",
};
async function loadRoute() {
  const hash = window.location.hash || "#home";
  const page = await fetch(routes[hash]).then(r => r.text());
  document.getElementById("app").innerHTML = page;
}
window.addEventListener("hashchange", loadRoute);
window.addEventListener("DOMContentLoaded", loadRoute);