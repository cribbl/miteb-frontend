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
import {tableData} from './data'
import RaisedButton from 'material-ui/RaisedButton'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import {firebaseDB} from '../../../firebaseConfig'
import SearchSortContainer from './SearchSortContainer'
import Dialogxx from '../../Dialogs/ViewEventDialogComponent'
import Snackbar from 'material-ui/Snackbar';
import {approveEvent, rejectEvent} from '../../../Services/firebaseDBService'

class SO_EventsComponent extends Component {
  constructor(props) {
    super(props)
    this.approve = this.approve.bind(this)
    this.reject = this.reject.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
    this.nextEvent = this.nextEvent.bind(this)
    
    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      showCheckboxes: false,
      myArr: {},
      myArrx: {},
      allArr: {},
      pendingArr: {},
      approvedArr: {},
      SnackBarmessage: '',
      openSnackBar: false,
      autoHideDuration: 3000,
      dialogOpen: false,
      currentEvent: {}
    }
}

  showDialog(event) {
    this.setState({dialogOpen: true})
    this.setState({currentEvent: event})
  }
  
  approve(event) {
    let scope = this;
    approveEvent(event, 'SO')
    const {myArrx} = scope.state
    delete myArrx[event.key]
    scope.setState({myArrx})
    scope.setState({SnackBarmessage: 'Event successfully approved', openSnackBar: true})
    this.nextEvent()
  }

  reject(event) {
    let scope = this;
    rejectEvent(event, 'SO')
    const {myArrx} = scope.state
    delete myArrx[event.key]
    scope.setState({myArrx})
    scope.setState({SnackBarmessage: 'Event successfully rejected', openSnackBar: true})
    this.nextEvent()
  }

  handleDialogClose() {
    this.setState({dialogOpen: false})
  }

  handleSnackBarClose() {
    this.setState({openSnackBar: false}) 
  }

  nextEvent() {
    let keys = Object.keys(this.state.myArrx)
    if(keys.length == 0){
      this.handleDialogClose()
      return
    }
    let pos = keys.indexOf(this.state.currentEvent.key) + 1
    if(pos == Object.keys(this.state.myArrx).length){
      pos = 0;
    }
    let nextKey = keys[pos]
    let nextEvent = this.state.myArrx[nextKey]
    this.setState({currentEvent: nextEvent})
  }


  componentDidMount() {
    if(!this.props.user){
      hashHistory.push('/dashboard')
      return
    }
    this.setState({fetching: true})
        var scope = this;
        firebaseDB.ref().child('events').on('value',
        function(snapshot) {
          snapshot.forEach(function(child) {
            scope.setState({fetching: false})
              if(!child.val().SO_appr) {
                const {myArrx} = scope.state
                myArrx[child.key] = child.val()
                myArrx[child.key].key = child.key
                scope.setState({myArrx})
                console.log(scope.state.myArrx)
              }
          })
        }, this)
  }

  render() {

    return (
      <div style={{display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'center', backgroundColor: '', height: '100%'}}>
      
      {/*<div style={{minWidth: '98%', backgroundColor: 'yellow', marginTop: 20}}>
        <SearchSortContainer allLength={Object.keys(this.state.allArr).length} approvedLength={Object.keys(this.state.approvedArr).length} pendingLength={Object.keys(this.state.pendingArr).length}/>
      </div>*/}

      <Snackbar
          open={this.state.openSnackBar}
          message={this.state.SnackBarmessage}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={this.handleSnackBarClose}
        />

      <Dialogxx open={this.state.dialogOpen} currentEvent={this.state.currentEvent} handleClose={this.handleDialogClose} nextEvent={this.nextEvent} approveHandler={this.approve} rejectHandler={this.reject}/>
      
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
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}}>CLUB NAME</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}}>TITLE</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}}>START DATE</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}}>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >

          {this.state.fetching && <CircularProgress />}

          { Object.keys(this.state.myArrx).length > 0 ? (Object.values(this.state.myArrx).map(function(event, index) {
              return (
                  <TableRow key={index}>
                    <TableRowColumn>{event.clubName}</TableRowColumn>
                    <TableRowColumn>{event.title}</TableRowColumn>
                    <TableRowColumn>{event.start_date}</TableRowColumn>
                    <TableRowColumn>{<div><RaisedButton label="View" primary={true} style={{marginRight: 10}} onClick={() => this.showDialog(event)}/><RaisedButton label="Approve" primary={true} onClick={() => this.approve(event)}/></div>}</TableRowColumn>
                  </TableRow>
            )}, this)) : <p style={{textAlign: 'center', fontSize: '3rem'}}>NO EVENTS PENDING</p>
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

export default connect(mapStateToProps)(SO_EventsComponent)