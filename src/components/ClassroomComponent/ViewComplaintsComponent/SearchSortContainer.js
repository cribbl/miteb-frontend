import React, { Component } from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import { connect } from 'react-redux'
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
    this.state = {
      filterChoice: 'all',
      search: '',
      dialogOpen: false
    }
  }

  filterClicked (filterChoice) {
    this.setState({ filterChoice: filterChoice, search: '' })
    this.props.filterState(filterChoice, this.state.search)
  }

  handleSearch (e) {
    this.setState({ search: e.target.value })
    this.props.search(e.target.value)
  }

  showExportDialog () {
    this.setState({ dialogOpen: true })
  }

  render () {
    return (
      <div>
        <Toolbar style={{ minWidth: '100%', backgroundColor: 'rgb(248, 248, 248)', padding: '0px 10px' }}>
          <ToolbarGroup>
            <span className='hoverPointer' onClick={() => { this.filterClicked('resolved') }} style={{ fontWeight: this.state.filterChoice === 'resolved' ? 700 : 100 }}>Resolved ({this.props.resolvedLength})</span>
            <ToolbarSeparator style={{ marginLeft: 6, marginRight: 6, height: 20 }} />
            <span className='hoverPointer' onClick={() => { this.filterClicked('unresolved') }} style={{ fontWeight: this.state.filterChoice === 'unresolved' ? 700 : 100 }}>Unresolved ({this.props.unresolvedLength})</span>
            <ToolbarSeparator style={{ marginLeft: 6, marginRight: 6, height: 20 }} />
            <span className='hoverPointer' onClick={() => { this.filterClicked('all') }} style={{ fontWeight: this.state.filterChoice === 'all' ? 700 : 100 }}>All ({this.props.allLength})</span>
            <ToolbarSeparator style={{ marginLeft: 6, marginRight: 6, height: 20 }} />
            <IconButton tooltip='Export Complaints' tooltipPosition='top-right' onClick={this.showExportDialog}>
              <ExportIcon />
            </IconButton>
          </ToolbarGroup>

          {!this.props.isMobile
            ? <ToolbarGroup>
              <TextField
                value={this.state.search}
                onChange={this.handleSearch}
                underlineShow={false}
                inputStyle={{ border: '1px solid rgb(224, 224, 224)', height: 40, marginTop: 4, padding: 4 }}
                hintText='Search'
                hintStyle={{ paddingLeft: 4 }}
              />
            </ToolbarGroup>
            : '' }
        </Toolbar>
        <EventExportDialog open={this.state.dialogOpen} handleClose={() => { this.setState({ dialogOpen: false }) }} view='complaint' titleText='Complaints' />
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { openSideNav, isMobile, filter } = state.toggler
  const { user, verified } = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile,
    filter
  }
}

export default connect(mapStateToProps)(SearchSortContainer)
