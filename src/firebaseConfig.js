import firebase from 'firebase'

var config = {
    apiKey: "***REMOVED***",
    authDomain: "***REMOVED***",
    databaseURL: "***REMOVED***",
    projectId: "***REMOVED***",
    storageBucket: "***REMOVED***.appspot.com",
    messagingSenderId: "***REMOVED***"
  };

firebase.initializeApp(config);

export const firebaseDB = firebase.database();
export const firebaseAuth = firebase.auth();
export const firebaseMessaging = firebase.messaging();
export const storage = firebase.storage();

// firebaseAuth.onAuthStateChanged(function(user) {
//     ;
//     if (user) {
//       return function(dispatch) {
//         dispatch(login(user))
//         console.log('user exists')
//       } 
//       function login(user) { return {type: "SUCCESS_LOGIN", user}}
//     } 
//     else {
//       console.log('user dne')
//       return
//     }
//   });