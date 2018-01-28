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
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';




const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class VerticalLinearStepper extends React.Component {


  state = {
    finished: false,
    stepIndex: 0,
    value:'AB5'
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

 

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
                      <TextField
                      id="text-field-name"
                         floatingLabelText="Name"  onChange={
                        (evt)=>{
                          console.log("you have typed: ", evt.target.value);
                        }
                      }
                      />
                      <br />
                      <br />
                      <TextField
                        name="text-field-regno"
                        id="text-field-regno"
                      
                         floatingLabelText="Registration number" 
                      /><br />
                      <TextField
                        id="text-field-email"
                        floatingLabelText="Email ID"
                      /><br />
                      <TextField
                      id="text-field-num"
                      floatingLabelText="Phone number"
                      /><br/>
                   
              </div>
              
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Event Description</StepLabel>
            <StepContent className="Content">
                    <div>
                      <TextField
                      id="text-field-title"
                         floatingLabelText="Title"
                      /><br />
                      <br />
                      <TextField
                        id="text-field-desc"
                        multiLine="true"
                         floatingLabelText="Event Description"
                      /><br />
                      <TextField
                        id="text-field-email"
                        floatingLabelText="Email ID"
                      /><br />
                      <TextField
                      id="text-field-num"
                      floatingLabelText="Phone number"
                      /><br/>
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
                    hi
               <DropDownMenu value={this.state.value} onChange={this.handleChange} autoWidth={true}>
                <MenuItem value={1} primaryText="NLH (AB2)" />
                <MenuItem value={2} primaryText="AB5" />
                <MenuItem value={3} primaryText="AB1" />
              </DropDownMenu>
              <br />
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
