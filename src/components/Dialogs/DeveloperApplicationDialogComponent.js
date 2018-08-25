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
import {sendEmail} from '../../Services/NotificationService'

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
      finished: false,
      open: this.props.open,
    };
  }

  handleApply() {
    let key = this.props.developer.key;
    firebaseDB.ref('developerApplications/' + key).push(this.state.newUser);
    let role = this.props.developer.name;
    sendEmail("","", this.state.newUser.email, "", "Application Received!", "", `<p>Hey ${this.state.newUser.name}, <br /><br />We have received your application for the ${role} role. We will review your application and get back to you.<br /><br />Regards,<br />Cribbl Services</p>`)
    this.setState({finished: true})
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
        disabled={this.state.finished}
        label={"Apply"}
        primary={true}
        onClick={this.handleApply}
        style={{margin: '0px 5px'}}
      />,
       
    ];

    return (
      <div>
        <Dialog
          title={<div><p style={{fontWeight: 700}}>{this.props.developer.name}</p><p hidden={this.props.isMobile} style={{fontSize: 15, lineHeight: '20px'}}>{this.props.developer.description}</p></div>}
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
          { this.state.finished ? (
              <div style={{minHeight: 100, marginTop: 20}}>
                <p>Hooray!</p>
                <p>We have received your application {this.state.newUser.name}. Sit back and relax while we review your resume.</p>
                <p>We will reach out to you via your email ({this.state.newUser.email}).</p>
              </div>
            ) :
            (<form>
              <div><p hidden={!this.props.isMobile} style={{fontSize: 15, lineHeight: '20px'}}>{this.props.developer.description}</p></div>
              <p style={{color: 'black', marginTop: 20}}>Name *</p>
              <TextField
                type="text"
                hintText="Your answer"
                value={this.state.newUser.name}
                onChange={(event) => this.handleChange(event, 'name')}
                required />

              <p style={{color: 'black', marginTop: 20}}>Email *</p>
              <TextField
                hintText="Your answer"
                value={this.state.newUser.email}
                onChange={(event) => this.handleChange(event, 'email')}
                required />

              <p style={{color: 'black', marginTop: 20}}>Contact Number *</p>
              <TextField
                hintText="Your answer"
                type="number"
                value={this.state.newUser.primaryContact}
                onChange={(event) => this.handleChange(event, 'primaryContact')}
                required />
                  
              <p style={{color: 'black', marginTop: 20}}>Which Clubs or Student Projects are you currently working for?</p>
              <TextField 
                hintText="Your answer" 
                type="text"
                onChange={(event) => this.handleChange(event, 'clubInfo')}
                value={this.state.newUser.clubInfo}
                style={{width: '90%'}} />
                  
              <p style={{color: 'black', marginTop: 20}}>Link to your resume *</p>
              <p style={{color: 'rgb(100, 100, 100)', fontSize: 14}}>You may upload on Google Drive. Please make sure that the resume is accessible</p>
              <TextField
                hintText="Your answer"
                value={this.state.newUser.cvLink}
                onChange={(event) => this.handleChange(event, 'cvLink')}
                style={{width: '90%'}}
                required />

            </form>
            )}
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