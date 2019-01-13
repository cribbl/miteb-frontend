import React from 'react'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import { firebaseDB } from '../../../firebaseConfig'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import IconButton from 'material-ui/IconButton'
import Clear from 'material-ui/svg-icons/content/clear'
import Paper from 'material-ui/Paper'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import FinishedContainer from './FinishedContainer'
import 'react-table/react-table.css'

function makeData (len = 5553) {
  const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
      arr.push(i)
    }
    return arr
  }
  const newPerson = () => {
    return {
      category: '',
      amount: 0
    }
  }
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    }
  })
}

class postEventContainer extends React.Component {
  constructor (props) {
    super(props)
    this.cols = ['category', 'amount']
    this.state = {
      disableNext: false,
      finished: false,
      stepIndex: 0,
      creditArray: [],
      debitArray: [],
      clubName: '',
      totalParticipants: '',
      externalParticipants: '',
      eventName: '',
      eventType: null,
      scale: null,
      eventDate: new Date()
    }
    this.handlePrev = this.handlePrev.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderEditable = this.renderEditable.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
  }
  handleDelete (index, name) {
    return () => {
      this.setState((prev) => {
        let arr = prev[name]
        arr.splice(index, 1)
        return { [name]: arr }
      })
    }
  }
  handleChange (name) {
    return (e) => {
      this.setState({ [name]: e.target.value })
    }
  }
  handleSelectChange (name) {
    return (event, index, value) => {
      this.setState({ [name]: value })
    }
  }
  handleFieldChange (name) {
    return (e, value) => {
      console.log(value)
      this.setState({ [name]: new Date(value) })
    }
  }
  renderEditable (name, cellInfo) {
    return (
      <div
        style={{
          margin: 0,
          padding: 0,
          height: '100%',
          width: '100%',
          backgroundColor: '#fafafa',
          wordWrap: 'break-word',
          wordBreak: 'break-all',
          whiteSpace: 'normal',
          textAlign: 'left'
        }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state[name]]
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML
          this.setState({ [name]: data })
        }}
        dangerouslySetInnerHTML={{
          __html: this.state[name][cellInfo.index][cellInfo.column.id]
        }}
      />
    )
  }
  getStepContent (index) {
    const { isMobile } = this.props
    switch (index) {
      case 0:
        return (
          <div key={'creditTable'} style={{ margin: 'auto', maxHeight: '100%', width: '100%', overflow: 'auto' }} >
            <ReactTable
              resizable={false}
              showPageSizeOptions={false}
              data={this.state.creditArray}
              columns={[
                {
                  Header: 'Category',
                  accessor: 'category',
                  Cell: this.renderEditable.bind(this, 'creditArray')
                },
                {
                  Header: 'Amount',
                  width: isMobile ? 60 : 100,
                  accessor: 'amount',
                  Cell: this.renderEditable.bind(this, 'creditArray')
                },
                {
                  Header: '',
                  width: isMobile ? 60 : 100,
                  accessor: 'del',
                  id: 'del',
                  Cell: (info) => {
                    return (
                      <IconButton iconStyle={{ width: 25, height: 25 }} onClick={this.handleDelete(info.index, 'creditArray')} >
                        <Clear />
                      </IconButton>
                    )
                  }
                }
              ]}
              defaultPageSize={10}
              className='-striped -highlight'
            />
            <FlatButton
              label='Add Row'
              onClick={() => {
                this.setState((prev) => ({ creditArray: prev.creditArray.concat(makeData(1)) }))
              }}
              style={{
                color: 'white',
                backgroundColor: '#00BCD4',
                display: 'block',
                margin: '1em auto'
              }}
            />
          </div>
        )
      case 1:
        return (
          <div key={'debitTable'} style={{ margin: 'auto', width: '100%' }} >
            <ReactTable
              showPageSizeOptions={false}
              data={this.state.debitArray}
              columns={[
                {
                  Header: 'Category',
                  accessor: 'category',
                  Cell: this.renderEditable.bind(this, 'debitArray')
                },
                {
                  Header: 'Amount',
                  accessor: 'amount',
                  width: isMobile ? 60 : 100,
                  Cell: this.renderEditable.bind(this, 'debitArray')
                },
                {
                  Header: '',
                  width: isMobile ? 60 : 100,
                  accessor: 'del',
                  id: 'del',
                  Cell: (info) => {
                    return (
                      <IconButton onClick={this.handleDelete(info.index, 'debitArray')} >
                        <Clear />
                      </IconButton>
                    )
                  }
                }
              ]}
              defaultPageSize={10}
              className='-striped -highlight'
            />
            <FlatButton
              label='Add Row'
              onClick={() => {
                this.setState((prev) => ({ debitArray: prev.debitArray.concat(makeData(1)) }))
              }}
              style={{
                color: 'white',
                backgroundColor: '#00BCD4',
                display: 'block',
                margin: '1em auto'
              }}
            />
          </div>
        )
      case 2:
        return (
          <div style={{ display: 'inline-block', margin: '1em auto', padding: '1em', width: isMobile ? '90%' : '50%' }} >
            <TextField
              fullWidth
              floatingLabelText={'Club Name*'}
              value={this.state.clubName}
              onBlur={this.handleChange('clubName')}
              onChange={this.handleChange('clubName')}
              required
            />
            <br />
            <TextField
              fullWidth
              floatingLabelText={'Event Name*'}
              value={this.state.eventName}
              onBlur={this.handleChange('eventName')}
              onChange={this.handleChange('eventName')}
              required
            />
            <br />
            <SelectField
              fullWidth
              style={{ textAlign: 'left' }}
              floatingLabelText={'Type*'}
              value={this.state.eventType}
              onChange={this.handleSelectChange('eventType')}
            >
              <MenuItem value={'technical'} primaryText='Technical' />
              <MenuItem value={'cultural'} primaryText='Cultural' />
              <MenuItem value={'social'} primaryText='Social' />
              <MenuItem value={'financial'} primaryText='Financial' />
            </SelectField>
            <br />
            <SelectField
              fullWidth
              style={{ textAlign: 'left' }}
              floatingLabelText={'Scale*'}
              value={this.state.scale}
              onChange={this.handleSelectChange('scale')}
            >
              <MenuItem value={'local'} primaryText='Local' />
              <MenuItem value={'cultural'} primaryText='National' />
              <MenuItem value={'social'} primaryText='Interntional' />
            </SelectField>
            <br />
            <DatePicker fullWidth hintText='Date*' mode='landscape' value={this.state.eventDate} onChange={this.handleFieldChange('eventDate')} />
            <TextField
              fullWidth
              floatingLabelText={'Total participants*'}
              value={this.state.totalParticipants}
              onBlur={this.handleChange('totalParticipants')}
              onChange={this.handleChange('totalParticipants')}
              required
            />
            <br />
            <TextField
              fullWidth
              floatingLabelText={'External participants*'}
              value={this.state.externalParticipants}
              onBlur={this.handleChange('externalParticipants')}
              onChange={this.handleChange('externalParticipants')}
              required
            />
            <br />
            <TextField
              fullWidth
              multiLine
              rows={1}
              style={{ textAlign: 'left' }}
              floatingLabelText='Notes'
              type='text'
              onChange={this.handleNotes}
              value={this.state.notes}
            />
          </div>

        )
      default:
        return 'Hello'
    }
  }
  handleNext () {
    const { stepIndex } = this.state
    var flagCred = false
    var flagDeb = false
    this.state.creditArray.forEach((val) => {
      this.cols.forEach((field) => {
        if (val[field] === '') {
          flagCred = true
        }
      })
    })
    this.state.debitArray.forEach((val) => {
      this.cols.forEach((field) => {
        if (val[field] === '') {
          flagDeb = true
        }
      })
    })
    if ((stepIndex === 0 && this.state.creditArray.length === 0) || flagCred) {
      if (flagCred) {
        this.setState({ err: '1 or more fields are not filled' })
      } else {
        this.setState({ err: 'Please Enter atleast one field' })
      }
    } else if ((stepIndex === 1 && this.state.debitArray.length === 0) || flagDeb) {
      if (flagDeb) {
        this.setState({ err: '1 or more fields are not filled' })
      } else {
        this.setState({ err: 'Please Enter atleast one field' })
      }
    } else {
      this.setState({ err: '' })
      if (stepIndex < 2) {
        this.setState({ stepIndex: stepIndex + 1 })
      }
    }
  }
  handlePrev () {
    const { stepIndex } = this.state

    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }
  handleSubmit () {
    if (this.state.totalParticipants === 0 || this.state.externalParticipants === 0) {
      this.setState({ err: 'All * fields are mandatory' })
    } else if (!this.state.clubName || !this.state.eventName || !this.state.eventType || !this.state.scale || !this.state.eventDate) {
      this.setState({ err: 'All * fields are mandatory' })
    } else {
      this.setState((state) => {
        return { finished: true, tParticipantsError: '', eParticipantsError: '' }
      })
      this.setState({ tParticipantsError: '', eParticipantsError: '' })
      var eventID = this.props.currEvent.key
      var updates = {}
      updates['/events/' + eventID + '/postEventDetails/creditArray'] = this.state.creditArray
      updates['/events/' + eventID + '/postEventDetails/debitArray'] = this.state.debitArray
      updates['/events/' + eventID + '/postEventDetails/totalParticipants'] = this.state.totalParticipants
      updates['/events/' + eventID + '/postEventDetails/externalParticipants'] = this.state.externalParticipants
      updates['/events/' + eventID + '/postEventDetails/clubName'] = this.state.clubName
      updates['/events/' + eventID + '/postEventDetails/eventName'] = this.state.eventName
      updates['/events/' + eventID + '/postEventDetails/eventType'] = this.state.eventType
      updates['/events/' + eventID + '/postEventDetails/scale'] = this.state.scale
      updates['/events/' + eventID + '/postEventDetails/eventDate'] = this.state.eventDate.toUTCString()
      updates['/events/' + eventID + '/postEventDetails/notes'] = this.state.notes
      updates['/events/' + eventID + '/postEventFlag'] = true
      firebaseDB.ref().update(updates)
    }
  }
  render () {
    let { isMobile } = this.props
    return (
      <Paper zDepth={2} style={{
        margin: '1em',
        minHeight: '80vh',
        padding: '1em'
      }} >
        <div style={{
          position: 'relative',
          width: '90%',
          minHeight: '78vh',
          margin: '1em auto',
          overflow: 'auto',
          padding: '1em 0em'
        }}>
          {this.state.finished ? (<FinishedContainer event={this.props.currEvent} />)
            : (
              (
                <div style={{ textAlign: 'center' }} >
                  <Stepper activeStep={this.state.stepIndex} style={{ width: '100%', margin: '0 auto' }} orientation={isMobile ? 'vertical' : 'horizontal'} >
                    <Step>
                      <StepLabel>Credit</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Debit</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Participation</StepLabel>
                    </Step>
                  </Stepper>
                  <p style={{ color: '#E30022', margin: '0.25rem auto' }}>{this.state.err}</p>
                  {this.getStepContent(this.state.stepIndex)}
                  <div style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 0
                  }}
                  >
                    <FlatButton
                      label='Back'
                      disabled={this.state.stepIndex === 0}
                      onClick={this.handlePrev}
                      style={{ float: 'left' }}
                    />
                    <RaisedButton
                      disabled={this.state.disableNext}
                      label={this.state.stepIndex === 2 ? 'Submit' : 'Next'}
                      primary
                      onClick={this.state.stepIndex === 2 ? this.handleSubmit : this.handleNext}
                      style={{ float: 'right' }}
                    />
                  </div>
                </div>
              )
            )}
        </div>
      </Paper>
    )
  }
}

function mapStateToProps (state) {
  const { isMobile } = state.toggler
  const { user, currEvent } = state.authentication
  return {
    isMobile,
    user,
    currEvent
  }
}

export default connect(mapStateToProps)(postEventContainer)
