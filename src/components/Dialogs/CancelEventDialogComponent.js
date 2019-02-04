import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { firebaseDB } from '../../firebaseConfig'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import moment from 'moment'

class CancelEventDialog extends Component {
  constructor (props) {
    super(props)
    this.cancelCurrentEvent = this.cancelCurrentEvent.bind(this)
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
    this.state = {
      handleClose: this.props.handleClose,
      SnackBarmessage: '',
      openSnackBar: false,
      autoHideDuration: 3000
    }
  }

  handleSnackBarClose () {
    this.setState({ openSnackBar: false })
  }

  cancelCurrentEvent (event) {
    let scope = this
    this.props.handleClose()

    let eventrooms = event.rooms

    // 1. event/eventid
    firebaseDB.ref('/events/').child(event.key).remove()

    // 2. user/userid/my_events/id
    let userRef = firebaseDB.ref('/users/').child(event.clubID + '/my_events/')
    userRef.on('value', function (snapshot) {
      Object.entries(snapshot.val()).forEach(([key, value]) => {
        if (`${value}` === event.key) {
          userRef.child(`${key}`).remove()
        }
      })
    })

    // 3. roomsx
    let roomRef = firebaseDB.ref('/roomsx/')
    roomRef.on('value', function (snapshot) {
      let allDates = snapshot.val()
      for (let date in allDates) {
        if (moment(date, 'DD-MM-YYYY').isBetween(moment(event.startDate, 'DD-MM-YYYY'), moment(event.endDate, 'DD-MM-YYYY'), null, '[]')) {
          let dateRef = roomRef.child(date)
          dateRef.on('value', function (snapshot) {
            let roomsThatDay = snapshot.val()
            for (let j = 0; j < eventrooms.length; j++) {
              if (roomsThatDay) {
                let i = roomsThatDay.indexOf(eventrooms[j])
                if (i >= 0) {
                  dateRef.child(i).remove()
                }
              }
            }
          })
        }
      }
    })

    // 4.approved
    let appRef = firebaseDB.ref('/approved/')
    appRef.on('value', function (snapshot) {
      let allDates = snapshot.val()
      for (let date in allDates) {
        if (moment(date, 'DD-MM-YYYY').isBetween(moment(event.startDate, 'DD-MM-YYYY'), moment(event.endDate, 'DD-MM-YYYY'), null, '[]')) {
          let dateRef = appRef.child(date)
          dateRef.on('value', function (snapshot) {
            let roomsThatDay = snapshot.val()
            for (let j = 0; j < eventrooms.length; j++) {
              if (roomsThatDay) {
                let i = roomsThatDay.indexOf(eventrooms[j])
                if (i >= 0) {
                  dateRef.child(i).remove()
                }
              }
            }
          })
        }
      }
    })

    // 4. To be held
    let tobeheldRef = firebaseDB.ref('/to-be-held/')
    tobeheldRef.on('value', function (snapshot) {
      let allDatestbh = snapshot.val()
      for (let date in allDatestbh) {
        if (moment(date, 'DD-MM-YYYY').isBetween(moment(event.startDate, 'DD-MM-YYYY'), moment(event.endDate, 'DD-MM-YYYY'), null, '[]')) {
          let dateReftbh = tobeheldRef.child(date)
          dateReftbh.on('value', function (snapshot) {
            if (event.key && snapshot.val()) {
              Object.entries(snapshot.val()).forEach(([key, value]) => {
                if (`${value}` === event.key) {
                  dateReftbh.child(`${key}`).remove()
                }
              })
            }
          })
        }
      }
    })
    const myArrx = this.props.allevents
    delete myArrx[event.key]
    this.props.onEventDelete(myArrx)
    scope.setState({ SnackBarmessage: 'Event successfully deleted', openSnackBar: true })
  }
  render () {
    const clubActions = [
      <FlatButton
        label='Cancel'
        primary={false}
        onClick={this.props.handleClose}
        style={{ margin: '0px 5px' }}
      />,
      <FlatButton
        label='Ok'
        primary
        onClick={() => this.cancelCurrentEvent(this.props.currentEvent)}
        style={{ margin: '0px 5px' }}
      />
    ]
    return (
      <div>
        <Dialog
          // title="Confirm Delete"
          title={this.props.currentEvent.title}
          actions={clubActions}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent
          contentStyle={{ width: this.props.isMobile ? '97%' : '60%' }}
          actionsContainerStyle={{ backgroundColor: 'rgb(248, 248, 248)' }}
          titleStyle={{ backgroundColor: 'rgb(240, 240, 240)', fontWeight: 700 }}
          bodyStyle={{ marginTop: 15 }}
        >
          <div>Are you sure you want to cancel booking for this event ?</div>
        </Dialog>
        <Snackbar
          open={this.state.openSnackBar}
          message={this.state.SnackBarmessage}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={this.handleSnackBarClose}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { openSideNav, isMobile, filter } = state.toggler
  const { user, verified, vals } = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile,
    vals,
    filter
  }
}

export default connect(mapStateToProps)(CancelEventDialog)
