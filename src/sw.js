importScripts('https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/7.4.0/workbox-sw.js');

workbox.setConfig({ debug: false, logLevel: 'warn' });
workbox.routing.registerRoute(({request}) => {
  if (/^https?:\/\/([a-z]+-)?raw\.githubusercontent\.com/.test(request.url)) return true;
  return false;
}, new workbox.strategies.CacheFirst({
  cacheName: 'monsterdex:githubressources',
  plugins: [
    new workbox.cacheableResponse.CacheableResponsePlugin({
      statuses: [200]
    }),
    new workbox.expiration.ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
  fetchOptions: {
    mode: 'cors',
    credentials: 'omit',
  }
}));
