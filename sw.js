const C='sylver-v4';
const SHELL=['./','index.html','config.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
const FONT_HOSTS=['fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  // only cache the app itself and fonts; never cache API calls (Supabase etc.)
  if(u.origin!==location.origin&&!FONT_HOSTS.includes(u.host))return;
  e.respondWith(caches.match(r).then(m=>{
    const n=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>m||caches.match('index.html'));
    return m||n}))});
