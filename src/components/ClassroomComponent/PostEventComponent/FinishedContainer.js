import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

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
          <p>Your details for the event titled '{this.props.event.title}' have been recorded. </p>
          <p>You can now proceed to book rooms for your upcoming events under <Link to="dashboard/book_room">Room Booking</Link></p>
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