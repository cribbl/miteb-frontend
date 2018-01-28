import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';





const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class VerticalLinearStepper extends React.Component {
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
    
    };

  handlePrev = () => {
    
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
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


    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
  renderStepActions(step) {
    const {stepIndex} = this.state;


    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {finished, stepIndex} = this.state;



    return (
     
      <div style={{ fullWidth: 1000, maxHeight: 1000, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Booker Details</StepLabel>
            <StepContent style={{backgroundColor:'#e9ff91'}}>
              
                 <div>	        
           	           	<TextField floatingLabelText="Name"  type="text" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
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
                         <br/>
                     
                  
              </div>
              
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Event Description</StepLabel>
            <StepContent className="Content">
                    <div>
                     
                     
                      
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
                   
              </div>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Choose your Location</StepLabel>
            <StepContent>
              <div>
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
            </div>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
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
        )}
      </div>
   
    );
  }
}

export default VerticalLinearStepper;