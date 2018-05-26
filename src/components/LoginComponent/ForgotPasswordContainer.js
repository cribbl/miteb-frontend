import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import { Link } from 'react-router'

import './LoginComponent.css'

class ForgotPasswordContainer extends Component {

	constructor (props) {
    super(props)
    this.changeUsername = this.changeUsername.bind(this)
    this.handleForgotPasswordSubmit = this.handleForgotPasswordSubmit.bind(this)

    this.state = {
      username: ''
    }
  }

  changeUsername (e) {
    this.setState({ username: e.target.value })
  }

	handleForgotPasswordSubmit (e) {

  }

	render() {
		return (
      <div style={{display: 'flex', alignItems: 'space-between'}}>
      <form onSubmit={this.handleForgotPasswordSubmit}>
        <h2 className="paperTitle">Forgot Password</h2>
        <h6 className="paperDesc">No worries! We'll help you retrieve your account</h6>
          <div className="fieldsContainer">
            <TextField hintText="Email" value={this.state.username} onChange={this.changeUsername} required />
            <RaisedButton className="submitButton" type="submit" label="Submit" primary={true} disabled={this.props.logging} />
            <CircularProgress style={{position: 'absolute', padding: '27px 5px'}} size={20} hidden={!this.props.logging}/>
          </div>
              {this.props.error && <p>{this.props.error.message}</p>}
          <br /><br /><br /><br /><br /><br /><Link className="bottomAlign" to="/auth/signin">Back</Link>
      </form>
      </div>
    )
	}
}


export default ForgotPasswordContainer;