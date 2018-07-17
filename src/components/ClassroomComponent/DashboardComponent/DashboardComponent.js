import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'

class DashboardComponent extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: this.props.isMobile ? '15%' : '2%', textAlign: 'center'}}>
        <img src={require('../../../assets/dashboard.gif')} style={{width: this.props.isMobile ? '98%' : '50%'}}/>
        <h3 style={{fontWeight: 700, marginTop: 30}}>We're monitoring your data and will generate useful Analytics soon</h3>
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

export default connect(mapStateToProps)(DashboardComponent)