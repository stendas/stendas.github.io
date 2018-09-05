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

//This is the "Offline copy of pages" service worker

//Install stage sets up the index page (home page) in the cache and opens a new cache
// self.addEventListener('install', function(event) {
//     var indexPage = new Request('index.html');
//     event.waitUntil(
//         fetch(indexPage).then(function(response) {
//             return caches.open('pwabuilder-offline').then(function(cache) {
//                 console.log('[PWA Builder] Cached index page during Install'+ response.url);
//                 return cache.put(indexPage, response);
//             });
//         }));
// });
//
// //If any fetch fails, it will look for the request in the cache and serve it from there first
// self.addEventListener('fetch', function(event) {
//     var updateCache = function(request){
//         return caches.open('pwabuilder-offline').then(function (cache) {
//             return fetch(request).then(function (response) {
//                 console.log('[PWA Builder] add page to offline'+response.url)
//                 return cache.put(request, response);
//             });
//         });
//     };
//
//     event.waitUntil(updateCache(event.request));
//
//     event.respondWith(
//         fetch(event.request).catch(function(error) {
//             console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );
//
//             //Check to see if you have it in the cache
//             //Return response
//             //If not in the cache, then return error page
//             return caches.open('pwabuilder-offline').then(function (cache) {
//                 return cache.match(event.request).then(function (matching) {
//                     var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
//                     return report
//                 });
//             });
//         })
//     );
// })





//This is the "Offline copy of pages" service worker

//Install stage sets up the index page (home page) in the cache and opens a new cache
// self.addEventListener('install', function(event) {
//     var indexPage = new Request('index.html');
//     event.waitUntil(
//         fetch(indexPage).then(function(response) {
//             return caches.open('pwabuilder-offline').then(function(cache) {
//                 console.log('[PWA Builder] Cached index page during Install'+ response.url);
//                 return cache.put(indexPage, response);
//             });
//         }));
// });
//
// //If any fetch fails, it will look for the request in the cache and serve it from there first
// self.addEventListener('fetch', function(event) {
//     var updateCache = function(request){
//         return caches.open('pwabuilder-offline').then(function (cache) {
//             return fetch(request).then(function (response) {
//                 console.log('[PWA Builder] add page to offline'+response.url)
//                 return cache.put(request, response);
//             });
//         });
//     };
//
//     event.waitUntil(updateCache(event.request));
//
//     event.respondWith(
//         fetch(event.request).catch(function(error) {
//             console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );
//
//             //Check to see if you have it in the cache
//             //Return response
//             //If not in the cache, then return error page
//             return caches.open('pwabuilder-offline').then(function (cache) {
//                 return cache.match(event.request).then(function (matching) {
//                     var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
//                     return report
//                 });
//             });
//         })
//     );
// })
//


//This is the "Offline page" service worker

//Install stage sets up the offline page in the cahche and opens a new cache
self.addEventListener('install', function(event) {
    var offlinePage = new Request('offline.html');
    event.waitUntil(
        fetch(offlinePage).then(function(response) {
            return caches.open('pwabuilder-offline').then(function(cache) {
                console.log('[PWA Builder] Cached offline page during Install'+ response.url);
                return cache.put(offlinePage, response);
            });
        }));
});

//If any fetch fails, it will show the offline page.
//Maybe this should be limited to HTML documents?
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function(error) {
            console.error( '[PWA Builder] Network request Failed. Serving offline page ' + error );
            return caches.open('pwabuilder-offline').then(function(cache) {
                return cache.match('offline.html');
            });
        }));
});

//This is a event that can be fired from your page to tell the SW to update the offline page
self.addEventListener('refreshOffline', function(response) {
    return caches.open('pwabuilder-offline').then(function(cache) {
        console.log('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url);
        return cache.put(offlinePage, response);
    });
});
