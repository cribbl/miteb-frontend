import { firebaseDB } from '../firebaseConfig'
import moment from 'moment'
import { store } from '../store'
import { toggleActions } from '../actions/toggleActions'
import { sendEmail, sendPush, sendSMS, sendEmailTemplate, sendComplaintTemplate, sendApproveClubTemplate } from './NotificationService'
import { generatePDF } from './firebaseStorageService'

export const getUserDetails = (clubID, callback) => {
  if (!clubID) {
    console.log('return since no clubID')
    return
  }
  firebaseDB.ref('/users/' + clubID).once('value',
    function (snapshot) {
      let user = snapshot.val()
      user['uid'] = snapshot.key
      if (user.isClub) {
        firebaseDB.ref('/users/' + user.fa_uid).once('value',
          function (snap) {
            user['fa'] = snap.val()
          })
      }
      callback(user)
    })
  firebaseDB.ref('/users/' + clubID).on('value',
    function (snapshot) {
      let user = snapshot.val()
      user['uid'] = snapshot.key
      if (user.isClub) {
        firebaseDB.ref('/users/' + user.fa_uid).once('value',
          function (snap) {
            user['fa'] = snap.val()
          })
      }
      store.dispatch({ type: 'USER_UPDATE', user })
    })
}

export const getMyEvents = (clubID, callback) => {
  if (!clubID) {
    console.log('return since no clubID')
    return
  }
  firebaseDB.ref('/users/' + clubID).on('value',
    function (snapshot) {
    // console.log('outer snapshot')
      let user = snapshot.val()
      user['uid'] = snapshot.key
      // store.dispatch({type: "USER_UPDATE", user})
      let events = snapshot.val().my_events
      if (!events) {
        callback(null, null)
      }
      for (let event in events) {
        firebaseDB.ref('/events/' + events[event]).on('value',
          function (snapshot) {
            // console.log('inner snapshot')
            // console.log(snapshot.val())
            callback(snapshot.key, snapshot.val())
          })
      }
    })
}

export const getDisabledDates = (callback) => {
  let temp = []
  firebaseDB.ref('/disabledDates/').on('value',
    function (snapshot) {
      for (let date of snapshot.val()) {
        temp.push(date)
      }
      callback(temp)
    })
}

function fetch (dateArr) {
  return Promise.all(dateArr.map(date =>
    new Promise((resolve, reject) =>
      firebaseDB.ref('roomsx/' + date).on('value', function (snapshot) {
        resolve([date, snapshot.val()])
      }
      )
    )
  )).then(results =>
    results.reduce((result, [key, value]) => {
      result[key] = value
      return result
    }, {})
  )
}

function prm (avl) {
  return new Promise(function (resolve, reject) {
    console.log(avl)
    let takenRooms = []
    for (let date in avl) {
      if (avl[date] != null) {
        for (let roomArr of avl[date]) {
          if (!takenRooms.includes(roomArr)) { takenRooms.push(roomArr) }
        }
      }
    }
    resolve(takenRooms)
  })
}

export const fetchRooms = (startDate, endDate, callback) => {
  var date = startDate
  var dateArr = []

  do {
    var datex = moment(date).format('DD-MM-YYYY')
    date = moment(date).add(1, 'days')
    dateArr.push(datex)
  } while (moment(date).format('DD-MM-YYYY') !== moment(endDate).add(1, 'days').format('DD-MM-YYYY'))

  return (fetch(dateArr).then(res => prm(res)))
}

export const updateDates = (startDate, endDate, rooms, eventID) => {
  var date = startDate
  var dateArr = []

  do {
    var datex = moment(date).format('DD-MM-YYYY')
    date = moment(date).add(1, 'days')
    dateArr.push(datex)
  } while (moment(date).format('DD-MM-YYYY') !== moment(endDate).add(1, 'days').format('DD-MM-YYYY'))

  updateDatesDBx(dateArr, rooms, eventID)
}

function updateDatesDBx (dateArr, roomArr, eventID) {
  for (let date of dateArr) {
    firebaseDB.ref('/roomsx').child(date).set(roomArr)
    firebaseDB.ref('/to-be-held').child(date).push(eventID)
  }
}

export const approveEvent = (event, approver, user) => {
  switch (approver) {
    case 'SC': {
      // sendEmail("FA", user.email, event.booker_email, "FA_APPROVED", "Approved by Faculty Advisor", "Congratulations! Your event has been approved by your Faculty Advisor, "+user.name+".", "<p>Congratulations! Your event has been approved by your Faculty Advisor, "+user.name+".</p>");
      sendPush(event.clubID + 'FA', 'Mr. FA, Request Approval', 'A new event titled ' + event.title + ' requires your approval')
      sendPush(event.clubID, 'Yay! Approved by SC', "Your event titled '" + event.title + "' has been approved by SC")

      firebaseDB.ref('/events/').child(event.key + '/SC_date').set(moment(new Date()).format('DD-MM-YYYY'))
      firebaseDB.ref('/events/').child(event.key + '/SC_appr').set('approved')
      firebaseDB.ref('/events/').child(event.key + '/FA_appr').set('pending')
      return
    }
    case 'FA': {
      // sendEmail("FA", user.email, event.booker_email, "FA_APPROVED", "Approved by Faculty Advisor", "Congratulations! Your event has been approved by your Faculty Advisor, "+user.name+".", "<p>Congratulations! Your event has been approved by your Faculty Advisor, "+user.name+".</p>");
      sendPush('AD', 'Mr. AD, Request Approval', 'A new event titled ' + event.title + ' requires your approval')
      sendPush(event.clubID, 'Yay! Approved by FA', "Your event titled '" + event.title + "' has been approved by FA")

      firebaseDB.ref('/events/').child(event.key + '/FA_date').set(moment(new Date()).format('DD-MM-YYYY'))
      firebaseDB.ref('/events/').child(event.key + '/FA_appr').set('approved')
      firebaseDB.ref('/events/').child(event.key + '/AD_appr').set('pending')
      return
    }
    case 'AD': {
      // sendEmail("AD", user.email, event.booker_email, "AD_APPROVED", "Approved by Associate Director", "Congratulations! Your event has been approved by the Associate Director, "+user.name+".", "<p><strong>Congratulations!</strong><br /> Your event has been approved by the Associate Director, "+user.name+".</p>");
      sendPush('SO', 'Mr. SO, Request Approval', 'A new event titled ' + event.title + ' requires your approval')
      sendPush(event.clubID, 'Yay! Approved by AD', "Your event titled '" + event.title + "' has been approved by AD")
      firebaseDB.ref('/events/').child(event.key + '/AD_date').set(moment(new Date()).format('DD-MM-YYYY'))
      firebaseDB.ref('/events/').child(event.key + '/AD_appr').set('approved')
      firebaseDB.ref('/events/').child(event.key + '/SO_appr').set('pending')
      return
    }
    case 'SO': {
      // sendEmail("SO", user.email, event.booker_email, "SO_APPROVED", "Approved by Security Officer", "Congratulations! Your event has been approved by the Security Officer, "+user.name+".", "<p><strong>Congratulations!</strong><br /> Your event has been approved by the Security Officer, "+user.name+".</p>");

      sendEmailTemplate('SO', 'APPROVED', '', event.clubName, event.clubEmail, event.booker_name, event.booker_email, event.title, 'https://s3.amazonaws.com/miteb/' + event.key + '.pdf')

      // sendEmail("SO", user.email, event.booker_email, "SO_APPROVED", "Event Approved", "Congratulations! Your event has been approved by the Security Officer, "+user.name+".", "<p><strong>Congratulations!</strong><br /> Your event titled <strong>'"+event.title+"'</strong> has been approved.<br/>You may find the receipt <a href='https://s3.amazonaws.com/miteb/"+event.key+".pdf'>here</a><br/><br/>Regards,<br/>Cribbl Services</p>");
      let num = (event.booker_contact).substr((event.booker_contact).length - 10)
      sendSMS('+91' + num, "Congratulations!\nYour event titled '" + event.title + "' has been approved.\n\nThe receipt has been emailed.\n\nRegards,\nCribbl Services")
      sendPush(event.clubID, 'Yay! Approved by SO', "Your event titled '" + event.title + "' has been approved by SO")

      firebaseDB.ref('/events/').child(event.key + '/SO_date').set(moment(new Date()).format('DD-MM-YYYY'))
      firebaseDB.ref('/events/').child(event.key + '/SO_appr').set('approved')
      generatePDF(event.key)
    }
  }
}
export const approvePublicity = (event, approver, user) => {
      switch(approver) {
            case 'FA': {
                  // sendEmail("FA", user.email, "dummymitclub@gmail.com", "FA_APPROVED", "Approved by Faculty Advisor", "Congratulations! Your event has been approved by your Faculty Advisor, "+user.name+".", "<p>Congratulations! Your event has been approved by your Faculty Advisor, "+user.name+".</p>");
                  sendPush("AD", "Mr. AD, Request Approval", "A new event titled "+event.title+ " requires your approval");
                  sendPush(event.clubID, "Yay! Approved by FA", "Your event titled '"+event.title+ "' has been approved by FA");

                  firebaseDB.ref('/publicity/').child(event.key+'/FA_date').set(moment(new Date()).format("DD-MM-YYYY"));
                  firebaseDB.ref('/publicity/').child(event.key+'/FA_appr').set('approved');
                  firebaseDB.ref('/publicity/').child(event.key+'/AD_appr').set('pending');
                  return
            }
            case 'AD': {
                  // sendEmail("AD", user.email, "dummymitclub@gmail.com", "AD_APPROVED", "Approved by Associate Director", "Congratulations! Your event has been approved by the Associate Director, "+user.name+".", "<p><strong>Congratulations!</strong><br /> Your event has been approved by the Associate Director, "+user.name+".</p>");
                  sendPush("SO", "Mr. SO, Request Approval", "A new event titled "+event.title+ " requires your approval");
                  sendPush(event.clubID, "Yay! Approved by AD", "Your event titled '"+event.title+ "' has been approved by AD");
                  firebaseDB.ref('/publicity/').child(event.key+'/AD_date').set(moment(new Date()).format("DD-MM-YYYY"));
                  firebaseDB.ref('/publicity/').child(event.key+'/AD_appr').set('approved');
                  firebaseDB.ref('/publicity/').child(event.key+'/SO_appr').set('pending');
                  return
            }
            case 'SO': {
                  // sendEmail("SO", user.email, "dummymitclub@gmail.com", "SO_APPROVED", "Approved by Security Officer", "Congratulations! Your event has been approved by the Security Officer, "+user.name+".", "<p><strong>Congratulations!</strong><br /> Your event has been approved by the Security Officer, "+user.name+".</p>");
                  sendPush(event.clubID, "Yay! Approved by SO", "Your event titled '"+event.title+ "' has been approved by SO");

                  firebaseDB.ref('/publicity/').child(event.key+'/SO_date').set(moment(new Date()).format("DD-MM-YYYY"));
                  firebaseDB.ref('/publicity/').child(event.key+'/SO_appr').set('approved');
                  generatePDF(event.key);
                  return
            }
      }
}

export const flagRejectPublicity = (event, message, mode, approver, user) => {
  let _mode = mode === 'flag' ? 'flagged' : 'rejected'
  switch (approver) {
    case 'FA': {
      if (_mode === 'rejected') {
        firebaseDB.ref('/events/publicity/').child(event.key + '/AD_appr').set('prevRejected')
        firebaseDB.ref('/events/publicity/').child(event.key + '/SO_appr').set('prevRejected')
      }
      // sendEmail("FA", user.email, "dummymitclub@gmail.com", "FA_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Faculty Advisor", "Uh-huh! Your event has been "+_mode+" by your Faculty Advisor, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by your Faculty Advisor, "+user.name+".<br /><br />Reason: "+message+"</p>");
      sendPush(event.clubID, 'Oops! ' + _mode.charAt(0).toUpperCase() + _mode.slice(1) + 'by FA', "Your event titled '" + event.title + "' has been " + _mode.charAt(0).toUpperCase() + _mode.slice(1) + ' by FA')
      firebaseDB.ref('/events/publicity/').child(event.key + '/FA_date').set(moment(new Date()).format('DD-MM-YYYY'))
      firebaseDB.ref('/events/publicity/').child(event.key + '/FA_appr').set(_mode)
      firebaseDB.ref('/events/publicity/').child(event.key + '/FA_msg').set(message)
      return
    }
    case 'AD': {
      if (_mode === 'rejected') {
        firebaseDB.ref('/events/publicity/').child(event.key + '/SO_appr').set('prevRejected')
      }
      // sendEmail("AD", user.email, "dummymitclub@gmail.com", "AD_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Associate Director", "Uh-huh! Your event has been "+_mode+" by the Associate Director, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by the Associate Director, "+user.name+".<br /><br />Reason: "+message+"</p>");
      sendPush(event.clubID, 'Oops! ' + _mode.charAt(0).toUpperCase() + _mode.slice(1) + 'by AD', "Your event titled '" + event.title + "' has been " + _mode.charAt(0).toUpperCase() + _mode.slice(1) + ' by AD')
      firebaseDB.ref('/events/publicity/').child(event.key + '/AD_date').set(moment(new Date()).format('DD-MM-YYYY'))
      firebaseDB.ref('/events/publicity/').child(event.key + '/AD_appr').set(_mode)
      firebaseDB.ref('/events/publicity/').child(event.key + '/AD_msg').set(message)
      return
    }
    case 'SO': {
      // sendEmail("FA", user.email, "dummymitclub@gmail.com", "SO_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Security Officer", "Uh-huh! Your event has been "+_mode+" by the Security Officer, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by the Security Officer, "+user.name+".<br /><br />Reason: "+message+"</p>");
      sendPush(event.clubID, 'Oops! ' + _mode.charAt(0).toUpperCase() + _mode.slice(1) + 'by SO', "Your event titled '" + event.title + "' has been " + _mode.charAt(0).toUpperCase() + _mode.slice(1) + ' by SO')
      firebaseDB.ref('/events/publicity/').child(event.key + '/SO_date').set(moment(new Date()).format('DD-MM-YYYY'))
      firebaseDB.ref('/events/publicity/').child(event.key + '/SO_appr').set(_mode)
      firebaseDB.ref('/events/publicity/').child(event.key + '/SO_msg').set(message)
    }
  }
}
export const flagRejectEvent = (event, message, mode, approver, user) => {
  let _mode = mode === 'flag' ? 'flagged' : 'rejected'
  switch (approver) {
    case 'SC': {
      if (_mode === 'rejected') {
        firebaseDB.ref('/events/').child(event.key + '/FA_appr').set('prevRejected')
        firebaseDB.ref('/events/').child(event.key + '/AD_appr').set('prevRejected')
        firebaseDB.ref('/events/').child(event.key + '/SO_appr').set('prevRejected')
      }
      // sendEmail("SC", user.email, event.booker_email, "FA_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Faculty Advisor", "Uh-huh! Your event has been "+_mode+" by your Faculty Advisor, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by your Faculty Advisor, "+user.name+".<br /><br />Reason: "+message+"</p>");
      sendEmailTemplate('SC', _mode.toUpperCase(), message, event.clubName, event.clubEmail, event.booker_name, event.booker_email, event.title, 'https://s3.amazonaws.com/miteb/' + event.key + '.pdf')
      sendPush(event.clubID, 'Oops! ' + _mode.charAt(0).toUpperCase() + _mode.slice(1) + 'by SC', "Your event titled '" + event.title + "' has been " + _mode.charAt(0).toUpperCase() + _mode.slice(1) + ' by SC')
      firebaseDB.ref('/events/').child(event.key + '/SC_date').set(moment(new Date()).format('DD-MM-YYYY'))
      firebaseDB.ref('/events/').child(event.key + '/SC_appr').set(_mode)
      firebaseDB.ref('/events/').child(event.key + '/SC_msg').set(message)
      return
    }
    case 'FA': {
      if (_mode === 'rejected') {
        firebaseDB.ref('/events/').child(event.key + '/AD_appr').set('prevRejected')
        firebaseDB.ref('/events/').child(event.key + '/SO_appr').set('prevRejected')
      }
      // sendEmail("FA", user.email, event.booker_email, "FA_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Faculty Advisor", "Uh-huh! Your event has been "+_mode+" by your Faculty Advisor, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by your Faculty Advisor, "+user.name+".<br /><br />Reason: "+message+"</p>");
      sendEmailTemplate('FA', _mode.toUpperCase(), message, event.clubName, event.clubEmail, event.booker_name, event.booker_email, event.title, 'https://s3.amazonaws.com/miteb/' + event.key + '.pdf')
      sendPush(event.clubID, 'Oops! ' + _mode.charAt(0).toUpperCase() + _mode.slice(1) + 'by FA', "Your event titled '" + event.title + "' has been " + _mode.charAt(0).toUpperCase() + _mode.slice(1) + ' by FA')
      firebaseDB.ref('/events/').child(event.key + '/FA_date').set(moment(new Date()).format('DD-MM-YYYY'))
      firebaseDB.ref('/events/').child(event.key + '/FA_appr').set(_mode)
      firebaseDB.ref('/events/').child(event.key + '/FA_msg').set(message)
      return
    }
    case 'AD': {
      if (_mode === 'rejected') {
        firebaseDB.ref('/events/').child(event.key + '/SO_appr').set('prevRejected')
      }
      // sendEmail("AD", user.email, event.booker_email, "AD_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Associate Director", "Uh-huh! Your event has been "+_mode+" by the Associate Director, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by the Associate Director, "+user.name+".<br /><br />Reason: "+message+"</p>");
      sendEmailTemplate('AD', _mode.toUpperCase(), message, event.clubName, event.clubEmail, event.booker_name, event.booker_email, event.title, 'https://s3.amazonaws.com/miteb/' + event.key + '.pdf')
      sendPush(event.clubID, 'Oops! ' + _mode.charAt(0).toUpperCase() + _mode.slice(1) + 'by AD', "Your event titled '" + event.title + "' has been " + _mode.charAt(0).toUpperCase() + _mode.slice(1) + ' by AD')
      firebaseDB.ref('/events/').child(event.key + '/AD_date').set(moment(new Date()).format('DD-MM-YYYY'))
      firebaseDB.ref('/events/').child(event.key + '/AD_appr').set(_mode)
      firebaseDB.ref('/events/').child(event.key + '/AD_msg').set(message)
      return
    }
    case 'SO': {
      // sendEmail("FA", user.email, event.booker_email, "SO_"+_mode.toUpperCase(),  _mode.charAt(0).toUpperCase()+_mode.slice(1)+" by Security Officer", "Uh-huh! Your event has been "+_mode+" by the Security Officer, "+user.name+".", "<p><strong>Uh-huh!</strong><br /> Your event has been "+_mode+" by the Security Officer, "+user.name+".<br /><br />Reason: "+message+"</p>");
      sendEmailTemplate('SO', _mode.toUpperCase(), message, event.clubName, event.clubEmail, event.booker_name, event.booker_email, event.title, 'https://s3.amazonaws.com/miteb/' + event.key + '.pdf')
      sendPush(event.clubID, 'Oops! ' + _mode.charAt(0).toUpperCase() + _mode.slice(1) + 'by SO', "Your event titled '" + event.title + "' has been " + _mode.charAt(0).toUpperCase() + _mode.slice(1) + ' by SO')
      firebaseDB.ref('/events/').child(event.key + '/SO_date').set(moment(new Date()).format('DD-MM-YYYY'))
      firebaseDB.ref('/events/').child(event.key + '/SO_appr').set(_mode)
      firebaseDB.ref('/events/').child(event.key + '/SO_msg').set(message)
    }
  }
}

export const approveClubNotif = (club, mode, clubID) => {
  var greeting = (mode === 'approved' ? 'Congratulations!' : 'Sorry!')

  // sendEmail("SC", "mitstudentcouncil@gmail.com", club.email, "club_"+"mode", "Club " + mode, greeting + "Your event has been " + mode + " by the Student Council","<p><strong>"+greeting+"</strong><br /> Your club titled <strong>'"+club.name+"'</strong> has been "+mode+".<br/>Regards,<br/>Cribbl Services</p>");
  if (mode === 'approved') { sendApproveClubTemplate(club.email, club.name) } else { sendEmail('SC', 'mitstudentcouncil@gmail.com', club.email, 'club_' + 'mode', 'Club ' + mode, greeting + 'Your event has been ' + mode + ' by the Student Council', '<p><strong>' + greeting + "</strong><br /> Your club titled <strong>'" + club.name + "'</strong> has been " + mode + '.<br/>Regards,<br/>Cribbl Services</p>') }

  let num = (club.primaryContact).substr((club.primaryContact).length - 10)
  sendSMS('+91' + num, greeting + "\n\nYour club titled '" + club.name + "' has been " + mode + ' by the Student Council.\n\nRegards,\nCribbl Services')

  sendPush(clubID, greeting, "Your club named '" + club.name + "' has been " + mode)
}

export const resolveComplaintNotif = (complaint) => {
  sendComplaintTemplate(complaint.fields.email, complaint.fields.name, complaint.subject)
  sendEmail('SC', 'mitstudentcouncil@gmail.com', complaint.fields.email, 'complaint_' + 'resolved', 'Complaint resolved', 'Hey ' + complaint.fields.name + '\nYour complaint titled ' + complaint.subject + 'has been resolved', '<p><strong>Hey ' + complaint.fields.name + "</strong><br /> Your complaint titled <strong>'" + complaint.subject + "'</strong> has been resolved.<br/>Regards,<br/>Cribbl Services</p>")
  // let num = (complaint.fields.contactNo).substr((event.booker_contact).length - 10)
  // sendSMS('+91'+num, "Hey "+complaint.fields.name+"\nYour complaint titled '" + complaint.subject + "' has been resolved.\n\nRegards,\nCribbl Services" );
}

export const newComplaintNotif = () => {
  sendEmail('Portal', 'mitstudentcouncil@gmail.com', 'dummymitsc@gmail.com', 'new_complaint', 'new complaint',
    'A new coplaint has been lodged.', '<p>A new complaint has been lodged.<br/>Regards, <br/>Cribbl Services</p>')

  sendPush('SC', 'New Complaint', 'A new complaint has been lodged.')
}

export const updateToken = (uid, token, bool) => {
  firebaseDB.ref('/fcmTokens/' + uid).child(token).set(bool)
}

export const updateUser = (uid, tempUser) => {
  firebaseDB.ref('users/' + uid).update(tempUser)
  store.dispatch(toggleActions.toggleToaster('Profile updated successfully!', true))
}
