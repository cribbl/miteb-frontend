import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import CheckboxGroup from './Checkbox';
import CheckboxField from './Checkbox';
import axios from 'axios';
import {firebaseDB} from '../../../firebaseConfig'
import firebase from 'firebase'
import {connect} from 'react-redux'
import Snackbar from 'material-ui/Snackbar';
import {fetchRooms, updateDates} from '../../../Services/firebaseDBService'

var moment = require("moment")
var ab5="5"
var nlh="3"

const styles = {
  customWidth: {
    width: 210,
  },
   block: {
    maxWidth: 250,
    display:"flex",
    flexDirection:"row",
  },
  checkbox: {
    marginBottom: 16,
  },
};
 
class HorizontalLinearStepper extends React.Component {
  constructor(props){

       super(props);
          this.handleData = this.handleData.bind(this);
          this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
          const minDate = new Date();
          const maxDate = new Date();
          maxDate.setMonth(maxDate.getMonth() + 1);
          maxDate.setHours(0, 0, 0, 0);

       this.state = {
           fields: {},
           errors: {},
           finished: false,
           stepIndex: 2,
           value:1,
           checked: false,
           start_date: null,
           end_date:null,
           checkbox:null,
           roomStatusArray:{'0101': true},
           fieldTouch:{},
           today: new Date(),
           minDate: minDate,
           maxDate: maxDate,
           fromChild:'',
           convertedObj:{},
           SnackBarmessage: '',
           openSnackBar: false,
           autoHideDuration: 3000,
       }
       
       this.handleStartDate=this.handleStartDate.bind(this);
       this.handleEndDate=this.handleEndDate.bind(this);          
       this.handleRoomButton=this.handleRoomButton.bind(this);
    
  }
  handleData= (obj) =>{
 
        this.state.fromChild=obj;
        //ask about setState
        let convertToObj=this.state.fromChild;
        convertToObj=this.toObject(convertToObj);
        this.state.convertedObj=convertToObj
        
       }

  //convert array to object
     toObject(arr){
          var rv={};
          var j=0;
          var i;
             for(i=3101;i<=3105;i++,j++)         
              rv[i]=arr[j];
             for( i=3201;i<=3205;i++,j++)            
              rv[i]=arr[j];
              for( i=3301;i<=3305;i++,j++)
              rv[i]=arr[j];
              for( i=3401;i<=3405;i++,j++)
              rv[i]=arr[j];
              for( i=3501;i<=3505;i++,j++)
              rv[i]=arr[j];
              for( i=5101;i<=5109;i++,j++)
              rv[i]=arr[j];
              for( i=5201;i<=5209;i++,j++)
              rv[i]=arr[j];
            return rv;

        }
       
  
  handleNext = () => {

          if(this.handleValidation(this.state.stepIndex)){
            const {stepIndex} = this.state;
            this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
            });
           }
           if(this.state.stepIndex==2)
           this.handleSubmit();
  };

  handlePrev = () => {
    
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleChange(field, e){  

        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
        let fieldTouch=this.state.fieldTouch;
        fieldTouch[field]=true;
        this.setState({fieldTouch:fieldTouch})
        this.handleValidation(this.state.stepIndex,field);
  };

  handleDisableNext()
  {
     if(!this.handleEmptyValidation(this.state.stepIndex)&&this.state.stepIndex!=2)
        return true;

  }

  handleDropDownChange = (event, index, value) => this.setState({value})

  handleStartDate(event, start_date){

    this.setState({start_date: start_date})
    let start__date=start_date;
    start__date=start_date.toISOString();

    console.log(start__date);
    if(this.state.end_date)
      this.handleRoomButton()
  }

  handleEndDate(event, end_date){
    this.setState({end_date: end_date})
    console.log(end_date);
    if(this.state.start_date)
      this.handleRoomButton()
  }
  

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
  };
 
  handleRoomButton()
  {   
      let scope = this;
      console.log('hi',this.state.start_date);
      console.log('hey',this.state.end_date);
      // axios.post('http://demo4467000.mockable.io/post_fetch_rooms', {
      //    startDate: this.state.start_date,
      //    endDate: this.state.end_date
      // })
      fetchRooms(this.state.start_date, this.state.end_date)
      .then(function (res) {
           scope.setState({ roomStatusArray: (res) })
           console.log('hello', scope.state.roomStatusArray)
      })
      .catch(function (error) {
           console.log(error);
      });
  }

  day(day){
    return false;
   }
   handleEmptyValidation(n){
      let fields =this.state.fields;
                 if(n==0) {
                   
                    if(!fields["booker_name"] || !fields["booker_email"] || !fields["booker_contact"] 
                      || !fields["booker_reg_no"])  
                       return false;
                    else 
                       return true;
                 }
                 else if(n==1){
                    if(!fields["title"] || !fields["desc"])
                      return false;
                    else
                      return true;

                }
  }

  handleSnackBarClose() {
    this.setState({openSnackBar: false}) 
  }

  handleValidation(n,field){
        let fields = this.state.fields;
        let fieldTouch = this.state.fieldTouch;
        let errors = {};
        let formIsValid=true;
        if(n==0)
        {   
            //Name
            if(!fields["booker_name"] && fieldTouch["booker_name"] ){
               formIsValid = false;
               errors["booker_name"] = "Cannot be empty";
            
            }

            //Email
            if( (!fields["booker_email"] || errors['booker_email'])&& fieldTouch["booker_email"]){
               formIsValid = false;
               errors["booker_email"] = "Cannot be empty";
            
            }
            if(typeof fields["booker_email"] !== "undefined" ){
                let lastAtPos = fields["booker_email"].lastIndexOf('@');
                let lastDotPos = fields["booker_email"].lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["booker_email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["booker_email"].length - lastDotPos) > 2)) {
                  formIsValid = false;
                  errors["booker_email"] = "Email is not valid";
                }
           }

           //phone number
            if(!fields["booker_contact"] && fieldTouch["booker_contact"]){
               formIsValid = false;
               errors["booker_contact"] = "Cannot be empty";
            }

            //Registration Number
               if(!fields["booker_reg_no"] && fieldTouch["booker_reg_no"]){
               formIsValid = false;
               errors["booker_reg_no"] = "Cannot be empty";
            }

         }
        if(n==1)
        { 
            //Title
              if(!fields["title"] ){
                formIsValid=false;
                errors["title"]="Cannot be empty";
                
              }
              //Event Description
               if(!fields["desc"] && fieldTouch["desc"]){
                formIsValid=false;
                errors["desc"]="Cannot be empty";
            
              }
              if(!fields["workshop"])
                fields["workshop"]="external"
        }
        this.setState({errors: errors});
        return formIsValid;
   }
  handleSubmit=()=>{
      let field=this.state.fields;
      let start__date=this.state.start_date;
      let end__date=this.state.end_date;
      let roomStatus=this.state.convertedObj;
      let start_date=start__date.toISOString();
      let end_date=end__date.toISOString();
      field["start_date"]=start_date;
      field["end_date"]=end_date;
      field["roomStatus"]=roomStatus;
      field["AD_appr"]="NA";
      field["FA_appr"]="pending";
      field["SO_appr"]="NA";
      field["notes"]=field["notes"]
      //filtering roomstatus rooms -->true
      Object.filter = (obj, predicate) => 
      Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );
      var filtered = Object.filter(roomStatus, checked => checked>0);
    

  var newData={
        "start_date":moment(field["start_date"]).format('DD-MM-YYYY'),
        "end_date":moment(field["end_date"]).format('DD-MM-YYYY'),
        "roomStatus":filtered,
        "AD_appr":"NA",
        "FA_appr":"pending",
        "SO_appr":"NA",
        "booker_name":field["booker_name"],
        "booker_contact":field["booker_contact"],
        "booker_reg_no":field["booker_reg_no"],
        "booker_email":field["booker_email"],
        "title":field["title"],
        "desc":field["desc"],
        "type":field["workshop"],
        "notes":field["notes"],
        "end_time":"7:45pm",
        "start_time":"5:45pm",
        "clubID": localStorage.getItem('clubID')
   }
   
  var myRef = firebaseDB.ref('/events/').push(newData);
  var key = myRef.key
  firebaseDB.ref('/clubs/'+localStorage.getItem('clubID')+'/my_events/').push(key);
  updateDates(field["start_date"], field["end_date"], filtered)
  this.setState({SnackBarmessage: 'Event booked successfully', openSnackBar: true, fields: {}})
  
      console.log(field);
    
      console.log("Submitted form");
      
    }

  getStepContent(stepIndex) {

    switch (stepIndex) {
      case 0:
        return (<div>   
                       <TextField
                            floatingLabelText="Name"
                            type="text" 
                            onChange={this.handleChange.bind(this, "booker_name")} 
                            onBlur={this.handleChange.bind(this,"booker_name")}
                            value={this.state.fields["booker_name"]}
                            errorText={this.state.errors["booker_name"]} 
                            errorStyle={{position: 'absolute', bottom: -8}}
                            required

                            />

                       <TextField
                           floatingLabelText="Email"
                           type="text"  
                           onChange={this.handleChange.bind(this, "booker_email")} 
                           onBlur={this.handleChange.bind(this,"booker_email")}
                           value={this.state.fields["booker_email"]}
                           errorText={this.state.errors["booker_email"]} 
                           errorStyle={{position: 'absolute', bottom: -8}}
                           required 
                           />

                       <TextField
                           floatingLabelText="Contact Number" 
                           type="text"
                           onBlur={this.handleChange.bind(this,"booker_contact")}
                           onChange={this.handleChange.bind(this, "booker_contact")}
                           value={this.state.fields["booker_contact"]}
                            errorText={this.state.errors["booker_contact"]} 
                            errorStyle={{position: 'absolute', bottom: -8}}
                            required
                            />

                       <TextField
                           floatingLabelText="Registration Number" 
                           type="text" 
                           onBlur={this.handleChange.bind(this,"booker_reg_no")}
                           onChange={this.handleChange.bind(this, "booker_reg_no")}
                           value={this.state.fields["booker_reg_no"]}
                           errorText={this.state.errors["booker_reg_no"]} 
                           errorStyle={{position: 'absolute', bottom: -8}}
                           required
                           />
                </div>);
      case 1:
          return (<div>  
                       <TextField 
                         floatingLabelText="Title"
                         key={1}
                         onChange={this.handleChange.bind(this, "title")} 
                         type="text" 
                         value={this.state.fields["title"]}
                         errorText={this.state.errors["title"]}  
                         errorStyle={{position: 'absolute', bottom: -8}}
                         required
                        />
                       <TextField 
                         style={{textAlign: 'left'}}
                         floatingLabelText="Event Description" 
                         multiLine={true}
                         key={2}
                         type="text"
                         onChange={this.handleChange.bind(this, "desc")} 
                         value={this.state.fields["desc"]}
                         errorText={this.state.errors["desc"]} 
                         errorStyle={{position: 'absolute', bottom: -8}}
                         required
                       />
                         <TextField 
                         multiLine={true}
                         style={{textAlign: 'left'}}
                         floatingLabelText="Notes" 
                         type="text"
                         onChange={this.handleChange.bind(this, "notes")} 
                         value={this.state.fields["notes"]}
                         errorText={this.state.errors["notes"]} 
                         errorStyle={{position: 'absolute', bottom: -8}}
                         required
                       />
                       <br/><br/>
                       <div style={{backgroundColor: '', width: '60%', margin: '0 auto'}}>
                        <RadioButtonGroup
                           name="Workshop" 
                           defaultSelected="external"
                           onChange={this.handleChange.bind(this,"workshop")}>
                         <RadioButton
                            value="internal"
                            label="Internal Workshop"
                         />
                         <RadioButton
                            value="external"
                            label="External Workshop"
                         />
                        </RadioButtonGroup> 
                        </div>
      
               </div>);
      case 2:  {var self=this}
        return (<div className="locationContainer"> 
                      <div className="row" style={{ display: "flex" , margin:"auto", width: '50%', flexDirection: this.props.isMobile ? 'column' : 'row', backgroundColor: ''}}>                             
                         <DatePicker 
                           floatingLabelText="Start"
                           container="inline"
                           mode={this.props.isMobile ? 'portrait' : 'landscape'}
                           autoOk={true}
                           onChange={this.handleStartDate}
                           value={this.state.start_date}
                           shouldDisableDate={this.day}
                           disableYearSelection
                           minDate={this.state.minDate}
                           maxDate={this.state.maxDate}
                           required
                         />
                         <DatePicker  
                           floatingLabelText="End"
                           container="inline" 
                           mode={this.props.isMobile ? 'portrait' : 'landscape'}
                           autoOk={true}   
                           onChange={this.handleEndDate}
                           value={this.state.end_date} 
                           shouldDisableDate={this.day}
                           minDate={self.state.start_date?self.state.start_date:self.state.minDate}
                           maxDate={this.state.maxDate}
                           required
                         />
                        
                      </div>        
                      {/*<RaisedButton label ="Fetch Rooms" primary ={true} onClick={this.handleRoomButton}/>*/}
                      <br/>
                         <Card>
                            <CardHeader 
                           title="Building" 
                           actAsExpander={true}
                           showExpandableButton={true}
                           style={{padding:"3"}}
                       
                            />
                            <CardText expandable={true}> 
                                           <CheckboxGroup style={{padding:"0", width: '100%', maxWidth: 1000}} handlerFromParent={this.handleData}
                                            a={this.state.roomStatusArray}
                                           />       
                                   
                             </CardText>
                           </Card>
                      

             </div>);

        default: console.log('invalid case');
    }
  }

  render() {
   
    const {finished, stepIndex} = this.state;
    const contentStyle = {backgroundColor: '', width: this.props.isMobile ? '100%' : '50%', alignSelf: 'center', display: 'flex', textAlign: 'center', justifyContent: 'center'}
    
    return (
      <div style={{width: '100%', maxWidth: 700,margin:'auto', backgroundColor: '', display: 'flex', flexDirection: 'column'}}>
        <Stepper linear={false} activeStep={stepIndex} orientation={this.props.isMobile ? 'vertical' : 'horizontal'}>
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
        <div style={contentStyle}>
          {finished ? (

            <div>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                  
                }}
              >
                Click here
              </a> to book another room! :)
          <Snackbar
          open={this.state.openSnackBar}
          message={this.state.SnackBarmessage}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={this.handleSnackBarClose}
        />
            </div>          ) : (
            <div>
              <div>{this.getStepContent(stepIndex)}</div>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  hidden={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={this.handleNext}
                  disabled={this.handleDisableNext()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {isMobile} = state.toggler
  return {
    isMobile
  }
}

export default connect(mapStateToProps)(HorizontalLinearStepper);