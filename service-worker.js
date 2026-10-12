"use strict";

const BASE_URL = new URL("./", self.location.href);
const CACHE_PREFIX = `encontre-figura:${BASE_URL.pathname}:`;
const CACHE_NAME = `${CACHE_PREFIX}v24`;
// Keep this list aligned with the concepts in FIGURES in script.js.
const CONCEPTS = [
  "menina", "menino", "casa", "bola", "arvore", "nuvem", "arco-iris", "lua", "sol", "carro",
  "maca", "uva", "melancia", "morango", "banana", "galinha", "pato", "gato", "jacare", "girafa",
  "elefante", "cachorro", "macaco", "prato", "colher", "coelho", "cavalo", "vaca", "passarinho", "peixe",
  "caneca", "livro", "leao", "olhos", "boca", "nariz", "pe", "mao", "pao", "tenis"
];
const PRECACHE_URLS = [
  "./", "index.html", "style.css?v=24", "script.js?v=24", "pwa.js?v=24", "manifest.webmanifest",
  "assets/fonts/baloo-2.ttf", "assets/fundo-aquarela.jpg",
  "assets/icons/icon-192.png", "assets/icons/icon-512.png",
  "assets/audio/brilho.mp3", "assets/audio/tente-novamente.mp3",
  ...CONCEPTS.map((concept) => `assets/figuras/${concept}.jpg`),
  ...CONCEPTS.map((concept) => `assets/audio/voz-elevenlabs/${concept}.mp3`)
].map((path) => new URL(path, BASE_URL).href);
const PRECACHE_SET = new Set(PRECACHE_URLS);

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      await cache.addAll(PRECACHE_URLS.map((url) => new Request(url, { cache: "reload" })));
    } catch (error) {
      await caches.delete(CACHE_NAME);
      throw error;
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "OFFLINE_STATUS" || !event.ports[0]) return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const keys = new Set((await cache.keys()).map((request) => request.url));
    event.ports[0].postMessage({ ready: PRECACHE_URLS.every((url) => keys.has(url)) });
  })());
});

async function rangeResponse(response, header) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match || (!match[1] && !match[2])) return response;
  const bytes = await response.arrayBuffer();
  const length = bytes.byteLength;
  let start = match[1] ? Number(match[1]) : Math.max(0, length - Number(match[2]));
  let end = match[1] && match[2] ? Math.min(Number(match[2]), length - 1) : length - 1;
  if (start >= length || end < start || (!match[1] && Number(match[2]) === 0)) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${length}` } });
  }
  const headers = new Headers(response.headers);
  headers.delete("Content-Encoding");
  headers.set("Content-Length", String(end - start + 1));
  headers.set("Content-Range", `bytes ${start}-${end}/${length}`);
  headers.set("Accept-Ranges", "bytes");
  return new Response(bytes.slice(start, end + 1), { status: 206, statusText: "Partial Content", headers });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== BASE_URL.origin) return;
  if (request.mode === "navigate" && (url.pathname === BASE_URL.pathname || url.pathname === new URL("index.html", BASE_URL).pathname)) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) return response;
      } catch {
        // The complete installed version remains available when the network is down.
      }
      return (await caches.match(new URL("index.html", BASE_URL).href)) || new Response("Abra o jogo com internet para preparar o uso offline.", { status: 503 });
    })());
    return;
  }
  if (!PRECACHE_SET.has(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(url.href);
    if (!cached) return fetch(request);
    const range = request.headers.get("Range");
    return range ? rangeResponse(cached, range) : cached;
  })());
});
