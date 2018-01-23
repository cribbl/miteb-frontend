import React, {Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'

class SearchSortContainer extends Component {
  constructor (props) {
    super(props)
    this.filterClicked = this.filterClicked.bind(this)
    this.state = {
      filter: 'all'
    }
  }

  filterClicked(filterx) {
    console.log(this.state.filter)
    this.setState({filter: filterx})
  }

  render() {
    return (
       <div>
       <Toolbar style={{minWidth: '100%', backgroundColor: '#FFF'}}>
       <ToolbarGroup firstChild={true}>
          <span onClick={()=>{this.filterClicked('pending')}} style={{fontWeight: this.state.filter == 'pending' ? 700 : 100}}>Pending (7)</span>
          <ToolbarSeparator style={{marginLeft: 10, marginRight: 10, height: 20}}/>
          <span onClick={()=>{this.filterClicked('approved')}} style={{fontWeight: this.state.filter == 'approved' ? 700 : 100}}>Approved (14)</span>
          <ToolbarSeparator style={{marginLeft: 10, marginRight: 10, height: 20}}/>
          <span onClick={()=>{this.filterClicked('all')}} style={{fontWeight: this.state.filter == 'all' ? 700 : 100}}>All (21)</span>
        </ToolbarGroup>
        {!this.props.isMobile ? 
        <ToolbarGroup>
          <TextField hintText="Search"/>
        </ToolbarGroup>
        : '' }
       </Toolbar>
       </div>
    );
  }
}

function mapStateToProps(state) {
  const {openSideNav, isMobile} = state.toggler
  const {user, verified} = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile
  }
}

export default connect(mapStateToProps)(SearchSortContainer)