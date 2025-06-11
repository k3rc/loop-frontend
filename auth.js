const BASE_URL = "https://loop-backend-production-a1b3.up.railway.app"; // Замени на Railway URL

async function register(email, password) {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message || data.detail);
}

async function login(email, password) {
    const res = await fetch(`${BASE_URL}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            username: email,
            password: password
        }),
    });
    const data = await res.json();
    if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        window.location.href = "home.html";
    } else {
        alert("Login failed: " + (data.detail || ""));
    }
}
