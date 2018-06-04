import React, {Component} from 'react';
import {connect} from 'react-redux'

// import check_circle_outline from 'material-ui/svg-icons/action/home';
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
		this.state = {
			clubApproved : false
		}
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
							      <TableRow>
							        <TableRowColumn>MTTN</TableRowColumn>
							        <TableRowColumn><RaisedButton>View</RaisedButton></TableRowColumn>
							      </TableRow>
							      <TableRow>
							        <TableRowColumn>LDQ</TableRowColumn>
							        <TableRowColumn><RaisedButton>View</RaisedButton></TableRowColumn>
							      </TableRow>
							      <TableRow>
							        <TableRowColumn>The Photography Club</TableRowColumn>
							        <TableRowColumn><RaisedButton>View</RaisedButton></TableRowColumn>
							      </TableRow>
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

