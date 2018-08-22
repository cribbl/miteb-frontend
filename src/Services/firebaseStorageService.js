import {storage} from '../firebaseConfig'
import axios from 'axios'

if(window.location.host.indexOf("prod") > -1)
  var base_url = "https://app-miteventbooking.herokuapp.com";
else
  var base_url = "https://dev-miteventbooking.herokuapp.com";

export const uploadProfilePic = (uid, file, callback) => {
	storage.ref().child(uid + '/profilePic').put(file)
	.then(function(res) {
		callback(null, res);
	})
	.catch(function(err) {
		callback(err)
	})	
}

export const uploadPoster = (uid,file,callback) => {
  
}

export const generatePDF = (eventID) => {
  let params = {
    eventID: eventID
  }
  axios.get(base_url + "/event/generate-pdf", {params})
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
    url: base_url + '/' + view + '/generate-sheet',
    params: params,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'export.xlsx');
    document.body.appendChild(link);
    link.click();
  });

}