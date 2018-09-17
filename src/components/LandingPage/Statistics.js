import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import PhoneIcon from 'material-ui/svg-icons/communication/phone'
import IconButton from 'material-ui/IconButton'
import EmailIcon from 'material-ui/svg-icons/communication/email'

class Statistics extends Component {
  constructor (props) {
    super()
  }

  render () {
    return (
      <div className={this.props.isMobile ? 'flex-col' : 'flex-row'} style={{ backgroundColor: 'rgb(248, 248, 248)', width: '100%', justifyContent: 'space-around', minHeight: 300, alignItems: 'center' }}>

        <div style={{ backgroundColor: '', padding: 15, margin: 20 }}>
          <img src={require('../../assets/event.png')} style={{ height: 80, width: 80, marginBottom: 10 }} />
          <h2 style={{ fontWeight: 700 }}>250+</h2>
          <p>Events Booked</p>
        </div>

        <div style={{ backgroundColor: '', padding: 15, margin: 20 }}>
          <img src={require('../../assets/rooms.png')} style={{ height: 80, width: 80, marginBottom: 10 }} />
          <h2 style={{ fontWeight: 700 }}>200+</h2>
          <p>Available Rooms</p>
        </div>

        <div style={{ backgroundColor: '', padding: 15, margin: 20 }}>
          <img src={require('../../assets/problems.png')} style={{ height: 80, width: 80, marginBottom: 10 }} />
          <h2 style={{ fontWeight: 700 }}>1000+</h2>
          <p>Complaints Lodged</p>
        </div>

        <div style={{ backgroundColor: '', padding: 15, margin: 20 }}>
          <img src={require('../../assets/club.png')} style={{ height: 80, width: 80, marginBottom: 10 }} />
          <h2 style={{ fontWeight: 700 }}>100+</h2>
          <p>Approved Clubs</p>
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

export default connect(mapStateToProps)(Statistics)
