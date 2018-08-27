import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import { Route , Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import {firebaseDB} from '../../../firebaseConfig'
import firebase from 'firebase';
import {connect} from 'react-redux';
import {List,ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MediumContainer from './MediumContainer';
import {storage} from '../../../firebaseConfig'
import BookerContainer from './BookerContainer';
import EventContainer from './EventContainer';
import Snackbar from 'material-ui/Snackbar';
import moment from 'moment'
import {sendPush} from '../../../Services/NotificationService';
import Dropzone from 'react-dropzone';
import {uploadPoster} from '../../../Services/firebaseStorageService';

class PublicityComponent extends React.Component {
	constructor(props){
		super(props);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
		this.state =  {
      checked: [true,false,false,false],
      shouldCheck: false,
      stepIndex:2,
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
      //indexes: [],
      SnackBarmessage: '',
      openSnackBar: false,
      autoHideDuration: 3000,
      indexes: [{ '0':false, '1':false,'2':false,'3':false},
              { '0':false, '1':false,'2':false,'3':false},
              { '0':false, '1':false,'2':false,'3':false},
              { '0':false, '1':false,'2':false,'3':false }],
      files: []
		
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
    if(this.state.stepIndex === 2) {
      this.handleSubmit();
    }
   
  }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1,isFormValid:true});
    }
  };

  handleSnackBarClose() {
    this.setState({openSnackBar: false}) 
  }


  handleSubmit() {
    var result = this.parseMediums();
    var files = this.state.files;
    var newData = {
      "AD_appr":this.props.user.isSC ? "pending" : "NA",
      "FA_appr":this.props.user.isSC ? "approved" : "pending",
      "SO_appr":"NA",
      "clubName": this.props.user.name,
      "clubID": this.props.user.uid,
      "FA_name": this.props.user.fa.name,
      "FA_date": this.props.user.isSC ? moment(this.state.today, 'DD-MM-YYYY').format('DD-MM-YYYY') : null
    }
    var booker_fields={
      'booker_fields':this.state.booker_fields
    }
    newData = Object.assign({},newData,booker_fields,this.state.event_fields);
    var publicityID = newData.clubID.slice(0,4);
    publicityID = publicityID.concat(this.state.event_fields['title'].toLowerCase().slice(0,4));
    publicityID = publicityID.concat(new Date().getTime()%1000000);
    var files_poster = {};
    var obj = Object.assign({},result,newData);

    Promise.all(files.map(file => storage.ref().child(`uid/${publicityID}/${file.name}`).put(file).then(response => response.downloadURL))).then(
      urls => {
        obj['files'] = urls;
        this.handleDBSubmit(obj,publicityID);
      })
  }

  handleDBSubmit(obj,publicityID) {
    firebaseDB.ref('/publicity/').child(publicityID).set(obj);
    var scope = this;
    firebaseDB.ref('/users/'+ scope.props.user.uid +'/my_publicity/').push(publicityID,
      function(res, err) {
        if(err)
          console.log("couldn't be booked ", err);
        else {
          sendPush(scope.props.user.fa_uid, "Mr. FA, Approval requested!", "Please approve the event titled "+scope.state.event_fields.title+"'")
          scope.setState({SnackBarmessage: 'Request sent for review successfully', openSnackBar: true, fields: {}})
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
  updateFiles(files){
    this.setState({files: files})
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
        return  (<div>
                 <MediumContainer indexesMediums={this.state.indexes} filesMediums={this.state.files} checkedMediums={this.state.checked} updateFiles={this.updateFiles.bind(this)} updateShared={this.updateShared.bind(this)} updateToggle={this.updateToggle.bind(this)} />      
        
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
              <div>
                <div>
                  Sit back and relax! Your event titled '{this.state.event_fields.title}' has been sent for approvals from the 
                  authorities concerned.
                  You can track your application under 'Publicity Requests' and we'll notify you via email and sms.
                </div>
                <div style = {{marginTop: 20, marginBottom:20}}>
                <Link to = "dashboard/myPublicity"><RaisedButton label="Publicity Requests" primary={true} style = {{marginRight: (this.props.isMobile?5:'10%')}} /></Link>
                <Link to = "dashboard/publicity_perm"><RaisedButton label="Request Publicity Permissions"
                  primary={true} onClick={(event) => {
                    this.setState({stepIndex: 0, finished: false});
                    }} /></Link>
                </div>
                <Snackbar
                open={this.state.openSnackBar}
                message={this.state.SnackBarmessage}
                autoHideDuration={this.state.autoHideDuration}
                onRequestClose={this.handleSnackBarClose}
                />
              </div>
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






