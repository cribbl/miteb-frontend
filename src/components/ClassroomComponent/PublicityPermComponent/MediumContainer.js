import React from 'react';
import {connect} from 'react-redux';
import {List,ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import Paper from 'material-ui/Paper';
//import { Route , Link } from 'react-router';
class MediumContainer extends React.Component {
	constructor(props){
		super(props);
    this.handleClick.bind(this);
    this.handleToggle.bind(this);
		this.state =  {
      checkboxValue : 0,
      checked: [true, false, false, false],
      clickedValue: 0,
      indexes: [{ '0':false, '1':false,'2':false,'3':false},
              { '0':false, '1':false,'2':false,'3':false},
              { '0':false, '1':false,'2':false,'3':false},
              { '0':false, '1':false,'2':false,'3':false }],
      clicked: true,
      object: { 0: 'Banner', 1: 'InfoDesk', 2: 'Digital Board', 3: 'Poster'}

		}
  }
  updateShared(){
    this.props.updateShared(this.state.checked);
  }
  handleClick(location){
    //console.log('i have been clicked',location)
    this.setState({
      clickedValue: location,
      clicked: true
    })
  }
  handleUpload(){
    console.log('uploading..')
  }
  handleToggle(s,i){
    let indexes = this.state.indexes;
    (indexes[s])[i]=!(indexes[s])[i];
    this.setState({indexes});
    this.props.updateToggle(indexes);
  }
  updateCheck(value){
      var checked_array = this.state.checked;
      checked_array[value] = !checked_array[value];
      this.setState((oldState) => {
        return {
          checked: checked_array
        }
      })
      this.props.updateShared(this.state.checked);
    };

  renderCard() {
    var value = this.state.clickedValue;
    var clicked = value || value === 0? true : false;
    var medium = this.state.object[value];
    var steps = ["Academic Blocks", "First Year Hostel Blocks", "Senior Hostel Blocks","Mess"]
    var list_sec = ["NLH,AB1,AB2,AB5,IC","XI,XII,XCI,XVII,XVIII","IX,XIII,XIV","FC,Annapoorna,Apoorva"]
      return (<div>
        <Card>
        <CardText expandable={false}>
         <List>
         <Subheader> {medium} </Subheader>
                {steps.map((step,index) =>  {
                  var a = "" + value + index;
                  return (<div><ListItem key={a} secondaryText={list_sec[index]}  rightToggle={<Toggle key={a} toggled={(this.state.indexes[value])[index]} onToggle={this.handleToggle.bind(this,value,index)} />}> {step} </ListItem> </div>
                  )
                })}
          </List>
        </CardText>
        </Card>
        </div>);     
  }

   render() {
			return (
    		<div style={{display: 'flex', flexDirection: this.props.isMobile ? 'column' : 'row'}}>
        <div style = {{width: '100%',minHeight: 300,alignItems: 'center'}}>
          <Paper style={{height:'100%'}}>
    			  <List>
              <Subheader> Media </Subheader>
               <div style={{display:'flex', flexDirection: 'row'}}>
                 <Checkbox value={0} checked={this.state.checked[0]}   style={{width: 48,height: 36 }}onCheck={this.updateCheck.bind(this,0)}/>
                 <ListItem
                    style={{minHeight:70}}
                    onClick={this.handleClick.bind(this,0)}
                    primaryText="Banner"
                  />
               </div>
                <Divider />
                <div style={{display:'flex', flexDirection: 'row'}}>
                  <Checkbox value={1} checked={this.state.checked[1]}  style={{width: 48,height: 36 }} onCheck={this.updateCheck.bind(this,1)} />
                  <ListItem
                    style={{minHeight:70}}
                    onClick={this.handleClick.bind(this,1)}
                    primaryText="InfoDesk"
                   />
                </div>
                <Divider />
                <div style={{display:'flex', flexDirection: 'row'}}>
                  <Checkbox value={2} checked={this.state.checked[2]}  style={{width: 48,height: 36 }} onCheck={this.updateCheck.bind(this,2)} />
                  <ListItem
                    style={{minHeight:70}}
                    onClick={this.handleClick.bind(this,2)}
                    primaryText="Digital Board"
                  />
                </div>
                <Divider />
                <div style={{display:'flex', flexDirection: 'row'}}>
                  <Checkbox value={3} checked={this.state.checked[3]}  style={{width: 48,height: 36 }} onCheck={this.updateCheck.bind(this,3)} />
                   <ListItem
                    style={{minHeight:70}}
                    onClick={this.handleClick.bind(this,3)}
                    primaryText="Poster"

                  />
                   <IconButton touch={true} tooltip="Upload image" tooltipPosition="bottom-right" onClick={this.handleUpload} > <UploadIcon /> </IconButton>
                </div>
            </List>  
	         </Paper>
          </div>
          <div style={{width: '100%',minHeight:400,justifyContent:'center',position:'relative'}}>
        {this.state.clicked && this.renderCard()}
        </div>
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