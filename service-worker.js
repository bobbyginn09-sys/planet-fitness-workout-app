const APP_VERSION = '3.4.1';
const CACHE_PREFIX = 'nexset-workout-';
const CACHE_NAME = `${CACHE_PREFIX}v3-4-1-premium-20260716-1`;
const CORE_ASSETS = ['./','./index.html','./manifest.webmanifest','./manifest.json','./nexset-mark.svg','./nexset-lockup-v317.svg','./icon-192.png','./icon-512.png','./icon-1024.png'];
const OPTIONAL_ASSETS = ['./apple-touch-icon.png','./launch-1125x2436.png','./launch-1170x2532.png','./launch-1179x2556.png','./launch-1290x2796.png','./muscle-push-v341.png','./muscle-pull-v341.png','./muscle-legs-a-v341.png','./muscle-legs-b-v341.png','./muscle-upper-v341.png','./muscle-recovery-v341.png'];

self.addEventListener('install', event => {
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    await cache.addAll(CORE_ASSETS);
    await Promise.allSettled(OPTIONAL_ASSETS.map(asset=>cache.add(asset)));
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE_NAME).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => { if(event.data?.type==='SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('fetch', event => {
  const request=event.request;if(request.method!=='GET')return;const url=new URL(request.url);if(url.origin!==self.location.origin)return;
  if(request.mode==='navigate'){
    event.respondWith((async()=>{try{const response=await fetch(request);const cache=await caches.open(CACHE_NAME);cache.put('./index.html',response.clone());return response;}catch(_){return (await caches.match('./index.html'))||(await caches.match('./'));}})());return;
  }
  event.respondWith((async()=>{const cached=await caches.match(request);if(cached)return cached;try{const response=await fetch(request);if(response&&response.ok){const cache=await caches.open(CACHE_NAME);cache.put(request,response.clone());}return response;}catch(_){return cached||Response.error();}})());
});
