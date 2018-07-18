import React, {Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator/*, ToolbarTitle*/} from 'material-ui/Toolbar';
//import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'

class SearchClubContainer extends Component{
	constructor(props) {
		super(props);
	    this.handleSearch = this.handleSearch.bind(this)
	    this.filterClicked = this.filterClicked.bind(this);
		  this.state = {
			 filterChoice: 'all',
       search: ''
		  }
	}

  handleSearch(e) {
    this.setState({search: e.target.value})
    this.props.handleSearch(e.target.value)
  }

	filterClicked(filterChoice) {
		this.setState({filterChoice: filterChoice});
    this.props.filterState(filterChoice);
  }

  	render() {
    return (
       <div>
       <Toolbar style={{minWidth: '100%', backgroundColor: 'rgb(248, 248, 248)'}}>
       <ToolbarGroup className="complaintsToolbar">
          <span className="hoverPointer" onClick={()=>this.filterClicked('approved')} style={{fontWeight: this.state.filterChoice == "approved" && !(this.state.search) ? 700 : 100}}>Approved ({this.props.approvedLength})</span>
          <ToolbarSeparator style={{marginLeft: 10, marginRight: 10, height: 20}}/>
          <span className="hoverPointer" onClick={()=>this.filterClicked('unapproved')} style={{fontWeight: this.state.filterChoice == "unapproved" && !(this.state.search) ? 700 : 100}}>Unapproved ({this.props.unapprovedLength})</span>
          <ToolbarSeparator style={{marginLeft: 10, marginRight: 10, height: 20}}/>
          <span className="hoverPointer" onClick={()=>this.filterClicked('all')} style={{fontWeight: this.state.filterChoice == "all" || this.state.search ? 700 : 100}}>All ({this.props.allLength})</span>
        </ToolbarGroup>
        {!this.props.isMobile ? 
          <ToolbarGroup>
            <TextField
              value={this.state.search}
              onChange={this.handleSearch}
              underlineShow={false}
              inputStyle={{border: '1px solid rgb(224, 224, 224)', height: 40, marginTop: 4, padding: 4}}
              hintText="Search"
              hintStyle={{paddingLeft: 4}}
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

export default connect(mapStateToProps)(SearchClubContainer)
