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

var ab5="5"
var nlh="3"

const styles = {
  customWidth: {
    width: 200,
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

       this.handleRoomButton=this.handleRoomButton.bind(this);

       this.state = {
           fields: {},
           errors: {},
           finished: false,
           stepIndex: 0,
           value:1,
           checked: false,
           start_date: null,
           end_date:null,
           checkbox:null,
           roomStatusArray:{'0101': true},
           fieldTouch:{},

       }

       const nlh="3";
       const ab5="5";
       this.handleStartDate=this.handleStartDate.bind(this);
       this.handleEndDate=this.handleEndDate.bind(this);
  }

  handleStartDate(event, start_date){
    this.setState({start_date: start_date})
    console.log(start_date);
  }
    handleEndDate(event, end_date){
    this.setState({end_date: end_date})
    console.log(end_date);
  }
  handleDisableNext()
  {
    if(!this.handleEmptyValidation(this.state.stepIndex))
        return true;
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
       console.log('inside handlechange',fieldTouch);
        this.handleValidation(0,field);
      
  };
  handleDropDownChange = (event, index, value) => this.setState({value})

  handleSubmit=()=>{
    console.log(this.state.fields);
    console.log(" " + this.state.start_date + " " +this.state.end_date);
    console.log("Submitted form");
  }

  handleRoomButton()
  {   let scope = this;
      console.log('hi',this.state.start_date);
      console.log('hey',this.state.end_date);
      axios.post('http://demo4467000.mockable.io/post_fetch_rooms', {
         startDate: this.state.start_date,
         endDate: this.state.end_date
      })
      .then(function (res) {
            console.log('hi',res.data.roomCode);
           scope.setState({ roomStatusArray: (res.data.roomCode) })
           console.log('hello', scope.state.roomStatusArray)
      })
      .catch(function (error) {
           console.log(error);
      });

  }
   handleEmptyValidation(n){
      let fields =this.state.fields;
      console.log(n);
  
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
        {  console.log('inside n=1')
            //Title
              if(!fields["title"] ){
                console.log('inside check for title')
                formIsValid=false;
                errors["title"]="Cannot be empty";
                console.log(fieldTouch);
              }
              //Event Description
               if(!fields["desc"] && fieldTouch["desc"]){
                formIsValid=false;
                errors["desc"]="Cannot be empty";
            
              }
        }
        this.setState({errors: errors});
        console.log(errors);
        return formIsValid;
   }
  getStepContent(stepIndex) {

    switch (stepIndex) {
      case 0:
        return (<div>  
                       <TextField
                            floatingLabelText="Name"
                            type="text" 
                            onChange={this.handleChange.bind(this, "booker_name")} 
                            value={this.state.fields["booker_name"]}
                            errorText={this.state.errors["booker_name"]} 
                            errorStyle={{position: 'absolute', bottom: '-8'}}
                            required

                            />

                       <TextField
                           floatingLabelText="Email"
                           type="text"  
                           onChange={this.handleChange.bind(this, "booker_email")} 
                           value={this.state.fields["booker_email"]}
                           errorText={this.state.errors["booker_email"]} 
                           errorStyle={{position: 'absolute', bottom: '-8'}}
                           required 
                           />

                       <TextField 
                           floatingLabelText="Contact Number" 
                           type="text"
                           onChange={this.handleChange.bind(this, "booker_contact")}
                           value={this.state.fields["booker_contact"]}
                            errorText={this.state.errors["booker_contact"]} 
                            errorStyle={{position: 'absolute', bottom: '-8'}}
                            required
                            />

                       <TextField  
                           floatingLabelText="Registration Number" 
                           type="text" 
                           onChange={this.handleChange.bind(this, "booker_reg_no")}
                           value={this.state.fields["booker_reg_no"]}
                           errorText={this.state.errors["booker_reg_no"]} 
                           errorStyle={{position: 'absolute', bottom: '-8'}}
                           required
                           />
                </div>);
      case 1:
        return (<div>  
                     <TextField 
                       floatingLabelText="Title"
                       onChange={this.handleChange.bind(this, "title")} 
                       type="text" 
                       value={this.state.fields["title"]}
                       errorText={this.state.errors["title"]}  
                       errorStyle={{position: 'absolute', bottom: '-8'}}
                       required
                      />
                     <TextField 
                       floatingLabelText="Event Description" 
                       multiLine={true}
                       type="text"
                       onChange={this.handleChange.bind(this, "desc")} 
                       value={this.state.fields["desc"]}
                       errorText={this.state.errors["desc"]} 
                       errorStyle={{position: 'absolute', bottom: '-8'}}
                       required
                     />
                     <br/><br/>
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
    
               </div>);
      case 2:
        return (<div> 
                      <div className="Row" style={{ display: "flex" , flexDirection:"row"}}>
                         <Subheader> Start </Subheader>            
                         <DatePicker 
                           container="inline"
                           mode="landscape"
                           autoOk={true}
                           onChange={this.handleStartDate}
                           value={this.state.start_date}
                         />
                         <Subheader> End </Subheader> 
                         <DatePicker  
                           container="inline" 
                           mode="landscape" 
                           autoOk={true}   
                           onChange={this.handleEndDate}
                           value={this.state.end_date} 
                         />
                      </div>        
                      <RaisedButton label ="Fetch Rooms" primary ={true} onClick={this.handleRoomButton}/>
                      <div className="Row" >
                         <Card style={{padding:"0", width: '100%', maxWidth: 1000}}>
                            <CardHeader
                              title="AB5"
                              actAsExpander={true}
                              showExpandableButton={true}
                              style={{padding:"3"}}
                            /> 
                            <CardText 
                            expandable={true}
                            >
                                      <Card 
                                      style={{padding:"0"}}
                                      > 
                                             <CardHeader
                                             title="1st Floor"
                                             actAsExpander={true}
                                             showExpandableButton={true}
                                             style={{padding:"3"}}
                                             />
                                             <CardText 
                                             expandable={true}
                                             style={{padding:"1"}}
                                             >

                                                <CheckboxGroup
                                                 n={"1"}b={ab5} a={this.state.roomStatusArray}
                                                 /> 
                                            </CardText>
                                      </Card>
                                      <Card>
                                              <CardHeader
                                             title="2nd Floor"
                                             actAsExpander={true}
                                             showExpandableButton={true}
                                             style={{padding:"3"}}
                                             />
                                             <CardText 
                                             expandable={true}
                                             style={{padding:"1"}}
                                             >
                                              <CheckboxGroup 
                                              n={"2"}b={ab5} a={this.state.roomStatusArray}
                                              />
                                            </CardText>
                                      </Card>
                                      <Card>
                                            <CardHeader
                                           title="3rd Floor"
                                           actAsExpander={true}
                                           showExpandableButton={true}
                                           style={{padding:"3"}}
                                           />
                                           <CardText 
                                           expandable={true}
                                           style={{padding:"1"}}
                                           >
                                            <CheckboxGroup 
                                            n={"3"}b={ab5} a={this.state.roomStatusArray}
                                            />
                                          </CardText>
                                      </Card>
                                      <Card>
                                            <CardHeader
                                           title="4th Floor"
                                           actAsExpander={true}
                                           showExpandableButton={true}
                                           style={{padding:"3"}}
                                           />
                                           <CardText 
                                           expandable={true}
                                           style={{padding:"1"}}
                                           >
                                            <CheckboxGroup 
                                            n={"4"}b={ab5} a={this.state.roomStatusArray}
                                            />
                                          </CardText>
                                      </Card>
                                      <Card>
                                            <CardHeader
                                           title="5th Floor"
                                           actAsExpander={true}
                                           showExpandableButton={true}
                                           style={{padding:"3"}}
                                           />
                                           <CardText 
                                           expandable={true}
                                           style={{padding:"1"}}
                                           >
                                           <CheckboxGroup 
                                           n={"5"}b={ab5} a={this.state.roomStatusArray}
                                           />
                                          </CardText>
                                     </Card>
                            </CardText>
                         </Card>
                         
  
                         <Card style ={{padding:"0", width: '100%', maxWidth: 1000}}>
                            <CardHeader 
                           title="NLH" 
                           actAsExpander={true}
                           showExpandableButton={true}
                           style={{padding:"3"}}
                            />
                            <CardText expandable={true}> 
                                    <Card>
                                           <CardHeader
                                           title="1st Floor"
                                           actAsExpander={true}
                                           showExpandableButton={true}
                                           style={{padding:"3"}}
                                           />
                                           <CardText expandable={true}
                                           style={{padding:"3"}}>
                                           <CheckboxGroup 
                                           n={"1"} b={nlh} a={this.state.roomStatusArray}
                                           /> 
                                        </CardText>
                                    </Card>
                                    <Card>
                                            <CardHeader
                                           title="2nd Floor"
                                           actAsExpander={true}
                                           showExpandableButton={true}
                                           style={{padding:"3"}}
                                           />
                                           <CardText expandable={true}
                                           style={{padding:"1"}}>
                                           <CheckboxGroup n={"2"} b={nlh} a={this.state.roomStatusArray}
                                           /> 
                                        </CardText>
                                    </Card>
                                    <Card>
                                          <CardHeader
                                         title="3rd Floor"
                                         actAsExpander={true}
                                         showExpandableButton={true}
                                         style={{padding:"3"}}
                                         />
                                         <CardText expandable={true}
                                         style={{padding:"1"}}>
                                           <CheckboxGroup n={"3"} b={nlh} a={this.state.roomStatusArray}
                                           /> 
                                        </CardText>
                                    </Card>
                                    <Card>
                                          <CardHeader
                                         title="4th Floor"
                                         actAsExpander={true}
                                         showExpandableButton={true}
                                         style={{padding:"3"}}
                                         />
                                         <CardText expandable={true}
                                         style={{padding:"1"}}>
                                           <CheckboxGroup n={"3"} b={nlh} a={this.state.roomStatusArray}
                                           /> 
                                        </CardText>
                                    </Card>
                                    <Card>
                                          <CardHeader
                                         title="5th Floor"
                                         actAsExpander={true}
                                         showExpandableButton={true}
                                         style={{padding:"3"}}
                                         />
                                         <CardText expandable={true}
                                         style={{padding:"1"}}>
                                         <CheckboxGroup n={"5"} b={nlh} a={this.state.roomStatusArray}
                                         /> 
                                        </CardText>
                                   </Card>
                             </CardText>
                           </Card>
                      </div>

             </div>);
    }
  }

  render() {
   
    const {finished, stepIndex} = this.state;
    const contentStyle = {marginLeft:"30%", fontFamily:"monospace"}
    
    return (
      <div style={{width: '100%', maxWidth: 700,margin:'auto'}}>
        <Stepper linear={false} activeStep={stepIndex} >
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

            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                  
                }}
              >
                Click here
              </a> to book another room! :)
            </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
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

export default HorizontalLinearStepper;