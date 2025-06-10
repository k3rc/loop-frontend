const BASE_URL = "https://loop-backend-production-a1b3.up.railway.app/";

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("musicFile");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    alert("Uploaded: " + data.filename);
});
