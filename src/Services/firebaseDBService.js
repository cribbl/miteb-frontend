import {firebaseDB} from '../firebaseConfig'

export const getMyEvents = (clubId) => {
	firebaseDB.ref('/clubs/' + clubId).on('value',
	function(snapshot) {
		console.log('snapshot')
		console.log(snapshot.val().my_events)
		let events = snapshot.val().my_events
		for(event in events) {
			console.log(events[event])
			firebaseDB.ref('/events/' + events[event]).on('value',
			function(snapshot) {
				console.log(snapshot.val())
			})
		}
	})
}