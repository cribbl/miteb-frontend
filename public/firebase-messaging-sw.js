importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js') // eslint-disable-line
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js') // eslint-disable-line

firebase.initializeApp({ // eslint-disable-line
  'messagingSenderId': '330445707440'
})

const messaging = firebase.messaging() // eslint-disable-line

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here

  var notificationOptions = payload
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
  notificationOptions['vibrate'] = [100, 50, 100]
  notificationOptions['actions'] = [
    { action: 'open',
      title: 'Open in App',
      icon: 'https://png.icons8.com/metro/1600/checkmark.png' },
    { action: 'close',
      title: 'Close notification',
      icon: 'http://wiki.augmensys.com/images/1/12/IC_Cross_Mark.png' }
  ]

  return self.registration.showNotification(payload.notification.title, notificationOptions) // eslint-disable-line
})

self.addEventListener('notificationclick', function (e) { // eslint-disable-line
  var notification = e.notification
  var action = e.action

  if (action === 'close') {
    notification.close()
  }
  if (action === 'open') {
    clients.openWindow('https://bookings.cribblservices.com/#/dashboard/myEvents') // eslint-disable-line
    notification.close()
  } else {
    clients.openWindow('https://bookings.cribblservices.com') // eslint-disable-line
    notification.close()
  }
})
