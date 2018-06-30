import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'

class DashboardComponent extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
        <img src={require('../../../assets/analytics.png')} style={{width: this.props.isMobile ? '96%' : '70%'}}/>
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