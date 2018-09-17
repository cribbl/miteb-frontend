import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import PhoneIcon from 'material-ui/svg-icons/communication/phone'
class Features extends Component {
  constructor (props) {
    super()
  }

  render () {
    return (
      <div style={{ backgroundColor: '', display: 'flex', flexDirection: this.props.isMobile ? 'column' : 'row', justifyContent: 'space-around', width: this.props.isMobile ? '100%' : '80%', textAlign: 'left' }}>
        <div style={{ width: this.props.isMobile ? '98%' : '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <div className='flex-row' style={{ width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200 }}>
            <img src={require('../../assets/room-booking.png')} style={{ height: 60, width: 60, margin: 20, minWidth: 60 }} />
            <div className='flex-col'>
              <h4>Room Booking</h4>
              <p>Sick of chasing around campus, only to get signatures? We've all been there - and it's taxing!
                 With Cribbl, you are a few clicks away from an e-Receipt. Just Cribbl it.</p>
            </div>
          </div>

          <div className='flex-row' style={{ width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200 }}>
            <img src={require('../../assets/notifications.png')} style={{ height: 60, width: 60, margin: 20, minWidth: 60 }} />
            <div className='flex-col'>
              <h4>Push Notifications</h4>
              <p>Receive instant notifications at every stage: Your involvement is important to us.
                  Would you like your receipt on Email or SMS? Your call. We provide both.</p>
            </div>
          </div>

          <div className='flex-row' style={{ width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200 }}>
            <img src={require('../../assets/my-events.png')} style={{ height: 60, width: 60, margin: 20, minWidth: 60 }} />
            <div className='flex-col'>
              <h4>My Events</h4>
              <p>Is an intense Tech Week coming up? Got too many events to remember? Receive realtime updates At 'My Events'. You can view and export a list of all your event requests.</p>
            </div>
          </div>

        </div>
        <div style={{ width: this.props.isMobile ? '98%' : '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <div className='flex-row' style={{ width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200 }}>
            <img src={require('../../assets/authorities.png')} style={{ height: 60, width: 60, margin: 20, minWidth: 60 }} />
            <div className='flex-col'>
              <h4>Authorities</h4>
              <p>Ever wonder how we do it? Your Faculty Advisor, Assistant Director and Security Officer are on board with us! They can approve, reject AND flag your requests.</p>
            </div>
          </div>

          <div className='flex-row' style={{ width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200 }}>
            <img src={require('../../assets/complaint.png')} style={{ height: 60, width: 60, margin: 20, minWidth: 60 }} />
            <div className='flex-col'>
              <h4>Lodge Complaints</h4>
              <p>Tired of Facebook posts, emails and a dozen calls? The Council has got you covered. Report your issues, anonymously too, and let your complaints be heard.</p>
            </div>
          </div>

          <div className='flex-row' style={{ width: this.props.isMobile ? '100%' : '80%', justifyContent: 'space-evenly', minHeight: 200 }}>
            <img src={require('../../assets/analytics.png')} style={{ height: 60, width: 60, margin: 20, minWidth: 60 }} />
            <div className='flex-col'>
              <h4>Analytics</h4>
              <p>We are analysing your data to deliver valid results via intelligent tracking. The reports will enable you to make better decisions about events and their logistics.</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { isMobile } = state.toggler
  return {
    isMobile
  }
}

export default connect(mapStateToProps)(Features)
