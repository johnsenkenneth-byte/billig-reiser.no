const CACHE_VERSION = "billig-reiser-pwa-v184-kiwi-multicity-builder";
const APP_SHELL = [
  "/",
  "/index.html",
  "/reisehacks.html",
  "/hellas/",
  "/hellas/kreta/",
  "/hellas/rhodos/",
  "/hellas/kos/",
  "/hellas/santorini/",
  "/hellas/korfu/",
  "/hellas/zakynthos/",
  "/hellas/mykonos/",
  "/hellas/naxos/",
  "/hellas/paros/",
  "/hellas/athen/",
  "/offline.html",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/favicon.png",
  "/favicon-48x48.png",
  "/favicon-192x192.png",
  "/favicon-512x512.png",
  "/apple-touch-icon.png",
  "/go/hotels.html",
  "/style.css?v=184",
  "/app-features.css?v=159",
  "/affiliate-config.js?v=172",
  "/app.js?v=184",
  "/assets/app-icon-192.png",
  "/assets/app-icon-512.png",
  "/assets/front-hero-flight-map.png",
  "/assets/billig-reiser-logo-full-v116.png",
  "/assets/partner-cards/citybox-hotels-card-v178.jpg",
  "/assets/partner-cards/elite-hotels-card-v178.jpg",
  "/assets/partner-cards/ferryhopper-card-v178.jpg",
  "/assets/partner-cards/nazar-card-v178.jpg",
  "/assets/partner-cards/radisson-hotels-card-v178.jpg",
  "/assets/partner-cards/strawberry-card-v178.jpg",
  "/assets/video/front-hero-v116.mp4",
  "/spania/",
  "/spania/spania-city.css?v=129"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE_VERSION ? caches.delete(key) : null)))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match(request).then(cached => cached || caches.match("/offline.html")))
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(response => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
        }
        return response;
      }))
    );
  }
});
