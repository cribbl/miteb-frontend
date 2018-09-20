import { authenticateUser, signOut, fetchUser } from '../Services/firebaseAuthService'
import { getMyEvents, getUserDetails } from '../Services/firebaseDBService'
import { hashHistory } from 'react-router'

export const userActions = {
  login,
  logout,
  errorNuller,
  getUser
}

function login (email, password) {
  return dispatch => {
    dispatch(request())

    authenticateUser(email, password, (error, result) => {
      if (error) {
        dispatch(failure(error))
      } else {
        getUserDetails(result.uid, (user) => {
          if (!user.isApproved) {
            let error = {
              code: 'unapproved',
              message: 'Your account is not approved'
            }
            dispatch(failure(error))
            signOut()
            return
          }
          localStorage.setItem('clubID', user.uid)
          dispatch(success(user))

          hashHistory.push('/dashboard')
          console.log('USER')
          console.log(user)
        })
      }
    })
  }

  function request () { return { type: 'REQUEST_LOGIN' } }
  function failure (error, username, password) { return { type: 'FAILURE_LOGIN', error, username, password } }
  function success (result) { return { type: 'SUCCESS_LOGIN', result } }
}

function logout () {
  signOut()
  localStorage.clear()
  hashHistory.push('/auth')
  return { type: 'LOGOUT' }
}

function errorNuller () {
  return dispatch => {
    dispatch(nuller())
  }

  function nuller () { return { type: 'ERROR_NULLER' } }
}

function getUser () {
  var obj = {}
  var clubID = ''
  return dispatch => {
    fetchUser((userx, err) => {
      dispatch(sessionCheck(false))
      if (userx) {
        dispatch(successUser(userx))
        // user is not logged in
        console.log("User's session exists. Redirecting to /dashboard")
        clubID = userx.uid
        if (userx.isFA) { clubID = userx.clubID }
        localStorage.setItem('clubID', clubID)
        hashHistory.push('/dashboard')
        getMyEvents(clubID, (key, val) => {
          if (val == null) {
            dispatch(success('NO_EVENTS'))
            return
          }
          val['id'] = key
          obj[key] = val
          dispatch(success(obj))
        })
      } else {
        // user is not logged in
        console.log('User is not logged in')
        if (err) {
          // let error = {
          //   code: 'unapproved',
          //   message: 'Email not verified!'
          // }
          // dispatch(failure(error))
        }
        // hashHistory.push('/auth');
      }
    })
  }
  function successUser (result) { return { type: 'SUCCESS_LOGIN', result } }
  function success (result) { return { type: 'SUCCESS_FETCH', result } }
  // function failure (error) { return { type: 'FAILURE_LOGIN', error } }
  function sessionCheck (result) { return { type: 'SESSION_CHECK', result } }
}
