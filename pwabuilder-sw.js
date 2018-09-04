//This is the "Offline page" service worker

//Install stage sets up the offline page in the cahche and opens a new cache







// self.addEventListener('install', function(event) {
//   var offlinePage = new Request('offline.html');
//   event.waitUntil(
//   fetch(offlinePage).then(function(response) {
//     return caches.open('pwabuilder-offline').then(function(cache) {
//       console.log('[PWA Builder] Cached offline page during Install'+ response.url);
//       return cache.put(offlinePage, response);
//     });
//   }));
// });


// self.addEventListener('install', function(event) {
//     event.waitUntil(
//         caches.open(cacheName).then(function(cache) {
//             return cache.addAll(
//                 [
//                     '/',
//                     '/css/',
//                     '/dist/',
//                     '/images/',
//                     '/js/',
//                     '/moment/',
//                     '/node_modules/',
//                     '/src',
//                     'index.html',
//                     'manifest.json',
//                     '/offline.html'
//                 ]
//             );
//         })
//     );
// });








//If any fetch fails, it will show the offline page.
//Maybe this should be limited to HTML documents?
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request).catch(function(error) {
//         console.error( '[PWA Builder] Network request Failed. Serving offline page ' + error );
//         return caches.open('pwabuilder-offline').then(function(cache) {
//           return cache.match('offline.html');
//       });
//     }));
// });

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.open('mysite-dynamic').then(function(cache) {
//             return cache.match(event.request).then(function (response) {
//                 return response || fetch(event.request).then(function(response) {
//                     cache.put(event.request, response.clone());
//                     return response;
//                 });
//             });
//         })
//     );
// });
//
//
//
// //This is a event that can be fired from your page to tell the SW to update the offline page
// self.addEventListener('refreshOffline', function(response) {
//   return caches.open('pwabuilder-offline').then(function(cache) {
//     console.log('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url);
//     return cache.put(offlinePage, response);
//   });
// });



//This is the service worker with the Cache-first network

var CACHE = 'pwabuilder-precache';
var precacheFiles = [
    '/',
                    '/css/',
                    '/dist/',
                    '/images/',
                    '/js/',
                    '/moment/',
                    '/node_modules/',
                    '/src',
                    'index.html',
                    'manifest.json',
                    '/offline.html'
    /* Add an array of files to precache for your app */
];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
    console.log('[PWA Builder] The service worker is being installed.');
    evt.waitUntil(precache().then(function() {
        console.log('[PWA Builder] Skip waiting on install');
        return self.skipWaiting();
    }));
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
    console.log('[PWA Builder] Claiming clients for current page');
    return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
    console.log('[PWA Builder] The service worker is serving the asset.'+ evt.request.url);
    evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
    evt.waitUntil(update(evt.request));
});


function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(precacheFiles);
    });
}

function fromCache(request) {
    //we pull files from the cache first thing so we can show them fast
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

function update(request) {
    //this is where we call the server to get the newest version of the
    //file to use the next time we show view
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}

function fromServer(request){
    //this is the fallback if it is not in the cache to go to the server and get it
    return fetch(request).then(function(response){ return response});
}







