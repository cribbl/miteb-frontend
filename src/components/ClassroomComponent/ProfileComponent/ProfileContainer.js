import React, {Component} from 'react';
import axios from 'axios';
import {firebaseDB} from '../../../firebaseConfig'

import firebase from 'firebase'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {getUserDetails, updateUser} from '../../../Services/firebaseDBService'
import {sendPasswordResetEmail} from '../../../Services/firebaseAuthService'
import {uploadProfilePic} from '../../../Services/firebaseStorageService'
import {requestOTP} from '../../../Services/NotificationService'

import './ProfileContainer.css';

import {connect} from 'react-redux'
import Avatar from 'material-ui/Avatar'
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';
import {List,ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import OtpDialog from '../../Dialogs/OtpDialog'

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import PhotoIcon from 'material-ui/svg-icons/image/photo'


class ProfileContainer extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this._updateUser = this._updateUser.bind(this);
    this.handlePicUpload = this.handlePicUpload.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this.handleProfilePicClick = this.handleProfilePicClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      tempUser: null,
      hasChanged: false,
      popoverOpen: false,
      showProgress: false,
      defaultProfilePic: true
    }
  }

  componentWillMount() {
    this.props.user && this.setState({
      tempUser: {
        name: this.props.user.name,
        primaryContact: this.props.user.primaryContact,
        nameAbbrv: this.props.user.nameAbbrv
      },
      defaultProfilePic: (this.props.user.profilePicURL)?false:true
    })
  }

  _updateUser() {
    updateUser(this.props.user.uid, this.state.tempUser);
    this.setState({hasChanged: false});
  }

  handleChange(e, field) {
    const temp = this.state.tempUser;
    temp[field] = e.target.value;
    this.setState({tempUser: temp});
    
    if(this.state.tempUser[field] != this.props.user[field]) {
      this.setState({hasChanged: true})
    }
    else {
      this.setState({hasChanged: false})
    }
  }

  handlePicUpload() {
    this.setState({popoverOpen: false, showProgress: true});
    this.inputElement.click()
  }

  _handleImageChange(e) {
    const file = e.target.files[0]
    uploadProfilePic(this.props.user.uid, file, (err, res) => {
      if(err) {
        console.log(err)
        this.setState({showProgress: false});
      }
      else {
        updateUser(this.props.user.uid, {profilePicURL: res.downloadURL});
        this.setState({showProgress: false, defaultProfilePic: false});
      }
    })
  }

  handleProfilePicClick = (event) => {
    event.preventDefault();
    this.setState({popoverOpen: true, anchorEl: event.currentTarget});
  };

  handlePicRemove = () => {
    this.setState({popoverOpen: false, defaultProfilePic: true});
    updateUser(this.props.user.uid, {profilePicURL: null}); 
  }

  handleRequestClose = () => {
    this.setState({popoverOpen: false});
  };

  render() {
    const progressStyle={position:"absolute", top: 60, left:'37%', visibility: this.state.showProgress?"visible":"hidden"};
    return (
      <Paper zDepth={3} style={{minHeight:380, display: 'flex', justifyContent: 'center', width: '100%', padding: 10}}>
                    
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display:'flex', flexDirection: this.props.isMobile ? 'column' : 'row', justifyContent: 'space-around', alignItems: this.props.isMobile ? 'center': '', width: '80%', backgroundColor: ''}}>
            <div style={{display: 'flex'}}>
              <div className="profilePicContainer" style={{position:"relative"}}>
                <div className="image" style={{position:"relative"}}>
                  {this.state.defaultProfilePic?
                    <Avatar
                      className="profilePicContainer" 
                      src={require("../../../assets/personDefaultProfilePic.png")}
                      size={160}
                      style={{opacity: this.state.showProgress?0.3:1}}
                      onClick={this.handleProfilePicClick}
                    />
                    :
                    <Avatar
                    className="profilePicContainer"
                    src={this.props.user && this.props.user.profilePicURL}
                    size={160}
                    onClick={this.handleProfilePicClick}
                    style={{opacity: this.state.showProgress?0.3:1}}
                    />}
                  <div>
                    <CircularProgress style={progressStyle} />
                  </div>
                </div>
                <div className="middle" onClick={this.handleProfilePicClick} hidden={this.props.isMobile}>
                  <PhotoIcon style={{color: 'white'}}/><br />
                  <span>CHANGE PROFILE PICTURE</span>
                </div>
                  <Popover
                    open={this.state.popoverOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={this.props.isMobile ? {horizontal:'right',vertical:'bottom'} : {horizontal:'middle',vertical:'bottom'}}
                    targetOrigin={this.props.isMobile ? {horizontal:'right',vertical:'bottom'} : {horizontal:'right',vertical:'top'}}
                    canAutoPosition={this.props.isMobile}
                    onRequestClose={this.handleRequestClose}
                  >
                    <Menu>
                      <MenuItem primaryText="Upload Picture" onClick={this.handlePicUpload} />
                      <MenuItem primaryText="Remove Picture" onClick={this.handlePicRemove} />
                    </Menu>
                  </Popover>
              </div>     
            </div>
            
            <div style={{backgroundColor: '', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%'}}>
              <TextField
                floatingLabelText="Name"
                type="text"
                value={this.state.tempUser && this.state.tempUser.name}
                onChange={(event) => this.handleChange(event, 'name')}
                />

              <TextField
                floatingLabelText="Name Abbreviation"
                type="text"
                value={this.state.tempUser && this.state.tempUser.nameAbbrv}
                onChange={(event) => this.handleChange(event, 'nameAbbrv')}
                />

              <TextField
                floatingLabelText="Email"
                type="text"
                value={this.props.user && this.props.user.email}
                disabled={true}
                />

              <TextField
                floatingLabelText="Primary Contact"
                type="text"
                value={this.state.tempUser && this.state.tempUser.primaryContact}
                onChange={(event) => this.handleChange(event, 'primaryContact')}
                />
            </div>
            <input ref={input => this.inputElement = input} type="file" id="media-upload" onChange={(e)=>this._handleImageChange(e)} accept="video/*,image/*" style={{display: 'none'}}/>
          </div>
        
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {/*<p>Note: An OTP will be sent to the Primary Contact</p>
            <RaisedButton
              label="Request OTP"
              primary={true}
              onClick={this.showDialog}
              style={{width: '70%'}}
            />*/}
            <RaisedButton
              label='Save'
              onClick={this._updateUser}
              disabled={!this.state.hasChanged}
              primary={true}
            />
          </div>
        </div>
    </Paper>
    );
  }
}

function mapStateToProps(state) {
  const {openSideNav, isMobile, filter} = state.toggler
  const {user, verified} = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile,
    filter
  }
}

export default connect(mapStateToProps)(ProfileContainer)
