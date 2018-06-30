import React, {Component} from 'react';
import {connect} from 'react-redux'
import {firebaseDB} from '../../../firebaseConfig'
import ClubDialog from '../../Dialogs/ViewClubDialogComponent'
import CircularProgress from 'material-ui/CircularProgress'
import StatusIcon from 'material-ui/svg-icons/av/fiber-manual-record'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SearchClubContainer from './SearchClubContainer';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class ApproveClubsContainer extends Component {
	constructor(props) {
		super(props)
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.toggleApprovalStatus = this.toggleApprovalStatus.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.nextClub = this.nextClub.bind(this);
		this.filterState = this.filterState.bind(this);
		this.state = {
			dialogOpen: false,
			unapprovedClubs: {},
			approvedClubs: {},
			currentClub: {},
			allClubs: {},
			searchContent: '',
      fetching: true,
      originalArr: {},
		}
	}

	componentWillMount() {
		var approvedClubs = this.state.approvedClubs;
		var unapprovedClubs = this.state.unapprovedClubs;
		var allClubs = this.state.allClubs;
		firebaseDB.ref('clubs').orderByChild('isClub').equalTo(true).on('value', function(snapshot) {
			console.log(snapshot.val());
       this.setState({fetching: false})
			snapshot.forEach(child => {
				let user = child.val();
				let key = child.key;
				user['key'] = key;
				if(user.isSC)
					return;
				if(user.isApproved)
					approvedClubs[key] = user;
				else
					unapprovedClubs[key] = user;
				let allClubs = Object.assign({}, approvedClubs, unapprovedClubs);
				this.setState({approvedClubs: approvedClubs, unapprovedClubs: unapprovedClubs, allClubs: allClubs, originalArr: allClubs});
			});
		}, this);
	}


	handleSearch(content) {
    this.setState({searchContent: content});
    var allClubs = this.state.originalArr;
    allClubs = Object.values(allClubs).filter(_club => _club.name.toLowerCase().includes(content.toLowerCase()));
    this.setState({allClubs})
  }

	toggleApprovalStatus(club, status) {
		console.log(club);
		let uid = club.key;
		firebaseDB.ref('/clubs/'+uid).child('isApproved').set(status);
		if(status)
			delete this.state.unapprovedClubs[uid];
		else
			delete this.state.approvedClubs[uid];
		const {dispatch} = this.props;
		let msg = status ? "Approved" : "Disapproved" + " successfully"
		dispatch({type: "TOASTER", message: msg, toast_open: true})
		this.handleClose()
	}

	nextClub() {
	    let keys = Object.keys(this.state.allClubs)
	    let pos = keys.indexOf(this.state.currentClub.key) + 1
	    if(pos == Object.keys(this.state.allClubs).length){
	      pos = 0;
	    }
	    let nextKey = keys[pos]
	    let nextClub = this.state.allClubs[nextKey]
	    this.setState({currentClub: nextClub})
  	}

	handleOpen(club) {
		this.setState({dialogOpen: true});
		this.setState({currentClub: club})
	}

	handleClose() {
		this.setState({dialogOpen: false});
	}

	filterState(state) {
		switch(state) {
			case 'unapproved': {let unapprovedClubs = this.state.unapprovedClubs; this.setState({allClubs: unapprovedClubs}); return;}
			case 'approved': {let approvedClubs = this.state.approvedClubs; this.setState({allClubs: approvedClubs}); return;}
			case 'all': {let allClubs = this.state.originalArr; this.setState({allClubs: allClubs}); return;}
		}
	}

	render() {
		return (
			<div style={{justifyContent: 'center'}}>
				<div style={{ width: this.props.isMobile? '98%': '90%', backgroundColor: 'yellow', margin: 'auto', marginTop: 20}}>
					<SearchClubContainer handleSearch={this.handleSearch} filterState={this.filterState}/>
				</div>

				<ClubDialog open={this.state.dialogOpen} currentClub={this.state.currentClub} nextClub={this.nextClub}  handleClose={this.handleClose} toggleApproval={this.toggleApprovalStatus}/>

				<div>
					<Paper style={{background: '', width: this.props.isMobile? '98%': '90%', height: '500px', margin: 'auto',marginTop: 20,display: 'flex', justifyContent: 'center'}} zDepth={1}>
						<div>
							<Table>
								<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						      <TableRow style={{backgroundColor: '#EFF0F2'}}>
						        <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '18%'}}>Status</TableHeaderColumn>
						        <TableHeaderColumn style={{color: '#000', fontWeight: 700}}>Club Category</TableHeaderColumn>
						        <TableHeaderColumn hidden={this.props.isMobile} style={{color: '#000', fontWeight: 700}}>Club Name</TableHeaderColumn>
						        <TableHeaderColumn hidden={this.props.isMobile} style={{color: '#000', fontWeight: 700}}>Faculty Advisor</TableHeaderColumn>
						        <TableHeaderColumn style={{color: '#000', fontWeight: 700}}>Club Details</TableHeaderColumn>
						      </TableRow>
							  </TableHeader>
							  <TableBody
							    displayRowCheckbox={false}
							    deselectOnClickaway={false}
							    showRowHover={true}
							    stripedRows={false}
							  >

							  {this.state.fetching && <CircularProgress />}

						      {
						      	Object.keys(this.state.allClubs).length > 0 ? (Object.values(this.state.allClubs).map(function(club, index) {
						      		return(
						      			<TableRow key={index}>
					      					<TableRowColumn style={{width: '18%'}}><StatusIcon style={{color: club.isApproved ? '#558B2F' : '#b71c1c'}} data-tip={"bhawesh"}/></TableRowColumn>
					      					<TableRowColumn>{club.name}</TableRowColumn>
					      					<TableRowColumn hidden={this.props.isMobile}>{club.category}</TableRowColumn>
					      					<TableRowColumn hidden={this.props.isMobile}>{club.fa.name}</TableRowColumn>
							        		<TableRowColumn><RaisedButton label="View" primary={true} onClick={() => this.handleOpen(club)} /></TableRowColumn>
									     	</TableRow>
									    )}, this)) : <p style={{textAlign: 'center', fontSize: '3rem'}}>{this.state.searchContent.length > 0 ? 'No clubs for this search' : 'No unapproved clubs'}</p>
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