import React, {Component} from 'react';
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper'
import ComplaintsContent from './ComplaintsContent'
import RaisedButton from 'material-ui/RaisedButton'
import {firebaseDB} from '../../firebaseConfig'

class ComplaintsComponent extends Component {
  constructor (props) {
    super(props);
    this.handleAnonymous = this.handleAnonymous.bind(this)
    this.handleDescChange = this.handleDescChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      fields: {
        name: '',
        email: '',
        regNo: '',
        contactNo: '',
      },
      desc: '',
      goAnonymous: false,
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }

  handleSelectChange(field, e, index, value) {
    let fields = this.state.fields;
    fields[field] = value;
    this.setState({fields});
  }

  handleAnonymous(event, isInputChecked) {
    this.setState({goAnonymous: isInputChecked})
  }

  handleDescChange(e) {
    this.setState({desc: e.target.value})
  }

  handleSubmit() {
    var complaint = {};
    if(!this.state.goAnonymous)
      complaint['fields'] = this.state.fields;
    complaint['goAnonymous'] = this.state.goAnonymous;
    complaint['desc'] = this.state.desc;
    firebaseDB.ref('complaints').push(complaint)
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
    	  <div style={{display: 'flex', flexDirection: this.props.isMobile ? 'column' : 'row'}}>
      		<div style={{width: this.props.isMobile ? '100%' : '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10}}>
          <Paper style={{width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 15, backgroundColor: ''}} zDepth={2}>
            <Toggle
              label="Go Anonymous"
              onToggle={this.handleAnonymous}
              style={{width: '100%'}}
            />
            <TextField
              floatingLabelText="Name *"
              type="text"
              onChange={this.handleChange.bind(this, "name")}
              value={this.state.fields["name"]}
              disabled={this.state.goAnonymous}
              required
            />
            <TextField
              floatingLabelText="Email *"
              type="email"
              onChange={this.handleChange.bind(this, "email")}
              value={this.state.fields["email"]}
              disabled={this.state.goAnonymous}
              required
            />
            <TextField
              floatingLabelText="Registration Number *"
              type="number"
              onChange={this.handleChange.bind(this, "regNo")}
              value={this.state.fields["regNo"]}
              disabled={this.state.goAnonymous}
              required
            />
            <TextField
              floatingLabelText="Contact Number *"
              type="number"
              onChange={this.handleChange.bind(this, "contactNo")}
              value={this.state.fields["contactNo"]}
              disabled={this.state.goAnonymous}
              required
            />
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <SelectField
                floatingLabelText="Branch"
                value={this.state.fields.branch}
                onChange={this.handleSelectChange.bind(this, "branch")}
                style={{width: '40%'}}
              >
                <MenuItem value={"CSE"} primaryText="CSE" />
                <MenuItem value={"IT"} primaryText="IT" />
                <MenuItem value={"Mech"} primaryText="Mech" />
                <MenuItem value={"Aero"} primaryText="Aero" />
                <MenuItem value={"Civil"} primaryText="Civil" />
              </SelectField>
              <SelectField
                floatingLabelText="Year"
                value={this.state.fields.year}
                onChange={this.handleSelectChange.bind(this, "year")}
                style={{width: '40%'}}
              >
                <MenuItem value={"1"} primaryText="First" />
                <MenuItem value={"2"} primaryText="Second" />
                <MenuItem value={"3"} primaryText="Third" />
                <MenuItem value={"4"} primaryText="Fourth" />
              </SelectField>
            </div>
          </Paper>
          </div>
          <div style={{width: this.props.isMobile ? '100%' : '60%', display: 'flex', alignItems: '', justifyContent: 'center', padding: 10}}>
            <ComplaintsContent handleDescChange={this.handleDescChange}/>
          </div>
	      </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
          <RaisedButton primary={true} label={"Submit"} onClick={this.handleSubmit} />
        </div>
      </div>
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