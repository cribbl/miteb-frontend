import React, {Component} from 'react';
import './MyEventsComponent';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import ExportIcon from 'material-ui/svg-icons/file/cloud-download'
import IconButton from 'material-ui/IconButton'
import EventExportDialog from '../../Dialogs/EventExportDialog'

class SearchSortContainer extends Component {
  constructor (props) {
    super(props)
    this.filterClicked = this.filterClicked.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.showExportDialog = this.showExportDialog.bind(this)
    console.log('IPHONE')
    console.log(props)
    this.state = {
      filter: 'all',
      search: '',
      dialogOpen: false,
    }
  }

  filterClicked(filter) {
    const {dispatch} = this.props
    dispatch({type: 'FILTER', filter})
  }

  handleSearch(e) {
    this.setState({search: e.target.value})
    this.props.handleSearch(e.target.value)
  }

  showExportDialog() {
    this.setState({dialogOpen: true})
  }

  render() {
    if(!this.props.user)
      return null;
    return (
       <div>
       <Toolbar style={{minWidth: '100%', backgroundColor: 'rgb(248, 248, 248)'}}>
       <ToolbarGroup>
          <IconButton tooltip="Export Events" tooltipPosition="top-right" onClick={this.showExportDialog} hidden={!this.props.user.isClub}>
            <ExportIcon />
          </IconButton>
        </ToolbarGroup>

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
       </Toolbar>

       <EventExportDialog open={this.state.dialogOpen} handleClose={() => {this.setState({dialogOpen: false})}} view={"event"} titleText="Events"/>
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
