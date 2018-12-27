import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class FinishedContainer extends Component {
  render () {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: this.props.isMobile ? '15%' : '2%', textAlign: 'center', marginBottom: 80, maxWidth: '98%' }}>
        <div style={{ minHeight: 300 }}>
          <img src={require('../../../assets/rocket-loader.gif')} style={{ width: this.props.isMobile ? '98%' : '50%' }} />
        </div>

        <p>{this.props.event && this.props.event.bookerFields.booker_name}, your publicity request titled "<span style={{ fontWeight: 700 }}>{this.props.event && this.props.event.title}</span>" has been requested for approval.</p>
        <p>We'll notify you via email ({this.props.event && this.props.event.bookerFields.booker_email}) and SMS ({this.props.event && this.props.event.bookerFields.booker_contact})</p>
        <p>Check live status under <Link to='dashboard/myPublicity'>My Publicity</Link></p>

      </div>
    )
  }
}

function mapStateToProps (state) {
  const { isMobile } = state.toggler
  return {
    isMobile
  }
}

export default connect(mapStateToProps)(FinishedContainer)
