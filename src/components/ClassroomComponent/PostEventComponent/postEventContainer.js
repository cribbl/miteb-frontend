import React from 'react'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import { firebaseDB } from '../../../firebaseConfig'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
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
      debitArray: []
    }
    this.handlePrev = this.handlePrev.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderEditable = this.renderEditable.bind(this)
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
          whiteSpace: 'normal'
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
        return 'Hello'
      default:
        return 'Hello'
    }
  }
  handleNext () {
    console.log('claaddedd')
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
    this.setState((state) => {
      return { finished: true, tParticipantsError: '', eParticipantsError: '' }
    })
    this.setState({ tParticipantsError: '', eParticipantsError: '' })
    var eventID = this.props.currEvent.key
    var updates = {}
    console.log(eventID)
    updates['/events/' + eventID + '/postEventDetails/creditArray'] = this.state.creditArray
    updates['/events/' + eventID + '/postEventDetails/debitArray'] = this.state.debitArray
    // updates['/events/' + eventID + '/postEventDetails/totalParticipants'] = this.state.totalParticipants
    // updates['/events/' + eventID + '/postEventDetails/externalParticipants'] = this.state.externalParticipants
    // updates['/events/' + eventID + '/postEventDetails/notes'] = this.state.notes
    updates['/events/' + eventID + '/postEventFlag'] = true
    firebaseDB.ref().update(updates)
  }
  render () {
    console.log(this.state.finished)
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
                <div>
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
                </div>
              )
            )}
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
