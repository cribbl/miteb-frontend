import React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';

class EventContainer extends React.Component {
	constructor(props){
		super(props);
    this.handleBlur = this.handleBlur.bind(this);
		this.state =  {
      checkboxValue : 0,
      checked: [true, false, false, false],
      //  fields: {
   
      //   title: '',
      //   desc: 'Some random description of a random event of this random Dummy MIT Club',
   
      // },
      fieldTouch: {
  
        title: false,
        desc: false
      },
      errors: {

        title: '',
        desc: ''
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
  handleValidation(field) {
    let fields = this.state.fields;
    let errors = {
      title: '',
      desc: ''
    };
    let isFormValid = true;
      if(fields["title"].length < 1){
        isFormValid = false;
        errors["title"] = "Cannot be empty";
      }

      if(fields["desc"].length < 1){
        isFormValid = false;
        errors["desc"] ="Cannot be empty";
      }
    this.setState({errors: errors, isFormValid: isFormValid});
    this.props.updateFormState(null,isFormValid);
    return isFormValid;
  }



		render() {
			return (
    		<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
            style={{textAlign: 'left'}}
            floatingLabelText="Event Description *"
            multiLine={true}
            rows={1}
            rowsMax={this.props.isMobile ? 3 : 5}
            key={2}
            type="text"
            onChange={this.handleChange.bind(this, "desc")}
            onBlur={this.handleBlur.bind(this,"desc")}
            value={this.state.fields["desc"]}
            errorText={this.state.fieldTouch["desc"] && this.state.errors["desc"]}
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