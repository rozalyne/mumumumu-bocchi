// Nama cache
const CACHE_NAME = "herta_cache";
// Daftar aset yang akan disimpan di cache
const urlsToCache = [
  "/",
  "/style.css",
  "bocchi-mumumu.gif",
  "bocchi-mumumu.gif",
  "/img/card.webp",
  "mumumu2.mp3.mp3",
  "mumumu.mp3.mp3",
  "mumumu.mp3.mp3",
];

// Install service worker
self.addEventListener("install", (event) => {
  // Membuka dan menyimpan aset ke cache
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Menggunakan cache saat fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Mengembalikan respons dari cache jika ada
        if (response) {
          return response;
        }

        // Jika tidak ada aset di cache, melakukan fetch ke server
        return fetch(event.request);
      })
  );
});

// Menghapus cache lama saat aktivasi service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});