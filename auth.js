// Telegram WebApp авторизация (встраивается в Telegram)
function authenticate(uid) {
  const token = jwtSign({ sub: uid }, "loopsecret123"); // тот же секрет, что на Railway
  localStorage.setItem("token", token);
  location.hash = "#home";
}

// Простая JWT-функция (временно, можно заменить на бэкенд)
function jwtSign(payload, secret) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  const signature = btoa(secret); // Упрощённо
  return [header, body, signature].join(".");
}
