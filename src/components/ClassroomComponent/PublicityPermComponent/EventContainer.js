import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import moment from 'moment'

class EventContainer extends React.Component {
  constructor (props) {
    super(props)

    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 1)
    maxDate.setHours(0, 0, 0, 0)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.shouldDisableDate = this.shouldDisableDate.bind(this)

    this.state = {
      checkboxValue: 0,
      checked: [true, false, false, false],
      today: new Date(),
      minDate: new Date(),
      maxDate: maxDate,
      startDate: null,
      endDate: null,
      disabledDates: [],
      fieldTouch: {
        title: false
      },
      errors: {
        title: ''
      }
    }
  }
  componentWillMount () {
    var result = (this.props.fields['title']).length !== 0
    this.setState({
      isFormValid: result,
      fields: this.props.fields
    })
    this.props.updateFormState(null, result)
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
    this.props.updateFormState(null, result)
  }

  handleBlur (field, e) {
    let fieldTouch = this.state.fieldTouch
    fieldTouch[field] = true
    this.setState({ fieldTouch })
    let result = this.handleValidation(field)
    this.props.updateFormState(null, result)
  }

  handleStartDate (event, startDate) {
    var field = this.state.fields
    field['startDate'] = startDate
    this.setState({
      fields: field,
      startDate: startDate
    })
    this.props.updateFields(field)
  }

  handleEndDate (event, endDate) {
    var field = this.state.fields
    field['endDate'] = endDate
    this.setState({
      fields: field,
      endDate: endDate
    })
    this.props.updateFields(field)
  }

  shouldDisableDate (day) {
    let date = moment(day).format('DD-MM-YYYY')
    if ((this.state.disabledDates).includes(date)) { return true }
    return false
  }

  formatDate (date) {
    return moment(date).format('ddd, DD MMM YYYY')
  }

  handleValidation (field) {
    let fields = this.state.fields
    let errors = {
      title: ''
    }
    let isFormValid = true
    if (fields['title'].length < 1) {
      isFormValid = false
      errors['title'] = 'Cannot be empty'
    }

    this.setState({ errors: errors, isFormValid: isFormValid })
    this.props.updateFormState(null, isFormValid)
    return isFormValid
  }

  render () {
    var self = this
    return (
      <div style={{ backgroundColor: '', display: 'flex', flexDirection: this.props.isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginTop: 16 }}>
          <h6> Publicity Dates </h6>
          <DatePicker
            floatingLabelText='Start Date'
            mode={this.props.isMobile ? 'portrait' : 'landscape'}
            autoOk
            onChange={this.handleStartDate}
            value={this.props.fields['startDate']}
            disableYearSelection
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            formatDate={this.formatDate}
            shouldDisableDate={this.shouldDisableDate}
            errorText={this.state.endDate && this.state.startDate > this.state.endDate && 'Start date should be less than end date'}
            errorStyle={{ position: 'absolute', bottom: -8 }}
            required
          />
          <DatePicker
            floatingLabelText='End Date'
            mode={this.props.isMobile ? 'portrait' : 'landscape'}
            autoOk
            onChange={this.handleEndDate}
            value={this.props.fields['endDate']}
            shouldDisableDate={this.day}
            disableYearSelection
            minDate={self.state.startDate ? self.state.startDate : self.state.minDate}
            maxDate={this.state.maxDate}
            formatDate={this.formatDate}
            shouldDisableDate={this.shouldDisableDate}
            required
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <h6> Event Details </h6>
          <TextField
            floatingLabelText='Title *'
            key={1}
            onChange={this.handleChange.bind(this, 'title')}
            onBlur={this.handleBlur.bind(this, 'title')}
            type='text'
            value={this.state.fields['title']}
            errorText={this.state.fieldTouch['title'] && this.state.errors['title']}
            errorStyle={{ position: 'absolute', bottom: -8 }}
            required
          />
          <br />
          <TextField
            multiLine
            rows={1}
            rowsMax={this.props.isMobile ? 3 : 5}
            style={{ textAlign: 'left' }}
            floatingLabelText='Notes'
            type='text'
            onChange={this.handleChange.bind(this, 'notes')}
            value={this.state.fields['notes']}
            errorText={this.state.errors['notes']}
            errorStyle={{ position: 'absolute', bottom: -8 }}
          />
        </div>
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

export default connect(mapStateToProps)(EventContainer)
