import React, {Component} from 'react';
import axios from 'axios';
import {firebaseDB} from '../../../firebaseConfig'

import firebase from 'firebase'
import updateNotificationSettings from '../../../Services/firebaseDBService';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {getUserDetails} from '../../../Services/firebaseDBService'
import {sendPasswordResetEmail} from '../../../Services/firebaseAuthService'
import {red500,indigo500} from 'material-ui/styles/colors';
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
import IconProfile from 'material-ui/svg-icons/social/person'
import IconPassword from 'material-ui/svg-icons/action/lock'
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import IconUpload from 'material-ui/svg-icons/file/cloud-upload';
import IconButton from 'material-ui/IconButton';
//import SwipeableViews from 'react-swipeable-views';



const styles = {
}
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
    var file =this.state.file;
    console.log('fie',file);
    var newProfilePicURL=this.state.imagePreviewUrl;
    var newData= newProfilePicURL;
    var clubID = localStorage.getItem('clubID')
    firebaseDB.ref('/clubs/'+clubID).child('/profilePicURL/').set(newData);
    var storageRef=firebase.storage().ref('profilepictures/'+clubID+'/'+file.name);
    var task = storageRef.put(file);


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
    };
    handleChangesButton = () => {
      console.log('saved!');
      var notificationSettings=this.state.notificationSettings;
      var newData=notificationSettings;
      updateNotificationSettings(newData);



    }
    handlePicUpload = () =>  {
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
    render() {
      const TextFields=()=>{
        return(
          <div style={{padding:20,textAlign: 'left', color: 'black', width: '100%'}}>
             <List>
                 <ListItem
                   leftIcon={<IconProfile color={indigo500} />}
                  primaryText={this.props.user && this.props.user.name}
                   secondaryText="DummyClubAbr"
                 />
                 <ListItem
                   leftIcon={<IconPassword color={indigo500} />}
                   primaryText="Password"
                   secondaryText="Click to reset"
                   onClick={this.handleResetClick}
                 />
                <ListItem
                  leftIcon={<CommunicationEmail color={indigo500} />}
                  primaryText="Email"
                  secondaryText={this.props.user && this.props.user.email}
                />
            </List>
            <Snackbar
               open={this.state.open}
               message={this.state.message}
               autoHideDuration={4000}
               onRequestClose={this.handleRequestClose}
            />
          </div>


          )
      }

      const ProfilePicture = () => {
        return (
          <div style={{display: 'flex', padding:20}}>
            <div>
            <Avatar src={this.state.imagePreviewUrl} size={160} onClick={this.handlePicUpload}/>
            </div>

    </div>
        )
      }
      return (
        <div style={{display: 'flex', justifyContent: 'center', padding: 15}}>

            <Paper style= {{background: '', width: '90%', height: '500px', display: 'flex', justifyContent: 'center'}}   zDepth={3}>
            <div style = {{width: '100%', margin: '0 auto'}}>
             <Tabs
                onChange={this.handleChange}
                value={this.state.slideIndex}
                initialSelectedIndex={1}
             >
              <Tab label="Profile" value={0}>
                     <div  style={{display:'flex', flexDirection:'row'}}>
                        <TextFields />
                        <input ref={input => this.inputElement = input} type="file" id="media-upload" onChange={(e)=>this._handleImageChange(e)} accept="video/*,image/*" style={{display: 'none'}}/>
                        <ProfilePicture />
                        <IconButton type ="submit"
                            onClick={(e)=>this._handleSubmit(e)}
                            id="submit"
                            name="submit"
                            primary={true}
                            style={{float:'right',marginRight:20}}
                            tooltip="Upload"
                            tooltipPosition="bottom-right"
                            touch={true}
                          >
                          <IconUpload color={indigo500}
                             hoverColor={red500}/>
                          </IconButton>

                    </div>

              </Tab>
              <Tab label="Notification" value={1}>
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
                 </div>
                  <RaisedButton label="Save Changes"
                primary={true}
                style={{marginLeft:20}}
                onClick={this.handleChangesButton}
                />
                </div>

              </Tab>
             </Tabs>
             </div>
            </Paper>


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
