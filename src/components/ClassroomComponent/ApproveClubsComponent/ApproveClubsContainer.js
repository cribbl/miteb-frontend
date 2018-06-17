import React, {Component} from 'react';
import {connect} from 'react-redux'
import {firebaseDB} from '../../../firebaseConfig'

import Dialog from 'material-ui/Dialog';
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
		this.state = {
			dialogOpen: false,
			unapprovedClubs: {},
			approvedClubs: {},
		}
	}

	componentWillMount() {
		this.fetchClubs();
	}

	fetchClubs() {
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

	handleOpen() {
		this.setState({dialogOpen: true});
		console.log("inside open:"+"\n"+this.state.unapprovedClubs);
	}

	handleClose() {
		this.setState({dialogOpen: false});
	}

	handleApprove(club) {
		console.log(club);
		let uid = club.key;
		// firebaseDB.ref('/clubs/'+uid).child('isApproved').set(true);
		delete this.state.unapprovedClubs[uid];
		this.setState({dialogOpen: false})
	}

	render() {
		return (
			<div style={{justifyContent: 'center'}}>
				<div style={{ width: this.props.isMobile? '98%': '90%', backgroundColor: 'yellow', margin: 'auto', marginTop: 20}}>
					<SearchClubContainer />
				</div>
				<div>
					<Paper style={{background: '', width: this.props.isMobile? '98%': '90%', height: '500px', margin: 'auto',marginTop: 20,display: 'flex', justifyContent: 'center'}} zDepth={1}>
						<div>
							<Table>
								<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
							      <TableRow>
							        <TableHeaderColumn>Club Name</TableHeaderColumn>
							        <TableHeaderColumn>Club Details</TableHeaderColumn>
							      </TableRow>
							    </TableHeader>
							    <TableBody displayRowCheckbox={false}>
							      {
							      	Object.keys(this.state.unapprovedClubs).length > 0 ? (Object.values(this.state.unapprovedClubs).map(function(club, index) {
							      		return(
							      			<TableRow key={index}>
						      					<TableRowColumn>{club.name}</TableRowColumn>
								        		<TableRowColumn><RaisedButton label="View" onClick={this.handleOpen} /></TableRowColumn>
								        		<Dialog
										          title="Club Details"
										          actions={[<RaisedButton
        												label="Approve Club"
        												primary={true}
        												onClick={()=>this.handleApprove(club)}
      												  />]}
										          modal={false}
										          open={this.state.dialogOpen}
										          onRequestClose={this.handleClose}
										          autoScrollBodyContent={true}
										        >
										        <p>Name : {club.name} </p>
										        <p>Name Abbreviation :{club.nameAbbrv} </p>
										        <p>Email : {club.email}</p>
										      	<p>Password : {club.password}</p>
										        <p>Primary Contact : {club.primaryContact}</p>
										        <p>Category : {club.category}</p> 
										        </Dialog>
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

