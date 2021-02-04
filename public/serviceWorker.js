const CACHE_NAME = "v0.2.0";
const staticAssets = [
  "/font/woff/Atkinson-Hyperlegible-Regular-102.woff",
  "/font/woff2/Atkinson-Hyperlegible-Regular-102a.woff2",
  "/font/woff/Atkinson-Hyperlegible-Italic-102.woff",
  "/font/woff2/Atkinson-Hyperlegible-Italic-102a.woff2",
  "/font/woff/Atkinson-Hyperlegible-Bold-102.woff",
  "/font/woff2/Atkinson-Hyperlegible-Bold-102a.woff2",
  "/logo.png",
  "/logo.svg",
  "/design.svg",
  "/development.svg",
  "/improvisation.svg",
  "/JAMStack.svg",
  "/MERNStack.svg",
  "/OpenSource.svg",
  "/research.svg",
  "/testing.svg",
  "/toggle.svg",
];

self.addEventListener("install", (event) => {
  console.log("installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(staticAssets))
  );
  self.skipWaiting(); // makes the new service-worker take effect immediately
});

self.addEventListener("activate", (event) => {
  console.log("is activated");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return null;
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const { host, href, pathname } = new URL(request.url);

  return event.respondWith(
    caches
      .match(request)
      .then((response) => {
        if (response) {
          console.log("returning from cache ", pathname);
          return response;
        }
        if (pathname === "/api/projects") {
          console.log("about to fetch and cache");
          return caches
            .open(CACHE_NAME)
            .then((cache) =>
              fetch(request)
                .then((res) => {
                  console.log("fetching and caching " + href);
                  cache.put(request, res.clone());
                  return res;
                })
                .catch((err) => console.log(err))
            )
            .catch((err) => console.log(err));
        }

        console.log("actually fetching... " + href);
        return fetch(request);
      })
      .catch((err) => console.log(err))
  );
});
