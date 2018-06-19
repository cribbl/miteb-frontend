importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '330445707440'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here

  var notificationOptions = payload;
  var notificationOptions = {
    title: payload.notification.title,
    body:  payload.notification.body,
    icon:  payload.notification.icon,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  notificationOptions['vibrate'] = [100, 50, 100];
  notificationOptions['actions'] = [
          {action: 'open', title: 'Open in App',
            icon: 'https://png.icons8.com/metro/1600/checkmark.png'},
          {action: 'close', title: 'Close notification',
            icon: 'http://wiki.augmensys.com/images/1/12/IC_Cross_Mark.png'},
        ]

  return self.registration.showNotification(payload.notification.title, notificationOptions);
});

var cacheName = 'v1';
var cacheFiles = [
    './',
    './index.html',
    './offline.html',
    './favicon.ico',
    'static/js/bundle.js'
]

// fetch('./asset-manifest.json')
// .then(function(res) {
//   for(let i in res)
//     cacheFiles.push(res[i]);
// })

console.log(cacheFiles);

self.addEventListener('install', function(event) {
  
  console.log("[ServiceWorker] Installed");
  event.waitUntil(
    caches.open(cacheName).then(function(cache){
      console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
          })
    )
});

self.addEventListener('activate', function(event) {
  // event.waitUntil(
  //  caches.keys().then(function(cacheName ))
  //  )
  
  console.log("[ServiceWorker] Activated");
});

self.addEventListener('fetch', function(event) {
  console.log("[ServiceWorker] Fetching", event.request.url);
  /** An empty fetch handler! */
   event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    )
});



self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if(action === 'close') {
    notification.close();
  }
  if(action === 'open') {
    clients.openWindow('https://bookings.cribblservices.com/#/dashboard/myEvents')
    notification.close();
  }
  else {
    clients.openWindow('https://bookings.cribblservices.com');
    notification.close();
  }
});