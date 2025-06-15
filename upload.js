document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");
  const tokenInput = document.getElementById("tokenInput");
  const statusDiv = document.getElementById("uploadStatus");

  // Получаем токен из localStorage
  const token = localStorage.getItem("7812495971:AAFNTowxTUrHda4Nsih8DzIzEQjVS8sWxIk") || "";

  if (!token) {
    statusDiv.textContent = "Ошибка: токен не найден. Пожалуйста, авторизуйтесь.";
    return;
  }

  // Вставляем токен в скрытое поле формы
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
        // Попытка прочитать тело ошибки
        let errorMsg = response.statusText;
        try {
          const errData = await response.json();
          if (errData.detail) errorMsg = errData.detail;
        } catch {}

        statusDiv.textContent = `Ошибка: ${errorMsg}`;
        return;
      }

      const data = await response.json();
      statusDiv.textContent = "Трек успешно загружен! 🎉";
      form.reset();
    } catch (error) {
      status
