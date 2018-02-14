import React, {Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'

class SearchSortContainer extends Component {
  constructor (props) {
    super(props)
    this.filterClicked = this.filterClicked.bind(this)
    console.log('IPHONE')
    console.log(props)
    this.state = {
      filter: 'all'
    }
  }

  filterClicked(filter) {
    const {dispatch} = this.props
    dispatch({type: 'FILTER', filter})
  }

  render() {
    return (
       <div>
       <Toolbar style={{minWidth: '100%', backgroundColor: '#FFF'}}>
       <ToolbarGroup firstChild={true}>
          <span onClick={()=>{this.filterClicked('pending')}} style={{fontWeight: this.props.filter == 'pending' ? 700 : 100}}>Pending ({this.props.pendingLength})</span>
          <ToolbarSeparator style={{marginLeft: 10, marginRight: 10, height: 20}}/>
          <span onClick={()=>{this.filterClicked('approved')}} style={{fontWeight: this.props.filter == 'approved' ? 700 : 100}}>Approved ({this.props.approvedLength})</span>
          <ToolbarSeparator style={{marginLeft: 10, marginRight: 10, height: 20}}/>
          <span onClick={()=>{this.filterClicked('all')}} style={{fontWeight: this.props.filter == 'all' ? 700 : 100}}>All ({this.props.allLength})</span>
        </ToolbarGroup>
        {!this.props.isMobile ? 
        <ToolbarGroup>
          <TextField hintText={this.props.filter}/>
        </ToolbarGroup>
        : '' }
       </Toolbar>
       </div>
    );
  }
}

function mapStateToProps(state) {
  const {openSideNav, isMobile, filter} = state.toggler
  const {user, verified} = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile,
    filter
  }
}

export default connect(mapStateToProps)(SearchSortContainer)
