document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");
  const tokenInput = document.getElementById("tokenInput");
  const statusDiv = document.getElementById("uploadStatus");

  // Получаем токен из localStorage или другого источника
  const token = localStorage.getItem("telegram_token") || "";

  if (!token) {
    statusDiv.textContent = "Ошибка: токен не найден. Пожалуйста, авторизуйтесь.";
    return;
  }

  tokenInput.value = token;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusDiv.textContent = "Загрузка...";

    const formData = new FormData(form);

    try {
      const response = await fetch("https://loop-backend-b9ct.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        statusDiv.textContent = `Ошибка: ${errorData.detail || response.statusText}`;
        return;
      }

      const data = await response.json();
      statusDiv.textContent = "Трек успешно загружен! 🎉";
      form.reset();
    } catch (error) {
      statusDiv.textContent = "Ошибка сети или сервера. Попробуйте позже.";
      console.error(error);
    }
  });
});
