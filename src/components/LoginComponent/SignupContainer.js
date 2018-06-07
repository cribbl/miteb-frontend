
import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import { Link } from 'react-router'

import './LoginComponent.css'

class SignupContainer extends Component {

	constructor(props) {
    super(props);

    this.state = {
     
        clubname: '',
        clubnameabbrev: '',
        email : '',
        phonenumber:'',
        password : '',
		clubname_error:'',
        clubnameabbrev_error:'',
        email_error: '',
        phonenumber_error: '',
        password_error:''
        
      
    }
      this.handleClubName = this.handleClubName.bind(this);
      this.handleClubNameAbbrev = this.handleClubNameAbbrev.bind(this);
      this.handleEmail = this.handleEmail.bind(this);
      this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

  	handleClubName (e) {

  	}

  	handleClubNameAbbrev (e) {

  	}

  	handleEmail (e) {

  	}

  	handlePhoneNumber (e) {

  	}

  	handlePassword (e) {

  	}

	handleSignupSubmit (e) {

	}


	render () {
		return (
			<div style={{display: 'flex', alignItems: 'space-between'}}>
			<form onSubmit={this.handleSignupSubmit}>
			<h2 className="paperTitle">Sign Up</h2>
			<div className="fieldsContainer">

			<TextField
              hintText="Club Name"
              value={this.state.clubname}
              onChange={this.handleClubName}
              errorText= {this.state.clubname_error}
              required />

            <TextField
              hintText="Club Name Abbreviation"
              value={this.state.clubnameabbrev}
              onChange={this.handleClubNameAbbrev}
              errorText= {this.state.clubnameabbrev_error}
              required />

            <TextField
              hintText="Email"
              value={this.state.email}
              onChange={this.handleEmail}
              errorText= {this.state.email_error}
              required />

             <TextField
              hintText="Phone Number"
              value={this.state.phonenumber}
              onChange={this.handlePhoneNumber}
              errorText= {this.state.phonenumber_error}
              required />

             <TextField
              hintText="Password"
              value={this.state.password}
              onChange={this.handlePassword}
              errorText= {this.state.password_error}
              required />

              <RaisedButton className="submitButton" type="submit" label="Sign Up" primary={true}  />
              <br /><br /><br />
              Already have an account? <Link className="bottomAlign" to="/auth/signin">Signin here</Link>

			</div>
			</form>
			</div>

		)
	}
}

export default SignupContainer;