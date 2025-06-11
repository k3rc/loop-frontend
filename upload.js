document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch('https://YOUR_BACKEND_URL/upload', {
    method: 'POST',
    body: formData
  });
  const msg = await res.text();
  document.getElementById('uploadStatus').innerText = msg;
});
