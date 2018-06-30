import {firebaseDB} from '../firebaseConfig'
import moment from 'moment'
import {store} from '../store'
import {toggleActions} from '../actions/toggleActions'
import {sendEmail, sendPush} from './NotificationService'
import {generatePDF} from './firebaseStorageService'

export const getUserDetails = (clubId, callback) => {
      if(!clubId) {
            console.log('return since no clubId')
            return
      }
      firebaseDB.ref('/clubs/' + clubId).once('value',
            function(snapshot) {
              let user = snapshot.val();
              user['uid'] = snapshot.key;
              if(user.isClub) {
                firebaseDB.ref('/clubs/' + user.fa_uid).once('value',
                  function(snap) {
                    user['fa'] = snap.val();
                })
              }
              callback(user);
            })
      firebaseDB.ref('/clubs/' + clubId).on('value',
            function(snapshot) {
                  let user = snapshot.val();
                  user['uid'] = snapshot.key;
                  if(user.isClub) {
                    firebaseDB.ref('/clubs/' + user.fa_uid).once('value',
                      function(snap) {
                        user['fa'] = snap.val();
                    })
                  }
                  if(user.isApproved)
                    store.dispatch({type: "USER_UPDATE", user})
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
            user['uid'] = snapshot.key;
            // store.dispatch({type: "USER_UPDATE", user})
		let events = snapshot.val().my_events
		if(!events) {
			callback(null, null)
		}
		for(let event in events) {
			firebaseDB.ref('/events/' + events[event]).on('value',
			function(snapshot) {
				// console.log('inner snapshot')
				// console.log(snapshot.val())
				callback(snapshot.key, snapshot.val())
			})
		}
	})
}

export const getDisabledDates = (callback) => {
      let temp=[];
      firebaseDB.ref('/disabledDates/').on('value',
            function(snapshot) {
                  for(let date of snapshot.val()) {
                        temp.push(date);
                  }
                  callback(temp)
            })
}

function fetch(dateArr) {
	return Promise.all(dateArr.map(date =>
	        new Promise((resolve, reject) =>
	            firebaseDB.ref('roomsx/'+date).on('value', function(snapshot){
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
	return new Promise(function(resolve, reject) {
            console.log(avl)
      let takenRooms=[]
	for(let date in avl){
            if(avl[date]!=null)
      		for(let roomArr of avl[date]) {
                        if(!takenRooms.includes(roomArr))
                              takenRooms.push(roomArr)
        }
    }
      resolve(takenRooms);
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

      updateDatesDBx(dateArr, rooms)
}

function updateDatesDBx(dateArr, roomArr) {
      for(let date of dateArr)
            firebaseDB.ref('/roomsx').child(date).set(roomArr);
}

export const approveEvent = (event, approver, user) => {
      switch(approver) {
            case 'FA': {
                  // sendEmail("FA", user.email, "dummymitclub@gmail.com", "FA_APPROVED", "Approved by Faculty Advisor", "Congratulations! Your event has been approved by your Faculty Advisor, "+user.name+".", "<p>Congratulations! Your event has been approved by your Faculty Advisor, "+user.name+".</p>");
                  sendPush("AD", "Mr. AD, Request Approval", "A new event titled "+event.title+ " requires your approval");
                  sendPush(event.clubID, "Yay! Approved by FA", "Your event titled '"+event.title+ "' has been approved by FA");

                  firebaseDB.ref('/events/').child(event.key+'/FA_date').set(moment(new Date()).format("DD-MM-YYYY"));
                  firebaseDB.ref('/events/').child(event.key+'/FA_appr').set('approved');
                  firebaseDB.ref('/events/').child(event.key+'/AD_appr').set('pending');
                  return
            }
            case 'AD': {
                  // sendEmail("AD", user.email, "dummymitclub@gmail.com", "AD_APPROVED", "Approved by Associate Director", "Congratulations! Your event has been approved by the Associate Director, "+user.name+".", "<p><strong>Congratulations!</strong><br /> Your event has been approved by the Associate Director, "+user.name+".</p>");
                  sendPush("SO", "Mr. SO, Request Approval", "A new event titled "+event.title+ " requires your approval");
                  sendPush(event.clubID, "Yay! Approved by AD", "Your event titled '"+event.title+ "' has been approved by AD");
                  firebaseDB.ref('/events/').child(event.key+'/AD_date').set(moment(new Date()).format("DD-MM-YYYY"));
                  firebaseDB.ref('/events/').child(event.key+'/AD_appr').set('approved');
                  firebaseDB.ref('/events/').child(event.key+'/SO_appr').set('pending');
                  return
            }
            case 'SO': {
                  // sendEmail("SO", user.email, "dummymitclub@gmail.com", "SO_APPROVED", "Approved by Security Officer", "Congratulations! Your event has been approved by the Security Officer, "+user.name+".", "<p><strong>Congratulations!</strong><br /> Your event has been approved by the Security Officer, "+user.name+".</p>");
                  sendPush(event.clubID, "Yay! Approved by SO", "Your event titled '"+event.title+ "' has been approved by SO");

                  firebaseDB.ref('/events/').child(event.key+'/SO_date').set(moment(new Date()).format("DD-MM-YYYY"));
                  firebaseDB.ref('/events/').child(event.key+'/SO_appr').set('approved');
                  generatePDF(event.key);
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
                  // sendEmail("FA", user.email, "dummymitclub@gmail.com", "FA_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Faculty Advisor", "Uh-huh! Your event has been "+_mode+" by your Faculty Advisor, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by your Faculty Advisor, "+user.name+".<br /><br />Reason: "+message+"</p>");
                  sendPush(event.clubID, "Oops! " + _mode.charAt(0).toUpperCase()+_mode.slice(1) + "by FA", "Your event titled '"+event.title+ "' has been "+_mode.charAt(0).toUpperCase()+_mode.slice(1)+ " by FA");
                  firebaseDB.ref('/events/').child(event.key+'/FA_date').set(moment(new Date()).format("DD-MM-YYYY"));
                  firebaseDB.ref('/events/').child(event.key+'/FA_appr').set(_mode);
                  firebaseDB.ref('/events/').child(event.key+'/FA_msg').set(message);
                  return
            }
            case 'AD': {
                  if(_mode == 'rejected') {
                        firebaseDB.ref('/events/').child(event.key+'/SO_appr').set("prevRejected");
                  }
                  // sendEmail("AD", user.email, "dummymitclub@gmail.com", "AD_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Associate Director", "Uh-huh! Your event has been "+_mode+" by the Associate Director, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by the Associate Director, "+user.name+".<br /><br />Reason: "+message+"</p>");
                  sendPush(event.clubID, "Oops! " + _mode.charAt(0).toUpperCase()+_mode.slice(1) + "by AD", "Your event titled '"+event.title+ "' has been "+_mode.charAt(0).toUpperCase()+_mode.slice(1)+ " by AD");
                  firebaseDB.ref('/events/').child(event.key+'/AD_date').set(moment(new Date()).format("DD-MM-YYYY"));
                  firebaseDB.ref('/events/').child(event.key+'/AD_appr').set(_mode);
                  firebaseDB.ref('/events/').child(event.key+'/AD_msg').set(message);
                  return
            }
            case 'SO': {
                  // sendEmail("FA", user.email, "dummymitclub@gmail.com", "SO_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Security Officer", "Uh-huh! Your event has been "+_mode+" by the Security Officer, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by the Security Officer, "+user.name+".<br /><br />Reason: "+message+"</p>");
                  sendPush(event.clubID, "Oops! " + _mode.charAt(0).toUpperCase()+_mode.slice(1) + "by SO", "Your event titled '"+event.title+ "' has been "+_mode.charAt(0).toUpperCase()+_mode.slice(1)+ " by SO");
                  firebaseDB.ref('/events/').child(event.key+'/SO_date').set(moment(new Date()).format("DD-MM-YYYY"));
                  firebaseDB.ref('/events/').child(event.key+'/SO_appr').set(_mode);
                  firebaseDB.ref('/events/').child(event.key+'/SO_msg').set(message);
                  return
            }
      }
}

export const updateToken = (uid, token, bool) => {
      firebaseDB.ref('/fcmTokens/'+uid).child(token).set(bool);
}

export const updateUser = (uid, tempUser) => {
      firebaseDB.ref('clubs/' + uid).update(tempUser);
      store.dispatch(toggleActions.toggleToaster("Profile updated successfully!", true));
}