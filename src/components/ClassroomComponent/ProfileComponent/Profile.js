import React, {Component} from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {getUserDetails} from '../../../Services/firebaseDBService'
import {sendPasswordResetEmail} from '../../../Services/firebaseAuthService'
import {uploadProfilePic} from '../../../Services/firebaseStorageService'
import {requestOTP} from '../../../Services/NotificationService'

import {connect} from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

import OtpDialog from '../../Dialogs/OtpDialog'

import ProfileContainer from './ProfileContainer'
import NotificationsContainer from './NotificationsContainer'

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      dialogOpen: false,
    };
  }
  
  componentWillMount(){
    this.setState({
      imagePreviewUrl:this.props.user && this.props.user.profilePicURL
    })
  }

  handleTabChange = (value) => {
    this.setState({ tabIndex: value });
  };

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', padding: 15}}>
        <Paper style={{background: '', width: '90%', height: '500px', display: 'flex', justifyContent: 'center'}} zDepth={0}>
          <div style={{width: '100%', margin: '0 auto'}}>
            <Tabs onChange={this.handleTabChange} value={this.state.tabIndex}>
            
              <Tab label="Profile" value={0}>
                <ProfileContainer />
              </Tab>
              
              <Tab label="Notification" value={1}>
                <NotificationsContainer />
              </Tab>

            </Tabs>
          </div>
        </Paper>

        <OtpDialog open={this.state.dialogOpen} userDetails={this.state.userDetails} handleClose={this.handleDialogClose}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {isMobile} = state.toggler
  const {user} = state.authentication
  return {
    isMobile,
    user
  }   
}
export default connect(mapStateToProps)(ProfileComponent);