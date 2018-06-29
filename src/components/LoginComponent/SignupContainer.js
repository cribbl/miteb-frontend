import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import {createUserWithEmailAndPassword} from '../../Services/firebaseAuthService'

import { Link, hashHistory } from 'react-router'

import './LoginComponent.css'

class SignupContainer extends Component {
	constructor(props) {
    super(props);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleCounter = this.handleCounter.bind(this)
    this.state = {
      newUser: {
        name: 'Some club',
        abbrv: 'SCLUB',
        email : 'bhansalibhawesh@yahoo.com',
        primaryContact:'7760627296',
        password : 'Password@1234',
        category: '',
      },
      fieldTouch: {
        name: '',
        abbrv: '',
        email : '',
        primaryContact:'',
        password : '',
      },
      showProgress: false,
      errorMessage: null,
      signupSuccess: false,
      counter: 5,
    }
  }

  handleCounter() {
    var scope = this;
    var interval = setInterval(function() {
      let c = scope.state.counter - 1;
      scope.setState({counter: c})
      if(c==0) {
        window.clearInterval(interval);
        hashHistory.push('/auth');
      }
    }, 1000)
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
    this.setState({showProgress: true})
    createUserWithEmailAndPassword(this.state.newUser, (err, res) => {
      this.setState({showProgress: false})
      if(err) {
        this.setState({errorMessage: err.message})
      }
      else {
        this.setState({signupSuccess: true})
        this.handleCounter();
      }
    }, this)
	}

	render () {
		return (
			<div style={{display: 'flex', alignItems: 'space-between'}}>

  			<form onSubmit={this.handleSignupSubmit}>
  			<h2 className="paperTitle">Sign Up</h2>

            {this.state.signupSuccess &&

              <div style={{marginTop: 30}}>
                <h4 style={{color: 'rgb(0, 188, 212)'}}>Success!</h4>
                <h6>Thank you for signing up.<br /><br />
                Your account will be reviewed shortly and you'll me notified via email and SMS.
                </h6><br /><br /><br />
                <h6>Redirecting to Home Page in {this.state.counter}</h6>
              </div>

            }

          <div className="fieldsContainer" hidden={this.state.signupSuccess}>

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
                type="password"
                value={this.state.newUser.password}
                onChange={(event) => this.handleChange(event, 'password')}
                onBlur={() => this.handleBlur('password')}
                errorText= {this.state.newUser.password_error}
                errorStyle={{position: 'absolute', bottom: -8}}
                required />

              <RadioButtonGroup name="category" defaultSelected="technical" style={{display: 'inline-flex', marginLeft: -2, width: '105%'}} onChange={(event) => this.handleChange(event, 'category')}>
                <RadioButton
                  value="technical"
                  label="Technical"
                  style={{width: '40%', backgroundColor: ''}}
                />
                <RadioButton
                  value="nonTechnical"
                  label="Non Technical"
                  style={{width: '60%', backgroundColor: ''}}
                />
              </RadioButtonGroup>

                <RaisedButton className="submitButton" type="submit" label="Sign Up" primary={true} disabled={this.state.showProgress}/>
                <CircularProgress style={{position: 'absolute', padding: '27px 5px'}} size={20} hidden={!this.state.showProgress}/>
              {this.state.errorMessage && <p>{this.state.errorMessage}</p>}

              <br /><br /><br />
              Already have an account? <Link className="bottomAlign" to="/auth/signin">Signin here</Link>
            </div>
  			</form>
			</div>
		)
	}
}

export default SignupContainer;