import {firebaseAuth} from '../firebaseConfig'
import {getUserDetails} from './firebaseDBService'

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
        // console.log('user exists')
        callback(userx)
      })
    } 
    else {
      callback(null)
      // console.log('user dne')
    }
  });
}