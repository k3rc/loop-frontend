export function initUpload(BACKEND) {
  const form = document.getElementById("upload-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const token = localStorage.getItem("token");

    const res = await fetch(`${BACKEND}/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const data = await res.json();
    alert("Uploaded!");
    location.hash = "#playlist";
  });
}
