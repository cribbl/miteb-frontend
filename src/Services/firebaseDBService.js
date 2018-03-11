import {firebaseDB} from '../firebaseConfig'
import moment from 'moment'

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

var bhawesh;

function fetch(dateArr) {
	return Promise.all(dateArr.map(date =>
	        new Promise((resolve, reject) => 
	            firebaseDB.ref('rooms/'+date).once('value', snapshot =>
	                resolve ([date, snapshot.val()])
	            )
	        )
	    )).then(results =>
	        results.reduce((result, [key, value]) => {
	            result[key] = value;
	            return result;
	        }, {})
	    );
}

let allRoomArr = {
      "3101" : true,
      "3102" : true,
      "3103" : true,
      "3104" : true,
      "3105" : true,
      "3201" : true,
      "3202" : true,
      "3203" : true,
      "3204" : true,
      "3205" : true,
      "3301" : true,
      "3302" : true,
      "3303" : true,
      "3304" : true,
      "3305" : true,
      "3401" : true,
      "3402" : true,
      "3403" : true,
      "3404" : true,
      "3405" : true,
      "5201" : true,
      "5202" : true,
      "5203" : true,
      "5204" : true,
      "5205" : true,
      "5206" : true,
      "5207" : true,
      "5208" : true,
      "5209" : true,
      "5210" : true,
      "5301" : true,
      "5302" : true,
      "5303" : true,
      "5304" : true,
      "5305" : true,
      "5306" : true,
      "5307" : true,
      "5308" : true,
      "5309" : true,
      "5310" : true
}

function prm(avl) { 
	return new Promise(function(resolve, reject) {
	for(let date in avl){
    	for(let roomArr in avl[date]) {
            allRoomArr[roomArr] = (Boolean(avl[date][roomArr] & allRoomArr[roomArr]));
        }
    }
    for(let room in allRoomArr)
      allRoomArr[room] = !allRoomArr[room]
  
    resolve(allRoomArr);
	reject('rejected')
});
}

export const fetchRooms = (start_date, end_date, callback) => {
	debugger
	var date = start_date
	var avl = {}
	var dateArr = [];

	do {
		var datex = moment(date).format('DD-MM-YYYY');
		date = moment(date).add(1, 'days');
		dateArr.push(datex)
	} while(moment(date).format('DD-MM-YYYY') != moment(end_date).add(1, 'days').format('DD-MM-YYYY'))

	return (fetch(dateArr).then(res => prm(res)))
}