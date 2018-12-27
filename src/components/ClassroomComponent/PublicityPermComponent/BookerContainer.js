import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
// import { Route , Link } from 'react-router';

class BookerContainer extends React.Component {
  constructor (props) {
    super(props)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      // fields: {
      //   booker_name: '',
      //   booker_email: 'random@email.com',
      //   booker_contact: '9898989898',
      //   booker_reg_no: '150911111',
      //   title: '',
      //   desc: 'Some random description of a random event of this random Dummy MIT Club',
      //   workshop: 'External'
      // },
      fieldTouch: {
        booker_name: false,
        booker_email: false,
        booker_contact: false,
        booker_reg_no: false
      },
      errors: {
        booker_name: '',
        booker_email: '',
        booker_contact: '',
        booker_reg_no: '',
        title: '',
        desc: ''
      },
      isFormValid: true
    }
  }
  componentWillMount () {
    this.setState({
      isFormValid: false,
      fields: this.props.fields
    })
  }
  componentWillReceiveProps (nextProps) {
    var fields = nextProps.fields
    this.callFunction(fields)
  }
  callFunction (fields) {
    this.setState({
      fields: fields
    })
  }
  handleChange (field, e) {
    let fields = this.state.fields
    fields[field] = e.target.value
    this.setState({ fields })
    let result = this.handleValidation(field)
    this.props.updateFormState(result, null)
  };

  handleBlur (field, e) {
    let fieldTouch = this.state.fieldTouch
    fieldTouch[field] = true
    this.setState({ fieldTouch })
    let result = this.handleValidation(field)
    this.props.updateFormState(result, null)
  };
  handleValidation (field) {
    let fields = this.state.fields
    let errors = {
      booker_name: '',
      booker_email: '',
      booker_contact: '',
      booker_reg_no: '',
      title: '',
      desc: ''
    }
    let isFormValid = true
    if (fields['booker_name'].length < 1) {
      isFormValid = false
      errors['booker_name'] = 'Cannot be empty'
    }

    if (fields['booker_email'].length < 1) {
      isFormValid = false
      errors['booker_email'] = 'Cannot be empty'
    }

    if (fields['booker_email'].length >= 1) {
      if (!/^(([^[<>()[\]\\.,:@"]+(\.[^<>()[\]\\.,:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z.-0-9])+[a-zA-Z]))$/.test(fields['booker_email'])) {
        isFormValid = false
        errors['booker_email'] = 'Email is not valid'
      }
    }

    if (fields['booker_contact'].length < 1) {
      isFormValid = false
      errors['booker_contact'] = 'Cannot be empty'
    }

    if (fields['booker_contact'].length >= 1) {
      if (!/^[0-9]{10}$/.test(fields['booker_contact'])) {
        isFormValid = false
        errors['booker_contact'] = 'Invalid contact number'
      }
    }

    if (fields['booker_reg_no'].length < 1) {
      isFormValid = false
      errors['booker_reg_no'] = 'Cannot be empty'
    }

    if (fields['booker_reg_no'].length >= 1) {
      if (!/^1[1-8][0-9]{7}$/.test(fields['booker_reg_no'])) {
        isFormValid = false
        errors['booker_reg_no'] = 'Registration number is not valid'
      }
    }
    this.setState({ errors: errors, isFormValid: isFormValid })
    this.props.updateFormState(isFormValid, null)
    if (isFormValid) { this.props.updateFields(fields) }
    return isFormValid
  }
  render () {
    return (
      <div>
        <TextField
          floatingLabelText='Name *'
          type='text'
          onChange={this.handleChange.bind(this, 'booker_name')}
          onBlur={this.handleBlur.bind(this, 'booker_name')}
          value={this.state.fields['booker_name']}
          errorText={this.state.fieldTouch['booker_name'] && this.state.errors['booker_name']}
          errorStyle={{ position: 'absolute', bottom: -8 }}
          required

        />
        <br />

        <TextField
          floatingLabelText='Email *'
          type='text'
          onChange={this.handleChange.bind(this, 'booker_email')}
          onBlur={this.handleBlur.bind(this, 'booker_email')}
          value={this.state.fields['booker_email']}
          errorText={this.state.fieldTouch['booker_email'] && this.state.errors['booker_email']}
          errorStyle={{ position: 'absolute', bottom: -8 }}
          required
        />
        <br />

        <TextField
          floatingLabelText='Contact Number *'
          type='text'
          onBlur={this.handleBlur.bind(this, 'booker_contact')}
          onChange={this.handleChange.bind(this, 'booker_contact')}
          value={this.state.fields['booker_contact']}
          errorText={this.state.fieldTouch['booker_contact'] && this.state.errors['booker_contact']}
          errorStyle={{ position: 'absolute', bottom: -8 }}
          required
        />
        <br />

        <TextField
          floatingLabelText='Registration Number *'
          type='text'
          onBlur={this.handleBlur.bind(this, 'booker_reg_no')}
          onChange={this.handleChange.bind(this, 'booker_reg_no')}
          value={this.state.fields['booker_reg_no']}
          errorText={this.state.fieldTouch['booker_reg_no'] && this.state.errors['booker_reg_no']}
          errorStyle={{ position: 'absolute', bottom: -8 }}
          required
        />
      </div>
    )
  }
}
function mapStateToProps (state) {
  const { isMobile } = state.toggler
  const { user } = state.authentication
  return {
    isMobile,
    user
  }
}

export default connect(mapStateToProps)(BookerContainer)
