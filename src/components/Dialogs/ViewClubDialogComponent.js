import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {firebaseDB} from '../../firebaseConfig'


class ClubDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentFA: {
				emailVerification: false,
				name: "NOT CONNECTED",
				email: "NOT CONNECTED",
				primaryContact: "NOT CONNECTED"
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		var scope = this;
		firebaseDB.ref(`users/${nextProps.currentClub.fa_uid}`).once('value', function(snapshot) {
			let FA = snapshot.val();
			if(FA)
				scope.setState({
					currentFA: FA
				})
			else
				scope.setState({currentFA: {
				emailVerification: false,
				name: "NOT CONNECTED",
				email: "NOT CONNECTED",
				primaryContact: "NOT CONNECTED"
			}})
		})
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
			label="Close"
			primary={false}
			onClick={this.props.handleClose}
			/>,
			<FlatButton
			label="Next"
			primary={true}
			onClick={this.props.nextClub}
			/>,
			<RaisedButton
			label={this.props.currentClub.isApproved ? "Disapprove" : "Approve"}
			primary={!this.props.currentClub.isApproved}
			onClick={()=>this.props.toggleApproval(this.props.currentClub, this.props.currentClub.isApproved ? false : true)}
			style={{position: 'absolute', top: '6.5%', right: '3%'}}
			/>
		]

		return(
			<Dialog
	      title={this.props.currentClub.name}
	      actions={viewActions}
	     	modal={false}
	      open={this.props.open}
	      onRequestClose={this.props.handleClose}
	      autoScrollBodyContent={true}
	      contentStyle={{width: this.props.isMobile ? '97%' : '60%', maxWidth: 'none'}}
	    >
	      <div>
	         <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	        	<p style={styles.label}>Club Email Verified</p>
	        	<p style={styles.value}>{!!this.props.currentClub.emailVerification? 'True' : 'False' } </p>
	        </div>
	        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	        	<p style={styles.label}>FA Email Verified</p>
	        	<p style={styles.value}>{!!this.state.currentFA.emailVerification? 'True': 'False'} </p>
	        </div>
	        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	          <p style={styles.label}>Club Name</p>
	          <p style={styles.value}>{this.props.currentClub.name}</p>
	        </div>
	        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	        	<p style={styles.label}>Name Abbreviation</p>
	        	<p style={styles.value}>{this.props.currentClub.abbrv}</p>
	        </div>
	        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	        	<p style={styles.label}>Email</p>
	        	<p style={styles.value}>{this.props.currentClub.email}</p>
	        </div>
	        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	        	<p style={styles.label}>Primary Contact</p>
	        	<p style={styles.value}>{this.props.currentClub.primaryContact}</p>
	        </div>
	         <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	        	<p style={styles.label}>Faculty Advisor Name </p>
	        	<p style={styles.value}>{this.state.currentFA.name}</p>
	        </div>
	         <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	        	<p style={styles.label}>Faculty Advisor Email</p>
	        	<p style={styles.value}>{this.state.currentFA.email}</p>
	        </div>
	         <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	        	<p style={styles.label}>Faculty Advisor Contact</p>
	        	<p style={styles.value}>{this.state.currentFA.primaryContact}</p>
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
export default connect(mapStateToProps)(ClubDialog)