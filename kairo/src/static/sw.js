/* Kairo UI — offline shell cache (version injected at build: __KAIRO_CACHE_VERSION__) */
const CACHE = "kairo-shell-__KAIRO_CACHE_VERSION__";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      const urls = ["/", "/vendor/marked.min.js", "/vendor/purify.min.js"];
      await Promise.all(urls.map((u) => cache.add(u).catch(() => {})));
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  const shell =
    url.pathname === "/" ||
    url.pathname.startsWith("/vendor/") ||
    url.pathname === "/sw.js";
  if (!shell) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => hit || (url.pathname !== "/" ? caches.match("/") : undefined)),
      ),
  );
});
