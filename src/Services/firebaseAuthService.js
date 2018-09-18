import { firebaseAuth, firebaseDB } from '../firebaseConfig'
import { getUserDetails, updateToken } from './firebaseDBService'
import { getNotificationRequestPermission } from './NotificationService'
import axios from 'axios'

let baseUrl
if (window.location.host.indexOf('prod') > -1) {
  baseUrl = 'https://app-miteventbooking.herokuapp.com'
} else {
  baseUrl = 'https://dev-miteventbooking.herokuapp.com'
}

export const createClubWithEmailAndPassword = (newUser, callback) => {
  axios.post(baseUrl + '/user/signup-club', newUser)
    .then(function (res) {
      if (res.data.state === 'fail') { callback(res.data.err) } else {
        callback(null, res.data.newUser)
      }
    })
    .catch(function (err) {
      callback(err)
    })
}

export const createFAWithEmailAndPassword = (newUser, callback) => {
  axios.post(baseUrl + '/user/signup-fa', newUser)
    .then(function (res) {
      if (res.data.state === 'fail') { callback(res.data.err) } else { callback(null, res.data.newUser) }
    })
    .catch(function (err) {
      callback(err)
    })
}

export const authenticateUser = (email, password, callback) => {
  firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(function (user) {
      if (!user.emailVerified) {
        let error = {
          code: 'unapproved',
          message: 'Check your email for a Verification Link'
        }
        console.log('SEND EMAIL ON SIGNIN')
        user.sendEmailVerification()
        callback(error)
        return
      }

      if (user.emailVerified) {
        firebaseDB.ref('/users/' + user.uid + '/emailVerification').set(true)
      }
      callback(null, user)
    })
    .catch(function (error) {
      callback(error)
    })
}

export const signOut = () => {
  if (sessionStorage.getItem('fcmToken') != null && sessionStorage.getItem('uid') != null) { updateToken(sessionStorage.getItem('uid'), sessionStorage.getItem('fcmToken'), false) } // eslint-disable-line
  firebaseAuth.signOut()
    .then(function () {
    })
    .catch(function (error) {
      console.log(error)
    })
}

export const fetchUser = (callback) => {
  firebaseAuth.onAuthStateChanged(function (user) {
    if (user) {
      if (!user.emailVerified) {
        callback(null)
        return
      }
      if (user.emailVerified) {
        firebaseDB.ref('/users/' + user.uid + '/emailVerification').set(true)
      }
      sessionStorage.setItem('uid', user.uid) // eslint-disable-line
      getUserDetails(user.uid, (userx) => {
        if (!userx.isApproved) {
          callback(null)
          return
        }
        userx['uid'] = user.uid
        callback(userx)
        getNotificationRequestPermission(user.uid) // request permission for notifications
      })
    } else {
      callback(null)
      // console.log('user dne')
    }
  })
}

export const sendPasswordResetEmail = (email, callback) => {
  firebaseAuth.sendPasswordResetEmail(email)
    .then(function () {
      callback(null)
    }).catch(function (err) {
      callback(err)
    })
}
