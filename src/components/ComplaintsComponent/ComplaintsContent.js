import React, {Component} from 'react';
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper'

class ComplaintsComponent extends Component {
  constructor (props) {
    super(props);
    this.handleDescChange = this.handleDescChange.bind(this)
    this.state = {
      desc: ''
    }
  }

  handleDescChange(e) {
    this.setState({desc: e.target.value});
    this.props.handleDescChange(e)
  };

  handleAnonymous(event, isInputChecked) {
    this.setState({goAnonymous: isInputChecked})
  }

  render() {
    return (
	    <Paper style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: '', padding: 15, backgroundColor: ''}} zDepth={2}>
        <p>Description</p>
        <textarea placeholder="" rows={15} onChange={this.handleDescChange} value={this.state.desc}>
          
        </textarea>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  const {openSideNav, isMobile} = state.toggler
  const {user, verified} = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile
  }
}

export default connect(mapStateToProps)(ComplaintsComponent)