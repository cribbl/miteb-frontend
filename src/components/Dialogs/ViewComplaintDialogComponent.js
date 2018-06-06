import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton'
import ReplyIcon from 'material-ui/svg-icons/content/reply'
import {connect} from 'react-redux'

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

class Dialogxx extends Component {
  constructor(props){
    super(props);
    this.sendGmail = this.sendGmail.bind(this)
    this.state = {
      open: this.props.open,
    };
  }

  sendGmail() {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + this.props.currentComplaint.fields.email)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open})
  }

  render() {
    const FA_actions = [
      <FlatButton
        label="Close"
        primary={false}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Mars as Resolved"
        primary={false}
        onClick={() => this.props.resolveComplaint(this.props.currentComplaint, 'resolved')}
      />,
      <FlatButton
        label="Flag"
        primary={true}
        onClick={() => this.props.flagRejectHandler(this.props.currentComplaint, 'flag')}
      />,
      <FlatButton
        label="Approve"
        primary={true}
        onClick={() => this.props.approveHandler(this.props.currentComplaint)}
      />,
      <FlatButton
        label="Next"
        primary={true}
        onClick={this.props.nextComplaint}
      />,
    ];

    const Club_actions = [
      <FlatButton
        label="Close"
        primary={false}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Mark as Resolved"
        primary={true}
        onClick={() => this.props.resolveComplaint(this.props.currentComplaint, 'resolved')}
      />,
      <FlatButton
        label="Next"
        primary={true}
        onClick={this.props.nextComplaint}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.props.currentComplaint.dated}
          actions={this.props.user && this.props.user.isClub ? Club_actions : FA_actions}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent={true}
          contentStyle={{width: this.props.isMobile ? '97%' : '60%', maxWidth: 'none'}}
        >
        
        <div>
        {!this.props.currentComplaint.goAnonymous && (
          <div>
          <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
            <p style={styles.label}>Name</p>
            <p style={styles.value}>{this.props.currentComplaint.fields.name}</p>
          </div>
          <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
            <p style={styles.label}>Email</p>
            <p style={styles.value}>{this.props.currentComplaint.fields.email}
            <IconButton onClick={this.sendGmail} style={{padding: 0, height: 20, width: 20}}><ReplyIcon viewBox='0 0 30 30' />}</IconButton>
            </p>
          </div>
          <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
            <p style={styles.label}>Reg No</p>
            <p style={styles.value}>{this.props.currentComplaint.fields.regNo}</p>
          </div>
          <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
            <p style={styles.label}>Contact No</p>
            <p style={styles.value}>{this.props.currentComplaint.fields.contactNo}</p>
          </div>
          <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
            <p style={styles.label}>Year & Branch</p>
            <p style={styles.value}>{this.props.currentComplaint.fields.year} - {this.props.currentComplaint.fields.branch}</p>
          </div>
          </div>
        )}
          <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
            <p style={styles.label}>Subject</p>
            <p style={styles.value}>{this.props.currentComplaint.subject}</p>
          </div>
          <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
            <p style={styles.label}>Description</p>
            <p style={styles.value}>{this.props.currentComplaint.desc}</p>
          </div>
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

export default connect(mapStateToProps)(Dialogxx)