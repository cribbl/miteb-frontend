import axios from 'axios'
import {firebaseMessaging} from '../firebaseConfig'
import {store} from '../store'
import {toggleActions} from '../actions/toggleActions'
import {updateToken} from './firebaseDBService'

export const sendEmail = (senderName, senderEmail, to, default_purpose, subject=null, text=null, html=null) => {

	let params = {
		senderName: senderName,
		senderEmail: senderEmail,
		to: to,
		default_purpose: default_purpose,
		subject: subject,
		text: text,
		html: html
	}

	axios.post('https://dev-miteventbooking.herokuapp.com/send-email', params)
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		console.log(err);
	})
}

export const sendPush = (uid, title, body) => {

	let params = {
		uid: uid,
		payload: {
	        notification: {
	          title: title,
	          body: body,
	          icon: 'https://laracasts.com/images/series/circles/do-you-react.png'
	        }
	    }
    };

    axios.post('https://dev-miteventbooking.herokuapp.com/send-notif', params)
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		console.log(err);
	})

}

export const getNotificationRequestPermission = (uid) => {
  firebaseMessaging.requestPermission()
  .then(function(){
    console.log("perm granted");
    return firebaseMessaging.getToken();
  })
  .then(function(token) {
  	sessionStorage.setItem('fcmToken', token)
    updateToken(uid, token, true);
  })
  .catch(function(err) {
    console.log(err);
  })
}

firebaseMessaging.onTokenRefresh(function() {
  firebaseMessaging.getToken()
  .then(function(token) {
    updateToken(sessionStorage.getItem('uid'), token, true)
  })
  .catch(function(err) {
    console.log('could not retrieve new token')
  })
})

const getNotificationPermissionState = () => {
  navigator.permissions.query({name:'notifications'})
  .then(function(permissionStatus) {
    console.log('notifications permission status is ', permissionStatus.state);
    
    permissionStatus.onchange = function() {
      console.log('notifications permission status has changed to ', this.state);
    };
    
  });
}

firebaseMessaging.onMessage(function(payload) {
    store.dispatch(toggleActions.toggleToaster(payload.notification.title, true));
})