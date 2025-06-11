window.addEventListener('hashchange', renderPage);
window.addEventListener('load', renderPage);

async function renderPage() {
  const page = location.hash.slice(1) || 'home';
  const res = await fetch(`${page}.html`);
  const html = await res.text();
  document.getElementById('app').innerHTML = html;
}
