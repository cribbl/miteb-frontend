import React, { Component } from 'react'
import Collapsible from 'react-collapsible';
import Paper from 'material-ui/Paper'
import {faqData} from './faqData'

class FaqContainer extends Component {
  render () {
    const titleSpan = (
    <p>What is this program all about?</p>
) 
    return (
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      <div>
      <h1>FAQ</h1>
      </div>
    	<Paper style={{display: 'flex', flexDirection: 'column', width: '90%', marginBottom: 150}} zDepth={5}>
        {faqData.map(function(faq) {
              return (
              <div key={faq.que}>
              <Collapsible transitionTime={200} trigger={   <p style={{padding: 10}}>{faq.que}</p>}>
                <p>{faq.ans}</p>
              </Collapsible>
              </div>
          )})
        }
        </Paper>
      </div>
    )
  }
}

export default FaqContainer
