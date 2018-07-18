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
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
// import IconButton from 'material-ui/IconButton'
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
    this.nextComplaint = this.nextComplaint.bind(this)
    this.resolveComplaint = this.resolveComplaint.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.filterState = this.filterState.bind(this)
    
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
      dialogOpen: false,
      FlagDialogOpen: false,
      currentComplaint: null,
      dateSort: null,
      filterChoice: 'all',
      searchContent: ''
    }
  }

  showDialog(event) {
    this.setState({dialogOpen: true})
    this.setState({currentComplaint: event})
  }
  
  handleDialogClose() {
    this.setState({dialogOpen: false})
  }

  handleSort() {
    if(this.state.dateSort === 'des')
      this.setState({dateSort: 'asc'})
    else
      this.setState({dateSort: 'des'})
    var scope = this
    var tempArr;
    if(this.state.filterChoice=='resolved')
      tempArr=this.state.resolvedArr;
    else if(this.state.filterChoice=='unresolved')
      tempArr=this.state.unresolvedArr;
    else
      tempArr=this.state.originalArr;

    tempArr = Object.values(tempArr).sort(function(a, b)
      { 
        var aDate = moment(a.dated, 'DD-MM-YYYY');
        var bDate = moment(b.dated, 'DD-MM-YYYY');
        if(scope.state.dateSort === 'des')
          return (aDate - bDate);
        return (bDate - aDate);
      });
    this.setState({tempArr})
  }

  resolveComplaint(complaint, mode) {
    firebaseDB.ref('complaints/' + complaint.key + '/isResolved').set(mode);
    if(this.state.filterChoice=='resolved') {
      var resolvedArr = this.state.resolvedArr;
      delete resolvedArr[complaint.key];
      this.setState({resolvedArr:resolvedArr});
    } else if(this.state.filterChoice=='unresolved') {
      var unresolvedArr = this.state.unresolvedArr;
      delete unresolvedArr[complaint.key];
      this.setState({unresolvedArr: unresolvedArr});
    } else {
      if(complaint.isResolved==false) { 
        var unresolvedArr = this.state.unresolvedArr;
        delete unresolvedArr[complaint.key];
        console.log("unresolved array is");
        console.log(unresolvedArr);
        this.setState({unresolvedArr: unresolvedArr});
      } else {
        var resolvedArr = this.state.resolvedArr;
        delete resolvedArr[complaint.key];
        console.log("resolved array is");
        console.log(resolvedArr);
      }
    }
    this.filterState(this.state.filterChoice);
    if(this.state.currentComplaint)
      this.nextComplaint();
    const {dispatch} = this.props
    dispatch(toggleActions.toggleToaster(mode ? "Complaint marked Resolved" : "Complaint marked Unresolved", true))
  }

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

  handleSearch(content) {
    this.setState({searchContent: content})
    var tempArr;
    if(this.state.filterChoice=='resolved')
      tempArr=this.state.resolvedArr;
    else if(this.state.filterChoice=='unresolved')
      tempArr=this.state.unresolvedArr;
    else
      tempArr=this.state.originalArr;

    tempArr = Object.values(tempArr).filter(_complaint => _complaint.subject.toLowerCase().includes(content.toLowerCase()));
    this.setState({tempArr:tempArr})
  }

  filterState(state) {
    this.setState({filterChoice: state, dateSort: null})
    switch(state) {
      case 'unresolved': {let unresolvedArr = this.state.unresolvedArr; this.setState({tempArr: unresolvedArr}); break;}
      case 'resolved': {let resolvedArr = this.state.resolvedArr; this.setState({tempArr: resolvedArr}); break;}
      case 'all': {let originalArr = this.state.originalArr; this.setState({tempArr: originalArr}); break;}
    }
  }

  componentDidMount() {
    if(!this.props.user){
      hashHistory.push('/auth')
      return
    }
    this.setState({fetching: true})
    var scope = this;
    var tempArr = scope.state.tempArr
    var resolvedArr = scope.state.resolvedArr
    var unresolvedArr = scope.state.unresolvedArr
    firebaseDB.ref().child('complaints').on('value',
    function(snapshot) {
      scope.setState({fetching: false})
      snapshot.forEach(function(child) {
        scope.setState({fetching: false})
          if(child.val().isResolved==true) {
            resolvedArr[child.key] = child.val()
            resolvedArr[child.key].key = child.key
          } else {
            unresolvedArr[child.key] = child.val()
            unresolvedArr[child.key].key = child.key
          }
          tempArr[child.key] = child.val()
          tempArr[child.key].key = child.key
          scope.setState({tempArr})
          scope.setState({originalArr: tempArr})
          scope.setState({resolvedArr: resolvedArr})
          scope.setState({unresolvedArr: unresolvedArr})
      })
    })
  }


  render() {

    return (
      <div style={{display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'center', backgroundColor: '', height: '100%'}}>
      
      <div style={{minWidth: '98%', backgroundColor: 'yellow', marginTop: 20}}>
        <SearchSortContainer allLength={Object.keys(this.state.originalArr).length} resolvedLength={Object.keys(this.state.resolvedArr).length} unresolvedLength={Object.keys(this.state.unresolvedArr).length} filterState={this.filterState} search={this.handleSearch}/>
      </div>

      {this.state.currentComplaint && 
      <Dialogxx open={this.state.dialogOpen} currentComplaint={this.state.currentComplaint} handleClose={this.handleDialogClose} nextComplaint={this.nextComplaint} resolveComplaint={this.resolveComplaint} />}

      <Paper style={{background: '', width:'98%', height: '500px', margin: 'auto',marginTop: 20,display: 'flex', justifyContent: 'center'}} zDepth={1}>
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
              <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '10%'}}>Status</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '30%'}}>Subject</TableHeaderColumn>
              <TableHeaderColumn
                style={{color: '#000', fontWeight: 700, display: 'flex', alignItems: 'center', width: '20%'}}
                hidden={this.props.isMobile}>
                Dated
                <IconButton onClick={this.handleSort} style={{padding: 0, height: 20, width: 20}}>{this.state.dateSort!=null ? (this.state.dateSort === 'asc' ? <UpArrow viewBox='0 0 30 30' /> : <DownArrow viewBox='0 0 30 30' />) : <SortIcon viewBox='0 0 30 30' />}</IconButton>
              </TableHeaderColumn>
              <TableHeaderColumn hidden={this.props.isMobile} style={{color: '#000', fontWeight: 700, width: '30%'}}>Description</TableHeaderColumn>
              <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: this.props.isMobile?'14%':'10%'}}>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >

          {this.state.fetching &&
            <div style={{textAlign: 'center', marginTop: '10%'}}>
              <CircularProgress size={60} />
            </div>
          }

          { Object.keys(this.state.tempArr).length > 0 ? (Object.values(this.state.tempArr).map(function(complaint, index) {
              return (
                  <TableRow key={index}>
                    <TableRowColumn style={{width: '10%'}}><StatusIcon style={{color: complaint.isResolved ? '#558B2F' : '#b71c1c'}} /></TableRowColumn>
                    <TableRowColumn style={{width: '30%'}}>{complaint.subject}</TableRowColumn>
                    <TableRowColumn hidden={this.props.isMobile} style={{width: '20%'}}>{moment(complaint.dated, 'DD-MM-YYYY').format("DD MMM 'YY")}</TableRowColumn>
                    <TableRowColumn hidden={this.props.isMobile} style={{width: '30%'}}>{complaint.desc}</TableRowColumn>
                    <TableRowColumn style={{width: this.props.isMobile?'14%':'10%', textOverflow: 'clip'}}>
                      {<IconMenu
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      useLayerForClickAway={true}
                      >
                      <MenuItem primaryText="View" onClick={() => this.showDialog(complaint)}/>
                      <MenuItem primaryText={complaint.isResolved ? "Mark as Unresolved" : "Mark as Resolved"} onClick={() => this.resolveComplaint(complaint, !complaint.isResolved)}/>
                      </IconMenu>}
                    </TableRowColumn>
                  </TableRow>
            )}, this)) : (

              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: this.props.isMobile ? '15%' : '2%', textAlign: 'center'}} hidden={this.state.fetching}>
                <img src={require(this.state.searchContent.length > 0 ? "../../../assets/nothingFound.png" : "../../../assets/nothingFound.png")} />
                <p>{this.state.searchContent.length > 0 ? "No complaints for this seach" : "No complaints found"}</p>
                </div>
              )
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

