import firebase from 'firebase'

var dev = {
	apiKey: "***REMOVED***",
	authDomain: "***REMOVED***",
	databaseURL: "***REMOVED***",
	projectId: "***REMOVED***",
	storageBucket: "***REMOVED***.appspot.com",
	messagingSenderId: "***REMOVED***"
};

var prod = {
	apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  databaseURL: "***REMOVED***",
  projectId: "***REMOVED***",
  storageBucket: "***REMOVED***.appspot.com",
  messagingSenderId: "***REMOVED***"
};

const config = process.env.REACT_APP_NODE_ENV === 'production' ? prod : dev;


firebase.initializeApp(config);

export const firebaseDB = firebase.database();
export const firebaseAuth = firebase.auth();
export const firebaseMessaging = firebase.messaging();
export const storage = firebase.storage();