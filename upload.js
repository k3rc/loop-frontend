const BASE_API = "https://loop-backend-b9ct.onrender.com/"; // или твой Render-URL

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const statusDiv = document.getElementById("uploadStatus");
  statusDiv.innerText = "⏳ Загрузка...";

  try {
    const res = await fetch(`${BASE_API}/upload`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Ошибка загрузки");
    }

    const result = await res.json();
    statusDiv.innerText = "✅ Загружено!";
    console.log("Загружено:", result);
    form.reset();
  } catch (err) {
    console.error(err);
    statusDiv.innerText = "❌ Ошибка: " + err.message;
  }
});
