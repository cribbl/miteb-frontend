import React, { Component } from 'react';
import { firebaseDB } from '../../../firebaseConfig'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FinishedContainer from './FinishedContainer.js'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import { StepContent } from 'material-ui/Stepper';
import EditTable from '../../EditTable/EditTable';
import { Typography } from '@material-ui/core/Typography';

class postEventComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableNext: false,
      stepIndex: 0,
      creditArray: [],
      debitArray: [],
      credit: {
        category: '',
        amt: '',
      },
      debit: {
        category: '',
        amt: ''
      },
      totalParticipants: 0,
      externalParticipants: 0,
      tParticipantsError: '',
      eParticipantsError: '',
      creditErr: '',
      debitErr: '',
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      showCheckboxes: false,
      myArr: {},
      myArrx: {},
      allArr: {},
      originalArr: {},
      pendingArr: {},
      approvedArr: {},
      dialogOpen: false,
      currentEvent: {},
      fetching: true,
      searchContent: '',
      dateSort: null,
      notes: '',
      finished: false
    };
    this.cols = [
      { title: 'Category', fieldName: 'category', inputProps: {}, },
      { title: 'Amount', fieldName: 'amount', inputProps: { style: { textAlign: 'right' } }, style: { textAlign: 'right' } },
    ];
    this.cols2 = [
      { title: 'Category', fieldName: 'category', inputProps: {} },
      { title: 'Amount', fieldName: 'amount', inputProps: { style: { textAlign: 'right' } }, style: { textAlign: 'right' } },
    ]
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleCreditCategory = this.handleCreditCategory.bind(this);
    this.handleCreditAmount = this.handleCreditAmount.bind(this);
    this.handleDebitCategory = this.handleDebitCategory.bind(this);
    this.handleDebitAmount = this.handleDebitAmount.bind(this);
    this.handleExternalParticipants = this.handleExternalParticipants.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTotalParticipants = this.handleTotalParticipants.bind(this);
    this.handleRemoveDebit = this.handleRemoveDebit.bind(this);
    this.addCredit = this.addCredit.bind(this);
    this.addDebit = this.addDebit.bind(this);
    this.cleanCredit = this.cleanCredit.bind(this);
    this.handleRemoveCredit = this.handleRemoveCredit.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleCreditChange = this.handleCreditChange.bind(this);
    this.handleDebitChange = this.handleDebitChange.bind(this);
  }

  getStepContent(stepIndex) {

    const { creditErr, debitErr } = this.state;
    switch (stepIndex) {
      case 0:
        return (
          <div style={{ display: 'flex', textAlign: 'center', flexDirection: 'column', marginTop: '1em' }}>
            <p style={{ color: '#E30022', margin: '0.25rem' }}>{creditErr}</p>
            <div style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
              <EditTable
                key='credit'
                cols={this.cols}
                onChange={this.handleCreditChange}
                id='credit'
                rows={this.state.creditArray}
              />
            </div>
            <div style={{ height: '25px', marginBottom: 12, marginTop: 40 }}>
              <FlatButton
                label="Back"
                disabled={this.state.stepIndex == 0}
                onClick={this.handlePrev}
                style={{ float: 'left' }}
              />
              <RaisedButton
                disabled={this.state.disableNext}
                label={this.state.stepIndex === 2 ? 'Submit' : 'Next'}
                primary={true}
                onClick={this.state.stepIndex === 2 ? this.handleSubmit : this.handleNext}
                style={{ float: 'right' }}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div style={{ display: 'flex', textAlign: 'center', flexDirection: 'column', marginTop: '1em' }}>
            <p style={{ color: '#E30022', margin: '0.25rem' }}>{debitErr}</p>
            <div style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
              <EditTable
                key='debit'
                cols={this.cols2}
                onChange={this.handleDebitChange}
                id='debit'
                rows={this.state.debitArray}
              />
            </div>
            <div style={{ height: '25px', marginBottom: 12, marginTop: 40 }}>
              <FlatButton
                label="Back"
                disabled={this.state.stepIndex === 0}
                onClick={this.handlePrev}
                style={{ float: 'left' }}
              />
              <RaisedButton
                label={this.state.stepIndex === 2 ? 'Submit' : 'Next'}
                primary={true}
                onClick={this.state.stepIndex === 2 ? this.handleSubmit : this.handleNext}
                style={{ float: 'right' }}
              />
            </div>
          </div>

        )
      case 2:
        return (
          <div style={{ textAlign: 'center', marginTop: '3em', boxSizing: 'border-box' }}>
            <div style={{ height: '45vh' }}>
              <TextField
                floatingLabelText={"Total participants"}
                value={this.state.totalParticipants}
                onBlur={this.handleTotalParticipants}
                onChange={this.handleTotalParticipants}
                errorText={this.state.tParticipantsError}
                required
              />
              <br></br>
              <TextField
                floatingLabelText={"External participants"}
                value={this.state.externalParticipants}
                onBlur={this.handleExternalParticipants}
                onChange={this.handleExternalParticipants}
                errorText={this.state.eParticipantsError}
                required
              />
              <br></br>
              <TextField
                multiLine={true}
                rows={1}
                style={{ textAlign: 'left' }}
                floatingLabelText="Notes"
                type="text"
                onChange={this.handleNotes}
                value={this.state.notes}
              />
            </div>

            <div style={{ height: '25px', marginBottom: 12, marginTop: 40 }}>
              <FlatButton
                label="Back"
                disabled={this.state.stepIndex === 0}
                onClick={this.handlePrev}
                style={{ float: 'left' }}
              />
              <RaisedButton
                label={this.state.stepIndex === 2 ? 'Submit' : 'Next'}
                primary={true}
                onClick={this.state.stepIndex === 2 ? this.handleSubmit : this.handleNext}
                style={{ float: 'right' }}
              />
            </div>
          </div>
        );
    }
  }
  handleCreditChange(rows) {
    this.setState({ creditArray: rows, creditErr: '' });
  }
  handleDebitChange(rows) {
    this.setState({ debitArray: rows, debitErr: '' });
  }
  handleNotes(e) {
    this.setState({ notes: e.target.value })
  }

  handleRemoveCredit(index) {
    var credArr = this.state.creditArray
    if (credArr.length == 1) {
      this.setState({ creditArray: [] })
    } else {
      delete credArr[index]
      var newCredArr = []
      var j = 0
      for (var i = 0; i < credArr.length - 1; i++) {
        if (j == index) j++;
        newCredArr[i] = credArr[j++];
      }
      this.setState({ creditArray: newCredArr })
    }
  }

  handleRemoveDebit(index) {
    var debArr = this.state.debitArray
    if (debArr.length == 1) {
      this.setState({ debitArray: [] })
    } else {
      delete debArr[index]
      var newDebArr = []
      var j = 0
      for (var i = 0; i < debArr.length - 1; i++) {
        if (j == index) j++;
        newDebArr[i] = debArr[j++];
      }
      this.setState({ debitArray: newDebArr })
    }
  }

  handleCreditCategory(e) {
    this.setState({ credit: { category: e.target.value, amt: this.state.credit.amt } });
  }

  handleCreditAmount(e) {
    this.setState({ credit: { amt: e.target.value, category: this.state.credit.category } });
  }
  handleDebitCategory(e) {
    this.setState({ debit: { category: e.target.value, amt: this.state.debit.amt } });
  }

  handleDebitAmount(e) {
    this.setState({ debit: { amt: e.target.value, category: this.state.debit.category } });
  }
  addCredit() {
    if (this.state.credit.category == '' || this.state.credit.amt == '') {
      if (this.state.credit.category == '') {
        this.setState({ creditCatError: 'This field is empty' })
      }
      if (this.state.credit.amt == '') {
        this.setState({ creditAmtError: 'This field is empty' })
      }
    } else {
      this.setState({ creditCatError: '', creditAmtError: '' })
      let tempCreditArray = this.state.creditArray;
      tempCreditArray.push(this.state.credit);
      this.setState({ creditArray: tempCreditArray })
      this.cleanCredit()
    }
  }

  cleanCredit() {
    this.setState({ credit: { category: '', amt: '' } })
  }

  cleanDebit() {
    this.setState({ debit: { category: '', amt: '' } })
  }

  addDebit(category, amount) {
    if (this.state.debit.category == '' || this.state.debit.amt == '') {
      if (this.state.debit.category == '') {
        this.setState({ debitCatError: 'This field is empty' })
      }
      if (this.state.debit.amt == '') {
        this.setState({ debitAmtError: 'This field is empty' })
      }
    } else {
      this.setState({ debitCatError: '', debitAmtError: '' })
      let tempDebitArray = this.state.debitArray;
      tempDebitArray.push(this.state.debit);
      this.setState({ debitArray: tempDebitArray })
      this.cleanDebit()
    }
  }

  handleNext() {
    this.forceUpdate();
    const { stepIndex } = this.state;
    var flagCred = false;
    var flagDeb = false;
    this.state.creditArray.forEach((val) => {
      this.cols.forEach((field) => {
        if (val[field['fieldName']] === '') {
          flagCred = true;
        }
      });
    });
    this.state.debitArray.forEach((val) => {
      this.cols.forEach((field) => {
        if (val[field['fieldName']] === '') {
          flagDeb = true;
        }
      });
    });
    if ((stepIndex == 0 && this.state.creditArray.length == 0) || flagCred) {
      if (flagCred) {
        this.setState({ creditErr: '1 or more fields are not filled' });
      } else {
        this.setState({ creditErr: 'Please Enter atleast one field' });
      }
    } else if ((stepIndex == 1 && this.state.debitArray.length == 0) || flagDeb) {
      if (flagDeb) {
        this.setState({ debitErr: '1 or more fields are not filled' });
      } else {
        this.setState({ debitErr: 'Please Enter atleast one field' });
      }
    } else {
      this.setState({ creditErr: '', debitErr: '', });
      if (stepIndex < 2) {
        this.setState({ stepIndex: stepIndex + 1 });
      }
    }
  }

  handlePrev() {
    const { stepIndex } = this.state;

    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  handleSubmit() {
    if (this.state.totalParticipants == 0 || this.state.externalParticipants == 0) {
      if (this.state.totalParticipants == 0) {
        this.setState({ tParticipantsError: 'This field is empty' });
      }
      if (this.state.externalParticipants == 0) {
        this.setState({ eParticipantsError: 'This field is empty' });
      }
    } else {
      this.setState((state) => {
        return { finished: true, tParticipantsError: '', eParticipantsError: '' };
      }
      )
      this.setState({ tParticipantsError: '', eParticipantsError: '' });
      var eventID = this.props.currEvent.key;
      var updates = {};
      console.log(eventID);
      updates['/events/' + eventID + '/postEventDetails/creditArray'] = this.state.creditArray;
      updates['/events/' + eventID + '/postEventDetails/debitArray'] = this.state.debitArray;
      updates['/events/' + eventID + '/postEventDetails/totalParticipants'] = this.state.totalParticipants;
      updates['/events/' + eventID + '/postEventDetails/externalParticipants'] = this.state.externalParticipants;
      updates['/events/' + eventID + '/postEventDetails/notes'] = this.state.notes;
      updates['/events/' + eventID + '/postEventFlag'] = true;
      firebaseDB.ref().update(updates)
    }
  }

  handleTotalParticipants(e) {
    if (!isNaN(e.target.value)) {
      this.setState({ totalParticipants: e.target.value, tParticipantsError: '' });
    }
  }

  handleExternalParticipants(e) {
    if (!isNaN(e.target.value)) {
      this.setState({ externalParticipants: e.target.value, eParticipantsError: '' });
    }
  }

  render() {
    let { isMobile } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '1em 0.25em' : '1em 7em' }}>
        <Paper zDepth={2}>
          <div style={{ width: '100%', maxWidth: 700, height: 600, padding: '0em 0.5em', margin: 'auto', boxSizing: 'border-box', marginBottom: '10em' }}>
            {this.state.finished ? (<FinishedContainer event={this.props.currEvent} />) :
              (
                isMobile ? (
                  <div>
                    <Stepper activeStep={this.state.stepIndex} style={{ width: '100%', margin: '0 auto' }} orientation='vertical' >
                      <Step>
                        <StepLabel>Credit</StepLabel>
                        <StepContent>
                          {this.getStepContent(0)}
                        </StepContent>
                      </Step>
                      <Step>
                        <StepLabel>Debit</StepLabel>
                        <StepContent>
                          {this.getStepContent(1)}
                        </StepContent>
                      </Step>
                      <Step>
                        <StepLabel>Participation</StepLabel>
                        <StepContent>
                          {this.getStepContent(2)}
                        </StepContent>
                      </Step>
                    </Stepper>
                  </div>
                ) : (
                    <div>
                      <Stepper activeStep={this.state.stepIndex} style={{ width: '100%', margin: '0 auto' }}>
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
                      {this.getStepContent(this.state.stepIndex)}
                    </div>
                  )
              )}
          </div>
        </Paper>

      </div >
    )
  }
}

function mapStateToProps(state) {
  const { isMobile } = state.toggler
  const { user, currEvent } = state.authentication
  return {
    isMobile,
    user,
    currEvent
  }
}
export default connect(mapStateToProps)(postEventComponent);