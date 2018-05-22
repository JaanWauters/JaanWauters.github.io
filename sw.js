var CACHE_NAME = 'battle_sim_v1';
var itemsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/style.css',
    '/icons/ShinyCaterpie.jpg',
    '/js/effect.js',
    '/js/environment.js',
    '/js/game.js',
    '/js/gamelogic.js',
    '/js/moves.js',
    '/js/pokemon.js',
    '/js/selectPokemon.js',
    '/js/setupBattleScreen.js',
    '/js/storage.js',
    '/js/typing.js',
    '/js/weather.js',
    '/pages/battle.html',
    '/pages/selectPokemon.html',
    '/sprites/charizard.gif',
    '/sprites/charizard-back.gif',
    '/sprites/gardevoir.gif',
    '/sprites/gardevoir-back.gif',
    '/sprites/gengar.gif',
    '/sprites/gengar-back.gif',
    '/sprites/greninja.gif',
    '/sprites/greninja-back.gif'

];

if('serviceworker' in navigator){
    navigator.serviceWorker.register("sw.js", {scope: '/'})
    .then(function (reg) {
        console.log("Registration succes! Scope: " + reg.scope);
    }).catch(function (error) {
        console.log("Registration failed :(", error);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(itemsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if(response){
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', function (event) {
    var cacheWhiteList = ['v1'];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});