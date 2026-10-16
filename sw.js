/* GP Annual Action Plan – service worker (auto-generated). Cache version: 6582d0a101 */
const CACHE = 'gp-plan-6582d0a101';
const PRECACHE = [
  "./",
  "./fonts/fonts.css",
  "./fonts/inter-latin-400-normal.woff2",
  "./fonts/inter-latin-500-normal.woff2",
  "./fonts/inter-latin-600-normal.woff2",
  "./fonts/inter-latin-700-normal.woff2",
  "./fonts/inter-latin-ext-400-normal.woff2",
  "./fonts/inter-latin-ext-500-normal.woff2",
  "./fonts/inter-latin-ext-600-normal.woff2",
  "./fonts/inter-latin-ext-700-normal.woff2",
  "./fonts/noto-sans-devanagari-devanagari-400-normal.woff2",
  "./fonts/noto-sans-devanagari-devanagari-500-normal.woff2",
  "./fonts/noto-sans-devanagari-devanagari-600-normal.woff2",
  "./fonts/noto-sans-devanagari-devanagari-700-normal.woff2",
  "./fonts/noto-sans-devanagari-latin-400-normal.woff2",
  "./fonts/noto-sans-devanagari-latin-500-normal.woff2",
  "./fonts/noto-sans-devanagari-latin-600-normal.woff2",
  "./fonts/noto-sans-devanagari-latin-700-normal.woff2",
  "./fonts/noto-sans-devanagari-latin-ext-400-normal.woff2",
  "./fonts/noto-sans-devanagari-latin-ext-500-normal.woff2",
  "./fonts/noto-sans-devanagari-latin-ext-600-normal.woff2",
  "./fonts/noto-sans-devanagari-latin-ext-700-normal.woff2",
  "./fonts/poppins-devanagari-600-normal.woff2",
  "./fonts/poppins-devanagari-700-normal.woff2",
  "./fonts/poppins-latin-600-normal.woff2",
  "./fonts/poppins-latin-700-normal.woff2",
  "./fonts/poppins-latin-ext-600-normal.woff2",
  "./fonts/poppins-latin-ext-700-normal.woff2",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./index.html",
  "./manifest.json",
  "./vendor/chart.umd.js",
  "./vendor/xlsx.full.min.js"
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('gp-plan-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Page loads: serve the cached app shell instantly (works offline), refresh it in the background.
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((cached) => {
        const refresh = fetch(req).then((res) => {
          if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('./index.html', copy)); }
          return res;
        }).catch(() => cached);
        return cached || refresh;
      })
    );
    return;
  }

  // Static assets: cache first, then network (and remember it).
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }))
  );
});
