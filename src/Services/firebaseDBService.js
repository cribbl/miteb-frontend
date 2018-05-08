import {firebaseDB} from '../firebaseConfig'
import moment from 'moment'
import {store} from '../store'
import {sendEmail} from './NotificationService'

export const getUserDetails = (clubId, callback) => {
      if(!clubId) {
            console.log('return since no clubId')
            return
      }
      firebaseDB.ref('/clubs/' + clubId).once('value',
            function(snapshot) {
                  let user = snapshot.val();
                  user['uid'] = snapshot.key;
                  callback(user);
            })
}

export const getMyEvents = (clubId, callback) => {
	if(!clubId) {
		console.log('return since no clubId')
		return
	}
	firebaseDB.ref('/clubs/' + clubId).on('value',
	function(snapshot) {
		// console.log('outer snapshot')
            let user = snapshot.val();
            store.dispatch({type: "USER_UPDATE", user})
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

function fetch(dateArr) {
	return Promise.all(dateArr.map(date =>
	        new Promise((resolve, reject) =>
	            firebaseDB.ref('rooms/'+date).on('value', function(snapshot){
                        resolve ([date, snapshot.val()])
                  }
	            )
	        )
	    )).then(results =>
	        results.reduce((result, [key, value]) => {
	            result[key] = value;
	            return result;
	        }, {})
	    );
}

function prm(avl) {
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

	var date = start_date
	var dateArr = [];

	do {
		var datex = moment(date).format('DD-MM-YYYY');
		date = moment(date).add(1, 'days');
		dateArr.push(datex)
	} while(moment(date).format('DD-MM-YYYY') != moment(end_date).add(1, 'days').format('DD-MM-YYYY'))

	return (fetch(dateArr).then(res => prm(res)))
}

export const updateDates = (start_date, end_date, rooms) => {
      var date = start_date
      var dateArr = [];

      do {
            var datex = moment(date).format('DD-MM-YYYY');
            date = moment(date).add(1, 'days');
            dateArr.push(datex)
      } while(moment(date).format('DD-MM-YYYY') != moment(end_date).add(1, 'days').format('DD-MM-YYYY'))

      updateDatesDB(dateArr, rooms)
}

function updateDatesDB(dateArr, rooms) {
      
      for(let date of dateArr) {
            for(let room in rooms) {
                  firebaseDB.ref('/rooms/').child(date+'/'+room).set(false);
            }
      }
}


export const approveEvent = (event, approver, user) => {
      switch(approver) {
            case 'FA': {
                  sendEmail("FA", user.email, "dummymitclub@gmail.com", "FA_APPROVED", "Approved by Faculty Advisor", "Congratulations! Your event has been approved by your Faculty Advisor, "+user.name+".", "<p>Congratulations! Your event has been approved by your Faculty Advisor, "+user.name+".</p>");

                  firebaseDB.ref('/events/').child(event.key+'/FA_appr').set('approved');
                  firebaseDB.ref('/events/').child(event.key+'/AD_appr').set('pending');
                  return
            }
            case 'AD': {
                  sendEmail("AD", user.email, "dummymitclub@gmail.com", "AD_APPROVED", "Approved by Associate Director", "Congratulations! Your event has been approved by the Associate Director, "+user.name+".", "<p><strong>Congratulations!</strong><br /> Your event has been approved by the Associate Director, "+user.name+".</p>");

                  firebaseDB.ref('/events/').child(event.key+'/AD_appr').set('approved');
                  firebaseDB.ref('/events/').child(event.key+'/SO_appr').set('pending');
                  return
            }
            case 'SO': {
                  sendEmail("SO", user.email, "dummymitclub@gmail.com", "SO_APPROVED", "Approved by Security Officer", "Congratulations! Your event has been approved by the Security Officer, "+user.name+".", "<p><strong>Congratulations!</strong><br /> Your event has been approved by the Security Officer, "+user.name+".</p>");

                  firebaseDB.ref('/events/').child(event.key+'/SO_appr').set('approved');
                  return
            }
      }
}

export const flagRejectEvent = (event, message, mode, approver, user) => {
      
      let _mode = mode == 'flag' ? 'flagged' : 'rejected';
      switch(approver) {
            case 'FA': {
                  if(_mode == 'rejected') {
                        firebaseDB.ref('/events/').child(event.key+'/AD_appr').set("prevRejected");
                        firebaseDB.ref('/events/').child(event.key+'/SO_appr').set("prevRejected");
                  }
                  sendEmail("FA", user.email, "dummymitclub@gmail.com", "FA_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Faculty Advisor", "Uh-huh! Your event has been "+_mode+" by your Faculty Advisor, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by your Faculty Advisor, "+user.name+".<br /><br />Reason: "+message+"</p>");
                  firebaseDB.ref('/events/').child(event.key+'/FA_appr').set(_mode);
                  firebaseDB.ref('/events/').child(event.key+'/FA_msg').set(message);
                  return
            }
            case 'AD': {
                  if(_mode == 'rejected') {
                        firebaseDB.ref('/events/').child(event.key+'/SO_appr').set("prevRejected");
                  }
                  sendEmail("AD", user.email, "dummymitclub@gmail.com", "AD_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Associate Director", "Uh-huh! Your event has been "+_mode+" by the Associate Director, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by the Associate Director, "+user.name+".<br /><br />Reason: "+message+"</p>");
                  firebaseDB.ref('/events/').child(event.key+'/AD_appr').set(_mode);
                  firebaseDB.ref('/events/').child(event.key+'/AD_msg').set(message);
                  return
            }
            case 'SO': {
                  sendEmail("FA", user.email, "dummymitclub@gmail.com", "SO_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Security Officer", "Uh-huh! Your event has been "+_mode+" by the Security Officer, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by the Security Officer, "+user.name+".<br /><br />Reason: "+message+"</p>");
                  firebaseDB.ref('/events/').child(event.key+'/SO_appr').set(_mode);
                  firebaseDB.ref('/events/').child(event.key+'/SO_msg').set(message);
                  return
            }
      }
}