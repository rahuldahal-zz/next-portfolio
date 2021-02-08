const CACHE_VERSION = "v0.3.0";
const staticAssets = [
  "/font/woff/Atkinson-Hyperlegible-Regular-102.woff",
  "/font/woff2/Atkinson-Hyperlegible-Regular-102a.woff2",
  "/font/woff/Atkinson-Hyperlegible-Italic-102.woff",
  "/font/woff2/Atkinson-Hyperlegible-Italic-102a.woff2",
  "/font/woff/Atkinson-Hyperlegible-Bold-102.woff",
  "/font/woff2/Atkinson-Hyperlegible-Bold-102a.woff2",
  "/images/logo.png",
  "/images/thatsme.webp",
  "/images/thatsme.png",
  "/svgs/logo.svg",
  "/svgs/design.svg",
  "/svgs/development.svg",
  "/svgs/improvisation.svg",
  "/svgs/JAMStack.svg",
  "/svgs/MERNStack.svg",
  "/svgs/OpenSource.svg",
  "/svgs/research.svg",
  "/svgs/testing.svg",
  "/svgs/toggle.svg",
];

self.addEventListener("install", (event) => {
  console.log("installed");
  event.waitUntil(
    caches
      .open(`static-${CACHE_VERSION}`)
      .then((cache) => cache.addAll(staticAssets))
  );
  self.skipWaiting(); // makes the new service-worker take effect immediately
});

self.addEventListener("activate", (event) => {
  const cacheNames = [`static-${CACHE_VERSION}`, `data-${CACHE_VERSION}`];
  console.log("is activated");
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((cacheName) => {
          if (!cacheNames.includes(cacheName)) {
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
        if (pathname === "/api/projects" || host === "res.cloudinary.com") {
          console.log("about to fetch and cache");
          return caches
            .open(`data-${CACHE_VERSION}`)
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
