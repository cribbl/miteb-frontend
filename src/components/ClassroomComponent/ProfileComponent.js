import React, {Component} from 'react';
import axios from 'axios';
import {firebaseDB} from '../../firebaseConfig'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from 'firebase'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {getUserDetails} from '../../Services/firebaseDBService'
import {connect} from 'react-redux'
const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class ProfileComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name:'',
        email:'',
        password:'',
        id:''
      };
       
    }
    componentDidMount(){
   
       this.getProfileDetails();
    }
    updateProfile(){
       
    }
 
    getProfileDetails(){

      var self =this;
      self.state.name= localStorage.getItem('clubID')
      self.state.password="***"
       //get userdetails from firebase
     }
    render() {
      return (

        <div>
            <center>
            <Paper style={{width: '75%', height:'400', overflow: 'hidden',margin:'40'}} zDepth={3}>
             <div className="col-md-5" style={{margin:'10'}}>
             <div className="form-area">  
             <form role="form">
                <br styles="clear:both" />
                <div className="form-group">
                   <input value={this.state.name} type="text" onChange={this.handleNameChange} className="form-control" placeholder="Name" required />
                </div>
                <div className="form-group">
                  <input value={this.state.password} type="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
                </div>
              
                <RaisedButton label ="Update" 
                 onClick={this.updateProfile} 
                 id="submit" 
                 name="submit"
                 primary={true}
                 />
              
            </form>
            </div>
            </div>
            </Paper>
           
            </center>
        </div>
      )
    }
}
export default ProfileComponent