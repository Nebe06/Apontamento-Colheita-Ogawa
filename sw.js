const CACHE_NAME = 'coleta-campo-v1';
const ASSETS = [
  './',
  './index.html'
];

// Instalação do Service Worker e armazenamento do HTML no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Interceptador de requisições: se offline, serve o arquivo do cache local
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
