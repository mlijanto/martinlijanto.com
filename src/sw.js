importScripts('./workbox-sw.prod.v1.0.1.js');

const workboxSW = new WorkboxSW({clientsClaim: true});

workboxSW.precache([]);

workboxSW.router.registerRoute(
  'https://martinlijanto.com/(.*)',
  workboxSW.strategies.networkFirst({networkTimeoutSeconds: 3})
);

workboxSW.router.registerRoute(
  'https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'fontscache',
    cacheExpiration: {
      maxAgeSeconds: 7 * 24 * 60 * 60,
    },
    cacheableResponse: {statuses: [0, 200]},
  })
);