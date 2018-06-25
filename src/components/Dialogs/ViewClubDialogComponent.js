import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';


class clubDialog extends Component {
	constructor(props) {
		super(props);
		this.handleApprove = this.handleApprove.bind(this);
		this.state = {
			open: this.props.open
		}
	}

	componentWillMount() {
		console.log("hello world");
	}

	handleApprove() {
		// approveClub(<parameter>);
	}

	render() {
		const styles = {
		  label: {
		    maxWidth: '30%',
		    width: '30%',
		    display: 'inline-block',
		    padding: 7
		  },

		  value: {
		    width: '70%',
		    display: 'inline-block',
		    padding: 7
		  },
		}

		const viewActions = [
			<FlatButton
			label="Cancel"
			primary={false}
			onClick={this.props.handleClose}
			/>,
			<FlatButton
			label="Next"
			primary={true}
			onClick={this.props.handleClose}
			/>,
			<FlatButton
			label="Approve"
			primary={true}
			onClick={this.props.handleClose}
			/>
		]

		return(
			<Dialog
		        title="Club Details"
		        actions={viewActions}
	         	modal={false}
		        open={this.props.open}
		        onRequestClose={this.props.handleClose}
		        autoScrollBodyContent={true}
                contentStyle={{width: this.props.isMobile ? '97%' : '60%', maxWidth: 'none'}}

		        >
		        <div>
			        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
			        	<p style={styles.label}>Name : </p>
			        </div>
			        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
			        	<p style={styles.label}>Name Abbreviation : </p>
			        </div>
			        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
			        	<p style={styles.label}>Email : </p>
			        </div>
			        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
			        	<p style={styles.label}>Primary Contact : </p>
			        </div>
		        </div>
		    </Dialog>
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
export default connect(mapStateToProps)(clubDialog)