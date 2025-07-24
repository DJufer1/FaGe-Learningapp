// sw.js - Service Worker für das gesamte App-Portal

const CACHE_NAME = 'fage-portal-v1'; // Neuer Name und Version 1 für das Portal

// Die komplette "Einkaufsliste" für die Offline-Funktionalität
const urlsToCache = [
  // Haupt-Portal
  './',
  './index.html',
  './main.css',
  './main.js',
  './manifest.json',

  // Unter-App: Rechentrainer
  './rechentrainer/rechentrainer.html',
  './rechentrainer/rechentrainer.css',
  './rechentrainer/rechentrainer.js',
  // Die externen p5.js-Skripte müssen wir hier NICHT mehr cachen,
  // da sie vom Rechentrainer-Modul selbst nicht mehr geladen werden.
  // Wir müssten sie bei Bedarf in main.js laden.

  // Unter-App: BKU Imposter
  './bku-imposter/imposter.html',
  './bku-imposter/imposter.css',
  './bku-imposter/imposter.js',

  // Geteilte Assets
  './assets/icon-192.png',
  './assets/icon-512.png'
];

// 1. Installation: Dateien im Cache speichern
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cache geöffnet, speichere Portal-Dateien...');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: Fehler beim Cachen der Dateien.', error);
      })
  );
  self.skipWaiting();
});

// 2. Aktivierung: Alte Caches von früheren Versionen löschen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Lösche alten Cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. Fetch: Anfragen abfangen und aus dem Cache bedienen (Offline-First-Strategie)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Wenn die Anfrage im Cache gefunden wird, diese zurückgeben.
        // Ansonsten die Anfrage an das Netzwerk weiterleiten.
        return response || fetch(event.request);
      })
  );
});
