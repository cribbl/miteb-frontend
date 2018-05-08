import {firebaseAuth, firebaseMessaging} from '../firebaseConfig'
import {getUserDetails, updateToken} from './firebaseDBService'

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
  
  firebaseAuth.signOut()
  .then(function() {
  })
  .catch(function(error) {
    
  }); 
}

export const fetchUser = (callback) => {
  firebaseAuth.onAuthStateChanged(function(user) {
    if (user) {
        getUserDetails(user.uid, (userx) => {
        userx['uid'] = user.uid
        callback(userx)
        messaging(user.uid); // request permission for notifications
      })
    } 
    else {
      callback(null)
      // console.log('user dne')
    }
  });
}

const messaging = (uid) => {
  firebaseMessaging.requestPermission()
  .then(function(){
    console.log("perm granted");
    return firebaseMessaging.getToken();
  })
  .then(function(token) {
    const data = {[uid]:token}
    updateToken(data);
  })
  .catch(function() {
    console.log("permission denied for push notifications");
  })
}

const getNotificationPermissionState = () => {
  navigator.permissions.query({name:'notifications'})
  .then(function(permissionStatus) {
    console.log('notifications permission status is ', permissionStatus.state);
    
    permissionStatus.onchange = function() {
      console.log('notifications permission status has changed to ', this.state);
    };
    
  });
}