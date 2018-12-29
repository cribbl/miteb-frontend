import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { updateUser } from '../../../Services/firebaseDBService'
import { uploadProfilePic } from '../../../Services/firebaseStorageService'
import './ProfileContainer.css'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import CircularProgress from 'material-ui/CircularProgress'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import PhotoIcon from 'material-ui/svg-icons/image/photo'

class ProfileContainer extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this._updateUser = this._updateUser.bind(this)
    this.handlePicUpload = this.handlePicUpload.bind(this)
    this.handlePicRemove = this.handlePicRemove.bind(this)
    this._handleImageChange = this._handleImageChange.bind(this)
    this.handleProfilePicClick = this.handleProfilePicClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)

    this.state = {
      tempUser: null,
      hasChanged: false,
      popoverOpen: false,
      showProgress: false,
      defaultProfilePic: true,
      errors: [],
      isValid: false
    }
  }

  componentWillMount () {
    this.props.user && this.setState({
      tempUser: {
        name: this.props.user.name,
        primaryContact: this.props.user.primaryContact
      },
      defaultProfilePic: !(this.props.user.profilePicURL)
    })
  }

  _updateUser () {
    updateUser(this.props.user.uid, this.state.tempUser)
    this.setState({ hasChanged: false })
  }
  handleValidation (value, field) {
    let errors = []
    switch (field) {
      case 'primaryContact': if (value.length >= 1) {
        if (!/^[0-9]{10}$/.test(value)) {
          errors[0] = 'Please enter a valid phone number'
        }
      } else {
        errors[0] = 'Cannot be empty'
      }
        break
      default: console.log('invalid case')
    }

    // Using the filter method
    let isValid = false
    var newArray = errors.filter(function (element) {
      if (element !== '') return element
    })
    if (newArray.length < 1) {
      isValid = true
    }
    this.setState({
      errors: errors,
      isValid: isValid
    })
  }

  handleChange (e, field) {
    const temp = this.state.tempUser
    temp[field] = e.target.value
    let value = e.target.value
    this.handleValidation(value, field)
    this.setState({ tempUser: temp })

    if (this.state.tempUser[field] !== this.props.user[field]) {
      this.setState({ hasChanged: true })
    } else {
      this.setState({ hasChanged: false })
    }
  }

  handlePicUpload () {
    this.setState({ popoverOpen: false })
    this.inputElement.click()
  }

  _handleImageChange (e) {
    this.setState({ showProgress: true })
    const file = e.target.files[0]
    uploadProfilePic(this.props.user.uid, file, (err, res) => {
      if (err) {
        console.log(err)
        this.setState({ showProgress: false })
      } else {
        updateUser(this.props.user.uid, { profilePicURL: res.downloadURL })
        this.setState({ showProgress: false, defaultProfilePic: false })
      }
    })
  }

  handleProfilePicClick (event) {
    event.preventDefault()
    this.setState({ popoverOpen: true, anchorEl: event.currentTarget })
  };

  handlePicRemove () {
    this.setState({ popoverOpen: false, defaultProfilePic: true })
    updateUser(this.props.user.uid, { profilePicURL: null })
  }

  handleRequestClose () {
    this.setState({ popoverOpen: false })
  };

  render () {
    const progressStyle = { position: 'absolute', top: 60, left: '37%', visibility: this.state.showProgress ? 'visible' : 'hidden' }
    return (
      <Paper zDepth={3} style={{ minHeight: 380, display: 'flex', justifyContent: 'center', width: '100%', padding: 10 }}>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: this.props.isMobile ? 'column' : 'row', justifyContent: 'space-around', alignItems: this.props.isMobile ? 'center' : '', width: '80%', backgroundColor: '' }}>
            <div style={{ display: 'flex' }}>
              <div className='profilePicContainer' style={{ position: 'relative' }}>
                <div className='image' style={{ position: 'relative' }}>
                  {this.state.defaultProfilePic
                    ? <Avatar
                      className='profilePicContainer'
                      src={this.props.user.isClub ? require('../../../assets/clubDefaultProfilePicture.jpeg') : require('../../../assets/personDefaultProfilePic.png')}
                      size={160}
                      style={{ opacity: this.state.showProgress ? 0.3 : 1 }}
                      onClick={this.handleProfilePicClick}
                    />
                    : <Avatar
                      className='profilePicContainer'
                      src={this.props.user && this.props.user.profilePicURL}
                      size={160}
                      onClick={this.handleProfilePicClick}
                      style={{ opacity: this.state.showProgress ? 0.3 : 1 }}
                    />
                  }
                  <div>
                    <CircularProgress style={progressStyle} />
                  </div>
                </div>
                <div className='middle' onClick={this.handleProfilePicClick} hidden={this.props.isMobile}>
                  <PhotoIcon style={{ color: 'white' }} /><br />
                  <span>CHANGE PROFILE PICTURE</span>
                </div>
                <Popover
                  open={this.state.popoverOpen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={this.props.isMobile ? { horizontal: 'right', vertical: 'bottom' } : { horizontal: 'middle', vertical: 'bottom' }}
                  targetOrigin={this.props.isMobile ? { horizontal: 'right', vertical: 'bottom' } : { horizontal: 'right', vertical: 'top' }}
                  canAutoPosition={this.props.isMobile}
                  onRequestClose={this.handleRequestClose}
                >
                  <Menu>
                    <MenuItem primaryText='Upload Picture' onClick={this.handlePicUpload} />
                    {!this.state.defaultProfilePic ? <MenuItem primaryText='Remove Picture' onClick={this.handlePicRemove} /> : null}
                  </Menu>
                </Popover>
              </div>
            </div>

            <div style={{ backgroundColor: '', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
              <TextField
                floatingLabelText='Name'
                type='text'
                value={this.state.tempUser && this.state.tempUser.name}
                onChange={(event) => this.handleChange(event, 'name')}
              />

              <TextField
                floatingLabelText='Name Abbreviation'
                type='text'
                value={this.state.tempUser && this.props.user.abbrv}
                disabled
              />

              <TextField
                floatingLabelText='Email'
                type='text'
                value={this.props.user && this.props.user.email}
                disabled
                errorText={this.state.errors[1]}
              />

              <TextField
                floatingLabelText='Primary Contact'
                type='text'
                value={this.state.tempUser && this.state.tempUser.primaryContact}
                onChange={(event) => this.handleChange(event, 'primaryContact')}
                errorText={this.state.errors[0]}
                required
              />
            </div>
            <input ref={input => { this.inputElement = input }} type='file' id='media-upload' onChange={(e) => this._handleImageChange(e)} accept='video/*,image/*' style={{ display: 'none' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* <p>Note: An OTP will be sent to the Primary Contact</p>
            <RaisedButton
              label="Request OTP"
              primary={true}
              onClick={this.showDialog}
              style={{width: '70%'}}
            /> */}
            <RaisedButton
              label='Save'
              onClick={this._updateUser}
              disabled={!this.state.hasChanged || !this.state.isValid}
              primary
            />
          </div>
        </div>
      </Paper>
    )
  }
}

function mapStateToProps (state) {
  const { openSideNav, isMobile, filter } = state.toggler
  const { user, verified } = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile,
    filter
  }
}

export default connect(mapStateToProps)(ProfileContainer)
