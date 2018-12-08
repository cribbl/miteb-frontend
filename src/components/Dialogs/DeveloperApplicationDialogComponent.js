import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { firebaseDB } from '../../firebaseConfig'
import { sendEmail } from '../../Services/NotificationService'

class DeveloperApplicationDialog extends Component {
  constructor (props) {
    super(props)
    this.handleApply = this.handleApply.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.state = {
      newUser: {
        name: '',
        email: '',
        primaryContact: '',
        cvLink: ''
      },
      errors: {
        name: '',
        email: '',
        primaryContact: '',
        cvLink: ''
      },
      finished: false,
      isFormValid: false,
      open: this.props.open
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    this.setState({ open: nextProps.open })
  }

  handleApply () {
    let key = this.props.developer.key
    firebaseDB.ref('developerApplications/' + key).push(this.state.newUser)
    let role = this.props.developer.name
    sendEmail('', '', this.state.newUser.email, '', 'Application Received!', '', `<p>Hey ${this.state.newUser.name}, <br /><br />We have received your application for the ${role} role. We will review your application and get back to you.<br /><br />Regards,<br />Cribbl Services</p>`)
    this.setState({ finished: true })
  }

  handleChange (e, field) {
    let newUser = this.state.newUser
    newUser[field] = e.target.value
    this.setState({ newUser })
    this.handleValidation(field)
  };

  handleValidation (field) {
    let fields = this.state.newUser
    let isFormValid = true
    let errors = {
      name: '',
      email: '',
      primaryContact: '',
      cvLink: ''
    }
    if (fields['name'].length < 1) {
      isFormValid = false
      errors['name'] = 'Cannot be empty'
    }

    if (fields['email'].length < 1) {
      isFormValid = false
      errors['email'] = 'Cannot be empty'
    }

    if (fields['email'].length >= 1) {
      if (!/^(([^[<>()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z.-0-9])+[a-zA-Z]))$/.test(fields['email'])) {
        isFormValid = false
        errors['email'] = 'Email is not valid'
      }
    }

    if (fields['primaryContact'].length < 1) {
      isFormValid = false
      errors['primaryContact'] = 'Cannot be empty' //eslint-disable-line
    }

    if (fields['primaryContact'].length >= 1) {
      if (!/^[0-9]{10}$/.test(fields['primaryContact'])) {
        isFormValid = false
        errors['primaryContact'] = 'Invalid contact number'
      }
    }

    if (fields['cvLink'].length < 1) {
      isFormValid = false
      errors['cvLink'] = 'Cannot be empty'
    }

    if (fields['cvLink'].length >= 1) {
      if (!/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/.test(fields['cvLink'])) {
        isFormValid = false
        errors['cvLink'] = 'URL is not valid'
      }
    }

    this.setState({ errors: errors, isFormValid: isFormValid })
  }

  render () {
    const Actions = [
      <FlatButton
        label='Close'
        primary={false}
        onClick={this.props.handleClose}
        style={{ margin: '0px 5px' }}
      />,
      <RaisedButton
        disabled={this.state.finished || !this.state.isFormValid}
        label={'Apply'}
        primary
        onClick={this.handleApply}
        style={{ margin: '0px 5px' }}
      />

    ]

    return (
      <div>
        <Dialog
          title={<div><p style={{ fontWeight: 700 }}>{this.props.developer.name}</p><p hidden={this.props.isMobile} style={{ fontSize: 15, lineHeight: '20px', color: 'rgb(100, 100, 100)' }}>{this.props.developer.description}</p></div>}
          actions={Actions}
          open={this.props.open}
          modal
          autoScrollBodyContent
          onRequestClose={this.props.handleClose}
          contentStyle={{ width: this.props.isMobile ? '97%' : '50%', maxWidth: 'none', maxHeight: '500px', background: 'red' }}
          actionsContainerStyle={{ backgroundColor: 'rgb(248, 248, 248)' }}
          titleStyle={{ backgroundColor: 'rgb(240, 240, 240)' }}
        >
          <div style={{ maxHeight: '100%', overflow: 'auto' }}>
            { this.state.finished ? (
              <div style={{ minHeight: 100, marginTop: 20 }}>
                <p>Hooray!</p>
                <p>We have received your application {this.state.newUser.name}. Sit back and relax while we review your resume.</p>
                <p>We will reach out to you via your email ({this.state.newUser.email}).</p>
              </div>
            )
              : (<form>
                <div><p hidden={!this.props.isMobile} style={{ fontSize: 15, lineHeight: '20px' }}>{this.props.developer.description}</p></div>
                <p style={{ color: 'black', marginTop: 20 }}>Name *</p>
                <TextField
                  type='text'
                  hintText='Your answer'
                  value={this.state.newUser.name}
                  onChange={(event) => this.handleChange(event, 'name')}
                  errorText={this.state.errors['name']}
                  errorStyle={{ position: 'absolute', bottom: -8 }}
                  required />

                <p style={{ color: 'black', marginTop: 20 }}>Email *</p>
                <TextField
                  hintText='Your answer'
                  value={this.state.newUser.email}
                  onChange={(event) => this.handleChange(event, 'email')}
                  errorText={this.state.errors['email']}
                  errorStyle={{ position: 'absolute', bottom: -8 }}
                  required />

                <p style={{ color: 'black', marginTop: 20 }}>Contact Number *</p>
                <TextField
                  hintText='Your answer'
                  type='number'
                  value={this.state.newUser.primaryContact}
                  onChange={(event) => this.handleChange(event, 'primaryContact')}
                  errorText={this.state.errors['primaryContact']}
                  errorStyle={{ position: 'absolute', bottom: -8 }}
                  required />

                <p style={{ color: 'black', marginTop: 20 }}>Link to your resume *</p>
                <p style={{ color: 'rgb(100, 100, 100)', fontSize: 14 }}>You may upload on Google Drive. Please make sure that the resume is accessible</p>
                <TextField
                  hintText='Your answer'
                  value={this.state.newUser.cvLink}
                  onChange={(event) => this.handleChange(event, 'cvLink')}
                  style={{ width: '90%' }}
                  errorText={this.state.errors['cvLink']}
                  errorStyle={{ position: 'absolute', bottom: -8 }}
                  required />

              </form>
              )}
          </div>
        </Dialog>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { openSideNav, isMobile, filter } = state.toggler
  const { user, verified, vals } = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile,
    vals,
    filter
  }
}

export default connect(mapStateToProps)(DeveloperApplicationDialog)
