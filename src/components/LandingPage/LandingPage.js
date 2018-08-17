import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Footer from './Footer'
import Features from './Features'
import Statistics from './Statistics'
import ComingSoon from './ComingSoon'
import Support from './Support'

import './LandingPage.css';
class LandingPage extends Component {
    constructor(props) {
        super()
    }

  render () {
    return (
      <div className="flex-col" style={{justifyContent: 'space-between', alignItems: 'center', textAlign: 'center'}}>
      <div className="flex-row" style={{justifyContent: 'center'}}>
        <div style={{width: this.props.isMobile ? '94%' : '70%'}}>
          <img src={require("../../assets/logo.svg")} style={{height: 180, width: 180, margin: this.props.isMobile ? 20 : 50}}/>
          <h1 style={{fontWeight: 700}}>MIT Event Booking Portal</h1>
          <h4 style={{lineHeight: 1.5, marginTop: 30}}> We have found the traditional way of booking a classroom difficult. Obtaining permissions? Even tougher. So, here we are. At Cribbl, you can book classrooms for your events, obtain permissions for your event's publicity, lodge complaints and view your club's stats. </h4>

        </div>
      </div>
      <h2 style={{fontWeight: 700, margin: '50px 0px'}}>Features &amp; Services</h2>
      <Features />

      <Statistics />

      <h2 style={{fontWeight: 700, margin: '50px 0px'}}>Coming Soon</h2>
      <ComingSoon />

      <Support />

      <Footer />
      <p style={{backgroundColor: 'rgb(60, 60, 60)', width: '100%', color: 'white', fontSize: 12, padding: 5, textAlign: 'center'}}>All Rights Reserved @ <a href="https://cribblservices.com" style={{textDecoration: 'none', color: 'white'}}>Cribbl Services</a></p>
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

export default connect(mapStateToProps)(LandingPage)