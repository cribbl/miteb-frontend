import React, {Component} from 'react';
import axios from 'axios';
import {firebaseDB} from '../../../firebaseConfig'

import firebase from 'firebase'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {getUserDetails} from '../../../Services/firebaseDBService'
import {sendPasswordResetEmail} from '../../../Services/firebaseAuthService'
import {uploadProfilePic} from '../../../Services/firebaseStorageService'
import {requestOTP} from '../../../Services/NotificationService'

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

import OtpDialog from '../../Dialogs/OtpDialog'
//import SwipeableViews from 'react-swipeable-views';


const styles = {
 headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
 block: {
    width: 1000,
    height:50,
    display: 'flex'
 },
 text:{
  marginLeft:20,
  borderStyle:'solid',
  borderRadius: 3
 },
  toggle: {
    marginBottom: 16,
  }
};

class NotificationsContainer extends Component {
  constructor (props) {
    super(props)
  }

  
  render() {
    return (
       <Paper zDepth={3} style={{height: 420, display: 'flex', justifyContent: 'center'}}>
        <div style={{width: this.props.isMobile ? '100%':'50%', margin: '0px auto'}}>
          <div style={styles.root}> 
            <List style={{marginLeft:20}}>
              <Subheader>Email Notifications</Subheader> 
              <ListItem
                rightToggle={<Toggle defaultToggled={this.props.user && this.props.user.notificationSettings.email == 1} onToggle={this.handleEmailToggle}/>}
                primaryText="Every Stage"
                secondaryText="Otherwise, only at final approval"
              />
              <Divider />

              <Subheader>SMS Notifications</Subheader> 
              <ListItem
                rightToggle={<Toggle defaultToggled={this.props.user && this.props.user.notificationSettings.sms == 1} onToggle={this.handleSMSToggle} />}
                primaryText="Every Stage"
                secondaryText="Otherwise, only at final approval"
              />
          </List>
            <RaisedButton label="Save Changes"
              primary={true}
              style={{marginLeft:20}}
              onClick={this.handleChangesButton}
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

export default connect(mapStateToProps)(NotificationsContainer)