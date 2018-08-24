import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'
import moment from 'moment'

import {Link} from 'react-router'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper'
import {firebaseDB} from '../../firebaseConfig'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ApplyIcon from 'material-ui/svg-icons/content/send';


const styles = {
  label: {
    maxWidth: '30%',
    width: '30%',
    display: 'inline-block',
    padding: 7
  },

  value: {
    width: '70%',
    display: 'inline-block',
    padding: 7
  },
}

class DeveloperApplicationDialog extends Component {
  constructor(props){
    super(props)
    this.handleApply = this.handleApply.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      newUser: {
        name: '',
        email : '',
        primaryContact:'',
        clubInfo: '',
        cvLink: '',
      },
      open: this.props.open,
    };
  }

  

  handleApply(){
    let dev = this.props.developer.name;
    firebaseDB.ref('developerApplications/' + dev).push(this.state.newUser);
  }

  handleChange(e, field) {
    let newUser = this.state.newUser;
    newUser[field] = e.target.value;  
    this.setState({newUser});
  };

  

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({open: nextProps.open})
  }

  render() {
    const DA_actions = [
      <FlatButton
        label="Close"
        primary={false}
        onClick={this.props.handleClose}
        style={{margin: '0px 5px'}}
      />,
      <FlatButton
        label={"Apply"}
        primary={true}
        onClick={this.handleApply}
        style={{margin: '0px 5px'}}
      />,
       
    ];

    return (
      <div>
        <Dialog
          title={<div><p style={{fontWeight: 700}}>{this.props.developer.name}</p><p style={{fontSize: 15, lineHeight: '20px'}}>{this.props.developer.description}</p></div>}
          actions={DA_actions}
          open={this.props.open}
          modal={true}
          autoScrollBodyContent={true}
          onRequestClose={this.props.handleClose}
          contentStyle={{width: this.props.isMobile ? '97%' : '50%', maxWidth: 'none', maxHeight: 'none', background: 'red'}}
          actionsContainerStyle={{backgroundColor: 'rgb(248, 248, 248)'}}
          titleStyle={{backgroundColor: 'rgb(240, 240, 240)'}}
          >
          
            <div style={{maxHeight: '100%', overflow: 'auto'}}>

             <br />

             <p>Name</p>

             <TextField 
                floatingLabelText=""
                value={this.state.newUser.name}
                onChange={(event) => this.handleChange(event, 'name')}
                style={{marginTop: -15,marginBottom:8,alignItems:'center'}}
                required />

             <p>Email</p>

             <TextField
                floatingLabelText=""
                value={this.state.newUser.email}
                onChange={(event) => this.handleChange(event, 'email')}
                style={{marginTop: -15, marginBottom: 8}}
                required />

             <p>Primary Phone</p>

              <TextField
                floatingLabelText=""
                type="number"
                value={this.state.newUser.primaryContact}
                onChange={(event) => this.handleChange(event, 'primaryContact')}
                style={{marginTop: -15, marginBottom: 8}}
                required />
                
              <p>Are you currently working for any Student Clubs or Student Projects?</p>


              <TextField 
                multiLine={true}
                rows={1}
                style={{textAlign: 'left'}}
                floatingLabelText="" 
                type="text"
                onChange={(event) => this.handleChange(event, 'clubInfo')}
                value={this.state.newUser.clubInfo}
                required />
                
                <p>Google Drive link for CV(Please make sure the drive link is accessible to everyone)</p>

                <TextField
                floatingLabelText=""
                value={this.state.newUser.cvLink}
                onChange={(event) => this.handleChange(event, 'cvLink')}
                style={{marginTop: -15, marginBottom: 8}}
                required />

            </div>
          
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {openSideNav, isMobile, filter} = state.toggler
  const {user, verified, vals} = state.authentication
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