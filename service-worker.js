'use strict';

const APP_VERSION = '4.1.0';
const CACHE_PREFIX = 'nexset-workout-';
const CACHE_NAME = `${CACHE_PREFIX}v4-1-0-jacked-clean-20260831`;
const INDEX_CACHE_KEY = './index.html?nexset=4.1.0';
const APP_SHELL = [
  './',
  INDEX_CACHE_KEY,
  './manifest.webmanifest',
  './nexset-mark.svg',
  './nexset-lockup-v317.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './muscle-push-v400.webp',
  './muscle-pull-v400.webp',
  './muscle-legs-a-v400.webp',
  './muscle-legs-b-v400.webp',
  './muscle-upper-v400.webp',
  './muscle-recovery-v400.webp'
];

async function precacheFresh() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.allSettled(APP_SHELL.map(async asset => {
    const response = await fetch(asset, { cache: 'reload' });
    if (response && response.ok) await cache.put(asset, response.clone());
  }));
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    await precacheFresh();
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

async function networkFirstNavigation(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (response?.ok) {
      await cache.put(INDEX_CACHE_KEY, response.clone());
      return response;
    }
  } catch (_) {}
  return (await cache.match(INDEX_CACHE_KEY))
    || (await cache.match('./'))
    || new Response('NEXSET is offline and has not finished caching yet.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
}

async function cacheFirstAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;
  try {
    const response = await fetch(request, { cache: 'no-cache' });
    if (response?.ok) await cache.put(request, response.clone());
    return response;
  } catch (_) {
    return Response.error();
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }
  event.respondWith(cacheFirstAsset(request));
});
