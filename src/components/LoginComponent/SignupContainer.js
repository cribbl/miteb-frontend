
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

    this.state = {
     
     newUser: {
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
      
    }

    this.handleClubName = this.handleClubName.bind(this);
    this.handleClubNameAbbrev = this.handleClubNameAbbrev.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

	handleClubName (e) {


  	let value = e.target.value;  
    if(value.length<1) {
      this.setState( prevState => ({newUser:
        {clubname_error : 'this field is required'}}));
    } else {
      this.setState( prevState => ({ newUser : 
      {...prevState.newUser, clubname: value, clubname_error : ''} 
      }), () => console.log(this.state.newUser))
    }

  	}

	

	handleClubNameAbbrev (e) {


  	let value = e.target.value;  
    if(value.length<1) {
      this.setState( prevState => ({newUser:
        {clubnameabbrev_error : 'this field is required'}}));
    } else {
      this.setState( prevState => ({ newUser : 
      {...prevState.newUser, clubnameabbrev: value, clubnameabbrev_error : ''} 
      }), () => console.log(this.state.newUser))
    }
  		
  	}

  	handleEmail (e) {
  		
  		let value = e.target.value;
    let alphabet = value
    alphabet = alphabet.replace(/[^a-zA-Z]+/g,"");
    if(alphabet.length>0) { //contains at least one alphabet
      if(value.length >2 && value.length <31) {
          this.setState( prevState => ({ newUser : 
          {...prevState.newUser, email: value, email_error: ''}
          }), () => console.log(this.state.newUser))
      } else {
        this.setState( prevState => ({newUser: {
          email_error: 'length must be between 3 to 30 characters'}
          }), () => console.log(this.state.newUser.email_error))
      }
    } else {
      this.setState( prevState => ({newUser: {
        email_error: 'There must be atleast one character'}
        }), () => console.log(this.state.newUser.email_error))
    }

	}

	


  	handlePhoneNumber (e) {
  		

  		let value = e.target.value;
  		if(value.length != 10) {
  			this.setState(prevState => ({ newUser: {
  				phonenumber_error: 'number must have 10 digits'
  			}

  			}),
  			() => console.log(this.state.newUser.phonenumber_error))
  				}
  			else {
  				this.setState( prevState => ({newUser:
      {...prevState.newUser,phonenumber: value,phonenumber_error:''}
      }), () => console.log(this.state.newUser))
  			}
  		}
  	



  	handlePassword (e) {
  		
  	let value = e.target.value;
    if(value.length < 8) {
      this.setState( prevState => ({newUser: {
        password_error: 'password must have at least 8 characters'}
      }),
       () => console.log(this.state.newUser.password_error))
          }
   else {
      this.setState( prevState => ({newUser:
      {...prevState.newUser,password: value,password_error:''}
      }), () => console.log(this.state.newUser))
    }

}

  	handleSignupSubmit() {

		createUserWithEmailAndPassword(this.state.email , this.state.password);
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
            errorText= {this.state.newUser.clubname_error}
            required />

          <TextField
            hintText="Club Name Abbreviation"
            value={this.state.clubnameabbrev}
            onChange={this.handleClubNameAbbrev}
            errorText= {this.state.newUser.clubnameabbrev_error}
            required />

          <TextField
            hintText="Email"
            value={this.state.email}
            onChange={this.handleEmail}
            errorText= {this.state.newUser.email_error}
            required />

          <TextField
            hintText="Phone Number"
            value={this.state.phonenumber}
            onChange={this.handlePhoneNumber}
            errorText= {this.state.newUser.phonenumber_error}
            required />

          <TextField
            hintText="Password"
            value={this.state.password}
            onChange={this.handlePassword}
            errorText= {this.state.newUser.password_error}
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