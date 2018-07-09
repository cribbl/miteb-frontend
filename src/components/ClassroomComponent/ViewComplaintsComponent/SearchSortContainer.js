import React, {Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';
import './SearchSortContainer.css';


class SearchSortContainer extends Component{
	constructor(props) {
		super(props);
	  this.filterClicked = this.filterClicked.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = {
      filterChoice: 'all',
      content: '',
    }
	}

  filterClicked(filterChoice) {
    this.setState({filterChoice: filterChoice});
    this.props.filterState(filterChoice);
  }

  handleSearch(e) {
    this.setState({content: e.target.value})
    this.props.search(e.target.value)
  }

  render() {
    return (
       <div>
       <Toolbar style={{minWidth: '100%', backgroundColor: '#FFF', padding: this.props.isMobile?0: 'auto'}}>
       <ToolbarGroup className="complaintsToolbar">
          <span onClick={()=>{this.filterClicked('resolved')}} style={{fontWeight: this.state.filterChoice == 'resolved'? 700 : 100}}>Resolved ({this.props.resolvedLength})</span>
          <ToolbarSeparator style={{marginLeft: 10, marginRight: 10, height: 20}}/>
          <span onClick={()=>{this.filterClicked('unresolved')}} style={{fontWeight: this.state.filterChoice == 'unresolved'? 700 : 100}}>Unresolved ({this.props.unresolvedLength})</span>
          <ToolbarSeparator style={{marginLeft: 10, marginRight: 10, height: 20}}/>
          <span onClick={()=>{this.filterClicked('all')}} style={{fontWeight: this.state.filterChoice == 'all'? 700 : 100}}>All ({this.props.allLength})</span>
        </ToolbarGroup>
        
        {!this.props.isMobile ? 
          <ToolbarGroup>
            <TextField
              floatingLabelText="Search"
              onChange={this.handleSearch}
              style={{marginBottom: 15}}
            />
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
