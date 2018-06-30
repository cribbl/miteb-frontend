import React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import Subheader from 'material-ui/Subheader';
import {getDisabledDates} from '../../../Services/firebaseDBService'

class EventContainer extends React.Component {
	constructor(props){
		super(props);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    maxDate.setHours(0, 0, 0, 0);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.shouldDisableDate = this.shouldDisableDate.bind(this)

		this.state =  {
      checkboxValue : 0,
      checked: [true, false, false, false],
      today: new Date(),
      minDate: new Date(),
      maxDate: maxDate,   
      start_date: null,
      end_date: null,   
      disabledDates: [],
      fieldTouch: {
        title: false
      },
      errors: {
        title: ''
      },
        isFormValid: false,
    }
	}
    componentWillMount(){
      this.setState({
        isFormValid:false,
        fields:this.props.fields
      })
    }
      componentWillReceiveProps(nextProps){
      var fields = nextProps.fields;
      this.callFunction(fields);
    }
    callFunction(fields){
      this.setState({
        fields:fields
      })
    }
  
    handleChange(field, e) {  
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
    let result = this.handleValidation(field);
    this.props.updateFormState(null,result);
  };

  handleBlur(field, e) {
    let fieldTouch = this.state.fieldTouch;
    fieldTouch[field] = true;
    this.setState({fieldTouch})
    let result = this.handleValidation(field);
    this.props.updateFormState(null,result);
  };
   handleStartDate(event, start_date) {
    var field = this.state.fields;
    field['start_date'] = moment(start_date).format('DD-MM-YYYY')
    this.setState({
      fields: field,
      start_date: start_date
    })
    this.props.updateFields(field)
  }

  handleEndDate(event, end_date) {
    var field = this.state.fields;
    field['end_date'] = moment(end_date).format('DD-MM-YYYY')
      this.setState({
      fields: field,
      end_date: end_date
    })
    this.props.updateFields(field)
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
  handleValidation(field) {
    let fields = this.state.fields;
    let errors = {
      title: ''
    };
    let isFormValid = true;
      if(fields["title"].length < 1){
        isFormValid = false;
        errors["title"] = "Cannot be empty";
      }

    this.setState({errors: errors, isFormValid: isFormValid});
    this.props.updateFormState(null,isFormValid);
    return isFormValid;
  }



		render() {
      var self=this;
			return (
    		<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Subheader> Publicity Dates </Subheader>
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
          <Subheader> Event Details </Subheader>
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

export default connect(mapStateToProps)(EventContainer);