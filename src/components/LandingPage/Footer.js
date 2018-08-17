import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import PhoneIcon from 'material-ui/svg-icons/communication/phone'
import IconButton from 'material-ui/IconButton'
import EmailIcon from 'material-ui/svg-icons/communication/email'
class Footer extends Component {
    constructor(props) {
        super()
    }

  render () {
    return (
      <div className={this.props.isMobile ? 'flex-col' : 'flex-row'} style={{backgroundColor: 'rgb(66, 66, 66)', width: '100%', color: '#FFFFFF', justifyContent: 'space-around'}}>
        
        <div style={{backgroundColor: '', textAlign: 'left', padding: this.props.isMobile ? 15 : 40}}>
          <p style={{marginBottom: 15, fontSize: 18}}>Address</p>
          <p style={{color: '#BFBFBF'}}>Manipal Institute of Technology,<br />
            Manipal, Karnataka
          </p>          
        </div>
        
        <div style={{backgroundColor: '', textAlign: 'left', padding: this.props.isMobile ? 15 : 40}}>
          <p style={{marginBottom: 15, fontSize: 18}}>Quick Links</p>
          <Link to="/auth" style={{color: '#BFBFBF'}}>Login</Link><br />
          <Link to="/faq" style={{color: '#BFBFBF'}}>FAQ</Link><br />
          <Link to="/complaints" style={{color: '#BFBFBF'}}>Complaints</Link><br />
          <Link to="/developers" style={{color: '#BFBFBF'}}>Developers</Link><br />
        </div>
        
        <div style={{backgroundColor: '', textAlign: 'left', padding: this.props.isMobile ? 15 : 40}}>
          <p style={{marginBottom: 15, fontSize: 18}}>Contact us</p>
          <div style={{display: 'flex', alignItems: 'center', color: '#BFBFBF', marginLeft: -10, height: 30}}>
            <IconButton style={{width: 38, height: 38}}><PhoneIcon color='#BFBFBF' viewBox="0 0 30 30"/></IconButton>
            <p>+91 77606 27296</p>
          </div>
          <div style={{display: 'flex', alignItems: 'center', color: '#BFBFBF', marginLeft: -10, height: 30}}>
            <IconButton style={{width: 38, height: 38}}><EmailIcon color='#BFBFBF' viewBox="0 0 30 30"/></IconButton>
            <p>support@cribblservices.com</p>
          </div>
        </div>
        
        <div style={{backgroundColor: '', textAlign: 'left', padding: this.props.isMobile ? 15 : 40}}>
          <p style={{marginBottom: 15, fontSize: 18}}>Policies</p>
          <Link to="/policy/privacy" style={{color: '#BFBFBF'}}>Privacy Policy</Link><br />
          <Link to="/policy/tnc" style={{color: '#BFBFBF'}}>TnC</Link><br />
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

export default connect(mapStateToProps)(Footer)