import React from 'react';
import {connect} from 'react-redux';
import Subheader from 'material-ui/Subheader';
import {List,ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
//import { Route , Link } from 'react-router';

class MediumContainer extends React.Component {
	constructor(props){
		super(props);
		this.state =  {
      checkboxValue : 0,
      checked: [true, false, false, false]

		}
  }
    updateShared(){
    this.props.updateShared(this.state.checked);
  }
    updateCheck(value){
      var state = this;
      var checked_array = this.state.checked;
      checked_array[value] = !checked_array[value];
      console.log('here is the value',value)

      this.setState((oldState) => {
        return {
          checked: checked_array
        }
      })
      this.props.updateShared(this.state.checked);
      // this.props.checkedMediums(state,checked_array);   
    };

		render() {
			return (
    		<div style = {{width: '100%',minHeight:400,justifyContent:'center'}}>
    			  <List>
              <ListItem
                leftCheckbox={<Checkbox value={0} checked={this.state.checked[0]} onCheck={this.updateCheck.bind(this,0)}/>}
                primaryText="Banner"
                secondaryText="Otherwise, only at final approval"
              />
              <Divider />
              <ListItem
                leftCheckbox={<Checkbox value={1} checked={this.state.checked[1]} onCheck={this.updateCheck.bind(this,1)} />}
                primaryText="InfoDesk"
                secondaryText="Otherwise, only at final approval"
              />
              <Divider />
              <ListItem
                leftCheckbox={<Checkbox value={2} checked={this.state.checked[2]} onCheck={this.updateCheck.bind(this,2)} />}
                primaryText="Digital Board"
                secondaryText="Otherwise, only at final approval"
              />
              <Divider />
               <ListItem
                leftCheckbox={<Checkbox value={3} checked={this.state.checked[3]} onCheck={this.updateCheck.bind(this,3)} />}
                primaryText="Poster"
                secondaryText="Otherwise, only at final approval"
              />
          </List>		
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

export default connect(mapStateToProps)(MediumContainer);