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

export const exportEvents = (view, uid, mode, start_date=null, end_date=null, callback) => {
  let params = {
    uid: uid,
    mode: mode,
    from: start_date,
    to: end_date
  }
  return axios({
    url: 'http://localhost:9000/' + view + '/generate-sheet',
    params: params,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'eventDetails.xlsx');
    document.body.appendChild(link);
    link.click();
  });

}