const APP_VERSION = '3.2.0';
const CACHE_NAME = 'nexset-workout-v3-2-0-release-hardening-20260715-1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './manifest.json',
  './nexset-mark.svg',
  './nexset-wordmark.svg',
  './nexset-icon.svg',
  './nexset-strength-figure.svg',
  './nexset-lockup-v317.svg',
  './muscle-push-v316.png',
  './muscle-pull-v316.png',
  './muscle-upper-v316.png',
  './muscle-legs-a-v316.png',
  './muscle-legs-b-v316.png',
  './muscle-recovery-v316.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-1024.png',
  './launch-1125x2436.png',
  './launch-1170x2532.png',
  './launch-1179x2556.png',
  './launch-1290x2796.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener('message', event => {
  if(event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({type:'window',includeUncontrolled:true});
    clients.forEach(client => client.postMessage({type:'NEXSET_ACTIVATED',version:APP_VERSION}));
  })());
});

self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;

  if(event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request);
        if(response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put('./index.html', response.clone());
        }
        return response;
      } catch (_) {
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if(cached) return cached;
    try {
      const response = await fetch(event.request);
      if(response && response.ok && response.type !== 'opaque') {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone());
      }
      return response;
    } catch (_) {
      return cached || Response.error();
    }
  })());
});
