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
        desc: 'Some random description of a random event of this random Dummy MIT Club'
      }
		}
	};
    componentWillMount(){
      this.setState({
        checked: [true,false,false,false]
      })
    }
    handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
      isFormValid:false
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1,isFormValid:true});
    }
  };
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
                  <LocationContainer checkedMediums={this.state.checked} updateShared={this.updateShared.bind(this)} />
              </Paper>
          </div>);
      default:
        return '';
    }
  }
   
		render() {
      var stepIndex=this.state.stepIndex;
      var finished=this.state.finished;
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
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
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
                      disabled={!this.state.isFormValid|| this.state.stepIndex == 2}
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






