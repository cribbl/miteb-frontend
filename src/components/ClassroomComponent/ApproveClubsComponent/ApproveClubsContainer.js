import React, {Component} from 'react';
import {connect} from 'react-redux'
import {firebaseDB} from '../../../firebaseConfig'
import ClubDialog from '../../Dialogs/ViewClubDialogComponent'
import CircularProgress from 'material-ui/CircularProgress'
import {hashHistory} from 'react-router'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SearchSortContainer from './SearchSortContainer';
import {toggleActions} from '../../../actions/toggleActions'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import StatusIcon from 'material-ui/svg-icons/av/fiber-manual-record'



class ApproveClubsContainer extends Component {
	constructor(props) {
		super(props)
		this.showDialog = this.showDialog.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.approveClub = this.approveClub.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.nextClub = this.nextClub.bind(this);
		this.filterState = this.filterState.bind(this);
		this.state = {
			dialogOpen: false,
		  approvedArr: {},
    	unapprovedArr: {},
		  originalArr: {},
	    tempArr: {},
			// unapprovedClubs: {},
			// approvedClubs: {},
			currentClub: {},
			// allClubs: {},
			searchContent: '',
      fetching: true,
      // originalArr: {},
		}
	}

	componentWillMount() {
    if(!this.props.user){
      hashHistory.push('/auth')
      return
    }
    this.setState({fetching: true})
    var scope = this;
    var tempArr = scope.state.tempArr
    var approvedArr = scope.state.approvedArr
    var unapprovedArr = scope.state.unapprovedArr
    firebaseDB.ref().child('clubs').on('value',
    function(snapshot) {
      scope.setState({fetching: false})
      snapshot.forEach(function(child) {
        scope.setState({fetching: false})
          if(child.val().isClub && !child.val().isSC && child.val().isApproved) {
            approvedArr[child.key] = child.val()
            approvedArr[child.key].key = child.key
            tempArr[child.key] = child.val()
            tempArr[child.key].key = child.key

          } else if(child.val().isClub && !child.val().isSC && !child.val().isApproved){
          	console.log(child.val());
            unapprovedArr[child.key] = child.val()
            unapprovedArr[child.key].key = child.key
            tempArr[child.key] = child.val()
	          tempArr[child.key].key = child.key

          }
          scope.setState({tempArr})
          scope.setState({originalArr: tempArr})
          scope.setState({approvedArr: approvedArr})
          scope.setState({unapprovedArr: unapprovedArr})
      })
    })
	}

	filterState(state) {
    this.setState({filterChoice: state, dateSort: null})
    switch(state) {
      case 'unapproved': {let unapprovedArr = this.state.unapprovedArr; this.setState({tempArr: unapprovedArr}); break;}
      case 'approved': {let approvedArr = this.state.approvedArr; this.setState({tempArr: approvedArr}); break;}
      case 'all': {let originalArr = this.state.originalArr; this.setState({tempArr: originalArr}); break;}
    }
  }

	handleClose() {
		this.setState({dialogOpen: false});
	}

	showDialog(club) {
		this.setState({dialogOpen: true});
		this.setState({currentClub: club})
	}

	handleSearch(content) {
    this.setState({searchContent: content})
    var tempArr;
    if(this.state.filterChoice=='approved')
      tempArr=this.state.approvedArr;
    else if(this.state.filterChoice=='unapproved')
      tempArr=this.state.unapprovedArr;
    else
      tempArr=this.state.originalArr;

    tempArr = Object.values(tempArr).filter(_club => _club.name.toLowerCase().includes(content.toLowerCase()));
    this.setState({tempArr:tempArr})
  }

	nextClub() {
	  let keys = Object.keys(this.state.tempArr)
    if(keys.length == 0){
      this.handleDialogClose()
      return
    }
    let pos = keys.indexOf(this.state.currentClub.key) + 1
    if(pos == Object.keys(this.state.tempArr).length){
      pos = 0;
    }
    let nextKey = keys[pos]
    let nextClub = this.state.tempArr[nextKey]
    this.setState({currentClub: nextClub})
  }

	toggleApprovalStatus(club, status) {
		console.log(club);
		let uid = club.key;
		firebaseDB.ref('/clubs/'+uid).child('isApproved').set(status);
		delete this.state.unapprovedClubs[uid];
		delete this.state.approvedClubs[uid];
		// this.setState({dialogOpen: false});
		const {dispatch} = this.props;
		let msg = status ? "Approved" : "Disapproved" + " successfully"
		dispatch({type: "TOASTER", message: msg, toast_open: true})
		this.nextClub()
	}

	approveClub(club, mode) {
    firebaseDB.ref('clubs/' + club.key + '/isApproved').set(mode);
    if(this.state.filterChoice=='approved') {
      var approvedArr = this.state.approvedArr;
      delete approvedArr[club.key];
      this.setState({approvedArr:approvedArr});
    } else if(this.state.filterChoice=='unapproved') {
      var unapprovedArr = this.state.unapprovedArr;
      delete unapprovedArr[club.key];
      this.setState({unapprovedArr: unapprovedArr});
    } else {
      if(club.isApproved==false) { 
        var unapprovedArr = this.state.unapprovedArr;
        delete unapprovedArr[club.key];
        console.log("unapproved array is");
        console.log(unapprovedArr);
        this.setState({unapprovedArr: unapprovedArr});
      } else {
        var approvedArr = this.state.approvedArr;
        delete approvedArr[club.key];
        console.log("approved array is");
        console.log(approvedArr);
        this.setState({approvedArr:approvedArr});
      }
    }
    this.filterState(this.state.filterChoice);
    this.nextClub();
    const {dispatch} = this.props
    dispatch(toggleActions.toggleToaster(mode ? "Club marked Approved" : "Club marked Unapproved", true))
  }

	render() {
		return (
			<div style={{justifyContent: 'center'}}>
				<div style={{ width:'98%', backgroundColor: 'yellow', margin: 'auto', marginTop: 20}}>
					<SearchSortContainer handleSearch={this.handleSearch} filterState={this.filterState} unapprovedLength={Object.keys(this.state.unapprovedArr).length} approvedLength={Object.keys(this.state.approvedArr).length} allLength={Object.keys(this.state.originalArr).length}/>
				</div>

				<ClubDialog open={this.state.dialogOpen} currentClub={this.state.currentClub} nextClub={this.nextClub}  handleClose={this.handleClose} toggleApproval={this.toggleApprovalStatus}/>

				<div>
					<Paper style={{background: '', width:'98%', height: '500px', margin: 'auto',marginTop: 20,display: 'flex', justifyContent: 'center'}} zDepth={1}>
						<div>
							<Table>
								<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						      <TableRow style={{backgroundColor: '#EFF0F2'}}>
						      	<TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '10%'}}>Status</TableHeaderColumn>
						        <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '30%'}}>Club Name</TableHeaderColumn>
						        <TableHeaderColumn hidden={this.props.isMobile} style={{color: '#000', fontWeight: 700, width: '20%'}}>Club Category</TableHeaderColumn>
						        <TableHeaderColumn hidden={this.props.isMobile} style={{color: '#000', fontWeight: 700, width: '30%'}}>Club FA</TableHeaderColumn>
						        <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: this.props.isMobile?'14%':'10%'}}>Actions</TableHeaderColumn>
						      </TableRow>
							  </TableHeader>
							  <TableBody
							    displayRowCheckbox={false}
							    deselectOnClickaway={false}
							    showRowHover={false}
							    stripedRows={false}
							  >

							  {this.state.fetching &&
                  <div style={{textAlign: 'center', marginTop: '10%'}}>
                    <CircularProgress size={60} />
                  </div>
                }

						      {
						      	Object.keys(this.state.tempArr).length > 0 ? (Object.values(this.state.tempArr).map(function(club, index) {
						      		return(
						      			<TableRow key={index}>
						      				<TableRowColumn style={{width: '10%'}}><StatusIcon style={{color: club.isApproved ? '#558B2F' : '#b71c1c'}} data-tip="dfdsf" /></TableRowColumn>
					      					<TableRowColumn style={{width: '30%'}}>{club.name}</TableRowColumn>
					      					<TableRowColumn hidden={this.props.isMobile} style={{width: '20%'}}>{club.category}</TableRowColumn>
					      					<TableRowColumn hidden={this.props.isMobile} style={{width: '30%'}}>{club.fa.name}</TableRowColumn>
							        		<TableRowColumn style={{width:this.props.isMobile?'14%':'10%'}}>
			                      {<IconMenu
			                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
			                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
			                      useLayerForClickAway={true}
			                      >
			                      <MenuItem primaryText="View" onClick={() => this.showDialog(club)}/>
			                      <MenuItem primaryText={club.isApproved ? "Mark as Unpproved" : "Mark as Approved"} onClick={() => this.approveClub(club, !club.isApproved)}/>
			                      </IconMenu>}
                    			</TableRowColumn>
									     	</TableRow>
									    )}, this)) : (

                      <div style={{textAlign: 'center', marginTop: 10}} hidden={this.state.fetching}>
                        <img src={require(this.state.searchContent.length > 0 ? "../../../assets/nothingFound.png" : "../../../assets/nothingFound.png")} />
                        <p>{this.state.searchContent.length > 0 ? "No clubs for this search" : "No clubs here"}</p>
                      </div>
                    )
						      }
							    </TableBody>
							</Table>
						</div>
					</Paper>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  const {openSideNav, isMobile, filterState} = state.toggler
  const {user, verified} = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile,
    filterState
  }
}

export default connect(mapStateToProps)(ApproveClubsContainer)

