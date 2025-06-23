function navigate(tab) {
  document.querySelectorAll(".tab").forEach(el => el.style.display = "none");
  document.getElementById(`tab-${tab}`).style.display = "block";
  window.history.pushState({}, "", `#${tab}`);
}

window.addEventListener("DOMContentLoaded", () => {
  const tab = location.hash.replace("#", "") || "home";
  navigate(tab);
});
