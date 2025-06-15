const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Ошибка загрузки файла");
  }

  const data = await response.json();
  return data;
}

// Экспорт функции, если нужно
export { uploadFile };
