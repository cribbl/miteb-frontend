import React, { Component } from 'react'
import { connect } from 'react-redux'

class Sponsors extends Component {
  constructor (props) {
    super()
  }

  render () {
    return (
      <div className={this.props.isMobile ? 'flex-col' : 'flex-row'} style={{ width: '100%', justifyContent: 'space-around', minHeight: 110, alignItems: 'center' }}>

        <div style={{ padding: 15, margin: 20 }}>
          <a href='https://m.do.co/c/c78f7bcf92af' target='_blank' rel='noopener noreferrer'>
            <img src={require('../../assets/do_powered_by.png')} style={{ width: this.props.isMobile ? '64%' : '40%' }} alt='Digital Ocean' />
          </a>
        </div>

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

export default connect(mapStateToProps)(Sponsors)
