import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import './LoginComponent.css'
import LoginComponent from './LoginComponent'
import {hashHistory} from 'react-router'
import { connect } from 'react-redux'

import { userActions } from './../../actions/userActions'
import {firebaseAuth} from '../../firebaseConfig' 


const paperStyle = {
  padding: 30,
  textAlign: 'center',
  display: 'inline-block',
  minHeight: 470,
  maxWidth: 315,
  borderBottom: '6px solid #00bcd4',
};

class Reg extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      loading: false,
      signup: false,
    }
  firebaseAuth.onAuthStateChanged(function (user) {
    if(user) {
      hashHistory.push('/dashboard')
    }
    else {
      hashHistory.push('/auth')
    }
  })
  }

  
  render () {
    return (
      <div className="row authPage">
      <div className="col-md-4 offset-md-7 rightPane">
        <Paper zDepth={5} style={paperStyle}>
            <div>
              {this.props.children}   
            </div>
          </Paper>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {loggedIn, user}  = state.authentication
  return {
    loggedIn,
    user
  }
}

export default connect(mapStateToProps)(Reg)