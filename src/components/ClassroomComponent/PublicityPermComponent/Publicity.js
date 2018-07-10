import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
//import { Route , Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import {firebaseDB} from '../../../firebaseConfig'
import firebase from 'firebase';
import {connect} from 'react-redux';
import {List,ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MediumContainer from './MediumContainer';
import LocationContainer from './LocationContainer';
import BookerContainer from './BookerContainer';
import EventContainer from './EventContainer';
//import Snackbar from 'material-ui/Snackbar';
//import moment from 'moment'
//import {fetchRooms, updateDates, getDisabledDates} from '../../../Services/firebaseDBService'
//import {sendPush} from '../../../Services/NotificationService'

class PublicityComponent extends React.Component {
	constructor(props){
		super(props);

		this.state =  {
      checked: [true,false,false,false],
      index: 0,
      shouldCheck: false,
      stepIndex:0,
      finished: false,
      isFormValid:false,
      booker_fields:  {
        booker_name: '',
        booker_email: 'random@email.com',
        booker_contact: '9898989898',
        booker_reg_no: '150911111'
      },
      event_fields: {
        title: '',
        start_date: null,
        end_date: null
      },
      indexes: []
		}
	};
    componentWillMount(){
      this.setState({
        checked: [true,false,false,false]
      })
    }
    handleNext = () => {
    const {stepIndex} = this.state;
    if(this.state.stepIndex+1 < 2){
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
        isFormValid:false
      });
   }
    else {
        this.setState({
        isFormValid:true,
        stepIndex: stepIndex +1,
        finished: stepIndex >=2 
      })
    if(this.state.stepIndex === 2)
      this.handleSubmit();
   
  }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1,isFormValid:true});
    }
  };
  handleSubmit() {
    var result = this.parseMediums();
    var newData = {
      "AD_appr":"NA",
      "FA_appr":"pending",
      "SO_appr":"NA",
      "clubName": this.props.user.name,
      "clubID": localStorage.getItem('clubID'),
      "FA_name": this.props.user.fa.name
    }
    var obj = Object.assign({},this.state.booker_fields,this.state.event_fields,result,newData);
    console.log('obj = ',obj);
    var myRef = firebaseDB.ref('/events/'+'/publicity/').push(obj);
    var key = myRef.key;
    var scope = this;
    firebaseDB.ref('/clubs/'+ scope.props.user.uid +'/my_publicity/').push(key,
      function(res, err) {
        if(err)
          console.log("couldn't be booked ", err);
        else {
         // sendPush(scope.props.user.fa_uid, "Mr. FA, Approval requested!", "Please approve the event titled "+scope.state.fields.title+"'")
          //scope.setState({SnackBarmessage: 'Event booked successfully', openSnackBar: true, fields: {}})
          scope.setState({finished: true})
        }
      });
      
  }

  parseMediums(){
   var arrChecked = this.state.checked;
   var array = ['academicBlocks', 'Hostel', 'seniorHostel','Mess']
   var arrayObj = this.state.indexes;
   var newObj = [];


   for (var item in arrayObj) {
    var Data = {};
    for (var a in array) {
       Data[array[a]] = arrayObj[item][Object.keys(arrayObj[item])[a]];
    } 
    newObj.push(Data);
   }
    for(var item in newObj){
    for(var a in array){
      console.log(item);
      console.log(newObj[item][array[a]]);
      if(newObj[item][array[a]] === false)
        delete newObj[item][array[a]]
    }
   }
   var arr = newObj;
   var result = {};
   var new_key=['Banner','InfoDesk','Digital Board','Poster']
   for (var i=0; i<arr.length; i++) {
    result[new_key[i]] = arr[i];
   }
    for(i=0;i<arrChecked.length;i++){
    if(arrChecked[i] === false)
      delete result[new_key[i]]
   }
  return result;
  }
  updateFormState(bookForm,eventForm){
    if(bookForm===false || eventForm===false){
      this.setState({
        isFormValid: false,
        isFormBookerValid:bookForm,
        isFormEventValid:eventForm
      })
    }
    else{
      this.setState({
        isFormValid: true
      })
    }
  }
  updateShared(shared_value){
    this.setState({checked: shared_value})
  }
  updateBooker(fields){
    this.setState({
      booker_fields:fields
    })
  }
  updateEvent(fields){
    this.setState({
      event_fields:fields
    })
    console.log('event fields=',this.state.event_fields)
  }
  updateToggle(toggle){
    this.setState({
      indexes: toggle
    })
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (<div style = {{width: '100%',minHeight:400,justifyContent:'center'}}> <BookerContainer fields={this.state.booker_fields} updateFields={this.updateBooker.bind(this)} updateFormState={this.updateFormState.bind(this)}/></div>);
      case 1:
        return (<div style = {{width: '100%',minHeight:400,justifyContent:'center'}}> <EventContainer fields={this.state.event_fields} updateFields={this.updateEvent.bind(this)} updateFormState={this.updateFormState.bind(this)}/></div>);
      case 2:
        return  (<div style={{display: 'flex', flexDirection: 'row',justifyContent:'center'}}>
              <Paper style={{ marginRight:20}}> 
                 <MediumContainer checkedMediums={this.state.checked} updateShared={this.updateShared.bind(this)} />
              </Paper>

              <Paper>
                  <LocationContainer checkedMediums={this.state.checked} updateShared={this.updateShared.bind(this)} updateToggle={this.updateToggle.bind(this)} />
              </Paper>
          </div>);
      default:
        return '';
    }
  }
   
		render() {
      var stepIndex=this.state.stepIndex;
      var finished=this.state.finished;
      console.log('this.state.stepIndex=',this.state.stepIndex)
      console.log('this.state.isFormValid',this.state.isFormValid)
			return (
     <div>
        <Paper style={{width: this.props.isMobile? '98%':'90%' , height: '100%', margin: 'auto', marginTop: '2%', marginBottom: '2%'}} zDepth={3}>
          <Stepper linear={false} activeStep={stepIndex} orientation={this.props.isMobile ? 'vertical' : 'horizontal'} style={{width: '80%', margin: '0 auto'}}> 
           <Step>
            <StepLabel>Booker Details</StepLabel>
          </Step>
           <Step>
            <StepLabel>Event Details</StepLabel>
          </Step>
           <Step>
            <StepLabel>Location</StepLabel>
          </Step>
        </Stepper>
          <div  style={{backgroundColor: '', width: '100%', alignSelf: 'center', display: 'flex', textAlign: 'center', justifyContent: 'center'}} >
          {finished ? (
            <p> Sit back and relax! You will be informed about the status of your request shortly.
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a>  to book again! 
            </p>
          ) : ( 
                <div style={{width: this.props.isMobile ? '95%' : '85%'}}>
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
                      onClick={this.handleNext}
                      disabled={!this.state.isFormValid || !this.state.stepIndex === 2}
                    />
                  </div>
               </div>
			)        
		}
    </div>
    </Paper>
    </div>)
	
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

export default connect(mapStateToProps)(PublicityComponent);






