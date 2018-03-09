import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
<<<<<<< HEAD
import {Card, CardHeader, CardText} from 'material-ui/Card';
=======
>>>>>>> 117b32e1a451082186ad7b953450e180c4e3661c
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
<<<<<<< HEAD
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import CheckboxGroup from './Checkbox';
import CheckboxField from './Checkbox';


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
=======

class HorizontalLinearStepper extends React.Component {
    constructor(props){
>>>>>>> 117b32e1a451082186ad7b953450e180c4e3661c
       super(props);

       this.state = {
           fields: {},
           errors: {},
           finished: false,
<<<<<<< HEAD
           stepIndex: 0,
           value:1,
           checked: false,
           start_date: null,
           end_date:null,
           checkbox:null

       }


       this.handleStartDate=this.handleStartDate.bind(this);
       this.handleEndDate=this.handleEndDate.bind(this);


  }
  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }
  handleStartDate(event, start_date){
    this.setState({start_date: start_date})
    console.log(start_date);
  }
    handleEndDate(event, end_date){
    this.setState({end_date: end_date})
    console.log(end_date);
  }
  handleNext = () => {

=======
           stepIndex: 0

       }
    }
   handleNext = () => {
>>>>>>> 117b32e1a451082186ad7b953450e180c4e3661c

          if(this.handleValidation(this.state.stepIndex)){
            const {stepIndex} = this.state;
            this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
            });
<<<<<<< HEAD
           }
           if(this.state.stepIndex==2)
           this.handleSubmit();
  };
=======

        }
        if(this.state.stepIndex==2)
          this.handleSubmit();
    };
>>>>>>> 117b32e1a451082186ad7b953450e180c4e3661c

  handlePrev = () => {
    
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

<<<<<<< HEAD
  handleChange(field, e){  


        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
         this.handleValidation(0,field); 
  };
  handleDropDownChange = (event, index, value) => this.setState({value})

  handleSubmit=()=>{
    console.log(this.state.fields);
    console.log(" " + this.state.start_date + " " +this.state.end_date);
    console.log("Submitted form");
  }
    handleCheckbox(event, isChecked, value) {
    console.log(isChecked, value); 
    this.res.add(value);
    if (this.res.size === 3) console.log(this.res);
  }

  labelList = [{id: 1, category: 'a'}, {id: 2, category: 'b'}, {id: 3, category: 'c'}]; // your data

  handleValidation(n,field){

        let fields = this.state.fields;
        let errors = {};
        let formIsValid=true;

        if(n==0)
        {   
            //Name
           

            if(!fields["booker_name"]){
               formIsValid = false;
               errors["booker_name"] = "Cannot be empty";
            }

            //Email
            if( !fields["booker_email"] || errors['booker_email']){
               formIsValid = false;
               errors["booker_email"] = "Cannot be empty";
            }

            if(typeof fields["booker_email"] !== "undefined"){
                let lastAtPos = fields["booker_email"].lastIndexOf('@');
                let lastDotPos = fields["booker_email"].lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["booker_email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["booker_email"].length - lastDotPos) > 2)) {
                  formIsValid = false;
                  errors["booker_email"] = "booker_email is not valid";
                }
           }

           //phone number
            if(!fields["booker_contact"]){
               formIsValid = false;
               errors["booker_contact"] = "Cannot be empty";
            }

            //Registration Number
               if(!fields["booker_reg_no"]){
               formIsValid = false;
               errors["booker_reg_no"] = "Cannot be empty";
            }

         }
         else if(n==1){
=======
  handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    };

  handleSubmit=()=>{
    console.log("Submitted form");
  }
  handleValidation(n){
        console.log("n is",n);
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if(n==0)
        {
            //Name
            if(!fields["name"]){
               formIsValid = false;
               errors["name"] = "Cannot be empty";
            }

            if(typeof fields["name"] !== "undefined"){
                 if(!fields["name"].match(/^[a-zA-Z]+$/)){
                     formIsValid = false;
                     errors["name"] = "Only letters";
                 }          
            }

            //Email
            if(!fields["email"]){
               formIsValid = false;
               errors["email"] = "Cannot be empty";
            }

            if(typeof fields["email"] !== "undefined"){
                let lastAtPos = fields["email"].lastIndexOf('@');
                let lastDotPos = fields["email"].lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                  formIsValid = false;
                  errors["email"] = "Email is not valid";
                }
           }

           //Phone
            if(!fields["phone"]){
               formIsValid = false;
               errors["phone"] = "Cannot be empty";
            }

            //Registration NUmber
               if(!fields["regno"]){
               formIsValid = false;
               errors["regno"] = "Cannot be empty";
            }

      }
      else if(n==1){
>>>>>>> 117b32e1a451082186ad7b953450e180c4e3661c

          //Title
          if(!fields["title"]){
            formIsValid=false;
            errors["title"]="Cannot be empty";
          }
          //Event Description
           if(!fields["desc"]){
            formIsValid=false;
            errors["desc"]="Cannot be empty";
          }
      }
<<<<<<< HEAD
=======


>>>>>>> 117b32e1a451082186ad7b953450e180c4e3661c
       this.setState({errors: errors});
       return formIsValid;
   }
  getStepContent(stepIndex) {
<<<<<<< HEAD

    switch (stepIndex) {
      case 0:
        return (<div>  
                       <TextField
                            floatingLabelText="Name"
                            type="text" 
                            onChange={this.handleChange.bind(this, "booker_name")} 
                            value={this.state.fields["booker_name"]}
                            errorText={this.state.errors["booker_name"]} />

                       <TextField
                           floatingLabelText="Email"
                           type="text"  
                           onChange={this.handleChange.bind(this, "booker_email")} 
                           value={this.state.fields["booker_email"]}
                           errorText={this.state.errors["booker_email"]} />

                       <TextField 
                           floatingLabelText="Contact Number" 
                           type="text"
                           onChange={this.handleChange.bind(this, "booker_contact")}
                           value={this.state.fields["booker_contact"]}
                            errorText={this.state.errors["booker_contact"]} />

                       <TextField  
                           floatingLabelText="Registration Number" 
                           type="text" 
                           onChange={this.handleChange.bind(this, "booker_reg_no")}
                           value={this.state.fields["booker_reg_no"]}
                           errorText={this.state.errors["booker_reg_no"]} />
                </div>);
      case 1:
        return (<div>  
                     <TextField 
                       floatingLabelText="Title"
                       errorText={this.state.errors["title"]}  
                       type="text" onChange={this.handleChange.bind(this, "title")} 
                       value={this.state.fields["title"]}
                      />
                     <TextField 
                       floatingLabelText="Event Description" 
                       errorText={this.state.errors["desc"]} 
                       multiLine="true"  
                       type="text"  
                       onChange={this.handleChange.bind(this, "desc")} 
                       value={this.state.fields["desc"]}
                     />
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
                           autoOk="true"    
                           onChange={this.handleStartDate}
                           value={this.state.start_date}
                         />
                         <Subheader> End </Subheader> 
                         <DatePicker  
                           container="inline" 
                           mode="landscape" 
                           autoOk="true"   
                           onChange={this.handleEndDate}
                           value={this.state.end_date} 
                         />
                      </div>
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
                                                 n={"1"} b={"0"}
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
                                              n={"2"} b={"0"}
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
                                            n={"3"} b={"0"}
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
                                            n={"4"} b={"0"}
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
                                           n={"5"} b={"0"}
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
                                           <CheckboxGroup n={"1"} b={"1"} /> 
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
                                           <CheckboxGroup n={"2"} b={"1"}/> 
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
                                           <CheckboxGroup n={"3"} b={"1"}/> 
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
                                           <CheckboxGroup n={"3"} b={"1"}/> 
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
                                         <CheckboxGroup n={"5"} b={"1"}/> 
                                        </CardText>
                                   </Card>
                             </CardText>
                           </Card>
                      </div>

=======
    switch (stepIndex) {
      case 0:
        return (<div>   <TextField floatingLabelText="Name"  type="text" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                         <br/><span style={{color: "blue"}}>{this.state.errors["name"]}</span>
                          <br/>
                         <TextField floatingLabelText="Email"  type="text"  onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                         <br/>
                         <span style={{color: "blue"}}>{this.state.errors["email"]}</span>
                         <br/>
                         <TextField floatingLabelText="Phone Number" type="text" onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]}/>
                         <br/>
                         <span style={{color: "blue"}}>{this.state.errors["phone"]}</span>
                         <br/>
                         <TextField floatingLabelText="Registration Number" type="text" onChange={this.handleChange.bind(this, "regno")} value={this.state.fields["regno"]}/>
                         <br/>
                         <span style={{color: "blue"}}>{this.state.errors["regno"]}</span>
                         <br/> </div>);

      case 1:
        return (<div>  
                     <TextField floatingLabelText="Title"  type="text" onChange={this.handleChange.bind(this, "title")} value={this.state.fields["title"]}/>
                     <br/><span style={{color: "blue"}}>{this.state.errors["title"]}</span>
                     <br/>
                     <TextField floatingLabelText="Event Description" multiLine="true"  type="text"  onChange={this.handleChange.bind(this, "desc")} value={this.state.fields["desc"]}/>
                      <br/>
                      <span style={{color: "blue"}}>{this.state.errors["desc"]}</span>
                      <br/>
                      <RadioButtonGroup name="Workshop" defaultSelected="external">
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
                    <RadioButtonGroup name="Location" defaultSelected="AB5">
                        <RadioButton
                          value="AB5"
                          label="Academic Block 5"
                        />
                        <RadioButton
                          value="NLH"
                          label="NLH"
                        />

                      </RadioButtonGroup>          
>>>>>>> 117b32e1a451082186ad7b953450e180c4e3661c
             </div>);
    }
  }

  render() {
<<<<<<< HEAD
   
    const {finished, stepIndex} = this.state;
    const contentStyle = {marginLeft:"30%", fontFamily:"monospace"}
    
    return (
      <div style={{width: '100%', maxWidth: 700,margin:'auto'}}>
        <Stepper activeStep={stepIndex} >
          <Step>
            <StepLabel>Booker Details </StepLabel>
=======
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Booker Details</StepLabel>
>>>>>>> 117b32e1a451082186ad7b953450e180c4e3661c
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
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD
export default HorizontalLinearStepper;
=======
export default HorizontalLinearStepper;
>>>>>>> 117b32e1a451082186ad7b953450e180c4e3661c
