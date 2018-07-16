import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import PhoneIcon from 'material-ui/svg-icons/communication/phone'
import IconButton from 'material-ui/IconButton'
import EmailIcon from 'material-ui/svg-icons/communication/email'

class ComingSoon extends Component {
    constructor(props) {
        super()
    }

  render () {
    return (
      <div className={this.props.isMobile ? 'flex-col' : 'flex-row'} style={{width: '100%', justifyContent: 'space-around', minHeight: 250, alignItems: 'center'}}>
        
        <div style={{backgroundColor: '', padding: 15, margin: 20}}>
          <img src={require("../../assets/description.png")} style={{height: 80, width: 80, marginBottom: 10}} />
          <h5 style={{fontWeight: 700, margin: 10}}>Post-event Description</h5>
          <p>Make a note of the details of the events once the event is over. An easy and efficient way to keep a track of all events held and their information</p>
        </div>

        <div style={{backgroundColor: '', padding: 15, margin: 20}}>
          <img src={require("../../assets/receipt.png")} style={{height: 80, width: 80, marginBottom: 10}} />
          <h5 style={{fontWeight: 700, margin: 10}}>Receipt Tracking</h5>
          <p>Upload your bills and receipts and get them reimbursed digitally. An easy way to manage your credits and debits, reducing load of the Treasurer</p>
        </div>
        
        <div style={{backgroundColor: '', padding: 15, margin: 20}}>
          <img src={require("../../assets/poster.png")} style={{height: 80, width: 80, marginBottom: 10}} />
          <h5 style={{fontWeight: 700, margin: 10}}>Publicity Permission</h5>
          <p>You'd surely need some publicity to gather crowd for your event. Just like you booked the room, take permission for publicity hassle-freely</p>
        </div>
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {isMobile} = state.toggler
  return {
    isMobile
  }
}

export default connect(mapStateToProps)(ComingSoon)