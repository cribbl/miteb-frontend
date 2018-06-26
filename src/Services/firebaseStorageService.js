import {storage} from '../firebaseConfig'
import axios from 'axios'

export const uploadProfilePic = (uid, file, callback) => {
	storage.ref().child(uid + '/profilePic').put(file)
	.then(function(res) {
		callback(null, res);
	})
	.catch(function(err) {
		callback(err)
	})	
}

export const generatePDF = (eventID) => {
  let params = {
    eventID: eventID
  }
  axios.get("https://dev-miteventbooking.herokuapp.com/event/generate-pdf", {params})
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.log(err)
  })
  return
}