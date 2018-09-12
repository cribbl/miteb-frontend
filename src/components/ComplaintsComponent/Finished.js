import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'

class Finished extends Component {
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
        hashHistory.push('/');
      }
    }, 1000)
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: this.props.isMobile ? '15%' : '2%', textAlign: 'center', marginBottom: 80}}>
        <div style={{minHeight: 250}}>
          <img src={require('../../assets/mail-delivery.gif')} style={{width: this.props.isMobile ? '98%' : '70%', margin: '10%, 0'}}/>
        </div>

        <div style={{padding: 10}}>
          <h5>{this.props.complaint.fields.name}, your complaint with subject "{this.props.complaint.subject}" has been lodged.</h5>
          <p>We shall reach out to you via email ({this.props.complaint.fields.email})</p>
        </div>
      
      <p style={{margin: '30px 0px'}}>Redirecting back in {this.state.counter}</p>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const {isMobile} = state.toggler
  return {
    isMobile
  }
}

export default connect(mapStateToProps)(Finished)