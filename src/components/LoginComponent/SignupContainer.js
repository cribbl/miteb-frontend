
import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'


import {createUserWithEmailAndPassword} from '../../Services/firebaseAuthService'

import { Link } from 'react-router'

import './LoginComponent.css'

class SignupContainer extends Component {
	constructor(props) {
    super(props);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      newUser: {
        name: '',
        abbrv: '',
        email : '',
        primaryContact:'',
        password : '',
      },
      fieldTouch: {
        name: '',
        abbrv: '',
        email : '',
        primaryContact:'',
        password : '',
      }
    }
  }

	handleChange(e, field) {
    let newUser = this.state.newUser;
    newUser[field] = e.target.value;        
    this.setState({newUser});
  };

  handleBlur(e, field) {
    let fieldTouch = this.state.fieldTouch;
    fieldTouch[field] = true;
    this.setState({fieldTouch})
  };

  handleSignupSubmit(e) {
    e.preventDefault();
    var newUser = this.state.newUser;
    createUserWithEmailAndPassword(this.state.newUser, (err, res) => {
      if(err) {
        console.log(err);
      }
      else {
        console.log(res);
      }
    })
	}

	render () {
		return (
			<div style={{display: 'flex', alignItems: 'space-between'}}>

  			<form onSubmit={this.handleSignupSubmit}>
  			<h2 className="paperTitle">Sign Up</h2>
    			<div className="fieldsContainer">
  			
            <TextField
              hintText="Club Name"
              value={this.state.newUser.name}
              onChange={(event) => this.handleChange(event, 'name')}
              onBlur={() => this.handleBlur('name')}
              errorText= {this.state.newUser.clubname_error}
              errorStyle={{position: 'absolute', bottom: -8}}
              required />

            <TextField
              hintText="Club Name Abbreviation"
              value={this.state.newUser.abbrv}
              onChange={(event) => this.handleChange(event, 'abbrv')}
              onBlur={() => this.handleBlur('abbrv')}
              errorText= {this.state.newUser.clubnameabbrev_error}
              errorStyle={{position: 'absolute', bottom: -8}}
              required />

            <TextField
              hintText="Email"
              value={this.state.newUser.email}
              onChange={(event) => this.handleChange(event, 'email')}
              onBlur={() => this.handleBlur('email')}
              errorText= {this.state.newUser.email_error}
              errorStyle={{position: 'absolute', bottom: -8}}
              required />

            <TextField
              hintText="Primary Contact"
              value={this.state.newUser.primaryContact}
              onChange={(event) => this.handleChange(event, 'primaryContact')}
              onBlur={() => this.handleBlur('primaryContact')}
              errorText= {this.state.newUser.primaryContactnumber_error}
              errorStyle={{position: 'absolute', bottom: -8}}
              required />

            <TextField
              hintText="Password"
              value={this.state.newUser.password}
              onChange={(event) => this.handleChange(event, 'password')}
              onBlur={() => this.handleBlur('password')}
              errorText= {this.state.newUser.password_error}
              errorStyle={{position: 'absolute', bottom: -8}}
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