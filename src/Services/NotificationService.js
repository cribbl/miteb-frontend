import axios from 'axios'
import {firebaseMessaging} from '../firebaseConfig'
import {store} from '../store'
import {toggleActions} from '../actions/toggleActions'

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

	axios.post('http://localhost:9000/send-email', params)
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		console.log(err);
	})
}

export const sendNotification = (token, payload) => {

	let params = {
		token: token,
		payload: {
	        notification: {
	          title: 'My Title',
	          body: 'Message body',
	          icon: 'https://laracasts.com/images/series/circles/do-you-react.png'
	        }
	    }
    };

    axios.post('http://localhost:9000/send-notif', params)
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		console.log(err);
	})

}

firebaseMessaging.onMessage(function(payload) {
    store.dispatch(toggleActions.toggleToaster(payload.notification.title, true));
})