import {storage} from '../firebaseConfig'

export const uploadProfilePic = (uid, file, callback) => {
	storage.ref().child(uid + '/profilePic').put(file)
	.then(function(res) {
		console.log(res);
	})
	.catch(function(res) {
		console.log(res);
	})	
}