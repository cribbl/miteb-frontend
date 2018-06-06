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
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import {firebaseDB} from '../../../firebaseConfig'
import Snackbar from 'material-ui/Snackbar';
import {approveEvent, flagRejectEvent} from '../../../Services/firebaseDBService'
import Dialogxx from '../../Dialogs/ViewComplaintDialogComponent'


class ViewComplaintsComponent extends Component {
  constructor(props) {
    super(props)
    this.showDialog = this.showDialog.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
    this.handleFlagDialogClose = this.handleFlagDialogClose.bind(this)
    this.nextComplaint = this.nextComplaint.bind(this)
    
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
      FlagDialogOpen: false,
      currentComplaint: null
    }
}

  showDialog(event) {
    this.setState({dialogOpen: true})
    this.setState({currentComplaint: event})
  }
  
  handleDialogClose() {
    this.setState({dialogOpen: false})
  }

  handleSnackBarClose() {
    this.setState({openSnackBar: false}) 
  }

  handleFlagDialogClose() { this.setState({FlagDialogOpen: false}) }

  nextComplaint() {
    let keys = Object.keys(this.state.myArrx)
    if(keys.length == 0){
      this.handleDialogClose()
      return
    }
    let pos = keys.indexOf(this.state.currentComplaint.key) + 1
    if(pos == Object.keys(this.state.myArrx).length){
      pos = 0;
    }
    let nextKey = keys[pos]
    let nextComplaint = this.state.myArrx[nextKey]
    this.setState({currentComplaint: nextComplaint})
  }


  componentDidMount() {
    if(!this.props.user){
      hashHistory.push('/dashboard')
      return
    }
    this.setState({fetching: true})
        var scope = this;
        firebaseDB.ref().child('complaints').on('value',
        function(snapshot) {
          scope.setState({fetching: false})
          snapshot.forEach(function(child) {
            scope.setState({fetching: false})
                const {myArrx} = scope.state
                myArrx[child.key] = child.val()
                myArrx[child.key].key = child.key
                scope.setState({myArrx})
                console.log(scope.state.myArrx)
          })
        }, this)
  }

  render() {

    return (
      <div style={{display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'center', backgroundColor: '', height: '100%'}}>
      
      {/*<div style={{minWidth: '98%', backgroundColor: 'yellow', marginTop: 20}}>
        <SearchSortContainer allLength={Object.keys(this.state.allArr).length} approvedLength={Object.keys(this.state.approvedArr).length} pendingLength={Object.keys(this.state.pendingArr).length}/>
      </div>*/}

      {this.state.currentComplaint && 
      <Dialogxx open={this.state.dialogOpen} currentComplaint={this.state.currentComplaint} handleClose={this.handleDialogClose} nextComplaint={this.nextComplaint} />}

      <Snackbar
          open={this.state.openSnackBar}
          message={this.state.SnackBarmessage}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={this.handleSnackBarClose}
        />

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
              <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '15%'}}>Address To</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '55%'}}>Complaint</TableHeaderColumn>
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

          { Object.keys(this.state.myArrx).length > 0 ? (Object.values(this.state.myArrx).map(function(complaint, index) {
              return (
                  <TableRow key={index}>
                    <TableRowColumn style={{width: '15%'}}>{complaint.address}</TableRowColumn>
                    <TableRowColumn style={{width: '55%'}}>{complaint.desc}</TableRowColumn>
                    <TableRowColumn style={{width: '20%'}}>{<div><RaisedButton label="View" primary={true} style={{marginRight: 10}} onClick={() => this.showDialog(complaint)}/><RaisedButton hidden={this.props.isMobile} label="Approve" primary={true} onClick={() => this.approve(complaint)}/></div>}</TableRowColumn>
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

export default connect(mapStateToProps)(ViewComplaintsComponent)