import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'

class NotFound extends Component {
  constructor (props) {
    super(props);
    this.state = {
      counter: 4
    }
  }

  componentWillMount() {
    var scope = this;
    var interval = setInterval(function() {
      let c = scope.state.counter - 1;
      scope.setState({counter: c})
      if(c==0) {
        window.clearInterval(interval);
        hashHistory.push('/auth');
      }
    }, 1000)
  }

  render() {
    return (
    	<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '10%'}}>
        <img src={require('../../assets/404.png')} style={{width: this.props.isMobile ? '98%' : '50%'}}/>
        <br /><br />
        <h5>Redirecting to Home in {this.state.counter}</h5>
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

export default connect(mapStateToProps)(NotFound)