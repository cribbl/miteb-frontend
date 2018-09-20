import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import { sendPasswordResetEmail } from '../../Services/firebaseAuthService'
import { Link, hashHistory } from 'react-router'

import './LoginComponent.css'

class ForgotPasswordContainer extends Component {
  constructor (props) {
    super(props)
    this.changeUsername = this.changeUsername.bind(this)
    this.handleForgotPasswordSubmit = this.handleForgotPasswordSubmit.bind(this)

    this.state = {
      username: '',
      errorMessage: null,
      sendingResetEmail: false,
      success: false
    }
  }

  changeUsername (e) {
    this.setState({ username: e.target.value })
  }

  handleForgotPasswordSubmit (e) {
    e.preventDefault()
    var scope = this
    this.setState({ sendingResetEmail: true })
    sendPasswordResetEmail(this.state.username, (err) => {
      this.setState({ sendingResetEmail: false })
      if (err) {
        scope.setState({ errorMessage: err.message })
      } else {
        scope.setState({ success: true })
        scope.setState({ errorMessage: 'A password reset link has been sent to your email!' })
        setTimeout(function () {
          hashHistory.push('/auth')
        }, 5000)
      }
    })
  }

  render () {
    return (
      <div style={{ display: 'flex', alignItems: 'space-between' }}>
        <form onSubmit={this.handleForgotPasswordSubmit}>
          <h2 className='paperTitle'>Forgot Password</h2>
          <h6 className='paperDesc'>No worries! We'll help you retrieve your account</h6>
          <div className='fieldsContainer'>
            <TextField
              hintText='Email'
              value={this.state.username}
              onChange={this.changeUsername}
              required />
            <RaisedButton className='submitButton' type='submit' label='Submit' primary disabled={this.state.sendingResetEmail} />
            <CircularProgress style={{ position: 'absolute', padding: '27px 5px' }} size={20} hidden={!this.state.sendingResetEmail} />
          </div>
          {<p style={{ color: this.state.success ? '#00bcd4' : '#D8000C' }}>{this.state.errorMessage}</p>}
          <br /><br /><br /><br /><br /><br /><Link className='bottomAlign' to='/auth/signin'>Back</Link>
        </form>
      </div>
    )
  }
}

export default ForgotPasswordContainer
