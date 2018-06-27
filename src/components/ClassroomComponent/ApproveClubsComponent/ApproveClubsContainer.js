import React, {Component} from 'react';
import {connect} from 'react-redux'
import {firebaseDB} from '../../../firebaseConfig'
import ClubDialog from '../../Dialogs/ViewClubDialogComponent'

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
		this.handleApprove = this.handleApprove.bind(this);
		this.nextClub = this.nextClub.bind(this);
		this.state = {
			dialogOpen: false,
			unapprovedClubs: {},
			approvedClubs: {},
			currentClub: {}
		}
	}

	componentWillMount() {
		var approvedClubs = this.state.approvedClubs;
		var unapprovedClubs = this.state.unapprovedClubs;
		firebaseDB.ref('clubs').on('value', function(snapshot) {
			snapshot.forEach(child => {
				let user = child.val();
				let key = child.key;
				user['key'] = key;
				if(user.isClub && user.isApproved)
					approvedClubs[key] = user;
				else if(user.isClub)
					unapprovedClubs[key] = user;
			});
		});
		this.setState({approvedClubs: approvedClubs, unapprovedClubs: unapprovedClubs});
	}

	handleApprove(club) {
		console.log(club);
		let uid = club.key;
		firebaseDB.ref('/clubs/'+uid).child('isApproved').set(true);
		delete this.state.unapprovedClubs[uid];
		this.setState({dialogOpen: false});
	}

	nextClub() {
	    let keys = Object.keys(this.state.unapprovedClubs)
	    let pos = keys.indexOf(this.state.currentClub.key) + 1
	    if(pos == Object.keys(this.state.unapprovedClubs).length){
	      pos = 0;
	    }
	    let nextKey = keys[pos]
	    let nextClub = this.state.unapprovedClubs[nextKey]
	    this.setState({currentClub: nextClub})
  	}

	handleOpen(club) {
		this.setState({dialogOpen: true});
		this.setState({currentClub: club})
	}

	handleClose() {
		this.setState({dialogOpen: false});
	}

	render() {
		return (
			<div style={{justifyContent: 'center'}}>
				<div style={{ width: this.props.isMobile? '98%': '90%', backgroundColor: 'yellow', margin: 'auto', marginTop: 20}}>
					<SearchClubContainer />
				</div>

				<ClubDialog open={this.state.dialogOpen} currentClub={this.state.currentClub} nextClub={this.nextClub}  handleClose={this.handleClose} approve={this.handleApprove}/>

				<div>
					<Paper style={{background: '', width: this.props.isMobile? '98%': '90%', height: '500px', margin: 'auto',marginTop: 20,display: 'flex', justifyContent: 'center'}} zDepth={1}>
						<div>
							<Table>
								<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						      <TableRow style={{backgroundColor: '#EFF0F2'}}>
						        <TableHeaderColumn style={{color: '#000', fontWeight: 700}}>Club Name</TableHeaderColumn>
						        <TableHeaderColumn style={{color: '#000', fontWeight: 700}}>Club Category</TableHeaderColumn>
						        <TableHeaderColumn style={{color: '#000', fontWeight: 700}}>Club Details</TableHeaderColumn>
						      </TableRow>
							  </TableHeader>
							  <TableBody displayRowCheckbox={false}>
						      {
						      	Object.keys(this.state.unapprovedClubs).length > 0 ? (Object.values(this.state.unapprovedClubs).map(function(club, index) {
						      		return(
						      			<TableRow key={index}>
					      					<TableRowColumn>{club.name}</TableRowColumn>
					      					<TableRowColumn>{club.category}</TableRowColumn>
							        		<TableRowColumn><RaisedButton label="View" primary={true} onClick={() => this.handleOpen(club)} /></TableRowColumn>
									     	</TableRow>
									    )},this))
						      		:<TableRow><TableRowColumn /*style={{textAlign: 'center', fontSize: '3rem'}}*/>No Unapproved Clubs</TableRowColumn></TableRow>}
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

export default connect(mapStateToProps)(ApproveClubsContainer)