document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch('https://loop-backend-production-a1b3.up.railway.app', {
    method: 'POST',
    body: formData
  });
  const msg = await res.text();
  document.getElementById('uploadStatus').innerText = msg;
});
