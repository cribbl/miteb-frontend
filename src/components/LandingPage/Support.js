import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import PhoneIcon from 'material-ui/svg-icons/communication/phone'
import IconButton from 'material-ui/IconButton'
import EmailIcon from 'material-ui/svg-icons/communication/email'

class Statistics extends Component {
    constructor(props) {
        super()
    }

  render () {
    return (
      <div className={this.props.isMobile ? 'flex-col-rev' : 'flex-row'} style={{backgroundColor: '#f5f6fe', width: '100%', justifyContent: 'space-around', minHeight: 300, alignItems: 'center'}}>
        
        <div style={{width: this.props.isMobile ? '98%' : '50%', height: 200, textAlign: this.props.isMobile ? 'center' : 'left', margin: 30}}>
          <h2 style={{fontWeight: 700}}>Support</h2>
          <p style={{margin: '30px 0px'}}>Share your queries with us. Our team will work with you to find the most optimum and reliable solution.</p>
          <p style={{marginBottom: 30}}>We'd love to hear from you!</p>

        </div>

        <img src={require("../../assets/support.png")} style={{width: this.props.isMobile ? '80%' : 400}} />
        
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

export default connect(mapStateToProps)(Statistics)