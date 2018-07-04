import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import {firebaseDB} from '../../../firebaseConfig'
import Snackbar from 'material-ui/Snackbar';
import {approveEvent, flagRejectEvent} from '../../../Services/firebaseDBService'
import Dialogxx from '../../Dialogs/ViewComplaintDialogComponent'
import SortIcon from 'material-ui/svg-icons/content/sort' 
import UpArrow from 'material-ui/svg-icons/navigation/arrow-upward'
import DownArrow from 'material-ui/svg-icons/navigation/arrow-downward'
import moment from 'moment'
import {toggleActions} from '../../../actions/toggleActions'
import StatusIcon from 'material-ui/svg-icons/av/fiber-manual-record'
import SearchSortContainer from './SearchSortContainer'

class ViewComplaintsComponent extends Component {
  constructor(props) {
    super(props)
    this.showDialog = this.showDialog.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleFlagDialogClose = this.handleFlagDialogClose.bind(this)
    this.nextComplaint = this.nextComplaint.bind(this)
    this.handleSort = this.handleSort.bind(this);
    this.resolveComplaint = this.resolveComplaint.bind(this);
    this.filterState = this.filterState.bind(this);
    this.setUpArray = this.setUpArray.bind(this);
    
    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      showCheckboxes: false,
      resolvedArr: {},
      unresolvedArr: {},
      originalArr: {},
      tempArr: {},
      resolvedTempArr: {},
      unresolvedTempArr: {},
      dialogOpen: false,
      FlagDialogOpen: false,
      currentComplaint: null,
      dateSort: null,
      filterChoice: 'all',
    }
  }

  showDialog(event) {
    this.setState({dialogOpen: true})
    this.setState({currentComplaint: event})
  }
  
  handleDialogClose() {
    this.setState({dialogOpen: false})
  }

  resolveComplaint(complaint, mode) {
    firebaseDB.ref('complaints/' + complaint.key + '/isResolved').set(mode);
    this.filterState(this.state.filterChoice);
    this.nextComplaint();
    const {dispatch} = this.props
    dispatch(toggleActions.toggleToaster(mode ? "Compaint marked Resolved" : "Compaint marked Unresolved", true))
  }

  handleFlagDialogClose() { this.setState({FlagDialogOpen: false}) }

  nextComplaint() {
    let keys = Object.keys(this.state.tempArr)
    if(keys.length == 0){
      this.handleDialogClose()
      return
    }
    let pos = keys.indexOf(this.state.currentComplaint.key) + 1
    if(pos == Object.keys(this.state.tempArr).length){
      pos = 0;
    }
    let nextKey = keys[pos]
    let nextComplaint = this.state.tempArr[nextKey]
    this.setState({currentComplaint: nextComplaint})
  }

  handleSort() {
    if(this.state.dateSort === 'des')
      this.setState({dateSort: 'asc'})
    else
      this.setState({dateSort: 'des'})
    var scope = this
    var tempArr = this.state.originalArr
    tempArr = Object.values(tempArr).sort(function(a, b)
      { 
        var aDate = moment(a.start_date, 'DD-MM-YYYY');
        var bDate = moment(b.start_date, 'DD-MM-YYYY');
        if(scope.state.dateSort === 'des')
          return (aDate - bDate);
        return (bDate - aDate);
      });
    this.setState({tempArr})
  }

  componentDidMount() {
    if(!this.props.user){
      hashHistory.push('/dashboard')
      return
    }
    this.setUpArray();
  }

  setUpArray() {
    this.setState({fetching: true})
    var scope = this;
    firebaseDB.ref().child('complaints').on('value',
    function(snapshot) {
      scope.setState({fetching: false})
      snapshot.forEach(function(child) {
        scope.setState({fetching: false})
          const {tempArr} = scope.state
          const {resolvedTempArr} = scope.state
          const {unresolvedTempArr} = scope.state
          if(child.val().isResolved==true) {
            resolvedTempArr[child.key] = child.val()
            resolvedTempArr[child.key].key = child.key
          } else {
            unresolvedTempArr[child.key] = child.val()
            unresolvedTempArr[child.key].key = child.key
          }
          tempArr[child.key] = child.val()
          tempArr[child.key].key = child.key
          scope.setState({tempArr})
          scope.setState({originalArr: tempArr})
          scope.setState({resolvedArr: resolvedTempArr})
          scope.setState({unresolvedArr: unresolvedTempArr})
          // console.log("*********************")
          // console.log(scope.state.tempArr)
      })
    })
  }

  filterState(state) {
    this.setState({filterChoice: state})
    this.setUpArray();
    switch(state) {
      case 'unresolved': {let unresolvedArr = this.state.unresolvedArr; this.setState({tempArr: unresolvedArr}); return;}
      case 'resolved': {let resolvedArr = this.state.resolvedArr; this.setState({tempArr: resolvedArr}); return;}
      case 'all': {let originalArr = this.state.originalArr; this.setState({tempArr: originalArr}); return;}
    }
  }

  render() {

    return (
      <div style={{display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'center', backgroundColor: '', height: '100%'}}>
      
      <div style={{minWidth: '98%', backgroundColor: 'yellow', marginTop: 20}}>
        <SearchSortContainer filterState={this.filterState}/>
      </div>

      {this.state.currentComplaint && 
      <Dialogxx open={this.state.dialogOpen} currentComplaint={this.state.currentComplaint} handleClose={this.handleDialogClose} nextComplaint={this.nextComplaint} resolveComplaint={this.resolveComplaint} />}

      <Paper style={{width: '98%', height: 500, overflow: 'hidden'}} zDepth={2}>
        <Table
          style={{backgroundColor: ''}}
          height={'440px'}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow style={{backgroundColor: '#EFF0F2'}}>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '18%'}}>Status</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '15%'}}>Subject</TableHeaderColumn>
              <TableHeaderColumn
                style={{color: '#000', fontWeight: 700, display: 'flex', alignItems: 'center', width: '15%'}}
                hidden={this.props.isMobile}>
                Dated
                <IconButton onClick={this.handleSort} style={{padding: 0, height: 20, width: 20}}>{this.state.dateSort!=null ? (this.state.dateSort === 'asc' ? <UpArrow viewBox='0 0 30 30' /> : <DownArrow viewBox='0 0 30 30' />) : <SortIcon viewBox='0 0 30 30' />}</IconButton>
              </TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '35%'}}>Description</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '20%'}}>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >

          {this.state.fetching && <CircularProgress />}

          { Object.keys(this.state.tempArr).length > 0 ? (Object.values(this.state.tempArr).map(function(complaint, index) {
              return (
                  <TableRow key={index}>
                    <TableRowColumn style={{width: '18%'}}><StatusIcon style={{color: complaint.isResolved ? '#558B2F' : '#b71c1c'}} data-tip={"bhawesh"}/></TableRowColumn>
                    <TableRowColumn style={{width: '15%'}}>{complaint.subject}</TableRowColumn>
                    <TableRowColumn style={{width: '15%'}}>{complaint.dated}</TableRowColumn>
                    <TableRowColumn style={{width: '35%'}}>{complaint.desc}</TableRowColumn>
                    <TableRowColumn style={{width: '20%'}}>{<div><RaisedButton label="View" primary={true} style={{marginRight: 10}} onClick={() => this.showDialog(complaint)}/></div>}</TableRowColumn>
                  </TableRow>
            )}, this)) : <TableRow><TableRowColumn style={{textAlign: 'center', fontSize: '3rem'}}>NO EVENTS PENDING</TableRowColumn></TableRow>
          }
          
          </TableBody>
        </Table>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {openSideNav, isMobile, filter} = state.toggler
  const {user, verified, vals} = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile,
    vals,
    filter
  }
}

export default connect(mapStateToProps)(ViewComplaintsComponent)