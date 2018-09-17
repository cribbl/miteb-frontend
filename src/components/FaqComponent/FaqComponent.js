import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import Paper from 'material-ui/Paper'
import Collapsible from 'react-collapsible'
import { faqData } from './faqData'

class FaqComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          <h1>FAQ</h1>
        </div>
        <Paper style={{ display: 'flex', flexDirection: 'column', width: '90%', marginBottom: 150 }} zDepth={5}>
          {faqData.map(function (faq) {
            return (
              <div key={faq.que}>
                <Collapsible transitionTime={200} trigger={<p style={{ padding: 10 }}>{faq.que}</p>}>
                  <p>{faq.ans}</p>
                </Collapsible>
              </div>
            )
          })
          }
        </Paper>
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

export default connect(mapStateToProps)(FaqComponent)
