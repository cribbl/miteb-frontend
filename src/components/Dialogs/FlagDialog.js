import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'

class FlagDialog extends Component {
  constructor(props){
    super(props)
    this.changeMessage = this.changeMessage.bind(this)
    this.state = {
      open: this.props.open,
      message: '',
    };
  }

  changeMessage (e) {
    this.setState({ message: e.target.value })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({open: nextProps.open})
  }

  render() {
    const Flag_actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label={this.props.mode == 'flag' ? 'Flag' : 'Reject'}
        primary={true}
        onClick={() => this.props.flagRejectHandler(this.props.currentEvent, this.state.message, this.props.mode)}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.props.currentEvent.title}
          actions={Flag_actions}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent={true}
          contentStyle={{width: this.props.isMobile ? '97%' : '60%', maxWidth: 'none'}}
        >
        <TextField 
          floatingLabelText="Message" 
          multiLine={true}
          value={this.state.message}
          onChange={this.changeMessage}
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

export default connect(mapStateToProps)(FlagDialog)