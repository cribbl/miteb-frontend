import React from 'react'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import DatePicker from 'material-ui/DatePicker'
import RoomsContainer from './Rooms'
import { firebaseDB } from '../../../firebaseConfig'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import moment from 'moment'
import { fetchRooms, updateDates, getDisabledDates } from '../../../Services/firebaseDBService'
import { sendPush } from '../../../Services/NotificationService'
import FinishedContainer from './FinishedContainer'

class HorizontalLinearStepper extends React.Component {
  constructor (props) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.getTakenRooms = this.getTakenRooms.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.shouldDisableDate = this.shouldDisableDate.bind(this)
    this.verifyRooms = this.verifyRooms.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)

    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 20)
    maxDate.setHours(0, 0, 0, 0)

    this.state = {
      fields: {
        booker_name: '',
        booker_email: '',
        booker_contact: '',
        booker_reg_no: '',
        title: '',
        desc: '',
        workshop: 'External'
      },
      fieldTouch: {
        booker_name: false,
        booker_email: false,
        booker_contact: false,
        booker_reg_no: false,
        title: false,
        desc: false
      },
      errors: {
        booker_name: '',
        booker_email: '',
        booker_contact: '',
        booker_reg_no: '',
        title: '',
        desc: ''
      },
      finished: false,
      stepIndex: 0,
      value: 1,
      startDate: null,
      endDate: null,
      today: new Date(),
      minDate: new Date(),
      maxDate: maxDate,
      SnackBarmessage: '',
      openSnackBar: false,
      autoHideDuration: 3000,
      isFormValid: false,
      selectedRooms: [],
      takenRooms: [],
      disabledDates: [],
      datesSelected: false,
      fetchingRooms: true,
      bookedEvent: null
    }
  }

  componentWillMount () {
    getDisabledDates((res) => {
      this.setState({ disabledDates: res })
    })
  }

  shouldDisableDate (day) {
    let date = moment(day).format('DD-MM-YYYY')
    if ((this.state.disabledDates).includes(date)) { return true }
    return false
  }

  formatDate (date) {
    return moment(date).format('ddd, DD MMM YYYY')
  }

  handleSelectedRooms (temp) {
    this.setState({ selectedRooms: temp })
    console.log(temp)
  }

  handleNext () {
    if (this.handleValidation(this.state.stepIndex)) {
      const { stepIndex } = this.state
      this.setState({ stepIndex: stepIndex + 1 })
    }
    if (this.state.stepIndex === 2) { this.handleSubmit() }
  }

  handlePrev () {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  handleChange (field, e) {
    let fields = this.state.fields
    fields[field] = e.target.value
    this.setState({ fields })

    this.handleValidation(this.state.stepIndex, field)
  }

  handleBlur (field, e) {
    let fieldTouch = this.state.fieldTouch
    fieldTouch[field] = true
    this.setState({ fieldTouch })

    this.handleValidation(this.state.stepIndex, field)
  }

  handleStartDate (event, startDate) {
    this.setState({ startDate: startDate })
    if (this.state.endDate) {
      this.getTakenRooms()
    }
  }

  handleEndDate (event, endDate) {
    this.setState({ endDate: endDate })
    if (this.state.startDate) { this.getTakenRooms() }
  }

  getTakenRooms () {
    let scope = this
    this.setState({ datesSelected: true, fetchingRooms: true })

    if (this.state.startDate <= this.state.endDate) {
      fetchRooms(this.state.startDate, this.state.endDate)
        .then(function (res) {
          scope.setState({ takenRooms: res, fetchingRooms: false })
          console.log('hello', scope.state.takenRooms)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  handleSnackBarClose () {
    this.setState({ openSnackBar: false })
  }

  handleValidation (stepIndex, field) {
    let isSO = this.props.user.isSO ? 1 : 0
    stepIndex = stepIndex + isSO // TODO : Hacky. Fix this.
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

    if (stepIndex === 0) {
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
        if (!/^[1-2][0-9]{8}$/.test(fields['booker_reg_no'])) {
          isFormValid = false
          errors['booker_reg_no'] = 'Registration number is not valid'
        }
      }
    }

    if (stepIndex === 1) {
      if (fields['title'].length < 1) {
        isFormValid = false
        errors['title'] = 'Cannot be empty'
      }

      if (fields['desc'].length < 1) {
        isFormValid = false
        errors['desc'] = 'Cannot be empty'
      }
    }

    this.setState({ errors: errors, isFormValid: isFormValid })
    return isFormValid
  }

  verifyRooms () {
    var scope = this
    var flag = false
    let selRooms = this.state.selectedRooms
    scope.setState({ fetchingRooms: true })
    return new Promise(function (resolve, reject) {
      fetchRooms(scope.state.startDate, scope.state.endDate)
        .then(function (takRooms) {
          selRooms.forEach(room => {
            if (takRooms.includes(room)) {
              flag = true
              let index = selRooms.indexOf(room)
              selRooms.splice(index, 1)
              scope.setState({ selectedRooms: selRooms, takenRooms: takRooms })
            }
          })
          scope.setState({ fetchingRooms: false })
          if (flag) {
            scope.setState({ SnackBarmessage: 'Rooms were changed. Please rebook', openSnackBar: true })
            reject(new Error('Rooms changed'))
          }
          resolve()
        })
    })
  }

  getADApprStatus () {
    if (this.props.user.isSC) return 'pending'
    else if (this.props.user.isSO) return 'approved'
    else return 'NA'
  }

  handleSubmit () {
    this.verifyRooms()
      .then(function () {
        let field = this.state.fields
        let startDate = this.state.startDate.toISOString()
        let endDate = this.state.endDate.toISOString()
        field['startDate'] = startDate
        field['endDate'] = endDate

        var newData = {
          'startDate': moment(field['startDate']).format('DD-MM-YYYY'),
          'endDate': moment(field['endDate']).format('DD-MM-YYYY'),
          'rooms': this.state.selectedRooms,
          'SC_appr': (this.props.user.isSC || this.props.user.isSO) ? 'approved' : 'pending',
          'FA_appr': (this.props.user.isSC || this.props.user.isSO) ? 'approved' : 'NA',
          'AD_appr': this.getADApprStatus(),
          'SO_appr': this.props.user.isSO ? 'approved' : 'NA',
          'booker_name': field['booker_name'],
          'booker_contact': field['booker_contact'],
          'booker_reg_no': field['booker_reg_no'],
          'booker_email': field['booker_email'],
          'title': field['title'],
          'desc': field['desc'],
          'type': field['workshop'],
          'notes': field['notes'] || null,
          'end_time': '7:45pm',
          'start_time': '5:45pm',
          'clubName': this.props.user.name,
          'clubEmail': this.props.user.email,
          'clubID': this.props.user.uid,
          'FA_name': this.props.user.isSO ? 'NA' : this.props.user.fa.name,
          'FA_date': this.props.user.isSC ? moment(this.state.today, 'DD-MM-YYYY').format('DD-MM-YYYY') : null
        }

        var eventID = newData.clubID.slice(0, 4)
        eventID = eventID.concat(newData.title.toLowerCase().slice(0, 4))
        eventID = eventID.concat(new Date().getTime() % 1000000)
        eventID = eventID.replace(/\s/g, '')

        firebaseDB.ref('/events/').child(eventID).set(newData)
        var scope = this
        firebaseDB.ref('/users/' + scope.props.user.uid + '/my_events/').push(eventID,
          function (res, err) {
            if (err) { console.log("couldn't be booked ", err) } else {
              updateDates(field['startDate'], field['endDate'], scope.state.selectedRooms, eventID)
              sendPush('SC', 'Dear SC, Approval requested!', 'Please approve the event by ' + scope.props.user.name + "'")
              scope.setState({ SnackBarmessage: 'Request for booking room successful', openSnackBar: true })
              scope.setState({ bookedEvent: newData, finished: true })
            }
          })
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
  }

  getStepContent (stepIndex) {
    let isSO = this.props.user.isSO ? 1 : 0
    // If the user is SO stepIndex 0 is case 1 and step index 1 is case 2
    switch (stepIndex + isSO) {
      case 0:
        return (<div style={{ marginBottom: 60 }}>
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
            type='number'
            onBlur={this.handleBlur.bind(this, 'booker_contact')}
            onChange={this.handleChange.bind(this, 'booker_contact')}
            value={this.state.fields['booker_contact']}
            style={{ marginLeft: 0 }}
            errorText={this.state.fieldTouch['booker_contact'] && this.state.errors['booker_contact']}
            errorStyle={{ position: 'absolute', bottom: -8 }}
            required
          />
          <br />

          <TextField
            floatingLabelText='Registration Number *'
            type='number'
            onBlur={this.handleBlur.bind(this, 'booker_reg_no')}
            onChange={this.handleChange.bind(this, 'booker_reg_no')}
            value={this.state.fields['booker_reg_no']}
            errorText={this.state.fieldTouch['booker_reg_no'] && this.state.errors['booker_reg_no']}
            errorStyle={{ position: 'absolute', bottom: -8 }}
            required
          />
          <br />
        </div>)
      case 1:
        return (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          <TextField
            style={{ textAlign: 'left' }}
            floatingLabelText='Event Description *'
            multiLine
            rows={1}
            rowsMax={this.props.isMobile ? 3 : 5}
            key={2}
            type='text'
            onChange={this.handleChange.bind(this, 'desc')}
            onBlur={this.handleBlur.bind(this, 'desc')}
            value={this.state.fields['desc']}
            errorText={this.state.fieldTouch['desc'] && this.state.errors['desc']}
            errorStyle={{ position: 'absolute', bottom: -8 }}
            required
          />
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

          <div>
            <RadioButtonGroup style={{ margin: 20 }}
              name='Workshop'
              defaultSelected='External'
              onChange={this.handleChange.bind(this, 'workshop')}>
              <RadioButton
                value='Internal'
                label='Internal Event'
                labelStyle={{ width: '100%' }}
              />

              <RadioButton
                value='External'
                label='External Event'
                labelStyle={{ width: '100%' }}
              />
            </RadioButtonGroup>
          </div>

        </div>)
      case 2: var self = this
        return (<div className='locationContainer' style={{ marginBottom: 50 }}>
          <div style={{ backgroundColor: '', display: 'flex', flexDirection: this.props.isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <DatePicker
              floatingLabelText='Start Date'
              mode={this.props.isMobile ? 'portrait' : 'landscape'}
              autoOk
              onChange={this.handleStartDate}
              value={this.state.startDate}
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
              value={this.state.endDate}
              disableYearSelection
              minDate={self.state.startDate ? self.state.startDate : self.state.minDate}
              maxDate={this.state.maxDate}
              formatDate={this.formatDate}
              shouldDisableDate={this.shouldDisableDate}
              required
            />
          </div>
          <RoomsContainer datesSelected={this.state.datesSelected} fetchingRooms={this.state.fetchingRooms} selectedRooms={this.state.selectedRooms} takenRooms={this.state.takenRooms} handleSelectedRooms={(temp) => this.handleSelectedRooms(temp)} />
        </div>)

      default: console.log('thank you screen')
    }
  }

  getStepperContent () {
    if (this.props.user.isSO) {
      return <Stepper linear={false} activeStep={this.state.stepIndex} orientation={this.props.isMobile ? 'vertical' : 'horizontal'} style={{ width: '80%', margin: '0 auto' }}>
        <Step>
          <StepLabel>Event Description</StepLabel>
        </Step>
        <Step>
          <StepLabel>Choose your Location</StepLabel>
        </Step>
      </Stepper>
    } else {
      return <Stepper linear={false} activeStep={this.state.stepIndex} orientation={this.props.isMobile ? 'vertical' : 'horizontal'} style={{ width: '80%', margin: '0 auto' }}>
        <Step>
          <StepLabel>Booker Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Event Description</StepLabel>
        </Step>
        <Step>
          <StepLabel>Choose your Location</StepLabel>
        </Step>
      </Stepper>
    }
  }

  render () {
    let finalIndex = this.props.user.isSO ? 1 : 2
    return (
      <div>
        <Paper style={{ width: this.props.isMobile ? '98%' : '90%', height: '100%', margin: 'auto', marginTop: '2%', marginBottom: '2%', minHeight: 600 }} zDepth={3}>

          <Snackbar
            open={this.state.openSnackBar}
            message={this.state.SnackBarmessage}
            autoHideDuration={this.state.autoHideDuration}
            onRequestClose={this.handleSnackBarClose}
          />

          <div style={{ backgroundColor: '', width: '100%', alignSelf: 'center', display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
            {this.state.finished ? (
              <FinishedContainer event={this.state.bookedEvent} />
            ) : (
              <div style={{ width: this.props.isMobile ? '95%' : '85%' }}>
                {this.getStepperContent()}
                <div>{this.getStepContent(this.state.stepIndex)}</div>
                <div style={{ marginBottom: 20 }}>
                  <FlatButton
                    label='Back'
                    hidden={this.state.stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{ marginRight: 60 }}
                  />
                  <RaisedButton
                    label={this.state.stepIndex === finalIndex ? 'Submit' : 'Next'}
                    primary
                    onClick={this.state.stepIndex === finalIndex ? this.handleSubmit : this.handleNext}
                    disabled={!this.state.isFormValid || (this.state.stepIndex === finalIndex && this.state.selectedRooms.length === 0)}
                  />
                </div>
              </div>
            )}
          </div>
        </Paper>
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

export default connect(mapStateToProps)(HorizontalLinearStepper)
