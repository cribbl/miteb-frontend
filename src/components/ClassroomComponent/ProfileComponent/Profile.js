import React, {Component} from 'react';
import axios from 'axios';
import {firebaseDB} from '../../../firebaseConfig'

import firebase from 'firebase'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {getUserDetails} from '../../../Services/firebaseDBService'
import {sendPasswordResetEmail} from '../../../Services/firebaseAuthService'
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

class ProfileComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: '',
        slideIndex: 0,
         open: false,
         message: "",
         notificationSettings: {
           'email':this.props.user&&this.props.user.notificationSettings.email,
           'sms':this.props.user &&this.props.user.notificationSettings.sms
           },
        dialogOpen: false,
        userDetails: this.props.user
      };
    }
  
  componentWillMount(){
    this.setState({
      imagePreviewUrl:this.props.user && this.props.user.profilePicURL
    })
  }

  handlePicUpload = () => {
    this.inputElement.click()
  }

  showDialog = () => {
    var scope = this;
    requestOTP(this.props.user.uid, this.props.user.primaryContact, (err) => {
      if(err) {
        return
      }
      scope.setState({dialogOpen: true});
    })
  }

  handleDialogClose = () => {
    this.setState({dialogOpen: false})
  }

  handleResetClick = () => {
    sendPasswordResetEmail(this.props.user.email, (err, res) => {
      let msg = "Password reset email sent";
      if(err)
        msg="Password reset email couldn't be sent" + err;
      this.setState({open: true, message: msg})
    })
  };


  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  _handleSubmit(e) {
    e.preventDefault();
    console.log('uploading')
    console.log(this.props.user)
    var newProfilePicURL=this.state.imagePreviewUrl;
    var newData= newProfilePicURL;
    var clubID = localStorage.getItem('clubID')
    firebaseDB.ref('/clubs/'+clubID).child('/profilePicURL/').set(newData);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
     
    reader.readAsDataURL(file)
  }

    handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
    handleEmailToggle = () => {
      let notificationSettings= this.state.notificationSettings;
      console.log(notificationSettings)
      notificationSettings['email']=notificationSettings['email']? 0:1;

      this.setState({
        notificationSettings: notificationSettings
      });
    };
     handleSMSToggle = () => {
     let notificationSettings= this.state.notificationSettings;
      console.log(notificationSettings)
      notificationSettings['sms']=notificationSettings['sms']? 0:1;

      this.setState({
        notificationSettings: notificationSettings
      });

        console.log('state',this.state.notificationSettings)
    };

    handleChangesButton = () => {

    }
 
    render() {
      const TextFields=()=>{
        return(
          <div style={{backgroundColor: '', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%'}}>
             <TextField
              floatingLabelText="Name"
              type="text"
              value={this.props.user && this.props.user.name}
              />

            <TextField
              floatingLabelText="Name Abbreviation"
              type="text"
              value={this.props.user && this.props.user.nameAbbrv}
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
              value={this.props.user && this.props.user.primaryContact}
              />
           </div>   
          )
      }

      const ProfilePicture = () => {
      return (
      <div style={{display: 'flex'}}>
        <div>
        <Avatar src={this.state.imagePreviewUrl} size={160} onClick={this.handlePicUpload}/>
        </div>     
      </div>
      )
      }
      return (
        <div style={{display: 'flex', justifyContent: 'center', padding: 15}}>
            <Paper style={{background: '', width: '90%', height: '500px', display: 'flex', justifyContent: 'center'}} zDepth={0}>
            <div style={{width: '100%', margin: '0 auto'}}>
             <Tabs
                onChange={this.handleChange}
                value={this.state.slideIndex}
                initialSelectedIndex={1}
             >
              <Tab label="Profile" value={0}>
                  <Paper zDepth={3} style={{height:'calc(100% - 1px)', display: 'flex', justifyContent: 'center', width: '100%', padding: 10}}>
                    
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
                       <div style={{display:'flex', flexDirection: this.props.isMobile ? 'column' : 'row', justifyContent: 'space-around', alignItems: this.props.isMobile ? 'center': '', width: '80%', backgroundColor: ''}}>
                        <ProfilePicture />
                        <TextFields />
                        <input ref={input => this.inputElement = input} type="file" id="media-upload" onChange={(e)=>this._handleImageChange(e)} accept="video/*,image/*" style={{display: 'none'}}/>
                      </div>
                    
                      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p>Note: An OTP will be sent to the Primary Contact</p>
                        <RaisedButton
                          label="Request OTP"
                          primary={true}
                          onClick={this.showDialog}
                          style={{width: '70%'}}
                        />
                      </div>
                    </div>
                </Paper>
              </Tab>
              
              <Tab label="Notification" value={1}>
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