const CACHE_NAME = "divas-cache-v1";
const urlsToCache = [
  "/index.html", // se o arquivo principal for outro, ajuste aqui
  "/main.css",
  "/script.js",
  "/youtube.js",
  "/manifest.json",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css",
  "https://fonts.googleapis.com/css2?family=Mrs+Sheppards&display=swap",
  "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
];

// Durante a instalação, abrir cache e adicionar arquivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Durante a ativação, limpar caches antigos (versionamento)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Intercepta requisições e serve do cache ou da rede
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna do cache se disponível, senão busca da rede
      return response || fetch(event.request);
    })
  );
});
