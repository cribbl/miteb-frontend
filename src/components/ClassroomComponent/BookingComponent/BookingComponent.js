import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import { Route , Link } from 'react-router';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import RoomsContainer from './Rooms'
import axios from 'axios';
import {firebaseDB} from '../../../firebaseConfig'
import firebase from 'firebase'
import {connect} from 'react-redux'
import Snackbar from 'material-ui/Snackbar';
import moment from 'moment'
import {fetchRooms, updateDates, getDisabledDates} from '../../../Services/firebaseDBService'
import {sendPush, sendEmail} from '../../../Services/NotificationService'
import FinishedContainer from './FinishedContainer'

class HorizontalLinearStepper extends React.Component {
  constructor(props){
    super(props);

    this.handleBlur = this.handleBlur.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.getTakenRooms = this.getTakenRooms.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.shouldDisableDate = this.shouldDisableDate.bind(this)
    this.verifyRooms = this.verifyRooms.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      fields: {
        booker_name: '',
        booker_email: '',
        booker_contact: '',
        booker_reg_no: '',
        title: '',
        desc: '',
        workshop: 'External',
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
      start_date: null,
      end_date: null,
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
      bookedEvent: null,
    }       
  }

  componentWillMount() {
    getDisabledDates((res) => {
      this.setState({disabledDates: res})
    });
  }

  shouldDisableDate(day) {
    let date = moment(day).format('DD-MM-YYYY');
    if((this.state.disabledDates).includes(date))
      return true
    return false
  }

  formatDate(date) {
    return moment(date).format("ddd, DD MMM YYYY")
  }

  handleSelectedRooms(temp) {
    this.setState({selectedRooms: temp});
    console.log(temp);
  }
  
  handleNext = () => {
    if(this.handleValidation(this.state.stepIndex)){
      const {stepIndex} = this.state;
      this.setState({stepIndex: stepIndex + 1});
    }
    if(this.state.stepIndex == 2)
      this.handleSubmit();
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});

    this.handleValidation(this.state.stepIndex, field);
  };

  handleBlur(field, e) {
    let fieldTouch = this.state.fieldTouch;
    fieldTouch[field] = true;
    this.setState({fieldTouch})

    this.handleValidation(this.state.stepIndex, field);
  };

  handleStartDate(event, start_date) {
    this.setState({start_date: start_date})
    if(this.state.end_date) {
      this.getTakenRooms();
    }
  }

  handleEndDate(event, end_date) {
    this.setState({end_date: end_date})
    if(this.state.start_date)
      this.getTakenRooms();
  }
   
  getTakenRooms() {   
    let scope = this;
    this.setState({datesSelected: true, fetchingRooms: true})
    
    if(this.state.start_date <= this.state.end_date) {
      fetchRooms(this.state.start_date, this.state.end_date)
      .then(function (res) {
           scope.setState({takenRooms: res, fetchingRooms: false})
           console.log('hello', scope.state.takenRooms)
      })
      .catch(function (error) {
           console.log(error);
      });
    }
  }
 
  handleSnackBarClose() {
    this.setState({openSnackBar: false}) 
  }

  handleValidation(n,field) {
    let fields = this.state.fields;
    let fieldTouch = this.state.fieldTouch;
    let errors = {
      booker_name: '',
      booker_email: '',
      booker_contact: '',
      booker_reg_no: '',
      title: '',
      desc: ''
    };
    let isFormValid = true;

    if(n == 0) {
      if(fields["booker_name"].length < 1) {
        isFormValid = false;
        errors["booker_name"] = "Cannot be empty";
      }
      
      if(fields["booker_email"].length < 1) {
        isFormValid = false;
        errors["booker_email"] = "Cannot be empty";
      }

      if(fields["booker_email"].length >= 1) {
        if (!/^(([^[<>()\[\]\\.,;:@"]+(\.[^<>()\[\]\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\.-0-9])+[a-zA-Z]))$/.test(fields["booker_email"])) {
          isFormValid = false;
          errors["booker_email"] = "Email is not valid";
        }
      }

      if(fields["booker_contact"].length < 1) {
        isFormValid = false;
        errors["booker_contact"] = "Cannot be empty";
      }

      if(fields["booker_contact"].length >= 1) {
        if(!/^[0-9]{10}$/.test(fields["booker_contact"])){
          isFormValid = false;
          errors["booker_contact"] = "Invalid contact number"
        }
      }

      if(fields["booker_reg_no"].length < 1){
        isFormValid = false;
        errors["booker_reg_no"] = "Cannot be empty";
      }

      if(fields["booker_reg_no"].length >=1 ) {
        if (!/^1[1-8][0-9]{7}$/.test(fields["booker_reg_no"])) {
          isFormValid = false;
          errors["booker_reg_no"] = "Registration number is not valid";
        }
      }
    }

    if(n == 1) {
      if(fields["title"].length < 1){
        isFormValid = false;
        errors["title"] = "Cannot be empty";
      }

      if(fields["desc"].length < 1){
        isFormValid = false;
        errors["desc"] ="Cannot be empty";
      }
    }

    this.setState({errors: errors, isFormValid: isFormValid});
    return isFormValid;
  }

  verifyRooms() {
    var scope = this;
    var flag = false;
    let selRooms = this.state.selectedRooms;
    scope.setState({fetchingRooms: true})
    return new Promise(function(resolve, reject) {
      fetchRooms(scope.state.start_date, scope.state.end_date)
      .then(function (takRooms) {
        selRooms.forEach(room => {
          if(takRooms.includes(room)) {
            flag = true;
            let index = selRooms.indexOf(room);
            selRooms.splice(index, 1);
            scope.setState({selectedRooms: selRooms, takenRooms: takRooms})
          }
        })
        scope.setState({fetchingRooms: false})
        if(flag) {
          scope.setState({SnackBarmessage: 'Rooms were changed. Please rebook', openSnackBar: true})
          reject();
        }
        resolve();
      })
    });
  }

  handleSubmit() {
    const scope = this;
    this.verifyRooms()
    .then(function() {
      let field = this.state.fields;
      let start__date = this.state.start_date;
      let end__date = this.state.end_date;
      let start_date = start__date.toISOString();
      let end_date = end__date.toISOString();
      field["start_date"] = start_date;
      field["end_date"] = end_date;

      var newData = {
        "start_date":moment(field["start_date"]).format('DD-MM-YYYY'),
        "end_date":moment(field["end_date"]).format('DD-MM-YYYY'),
        "rooms":this.state.selectedRooms,
        "AD_appr":this.props.user.isSC ? "pending" : "NA",
        "FA_appr":this.props.user.isSC ? "approved" : "pending",
        "SO_appr":"NA",
        "booker_name":field["booker_name"],
        "booker_contact":field["booker_contact"],
        "booker_reg_no":field["booker_reg_no"],
        "booker_email":field["booker_email"],
        "title":field["title"],
        "desc":field["desc"],
        "type":field["workshop"],
        "notes":field["notes"] || null,
        "end_time":"7:45pm",
        "start_time":"5:45pm",
        "clubName": this.props.user.name,
        "clubEmail": this.props.user.email,
        "clubID": this.props.user.uid,
        "FA_name": this.props.user.fa.name,
        "FA_date": this.props.user.isSC ? moment(this.state.today, 'DD-MM-YYYY').format('DD-MM-YYYY') : null,
      }

      var eventID = newData.clubID.slice(0, 4);
      eventID = eventID.concat(newData.title.toLowerCase().slice(0,4));
      eventID = eventID.concat(new Date().getTime()%1000000);

      firebaseDB.ref('/events/').child(eventID).set(newData);
      var scope = this;
      firebaseDB.ref('/users/'+ scope.props.user.uid +'/my_events/').push(eventID,
        function(res, err) {
          if(err)
            console.log("couldn't be booked ", err);
          else {
            updateDates(field["start_date"], field["end_date"], scope.state.selectedRooms.concat(scope.state.takenRooms))
            sendPush(scope.props.user.fa_uid, "Dear FA, Approval requested!", "Please approve the event titled "+scope.state.fields.title+"'")
            scope.setState({SnackBarmessage: 'Request for booking room successful', openSnackBar: true})
            scope.setState({bookedEvent: newData, finished: true})
          }
        });
    }.bind(this))
    .catch(function(err) {
      console.log(err);
    })
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (<div style = {{marginBottom: 60}}>   
          <TextField
            floatingLabelText="Name *"
            type="text" 
            onChange={this.handleChange.bind(this, "booker_name")} 
            onBlur={this.handleBlur.bind(this,"booker_name")}
            value={this.state.fields["booker_name"]}
            errorText={this.state.fieldTouch["booker_name"] && this.state.errors["booker_name"]}
            errorStyle={{position: 'absolute', bottom: -8}}
            required

          />
          <br />

          <TextField
            floatingLabelText="Email *"
            type="text"  
            onChange={this.handleChange.bind(this, "booker_email")} 
            onBlur={this.handleBlur.bind(this,"booker_email")}
            value={this.state.fields["booker_email"]}
            errorText={this.state.fieldTouch["booker_email"] && this.state.errors["booker_email"]}
            errorStyle={{position: 'absolute', bottom: -8}}
            required 
          />
          <br />

          <TextField
            floatingLabelText="Contact Number *"
            type='number'
            onBlur={this.handleBlur.bind(this,"booker_contact")}
            onChange={this.handleChange.bind(this, "booker_contact")}
            value={this.state.fields["booker_contact"]}
            style={{marginLeft:0}}
            errorText={this.state.fieldTouch["booker_contact"] && this.state.errors["booker_contact"]}
            errorStyle={{position: 'absolute', bottom: -8}}
            required
          />
          <br />

          <TextField
            floatingLabelText="Registration Number *"
            type="number"
            onBlur={this.handleBlur.bind(this,"booker_reg_no")}
            onChange={this.handleChange.bind(this, "booker_reg_no")}
            value={this.state.fields["booker_reg_no"]}
            errorText={this.state.fieldTouch["booker_reg_no"] && this.state.errors["booker_reg_no"]}
            errorStyle={{position: 'absolute', bottom: -8}}
            required
          />
          <br />
        </div>);
      case 1:
        return (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <TextField 
            floatingLabelText="Title *"
            key={1}
            onChange={this.handleChange.bind(this, "title")}
            onBlur={this.handleBlur.bind(this,"title")}
            type="text" 
            value={this.state.fields["title"]}
            errorText={this.state.fieldTouch["title"] && this.state.errors["title"]}
            errorStyle={{position: 'absolute', bottom: -8}}
            required
          />
          <TextField 
            style={{textAlign: 'left'}}
            floatingLabelText="Event Description *"
            multiLine={true}
            rows={1}
            rowsMax={this.props.isMobile ? 3 : 5}
            key={2}
            type="text"
            onChange={this.handleChange.bind(this, "desc")}
            onBlur={this.handleBlur.bind(this,"desc")}
            value={this.state.fields["desc"]}
            errorText={this.state.fieldTouch["desc"] && this.state.errors["desc"]}
            errorStyle={{position: 'absolute', bottom: -8}}
            required
          />
          <TextField 
            multiLine={true}
            rows={1}
            rowsMax={this.props.isMobile ? 3 : 5}
            style={{textAlign: 'left'}}
            floatingLabelText="Notes" 
            type="text"
            onChange={this.handleChange.bind(this, "notes")}
            value={this.state.fields["notes"]}
            errorText={this.state.errors["notes"]} 
            errorStyle={{position: 'absolute', bottom: -8}}
          />
                      
          <div>
            <RadioButtonGroup style={{margin: 20}}
              name="Workshop"
              defaultSelected="External"
              onChange={this.handleChange.bind(this,"workshop")}>
                <RadioButton
                  value="Internal"
                  label="Internal Event"
                  labelStyle={{width: '100%'}}
                />
                   
                <RadioButton
                  value="External"
                  label="External Event"
                  labelStyle={{width: '100%'}}
                />
            </RadioButtonGroup>
          </div>
      
        </div>);
      case 2:  {var self=this}
        return (<div className="locationContainer" style={{marginBottom:50}}> 
          <div style={{backgroundColor: '', display: 'flex', flexDirection: this.props.isMobile ? 'column': 'row' , justifyContent: 'space-between', alignItems: 'center'}}>
            <DatePicker
              floatingLabelText="Start Date"
              mode={this.props.isMobile ? 'portrait' : 'landscape'}
              autoOk={true}
              onChange={this.handleStartDate}
              value={this.state.start_date}
              shouldDisableDate={this.day}
              disableYearSelection={true}
              minDate={this.state.minDate}
              maxDate={this.state.maxDate}
              formatDate={this.formatDate}
              shouldDisableDate={this.shouldDisableDate}
              errorText={this.state.end_date && this.state.start_date > this.state.end_date && "Start date should be less than end date"}
              errorStyle={{position: 'absolute', bottom: -8}}
              required
            />
            <DatePicker
              floatingLabelText="End Date" 
              mode={this.props.isMobile ? 'portrait' : 'landscape'}
              autoOk={true}   
              onChange={this.handleEndDate}
              value={this.state.end_date} 
              shouldDisableDate={this.day}
              disableYearSelection={true}
              minDate={self.state.start_date?self.state.start_date:self.state.minDate}
              maxDate={this.state.maxDate}
              formatDate={this.formatDate}
              shouldDisableDate={this.shouldDisableDate}
              required
            />
          </div>
            <RoomsContainer datesSelected={this.state.datesSelected} fetchingRooms={this.state.fetchingRooms} selectedRooms={this.state.selectedRooms} takenRooms={this.state.takenRooms} handleSelectedRooms={(temp) => this.handleSelectedRooms(temp)}/>
    </div>);

    default: console.log('thank you screen');
    }
  }

  render() {
    return (
      <div>
        <Paper style={{width: this.props.isMobile? '98%':'90%' , height: '100%', margin: 'auto', marginTop: '2%', marginBottom: '2%', minHeight: 600}} zDepth={3}>

          <Snackbar
            open={this.state.openSnackBar}
            message={this.state.SnackBarmessage}
            autoHideDuration={this.state.autoHideDuration}
            onRequestClose={this.handleSnackBarClose}
          />

          <div style={{backgroundColor: '', width: '100%', alignSelf: 'center', display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
            {this.state.finished ? (
              <FinishedContainer event={this.state.bookedEvent}/>
              ) : (
              
              <div style={{width: this.props.isMobile ? '95%' : '85%'}}>
                <Stepper linear={false} activeStep={this.state.stepIndex} orientation={this.props.isMobile ? 'vertical' : 'horizontal'} style={{width: '80%', margin: '0 auto'}}>
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
                <div>{this.getStepContent(this.state.stepIndex)}</div>
                <div style={{marginBottom:20}}>
                  <FlatButton
                    label="Back"
                    hidden={this.state.stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{marginRight:60}}
                  />
                  <RaisedButton
                    label={this.state.stepIndex === 2 ? 'Submit' : 'Next'}
                    primary={true}
                    onClick={this.state.stepIndex == 2 ? this.handleSubmit : this.handleNext}
                    disabled={!this.state.isFormValid || this.state.stepIndex == 2 && this.state.selectedRooms.length == 0}
                  />
                </div>
              </div>
            )}
          </div>
          </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {isMobile} = state.toggler
  const {user} = state.authentication
  return {
    isMobile,
    user
  }
}

export default connect(mapStateToProps)(HorizontalLinearStepper);