const CACHE_NAME = 'doublediamond-test-deploy-20260615';

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll([
    './','./index.html','./style.css','./script.js','./js/dd-runtime-test.js','./js/dd-config.js','./js/dd-storage.js','./js/dd-data-contract.js','./js/dd-backend.js','./js/dd-supabase-auth.js','./js/dd-api.js','./js/dd-data.js','./js/dd-core.js','./js/dd-auth.js','./js/dd-alerts.js','./js/dd-text.js','./js/dd-images.js','./js/dd-role-ui.js','./js/dd-postprocess.js','./js/ui/dd-encoding-cleanup.js','./js/ui/dd-product-ux.js','./js/screens/dd-client-home.js','./js/screens/dd-report-center.js','./js/dd-shell.js','./manifest.json'
  ])));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.mode === 'navigate' || req.destination === 'document' || req.destination === 'script' || req.destination === 'style') {
    event.respondWith(fetch(req).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
      return response;
    }).catch(() => caches.match(req)));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
});
