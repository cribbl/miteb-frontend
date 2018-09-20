import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'

import {confirmOTP} from '../../Services/NotificationService'

class OtpDialog extends Component {
  constructor(props){
    super(props)
    this.changeOtp = this.changeOtp.bind(this)
    this.state = {
      open: this.props.open,
      otp: '',
    };
  }

  changeOtp (e) {
    this.setState({ otp: e.target.value })
  }

    let _confirmOTP = () => {
    var scope = this;
    console.log('here');
    confirmOTP(this.state.otp, this.props.userDetails, (err) => {
      console.log(err)
      if(err)
        scope.setState({errorText: 'Some issue'})
      else {
        console.log("user details updated");
        scope.props.handleClose();
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({open: nextProps.open, otp: '', errorText: ''})
  }

  render() {
    const Flag_actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label={"Submit"}
        primary={true}
        onClick={this._confirmOTP}
      />,
    ];

    return (
      <div>
        <Dialog
          title={'OTP Dialog'}
          actions={Flag_actions}
          open={this.props.open}
          modal={true}
          onRequestClose={this.props.handleClose}
          contentStyle={{width: this.props.isMobile ? '97%' : '30%', maxWidth: 'none', background: 'red'}}
        >
        <TextField 
          floatingLabelText="Enter OTP"
          type="number"
          value={this.state.otp}
          onChange={this.changeOtp}
          errorText={this.state.errorText}
          required
        />
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

export default connect(mapStateToProps)(OtpDialog)