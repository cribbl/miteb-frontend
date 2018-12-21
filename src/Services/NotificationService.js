import axios from 'axios'
import { firebaseMessaging } from '../firebaseConfig'
import { store } from '../store'
import { toggleActions } from '../actions/toggleActions'
import { updateToken } from './firebaseDBService'

const baseUrl = process.env.REACT_APP_BACKEND_API

export const sendEmail = (senderName, senderEmail, to, defaultPurpose, subject = null, text = null, html = null) => {
  let params = {
    senderName: senderName,
    senderEmail: senderEmail,
    to: to,
    default_purpose: defaultPurpose,
    subject: subject,
    text: text,
    html: html
  }

  axios.post(baseUrl + '/notif/send-email', params)
    .then(function (resp) {
      console.log(resp)
    })
    .catch(function (err) {
      console.log(err)
    })
}

export const sendEmailTemplate = (authority = null, mode, message, clubName, clubEmail, bookerName, bookerEmail, eventName, receipt_url = null) => {
  let params = {
    authority: authority,
    mode: mode,
    message: message,
    club_name: clubName,
    club_email: clubEmail,
    booker_name: bookerName,
    booker_email: bookerEmail,
    event_name: eventName,
    receipt_url: receipt_url
  }

  axios.get(baseUrl + '/notif/send-email-template', { params })
    .then(function (resp) {
      console.log(resp)
    })
    .catch(function (err) {
      console.log(err)
    })
}

export const sendComplaintTemplate = (bookerEmail, bookerName, subject) => {
  let params = {
    booker_email: bookerEmail,
    booker_name: bookerName,
    subject: subject
  }

  axios.get(baseUrl + '/notif/send-complaint-email', { params })
    .then(function (resp) {
      console.log(resp)
    })
    .catch(function (err) {
      console.log(err)
    })
}

export const sendApproveClubTemplate = (clubEmail, clubName) => {
  let params = {
    club_email: clubEmail,
    club_name: clubName
  }

  axios.get(baseUrl + '/notif/send-clubApproval-email', { params })
    .then(function (resp) {
      console.log(resp)
    })
    .catch(function (err) {
      console.log(err)
    })
}

export const sendPush = (uid, title, body, icon) => {
  let params = {
    uid: uid,
    notificationOptions: {
      notification: {
        title: title,
        body: body,
        icon: icon || 'https://laracasts.com/images/series/circles/do-you-react.png',
        click_action: process.env.NODE_ENV === 'production' ? 'https://prod.cribblservices.com' : null
      }
    }
  }

  axios.post(baseUrl + '/notif/send-push', params)
    .then(function (resp) {
      console.log(resp)
    })
    .catch(function (err) {
      console.log(err)
    })
}

export const sendSMS = (to, message) => {
  let params = {
    phone: to,
    message: message
  }
  axios.post(baseUrl + '/notif/send-sms', params)
    .then(function (resp) {
      console.log(resp)
    })
    .catch(function (err) {
      console.log(err)
    })
}

export const getNotificationRequestPermission = (uid) => {
  firebaseMessaging.requestPermission()
    .then(function () {
      console.log('perm granted')
      return firebaseMessaging.getToken()
    })
    .then(function (token) {
      sessionStorage.setItem('fcmToken', token) // eslint-disable-line
      updateToken(uid, token, true)
    })
    .catch(function (err) {
      console.log(err)
    })
}

firebaseMessaging.onTokenRefresh(function () {
  firebaseMessaging.getToken()
    .then(function (token) {
      updateToken(sessionStorage.getItem('uid'), token, true) // eslint-disable-line
    })
    .catch(function (err) {
      console.log('could not retrieve new token' + err)
    })
})

/*
const getNotificationPermissionState = () => {
  navigator.permissions.query({ name: 'notifications' })
    .then(function (permissionStatus) {
      console.log('notifications permission status is ', permissionStatus.state)

      permissionStatus.onchange = function () {
        console.log('notifications permission status has changed to ', this.state)
      }
    })
}
*/
firebaseMessaging.onMessage(function (payload) {
  store.dispatch(toggleActions.toggleToaster(payload.notification.title, true))
})

export const requestOTP = (uid, contact, callback) => {
  let params = {
    userID: uid,
    contact: contact
  }
  axios.get(baseUrl + '/send-otp', { params })
    .then(function (res) {
      if (res.data.code === 'failure') {
        throw res.data.message
      }
      console.log(res)
      callback(null)
    })
    .catch(function (err) {
      console.log(err)
      callback(err)
    })
}

export const confirmOTP = (code, userDetails, callback) => {
  let params = {
    userID: userDetails.uid,
    code: code,
    userDetails: userDetails
  }
  axios.get(baseUrl + '/confirm-otp', { params })
    .then(function (res) {
      if (res.data.code === 'failure') {
        throw res.data.message
      }
      console.log(res)
      callback(null)
    })
    .catch(function (err) {
      console.log(err)
      callback(err)
    })
}
