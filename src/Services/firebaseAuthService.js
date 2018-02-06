import {firebaseAuth} from '../firebaseConfig'
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
      callback(user)
      console.log('user exists')
    } 
    else {
      callback(null)
      console.log('user dne')
    }
  });
}