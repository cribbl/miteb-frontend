import React, {Component} from 'react';
import axios from 'axios';
import {firebaseDB} from '../../../firebaseConfig'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from 'firebase'
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
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
//import SwipeableViews from 'react-swipeable-views';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',

  },
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
        file: '',
        imagePreviewUrl: '',
        slideIndex: 0,
         open: false,
         message: "",
          notificationSettings: {
            email:{app:1,rej:1,fla:1},
            sms:{app:1,rej:1,fla:1}
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
    var newProfilePicURL=this.state.imagePreviewUrl;
    this.props.user.profilePicURL=newProfilePicURL;
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
        <Avatar src={this.state.imagePreviewUrl} size={300} />
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
                      <ProfilePicture/>
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
          
              
              <List style = {{marginLeft:20}}>
                <Subheader>Email Notification Settings</Subheader>
                <div style={styles.root}>
                <ListItem
                  rightToggle={<Toggle  defaultToggled={this.props.user && this.props.user.notificationSettings.email == 1} />}
                  primaryText="Associate Director"
                  secondaryText="notify at AD's response"
                  
                />
                <ListItem
                  rightToggle={<Toggle  defaultToggled={this.props.user && this.props.user.notificationSettings.email == 1}/>}
                  primaryText="Faculty Advisor"
                  secondaryText="notify at FA's response"
                />
                <ListItem
                  rightToggle={<Toggle  defaultToggled={this.props.user && this.props.user.notificationSettings.email == 1} />}
                  primaryText="Security Officer"
                  secondaryText="notify at SO's response"
                />

                </div>
                <ListItem
                  leftCheckbox={<Checkbox checked={this.props.user && this.props.user.notificationSettings.email == 1} />}
                  primaryText="Approval"
                 
                  
                />
                <ListItem
                  leftCheckbox={<Checkbox checked={this.props.user && this.props.user.notificationSettings.email == 1}/>}
                  primaryText="Reject"
                  
                />
                <ListItem
                  leftCheckbox={<Checkbox checked={this.props.user && this.props.user.notificationSettings.email == 1} />}
                  primaryText="Flag"
                  
                />
              </List>

               <List style={{marginLeft:20}}>
                <Subheader>SMS Notification Settings</Subheader>
                 <div style={styles.root}>
                <ListItem
                  rightToggle={<Toggle  defaultToggled={this.props.user && this.props.user.notificationSettings.email == 1} />}
                  primaryText="Associate Director"
                  secondaryText="notify at AD's response"
                  
                />
                <ListItem
                  rightToggle={<Toggle  defaultToggled={this.props.user && this.props.user.notificationSettings.email == 1}/>}
                  primaryText="Faculty Advisor"
                  secondaryText="notify at FA's response"
                />
                <ListItem
                  rightToggle={<Toggle  defaultToggled={this.props.user && this.props.user.notificationSettings.email == 1} />}
                  primaryText="Security Officer"
                  secondaryText="notify at SO's response"
                />

                </div>
                <ListItem
                  leftCheckbox={<Checkbox checked={this.props.user && this.props.user.notificationSettings.sms == 1} />}
                  primaryText="Approval"
                  
                  
                />
                <ListItem
                  leftCheckbox={<Checkbox checked={this.props.user && this.props.user.notificationSettings.sms == 1}/>}
                  primaryText="Reject"
                  
                />
                <ListItem
                  leftCheckbox={<Checkbox checked={this.props.user && this.props.user.notificationSettings.sms == 1} />}
                  primaryText="Flag"
                  
                />
              </List>

             
          
        
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