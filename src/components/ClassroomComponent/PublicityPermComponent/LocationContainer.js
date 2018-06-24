import React from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
//import { Route , Link } from 'react-router';
import {
  Step,
  Stepper,
  StepButton,
  StepContent
} from 'material-ui/Stepper';
import Toggle from 'material-ui/Toggle';
import {List,ListItem} from 'material-ui/List';
const styles = {
  toggle: {
    marginBottom: 16,
  }
}
class LocationContainer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
    stepIndex: 0,
    indexArray: [],
    checked:[true,false,false,false],
    toggled:[],
    Steps:['Banner'],
    indexes: { '00':false, '01':false,'02':false,'03':false,
  						'10':false, '11':false,'12':false,'13':false,
  						'20':false, '21':false,'22':false,'23':false,
  						'30':false, '31':false,'32':false,'33':false }  
  	};
  	  this.handleToggle = this.handleToggle.bind(this);
	}
	componentWillMount(){
		this.setState({
			stepIndex: 0
		})
	}

 componentWillReceiveProps(nextProps) {
  	var arr = nextProps.checkedMediums
    var indices = arr.reduce(
      (out, bool, index) => bool ? out.concat(index) : out, 
      []
    )
    var last = indices[indices.length - 1]
  	 this.callFunction(last,indices,arr)
	}

  callFunction(last,indices,arr){
		var new_indices = []
		if(indices.includes(0)){
			new_indices = new_indices.concat(['Banner'])
		}
		if(indices.includes(1)){
			new_indices = new_indices.concat(['InfoDesk'])
		}
		if(indices.includes(2)){
			new_indices = new_indices.concat(['Digital Board'])
		}
			if(indices.includes(3)){
			new_indices = new_indices.concat(['Poster'])
		}
  	if(typeof last === 'undefined'){
	  	this.setState({
	  		stepIndex: 0,
	  		checked: arr,
	  		Steps: null
	  	})
	  }
	  else {
	  	this.setState({
	  		stepIndex: last,
	  		checked:arr,
	  		Steps: new_indices
	  	})
	  }
  }

  orientStepper() {
    const contentStyle = {margin: '0 16px'};
    var steps = this.state.Steps;
	  const isMobile = this.props.isMobile;
	  if (isMobile && steps!=null) {
	    return (<div style={{width: '100%',minWidth:500,minHeight:400,justifyContent:'center'}}>
				        <Stepper orientation={this.props.isMobile ? 'vertical' : 'horizontal'} linear={false} activeStep={this.state.stepIndex}>
								  {steps.map((step,index) =>  {
								    return (<Step >
								      <StepButton onClick={() => this.setState({stepIndex: index})}>{step}</StepButton>
								      <StepContent >{this.getStepContent(index)} </StepContent>
								    </Step>)
								  })}
								</Stepper>
				        <div style={contentStyle}>
				          <div hidden={this.props.isMobile} >{this.getStepContent(this.state.stepIndex)}</div>
				          
				        </div>
	     				</div>)
    }
  	else if (!isMobile && steps!= null) { return (<div style={{width: '100%',minWidth:500,minHeight:400,justifyContent:'center'}}>
			        <Stepper orientation={this.props.isMobile ? 'vertical' : 'horizontal'} linear={false} activeStep={this.state.stepIndex}>
							  {steps.map((step,index) =>  {
							    return (<Step key={index}>
							      <StepButton onClick={() => this.setState({stepIndex: index})}>{step}</StepButton>
							    </Step>)
							  })}
							</Stepper>
			        <div style={contentStyle}>
			          <div hidden={this.props.isMobile} >{this.getStepContent(this.state.stepIndex)}</div> 
			        </div>
      		 </div>);
  	}
  	else {
  		return (<div>  </div>)
  	}
	}
  handleToggle(a){
   let indexes = this.state.indexes;
    indexes[a]=!indexes[a];
    this.setState({indexes});
  }
  getStepContent(stepIndex) {
  	var steps = ["Academic Blocks", "Hostel", "Hostel Senior","Mess"]
  	var list_sec = ["NLH,AB1,AB2,AB5,IC","XI,XII,XCI,XVII,XVIII","IX,XIII,XIV","FC,Annapoorna,Apoorva"]
    switch (stepIndex) {
      case 0:
      return (<div>  
      	 <List>
							  {steps.map((step,index) =>  {
							  	var a = "" + stepIndex + index;
							    return (<ListItem key={a} secondaryText={list_sec[index]}  rightToggle={<Toggle key={a} toggled={(this.state.indexes[a])} onToggle={this.handleToggle.bind(this,a)} />}> {step} </ListItem>
							    )
							  })}
					</List>
        </div>);
      case 1:
         return (<div>  
      	 <List>
							  {steps.map((step,index) =>  {
							  	var a = "" + stepIndex + index;
							    return (<ListItem key={a} secondaryText={list_sec[index]} rightToggle={<Toggle key={a} toggled={(this.state.indexes[a])} onToggle={this.handleToggle.bind(this,a)} />}> {step} </ListItem>
							    )
							  })}
					</List>
        </div>);
      case 2:
        return (<div>  
      	 <List>
							  {steps.map((step,index) =>  {
							  	var a = "" + stepIndex + index;
							    return (<ListItem key={a} secondaryText={list_sec[index]} rightToggle={<Toggle key={a} toggled={(this.state.indexes[a])} onToggle={this.handleToggle.bind(this,a)} />}> {step} </ListItem>
							    )
							  })}
					</List>
        </div>);
      case 3:
      	 return (<div>  
      	 <List>
							  {steps.map((step,index) =>  {
							  	var a = "" + stepIndex + index;
							    return (<ListItem  key={a} secondaryText={list_sec[index]} rightToggle={<Toggle key={a} toggled={(this.state.indexes[a])} onToggle={this.handleToggle.bind(this,a)} />}> {step} </ListItem>
							    )
							  })}
					</List>
        </div>);
      default: console.log('hello')
    };
  }

  render() {

    return (
    	<div>
     {this.orientStepper()}
     </div>
  )
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


export default connect(mapStateToProps)(LocationContainer);