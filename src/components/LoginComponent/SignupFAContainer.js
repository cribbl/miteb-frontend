import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import {createFAWithEmailAndPassword} from '../../Services/firebaseAuthService'
import {sendPush, sendEmail} from '../../Services/NotificationService'

import { Link, hashHistory } from 'react-router'

import './LoginComponent.css'

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleCounter = this.handleCounter.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.state = {
      newUser: {
        name: '',
        clubID: '',
        email : '',
        primaryContact:'',
        password : '',
        category: 'technical',
        uid: "",
      },
      fieldTouch: {
        name: '',
        clubID: '',
        email : '',
        primaryContact:'',
        password : '',
      },
      showProgress: false,
      errorMessage: null,
      signupSuccess: false,
      counter: 15,
      errors: [],
      isValid: false,
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
    }, 10000)
  }

  handleChange(e, field) {
    let newUser = this.state.newUser;
    newUser[field] = e.target.value;  
    this.setState({newUser});
    this.handleValidation(field)  
  };

  handleBlur(field) {
    let fieldTouch = this.state.fieldTouch;
    fieldTouch[field] = true;
    this.setState({fieldTouch})
    this.handleValidation(field)
  };

  handleValidation(field) {
    let errors = this.state.errors 
    let newUser = this.state.newUser
    let value = newUser[field]
    let fieldTouch = this.state.fieldTouch[field]
    let errorText=""
     switch(field) {
      case 'name':
        errorText = value.length<1? "Cannot be empty" : ""
        errors[2] = errorText
        break;
      case 'primaryContact': 
        errorText = value.length>=1? !/^[0-9]{10}$/.test(value)? "Please enter a valid phone number" : ""  : "Cannot be empty"
        errors[0] = errorText
        break;
      case 'email':
        errorText = value.length >= 1?  (!/^(([^[<>()\[\]\\.,;:@"]+(\.[^<>()\[\]\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\.-0-9])+[a-zA-Z]))$/.test(value))? "Email is not valid" : "" : "Cannot be empty"
        errors[1] = errorText
        break;
      case 'clubID':
        if(this.state.tabIndex == 1)
          break;
        errorText = value.length<1? "Cannot be empty" : ""
        errors[3] = errorText
        break;
      default: console.log('invalid case')
    }

    let isValid=false;
    var newArray = errors.filter(function(element) {
      if(element != '') return element;
    });
    if (newArray.length < 1) {
      isValid = true
    }
    this.setState({
      errors: errors,
      isValid: isValid
    })
  }

  handleSignupSubmit(e) {
    e.preventDefault();
    var newUser = this.state.newUser;
    this.setState({showProgress: true})
    console.log(this.state.newUser);

      createFAWithEmailAndPassword(this.state.newUser, (err, res) => {
        this.setState({showProgress: false})
        if(err) {
          this.setState({errorMessage: err.message})
        }
        else {
          console.log(res);
          this.setState({signupSuccess: true, newUser: res})
          // this.handleCounter();
          // sendEmail("SENDER", "SENDER-EMAIL", res.email, "PURPOSE", "Signup Request Received", "", `Hey ${res.name},<br /><br />We have received your request for signup.<br />Kindly ask your Faculty Advisor to Sign Up using Club ID as <strong>${res.uid}</strong>.<br /><br />The Student Council will review your request and get back at the earliest. You shall be notified via email and an SMS on +91${res.primaryContact}<br /><br />Regards, <br />Cribbl Services`);

          // sendPush("SC", "FA Connected", `${res.name} has requested your approval!`);
        }
      }, this)
  }

  render () {
    return (
      <div style={{display: 'flex', alignItems: 'space-between'}}>

        <form onSubmit={this.handleSignupSubmit}>
        <h2 className="paperTitle">FA Sign Up</h2>

            {this.state.signupSuccess &&

              <div style={{marginTop: 30}}>
                <h4 style={{color: 'rgb(0, 188, 212)'}}>Success!</h4>
                <h6>Thank you for signing up.<br /><br />
                <br /><br />
                Once Student Council reviews the club, you shall be notified via Email and SMS.
                </h6><br /><br /><br />
              </div>

            }

          <div className="fieldsContainer" hidden={this.state.signupSuccess}>
              <TextField
                floatingLabelText="Full Name"
                value={this.state.newUser.name}
                onChange={(event) => this.handleChange(event, 'name')}
                onBlur={() => this.handleBlur('name')}
                errorText= {this.state.fieldTouch['name'] && this.state.errors[2]}
                errorStyle={{position: 'absolute', bottom: -8}}
                style={{marginTop: -15,marginBottom:8}}
                required />

              <TextField
                floatingLabelText="Club ID"
                value={this.state.newUser.clubID}
                onChange={(event) => this.handleChange(event, 'clubID')}
                onBlur={() => this.handleBlur('clubID')}
                errorText= {this.state.fieldTouch['clubID'] && this.state.errors[3]}
                errorStyle={{position: 'absolute', bottom: -8}}
                style={{marginTop: -15,marginBottom:8}}
                required />

              <TextField
                floatingLabelText="Email"
                value={this.state.newUser.email}
                onChange={(event) => this.handleChange(event, 'email')}
                onBlur={this.handleBlur.bind(this,"email")}
                errorText={this.state.fieldTouch['email'] && this.state.errors[1]}
                errorStyle={{position: 'absolute', bottom: -8}}
                style={{marginTop: -15, marginBottom: 8}}
                required />

              <TextField
                floatingLabelText="Primary Phone"
                type="number"
                value={this.state.newUser.primaryContact}
                onChange={(event) => this.handleChange(event, 'primaryContact')}
                onBlur={() => this.handleBlur('primaryContact')}
                errorText={this.state.fieldTouch['primaryContact'] && this.state.errors[0]}
                errorStyle={{position: 'absolute', bottom: -8}}
                style={{marginTop: -15, marginBottom: 8}}
                required />

              <TextField
                floatingLabelText="Password"
                type="password"
                value={this.state.newUser.password}
                onChange={(event) => this.handleChange(event, 'password')}
                onBlur={() => this.handleBlur('password')}
                errorText= {this.state.newUser.password_error}
                errorStyle={{position: 'absolute', bottom: -8}}
                style={{marginTop: -15,marginBottom:8}}
                required />

              <RaisedButton className="submitButton" type="submit" label="Sign Up" primary={true} disabled={this.state.showProgress || !this.state.isValid}/>
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