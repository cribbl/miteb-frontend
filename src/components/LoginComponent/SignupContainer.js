import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Tabs, Tab} from 'material-ui/Tabs';

import {createClubWithEmailAndPassword} from '../../Services/firebaseAuthService'

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
        abbrv: '',
        email : '',
        primaryContact:'',
        password : '',
        category: 'technical',
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
      counter: 15,
      errors: [],
      isValid: false,
      tabIndex: 0,
    }
  }

  handleTabChange = (value) => {
    this.setState({ tabIndex: value });
  };

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
      case 'abbrv':          
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
    if(this.state.tabIndex == 0) {
      createClubWithEmailAndPassword(this.state.newUser, (err, res) => {
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

    else {
      createFAWithEmailAndPassword(this.state.newUser, (err, res) => {
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
          <Tabs onChange={this.handleTabChange} value={this.state.tabIndex}>

          <Tab label="Club" value={0}>
              <TextField
                floatingLabelText="Club Name"
                value={this.state.newUser.name}
                onChange={(event) => this.handleChange(event, 'name')}
                onBlur={() => this.handleBlur('name')}
                errorText= {this.state.fieldTouch['name'] && this.state.errors[2]}
                errorStyle={{position: 'absolute', bottom: -8}}
                style={{marginTop: -15,marginBottom:8}}
                required />

              <TextField
                floatingLabelText="Club Name Abbreviation"
                value={this.state.newUser.abbrv}
                onChange={(event) => this.handleChange(event, 'abbrv')}
                onBlur={() => this.handleBlur('abbrv')}
                errorText= {this.state.fieldTouch['abbrv'] && this.state.errors[3]}
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

              <RadioButtonGroup name="category" defaultSelected="technical" style={{display: 'inline-flex',marginLeft: -2, width: '105%'}} onChange={(event) => this.handleChange(event, 'category')}>
                <RadioButton
                  value="technical"
                  label="Technical"
                  style={{width: '37%', backgroundColor: '', marginRight: 10}}
                  iconStyle={{marginRight: 5}}
                />
                <RadioButton
                  value="nonTechnical"
                  label="Non Technical"
                  style={{width: '66%', backgroundColor: ''}}
                  iconStyle={{marginRight: 5}}
                />
              </RadioButtonGroup>
            </Tab>

            <Tab label="FA" value={1}>
              <TextField
                floatingLabelText="Club ID"
                value={this.state.newUser.name}
                onChange={(event) => this.handleChange(event, 'name')}
                onBlur={() => this.handleBlur('name')}
                errorText= {this.state.fieldTouch['name'] && this.state.errors[2]}
                errorStyle={{position: 'absolute', bottom: -8}}
                style={{marginTop: -15,marginBottom:8}}
                required />
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
                floatingLabelText="Email"
                value={this.state.newUser.email}
                onChange={(event) => this.handleChange(event, 'email')}
                onBlur={this.handleBlur.bind(this,"email")}
                errorText={this.state.fieldTouch['email'] && this.state.errors[1]}
                errorStyle={{position: 'absolute', bottom: -8}}
                style={{marginTop: -15, marginBottom: 8}}
                required />

              <TextField
                floatingLabelText="Primary Contact"
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

            </Tab>
            </Tabs>
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