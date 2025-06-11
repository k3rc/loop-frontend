const BASE_URL = "https://loop-backend-production-a1b3.up.railway.app"; // Замени на Railway URL

async function uploadTrack(file) {
    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
    });
    const data = await res.json();
    alert(data.message || data.detail);
}

async function getTracks() {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${BASE_URL}/tracks`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
    });
    const tracks = await res.json();
    const trackList = document.getElementById("track-list");
    trackList.innerHTML = "";
    tracks.forEach(track => {
        const li = document.createElement("li");
        li.textContent = track.filename;
        trackList.appendChild(li);
    });
}
