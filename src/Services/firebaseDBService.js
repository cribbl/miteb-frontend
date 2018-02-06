import {firebaseDB} from '../firebaseConfig'

export const getMyEvents = (clubId, callback) => {
	if(!clubId) {
		console.log('return since no clubId')
		return
	}
	firebaseDB.ref('/clubs/' + clubId).on('value',
	function(snapshot) {
		// console.log('outer snapshot')
		let events = snapshot.val().my_events
		if(!events) {
			callback(null, null)
		}
		for(event in events) {
			firebaseDB.ref('/events/' + events[event]).on('value',
			function(snapshot) {
				// console.log('inner snapshot')
				// console.log(snapshot.val())
				callback(snapshot.key, snapshot.val())
			})
		}
	})
}