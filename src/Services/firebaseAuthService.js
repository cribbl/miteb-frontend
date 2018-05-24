import {firebaseAuth, firebaseMessaging} from '../firebaseConfig'
import {getUserDetails, updateToken} from './firebaseDBService'
import {getNotificationRequestPermission} from './NotificationService'

export const authenticateUser = (email, password, callback) => {
    
    firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(function(user) {
      callback(null, user)
    })
    .catch(function(error) {
        callback(error)
  });
}

export const signOut = () => {
  
  updateToken(sessionStorage.getItem('uid'), sessionStorage.getItem('fcmToken'), false)
  firebaseAuth.signOut()
  .then(function() {
  })
  .catch(function(error) {
    
  }); 
}

export const fetchUser = (callback) => {
  firebaseAuth.onAuthStateChanged(function(user) {
    if (user) {
        sessionStorage.setItem('uid', user.uid)
        getUserDetails(user.uid, (userx) => {
        userx['uid'] = user.uid;
        callback(userx);
        getNotificationRequestPermission(user.uid); // request permission for notifications
      })
    } 
    else {
      callback(null)
      // console.log('user dne')
    }
  });
}