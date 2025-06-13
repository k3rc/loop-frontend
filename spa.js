const BACKEND = 'https://YOUR-RAILWAY-URL';  // замените

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

async function router(){
  const page = location.hash.slice(1) || 'home';
  const html = await fetch(`${page}.html`).then(r=>r.text());
  document.getElementById('app').innerHTML = html;
  if(page==='playlist') loadPlaylist();
  if(page==='upload')   initUpload();
}

async function loadPlaylist(){
  const token = localStorage.getItem('token');
  const res = await fetch(`${BACKEND}/tracks`,{headers:{Authorization:`Bearer ${token}`}});
  const tracks = await res.json();
  const ul = document.getElementById('playlist');
  ul.innerHTML='';
  tracks.forEach(t=>{
    const li=document.createElement('li');
    li.textContent=`${t.title} — ${t.artist}`;
    ul.appendChild(li);
  });
}

function initUpload(){
  document.getElementById('uploadForm').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const form=new FormData(e.target);
    const token=localStorage.getItem('token');
    const res=await fetch(`${BACKEND}/upload`,{
      method:'POST',
      headers:{Authorization:`Bearer ${token}`},
      body:form
    });
    document.getElementById('status').textContent=(await res.json()).message||'Uploaded';
  });
}
