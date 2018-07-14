import React, {Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import ExportIcon from 'material-ui/svg-icons/file/cloud-download'
import IconButton from 'material-ui/IconButton'
import EventExportDialog from '../../Dialogs/EventExportDialog'
import './SearchSortContainer.css';

class SearchSortContainer extends Component{
  constructor(props) {
    super(props);
	  this.filterClicked = this.filterClicked.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.showExportDialog = this.showExportDialog.bind(this)
    this.state = {
      filterChoice: 'all',
      content: '',
      dialogOpen: false
    }
	}

  filterClicked(filterChoice) {
    this.setState({filterChoice: filterChoice, content: ''});
    this.props.filterState(filterChoice, this.state.content);
  }

  handleSearch(e) {
    this.setState({content: e.target.value})
    this.props.search(e.target.value)
  }

  showExportDialog() {
    this.setState({dialogOpen: true})
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
          <ToolbarSeparator style={{marginLeft: 10, marginRight: 10, height: 20}}/>
          <IconButton tooltip="Export Events" tooltipPosition="top-right" onClick={this.showExportDialog}>
            <ExportIcon />
          </IconButton>
        </ToolbarGroup>
        
        {!this.props.isMobile ? 
          <ToolbarGroup>
            <TextField
              floatingLabelText="Search"
              onChange={this.handleSearch}
              style={{marginBottom: 15}}
              value={this.state.content}
            />
          </ToolbarGroup>
          : '' }
       </Toolbar>
       <EventExportDialog open={this.state.dialogOpen} handleClose={() => {this.setState({dialogOpen: false})}} view="complaint" />
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
