/* eslint-disable array-callback-return */
const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      // return promise
      .then((cache) => {
        console.log("Opened cache");
        // add all urls to cache
        return cache.addAll(urlsToCache);
      })
  );
});

// listen for request
self.addEventListener("fetch", (event) => {
  // match all the request that pages is receiving then for all the request, fetch them again.
  // if unable to fetch, there is no internet thus show a offline page
  event.respondWith(
    caches.match(event.request)
        .then(() => {
            return fetch(event.request) 
                .catch(() => caches.match('offline.html'))
        })
)
});

// activate service worker
self.addEventListener("activate", (event) => {
  // alot of cache version. keep latest and delete the rest
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
            if(!cacheWhitelist.includes(cacheName)) {
                return caches.delete(cacheName);
            }
        })
    ))
        
)
});
