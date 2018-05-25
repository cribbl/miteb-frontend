importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '***REMOVED***'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here

  var notificationOptions = payload;
  // var notificationOptions = {
  //   title: payload.notification.title,
  //   body:  payload.notification.body,
  //   icon:  payload.notification.icon,
  //   vibrate: [100, 50, 100],
  //   data: {
  //     dateOfArrival: Date.now(),
  //     primaryKey: 1
  //   }
  // };

  return self.registration.showNotification(payload.notification.title, notificationOptions);
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
