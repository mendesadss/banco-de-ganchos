/* Service worker do Banco de Conteúdo.
   Estratégia: network-first pro dados.json (pra pegar atualização assim que o Claude sobe),
   cache-first pro resto (shell da página). */
const CACHE = 'banco-gb-v2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-maskable.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  // dados.json: tenta rede primeiro, cai pro cache se estiver offline
  if (url.pathname.endsWith('dados.json')) {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const copia = r.clone();
          caches.open(CACHE).then(c => c.put('./dados.json', copia));
          return r;
        })
        .catch(() => caches.match('./dados.json'))
    );
    return;
  }

  // resto: cache primeiro
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copia));
      return r;
    }))
  );
});
