const userId = prompt("Enter your Telegram UID:");
const token = window.jwt = jwtSign(userId, "loopsecret123");
localStorage.setItem("token", token);

function jwtSign(sub, secret) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ sub }));
  const signature = btoa(secret); // not secure — only for demo
  return [header, payload, signature].join(".");
}