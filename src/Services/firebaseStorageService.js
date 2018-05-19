import {storage} from '../firebaseConfig'

export const uploadProfilePic = (uid, file, callback) => {
	storage.ref().child(uid + '/profilePic').put(file)
	.then(function(res) {
		callback(null, res);
	})
	.catch(function(err) {
		callback(err)
	})	
}