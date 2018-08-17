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

class ViewComplaintDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: this.props.open,
    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open})
  }

  render() {
    const Club_actions = [
      <FlatButton
        label="Close"
        primary={false}
        onClick={this.props.handleClose}
      />,
      <RaisedButton
        label={this.props.currentComplaint.isResolved ? "Mark as Unresolved" : "Mark as Resolved"}
        primary={!this.props.currentComplaint.isResolved}
        onClick={() => this.props.resolveComplaint(this.props.currentComplaint, !this.props.currentComplaint.isResolved)}
        style={{position: 'absolute', top: '6.5%', right: '3%'}}
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
          actions={Club_actions}
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
            <p style={styles.value}>{this.props.currentComplaint.fields.email}</p>
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

export default connect(mapStateToProps)(ViewComplaintDialog)