import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import './LoginComponent.css'

import { Link, hashHistory } from 'react-router'

import { connect } from 'react-redux'
import { userActions } from './../../actions/userActions'

class LoginComponent extends Component {
  constructor (props) {
    super(props)
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.handleSigninSubmit = this.handleSigninSubmit.bind(this)

    this.state = {
      username: '',
      password: '',
      signup: false,
    }
  }

  changeUsername (e) {
    this.setState({ username: e.target.value })
  }

  changePassword (e) {
    this.setState({ password: e.target.value })
  }

  handleSigninSubmit (e) {
    e.preventDefault()
    const { dispatch } = this.props;
    dispatch(userActions.login(this.state.username, this.state.password));
    }

  render () {
    return (
      <div style={{display: 'flex', alignItems: 'space-between'}}>
      <form onSubmit={this.handleSigninSubmit}>
        <h2 className="paperTitle">Sign In</h2>
          <div className="fieldsContainer">
            <TextField floatingLabelText="Email" style={{marginTop: -12}} value={this.state.username} onChange={this.changeUsername} required />
            <TextField type="password" floatingLabelText="Password" style={{marginTop: -12}} value={this.state.password} onChange={this.changePassword} required />
          <Link to="/auth/forgot" style={{fontSize: 12, float: 'right', textDecoration: 'underline', position: 'relative', zIndex: 100}}>Forgot Password?</Link> <br /><br />
            <RaisedButton className="submitButton" type="submit" label="Sign In" primary={true} disabled={this.props.logging} />
            <CircularProgress style={{position: 'absolute', padding: '27px 5px'}} size={20} hidden={!this.props.logging}/>
          </div>
              {this.props.error && <p>{this.props.error.message}</p>}
          <br /><br /><br />Don't have an account yet? <Link className="bottomAlign" to="/auth/signup">Signup as Club</Link><br /><Link className="bottomAlign" to="/auth/signup-fa">Signup as FA</Link>
      </form>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {loggedIn, logging, user, error}  = state.authentication
  return {
    loggedIn,
    logging,
    user,
    error
  }
}

export default connect(mapStateToProps)(LoginComponent)
