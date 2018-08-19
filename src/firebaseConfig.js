import firebase from 'firebase'

var dev = {
	apiKey: "AIzaSyAhKIXmaPGeHw_7hX9qfjGecaLCGsLDn4g",
	authDomain: "mit-clubs-management.firebaseapp.com",
	databaseURL: "https://mit-clubs-management.firebaseio.com",
	projectId: "mit-clubs-management",
	storageBucket: "mit-clubs-management.appspot.com",
	messagingSenderId: "330445707440"
};

var prod = {
	apiKey: "AIzaSyDJJdMZ2_0tk4iPEvjEWxc30BgQhJ4kwXw",
  authDomain: "staging-mit-event-booking.firebaseapp.com",
  databaseURL: "https://staging-mit-event-booking.firebaseio.com",
  projectId: "staging-mit-event-booking",
  storageBucket: "staging-mit-event-booking.appspot.com",
  messagingSenderId: "215459692984"
};

const config = process.env.REACT_APP_NODE_ENV === 'production' ? prod : dev;


firebase.initializeApp(config);

export const firebaseDB = firebase.database();
export const firebaseAuth = firebase.auth();
export const firebaseMessaging = firebase.messaging();
export const storage = firebase.storage();