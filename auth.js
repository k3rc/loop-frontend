const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

async function login(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Ошибка авторизации");
  }

  const data = await response.json();
  return data;
}

export { login };
