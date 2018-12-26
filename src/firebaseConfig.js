import firebase from 'firebase'

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
} 

firebase.initializeApp(config)

export const firebaseDB = firebase.database()
export const firebaseDB = firebase.database()
export const firebaseAuth = firebase.auth()
export const firebaseMessaging = firebase.messaging()
export const storage = firebase.storage()