import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'


class BookingComponentx extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      
    }
}


  render() {

    return (
    	
    );
  }
}

function mapStateToProps(state) {
  const {isMobile} = state.toggler
  const {user} = state.authentication
  return {
    user,
    isMobile
  }
}

export default connect(mapStateToProps)(BookingComponentx)