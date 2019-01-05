import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import moment from 'moment'

const styles = {
  label: {
    maxWidth: '30%',
    width: '30%',
    display: 'inline-block',
    padding: 7
  },

  value: {
    width: '70%',
    display: 'inline-block',
    padding: 7
  }
}

class ViewEventDialog extends Component {
  constructor (props) {
    super(props)
    this.getRoomsString = this.getRoomsString.bind(this)
    this.state = {
      open: this.props.open,
      roomlist: ''
    }
  }

  getRoomsString (rooms) {
    var roomlist = ''
    // determines the academic block according to the first digit as array index
    var roomBlock = ['AB-1', 'AB-2', 'NLH', 'IC', 'AB-5']
    // Handle 53101 (5310A) and 53102 (5310B) as special cases.
    rooms.forEach(function (room) {
      let block
      let roomNo
      if (room === '53101' || room === '53102') {
        block = roomBlock[4]
        roomNo = room === '53101' ? '310A' : '310B'
      } else {
        block = Math.floor(room / 1000) - 1
        roomNo = room % 1000
        block = roomBlock[block]
      }
      roomlist += block + '-' + roomNo + ', '
    })
    roomlist = roomlist.replace(/,\s*$/, '')

    this.setState({ roomlist: roomlist })
  }
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    this.setState({ open: nextProps.open })
    if (nextProps.currentEvent && nextProps.currentEvent.rooms) {
      this.getRoomsString(nextProps.currentEvent.rooms)
    }
  }

  render () {
    const faActions = [
      <FlatButton
        label='Close'
        primary={false}
        onClick={this.props.handleClose}
        style={{ margin: '0px 5px', float: 'left' }}
      />,
      <FlatButton
        label='Flag'
        primary
        onClick={() => this.props.flagRejectHandler(this.props.currentEvent, 'flag')}
        style={{ margin: '0px 5px' }}
      />,
      <FlatButton
        label='Reject'
        primary
        onClick={() => this.props.flagRejectHandler(this.props.currentEvent, 'reject')}
        style={{ margin: '0px 5px' }}
      />,
      <RaisedButton
        label='Approve'
        primary
        onClick={() => this.props.approveHandler(this.props.currentEvent)}
        style={{ position: 'absolute', top: '6.5%', right: '3%' }}
      />,
      <FlatButton
        label='Next'
        primary
        onClick={this.props.nextEvent}
        style={{ margin: '0px 5px' }}
      />
    ]

    const clubActions = [
      <FlatButton
        label='Close'
        primary={false}
        onClick={this.props.handleClose}
        style={{ margin: '0px 5px' }}
      />,
      <FlatButton
        label='Next'
        primary
        onClick={this.props.nextEvent}
        style={{ margin: '0px 5px' }}
      />,
      <RaisedButton
        label='Download Receipt'
        primary
        hidden={!this.props.currentEvent.receiptURL}
        onClick={() => { window.location = (this.props.currentEvent.receiptURL) }}
        style={{ position: 'absolute', top: '6.5%', right: '3%' }}
      />
    ]

    return (
      <div>
        <Dialog
          title={this.props.currentEvent.clubName}
          actions={this.props.user && this.props.user.isClub ? clubActions : faActions}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent
          contentStyle={{ width: this.props.isMobile ? '97%' : '60%' }}
          actionsContainerStyle={{ backgroundColor: 'rgb(248, 248, 248)' }}
          titleStyle={{ backgroundColor: 'rgb(240, 240, 240)', fontWeight: 700 }}
          bodyStyle={{ marginTop: 15 }}
        >

          <div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Type</p>
              <p style={styles.value}>{this.props.currentEvent.type}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Title</p>
              <p style={styles.value}>{this.props.currentEvent.title}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Description</p>
              <p style={styles.value}>{this.props.currentEvent.desc}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Start Date</p>
              <p style={styles.value}>{moment(this.props.currentEvent.startDate, 'DD-MM-YYYY').format('dddd, DD MMMM YYYY')}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>End Date</p>
              <p style={styles.value}>{moment(this.props.currentEvent.endDate, 'DD-MM-YYYY').format('dddd, DD MMMM YYYY')}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Rooms</p>
              <p style={styles.value}>{this.state.roomlist}</p>
            </div>
            <div hidden={!this.props.currentEvent.notes} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Notes</p>
              <p style={styles.value}>{this.props.currentEvent.notes}</p>
            </div>

            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Booker Name</p>
              <p style={styles.value}>{this.props.currentEvent.booker_name}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Booker Contact</p>
              <p style={styles.value}>{this.props.currentEvent.booker_contact}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Booker Email</p>
              <p style={styles.value}>{this.props.currentEvent.booker_email}</p>
            </div>
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Timings</p>
              <p style={styles.value}>{(moment(this.props.currentEvent.startDate, 'DD-MM-YYYY').format('dddd')) === 'Sunday' ? '9:00 AM to 5:00 PM' : '5:45 PM to 8:00 PM'}</p>
            </div>
            <div hidden={!this.props.currentEvent.postEventDetail} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>Post Event Details</p>
              <p style={styles.value}>{this.props.currentEvent.postEventDetail}</p>
            </div>
            <div hidden={!((this.props.currentEvent.SC_appr === 'flagged') || (this.props.currentEvent.SC_appr === 'rejected'))} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>{this.props.currentEvent.SC_appr} by SC</p>
              <p style={styles.value}>{this.props.currentEvent.SC_msg}</p>
            </div>
            <div hidden={!((this.props.currentEvent.FA_appr === 'flagged') || (this.props.currentEvent.FA_appr === 'rejected'))} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>{this.props.currentEvent.FA_appr} by FA</p>
              <p style={styles.value}>{this.props.currentEvent.FA_msg}</p>
            </div>
            <div hidden={!((this.props.currentEvent.AD_appr === 'flagged') || (this.props.currentEvent.AD_appr === 'rejected'))} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>{this.props.currentEvent.AD_appr} by AD</p>
              <p style={styles.value}>{this.props.currentEvent.AD_msg}</p>
            </div>
            <div hidden={!((this.props.currentEvent.SO_appr === 'flagged') || (this.props.currentEvent.SO_appr === 'rejected'))} style={{ border: '1px solid black', display: 'flex', alignItems: 'center' }}>
              <p style={styles.label}>{this.props.currentEvent.SO_appr} by SO</p>
              <p style={styles.value}>{this.props.currentEvent.SO_msg}</p>
            </div>
          </div>

        </Dialog>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { isMobile } = state.toggler
  const { user } = state.authentication
  return {
    user,
    isMobile
  }
}

export default connect(mapStateToProps)(ViewEventDialog)
