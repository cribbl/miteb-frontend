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
 input:{
  boxSizing: 'borderBox',
  position: 'relative',
  lineHeight: 'normal',
  padding: 5,
  backgroundColor: '#fff',
  color: 'inherit',
  borderRadius: 2,
  borderStyle:'solid'
 },
 rinput:{
  boxSizing: 'borderBox',
  position: 'relative',
  lineHeight: 'normal',
  padding: 5,
  backgroundColor: '#eee',
  color: 'inherit',
  borderRadius: 2,
  borderStyle:'solid'
 },
   toggle: {
    marginBottom: 16,
  }
};

class ProfileComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: this.props.user && this.props.user.profilePicURL,
        imagePreviewUrl: '',
        slideIndex: 0,
         open: false,
         message: "",
         notificationSettings: {
           'email':this.props.user&&this.props.user.notificationSettings.email,
           'sms':this.props.user &&this.props.user.notificationSettings.sms
           }
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
 
    render() {
      const TextFields=()=>{
        return(
          <div style={{marginLeft:70,textAlign: 'left', color: 'black', width: '100%'}}>
             <h6> Name </h6>
             <input value={this.props.user && this.props.user.name} style={styles.rinput} />    
             <h6> Password </h6>
             <div style={{display:'flex',flexDirection:'Row'}}>
             <input defaultValue="*******" type="password" style={styles.input} required/>
             <RaisedButton
               label="Reset"
               onClick={this.handleResetClick}
               style={{float:'right'}}
               primary={true}
             />
             <Snackbar
              open={this.state.open}
              message={this.state.message}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
             />
             </div>
             <h6> Email </h6>
             <input value={this.props.user && this.props.user.email} type="email" style={styles.rinput} required />
           </div>

          
          )
      }

      const ProfilePicture = () => {
      return (
      <div style={{display: 'flex'}}>
        <div>
        <Avatar src={this.state.imagePreviewUrl} size={160} />
        </div>     
      </div>
      )
      }
      return (
        <div>    

            <Paper style={{width: '100%', height:'100%', overflow: 'hidden',marginTop:0,position:'relative'}} zDepth={3}>
             <Tabs
                onChange={this.handleChange}
                value={this.state.slideIndex}
                initialSelectedIndex={1}
             >
              <Tab label="Profile" value={0}>
              <center>
                   <div className="col-md-5" style={{margin:10}}>
                     <div  style={{display:'flex', flexDirection:'row'}}>        
                      <ProfilePicture />
                      <TextFields />
                    </div>
                    <div className="preview">
                       <input className="fileInput" 
                        type="file" 
                        onChange={(e)=>this._handleImageChange(e)} 
                       />
                       <RaisedButton label ="Upload" 
                           type="submit"
                           onClick={(e)=>this._handleSubmit(e)}
                           id="submit" 
                           name="submit"
                           primary={true}
                           style={{marginTop:50,float:'right'}}
                       />
                    </div>   
                  </div>
                </center>
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