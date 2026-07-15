const CACHE_NAME = 'nexset-workout-v3-1-7-tight-logo-20260715-1';
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
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (!response || !response.ok || response.type === 'opaque') return response;
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }))
  );
});
