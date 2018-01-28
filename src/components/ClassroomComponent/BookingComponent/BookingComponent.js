import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class HorizontalLinearStepper extends React.Component {
    constructor(props){
       super(props);

       this.state = {
           fields: {},
           errors: {},
           finished: false,
           stepIndex: 0

       }
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


       this.setState({errors: errors});
       return formIsValid;
   }
  getStepContent(stepIndex) {
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
             </div>);
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
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
