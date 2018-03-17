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
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import CrossCircleIcon from 'material-ui/svg-icons/action/highlight-off';
import IconButton from 'material-ui/IconButton'
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

class MyEventsComponent extends Component {
  constructor(props) {
    super(props)
    this.showDialog = this.showDialog.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
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
      dialogOpen: false,
      currentEvent: {}
    }
}

  showDialog(event) {
    this.setState({dialogOpen: true})
    this.setState({currentEvent: event})
  }

  handleDialogClose() {
    this.setState({dialogOpen: false})
  }

  nextEvent() {
    let keys = Object.keys(this.state.myArrx)
    let pos = keys.indexOf(this.state.currentEvent.key) + 1
    if(pos == Object.keys(this.state.myArrx).length){
      pos = 0;
    }
    let nextKey = keys[pos]
    let nextEvent = this.state.myArrx[nextKey]
    this.setState({currentEvent: nextEvent})
  }

  filterAndStore(arr) {
    for(let [key, value] of Object.entries(arr)) {
      var x = key
      if(value.FA_appr && value.AD_appr && value.SO_appr) {
        this.state.approvedArr[key] = value
      }
      else if(!value.FA_appr || !value.AD_appr || !value.SO_appr) {
        this.state.pendingArr[key] = value
      }
      this.state.allArr[key] = value
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.filter == 'pending'){
      const {pendingArr} = this.state
      this.setState({myArr: pendingArr})
    }
    else if(newProps.filter == 'approved') {
      const {approvedArr} = this.state
      this.setState({myArr: approvedArr})
    }
    else if(newProps.filter == 'all') {
      const {allArr} = this.state
      this.setState({myArr: allArr})
    }
  }

  componentWillMount() {
    if(!this.props.user){
      hashHistory.push('/dashboard')
      return
    }
    else {
      if(this.props.user.isFA) {
        hashHistory.replace('/dashboard/faEvents')
        return
      }
      if(this.props.user.isAD) {
        hashHistory.replace('/dashboard/adEvents')
        return
      }
      if(this.props.user.isSO) {
        hashHistory.replace('/dashboard/soEvents')
        return
      }
    }
    // this.setState({fetching: true})
    
    firebaseDB.ref('/clubs/' + this.props.user.uid).on('value',
    function(snapshot) {
      this.setState({fetching: false})
      let events = snapshot.val().my_events
      for(event in events) {
        firebaseDB.ref('/events/' + events[event]).on('value',
        function(snapshot) {
          // console.log(snapshot.val())
          const {myArrx} = this.state
          myArrx[snapshot.key] = snapshot.val()
          myArrx[snapshot.key].key = snapshot.key
          this.setState({myArrx})
          this.filterAndStore(myArrx)
          // console.log(this.state.myArrx)
        }, this)
      }
    }, this)
  }

  render() {

    return (
      <div style={{display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'center', backgroundColor: '', height: '100%'}}>
      
      {/*<div style={{minWidth: '98%', backgroundColor: 'yellow', marginTop: 20}}>
        <SearchSortContainer allLength={Object.keys(this.state.allArr).length} approvedLength={Object.keys(this.state.approvedArr).length} pendingLength={Object.keys(this.state.pendingArr).length}/>
      </div>*/}

      <Dialogxx open={this.state.dialogOpen} currentEvent={this.state.currentEvent} handleClose={this.handleDialogClose} nextEvent={this.nextEvent}/>
      
      <Paper style={{width: '98%', height: 500, overflow: 'hidden', marginTop: 20}} zDepth={2}>
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
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}}>TITLE</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}} hidden={this.props.isMobile}>START DATE</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}} hidden={this.props.isMobile}>FA</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}} hidden={this.props.isMobile}>AD</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700}} hidden={this.props.isMobile}>SO</TableHeaderColumn>
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

          {/*
             Object.values(this.state.myArrx).map(function(event, index) {
              return(
                  <TableRow key={index}>
                    <TableRowColumn>{event.title}</TableRowColumn>
                    <TableRowColumn hidden={this.props.isMobile}>{event.start_date}</TableRowColumn>
                    <TableRowColumn hidden={this.props.isMobile}>{event.FA_appr == 'approved' ? <IconButton iconStyle={{color: 'green'}}><CheckCircleIcon /></IconButton> : <IconButton iconStyle={{color: 'red'}}><CrossCircleIcon /></IconButton>}</TableRowColumn>
                    <TableRowColumn hidden={this.props.isMobile}>{event.AD_appr == 'approved' ? <CheckCircleIcon style={{color: 'green'}}/> : <CrossCircleIcon style={{color: 'red'}}/>}</TableRowColumn>
                    <TableRowColumn hidden={this.props.isMobile}>{event.SO_appr == 'approved' ? <CheckCircleIcon style={{color: 'green'}}/> : <CrossCircleIcon style={{color: 'red'}}/>}</TableRowColumn>
                    <TableRowColumn>{<RaisedButton label="View" primary={true} onClick={() => this.showDialog(event)}/>}</TableRowColumn>
                  </TableRow>
              )}, this)
          */}

          {
             Object.values(this.state.myArrx).map(function(event, index) {
              return(
                  <TableRow key={index}>
                    <TableRowColumn>{event.title}</TableRowColumn>
                    <TableRowColumn hidden={this.props.isMobile}>{event.start_date}</TableRowColumn>
                    <TableRowColumn hidden={this.props.isMobile}>{event.FA_appr}</TableRowColumn>
                    <TableRowColumn hidden={this.props.isMobile}>{event.AD_appr}</TableRowColumn>
                    <TableRowColumn hidden={this.props.isMobile}>{event.SO_appr}</TableRowColumn>
                    <TableRowColumn>{<RaisedButton label="View" primary={true} onClick={() => this.showDialog(event)}/>}</TableRowColumn>
                  </TableRow>
              )}, this)
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

export default connect(mapStateToProps)(MyEventsComponent)