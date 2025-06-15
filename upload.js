const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  form.append("token", localStorage.getItem("token"));
  const res = await fetch("https://loop-backend-production.up.railway.app/upload", {
    method: "POST",
    body: form,
  });
  const result = await res.json();
  document.getElementById("uploadResult").innerText = "Uploaded: " + result.title;
});
