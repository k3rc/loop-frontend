document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = e.target.querySelector('input').value;
  localStorage.setItem('user', username);
  window.location.href = "home.html";
});
