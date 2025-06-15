const BASE_API = "https://loop-backend-b9ct.onrender.com/"; // заменишь если нужно

const form = document.getElementById("uploadForm");
const tokenInput = document.getElementById("tokenInput");
const statusDiv = document.getElementById("status");

// пример: вставка Telegram токена из localStorage
tokenInput.value = localStorage.getItem("telegram_token") || "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(`${BASE_API}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Ошибка загрузки");
    }

    const result = await response.json();
    statusDiv.innerText = "✅ Успешно загружено!";
    console.log("Результат загрузки:", result);
  } catch (err) {
    console.error(err);
    statusDiv.innerText = "❌ Ошибка: " + err.message;
  }
});
