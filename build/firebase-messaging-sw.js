importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '330445707440'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationOptions = {
    title: payload.notification.title,
    body:  payload.notification.body,
    icon:  payload.notification.icon
  };

  return self.registration.showNotification(payload.notification.title, notificationOptions);
});