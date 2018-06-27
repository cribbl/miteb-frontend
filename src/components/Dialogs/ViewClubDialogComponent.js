import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';


class ClubDialog extends Component {
	constructor(props) {
		super(props);
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
			onClick={this.props.nextClub}
			/>,
			<FlatButton
			label="Approve"
			primary={true}
			onClick={()=>this.props.approve(this.props.currentClub)}
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
	          <p style={styles.label}>Name</p>
	          <p style={styles.value}>{this.props.currentClub.name}</p>
	        </div>
	        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	        	<p style={styles.label}>Name Abbreviation</p>
	        	<p style={styles.value}>{this.props.currentClub.nameAbbrv}</p>
	        </div>
	        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	        	<p style={styles.label}>Email</p>
	        	<p style={styles.value}>{this.props.currentClub.email}</p>
	        </div>
	        <div style={{border: '1px solid black', display: 'flex', alignItems: 'center'}}>
	        	<p style={styles.label}>Primary Contact</p>
	        	<p style={styles.value}>{this.props.currentClub.primaryContact}</p>
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