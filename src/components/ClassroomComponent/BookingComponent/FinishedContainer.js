import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'

class FinishedContainer extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: this.props.isMobile ? '15%' : '2%', textAlign: 'center', marginBottom: 80, maxWidth: '98%'}}>
        <div style={{minHeight: 300}}>
          <img src={require('../../../assets/rocket-loader.gif')} style={{width: this.props.isMobile ? '98%' : '50%'}}/>
        </div>

          <p>{this.props.event && this.props.event.booker_name}, your event titled "<span style={{fontWeight: 700}}>{this.props.event && this.props.event.title}</span>" has been requested for approval.</p>
          <p>We'll notify you via email ({this.props.event && this.props.event.booker_email}) and SMS ({this.props.event && this.props.event.booker_contact})</p>
          <p>Check live status under <Link to="dashboard/myEvents">My Events</Link></p>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const {isMobile} = state.toggler
  return {
    isMobile
  }
}

export default connect(mapStateToProps)(FinishedContainer)