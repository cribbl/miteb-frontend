import axios from 'axios'

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

export const requestOTP = (uid, contact, callback) => {
	let params = {
	  userID: uid,
	  contact: contact
	}
	axios.get("http://localhost:9000/send-otp", {params})
	.then(function(res) {
	  if(res.data.code=='failure') {
	    throw res.data.message
	  }
	  console.log(res);
	  callback(null);
	})
	.catch(function(err) {
	  console.log(err)
	  callback(err);
	})
}

export const confirmOTP = (code, userDetails, callback) => {
	let params = {
	  userID: userDetails.uid,
	  code: code,
	  userDetails: userDetails
	}
	axios.get("http://localhost:9000/confirm-otp", {params})
	.then(function(res) {
	  if(res.data.code=='failure') {
	    throw res.data.message
	  }
	  console.log(res);
	  callback(null);
	})
	.catch(function(err) {
	  console.log(err)
	  callback(err);
	})
}